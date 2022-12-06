import React from "react";
import { Edge, Node, useEdgesState, useNodesState, useReactFlow } from "reactflow";
import { DEFAULT_NODE_STYLES, HIGHLIGHTED_EDGE_STYLES, HIGHLIGHTED_NODE_STYLES } from "./components";

export type NodeData = { color: string };
export type RFState = {
  nodes: Node<NodeData>[];
  edges: Edge[];
  setNodes: React.Dispatch<React.SetStateAction<Node<NodeData>[]>>;
  setEdges: React.Dispatch<React.SetStateAction<Edge<any>[]>>;
  highlightNodes: (predicateFn: (value: Node<NodeData>) => boolean) => void
  unhighlightNodes: (predicateFn: (value: Node<NodeData>) => boolean) => void
  highlightEdges: (predicateFn: (value: Edge<any>) => boolean) => void
  unhighlightEdges: (predicateFn: (value: Edge<any>) => boolean) => void
  getNodesAndEdgesConnectedToMe: (nodeId: string, includeSelf?:boolean) => {
    nodesConnectedToMe: Set<string>;
    edgesConnectedToMe: Set<string>;
  };
  onNodesChange: any
  onEdgesChange: any,
};

/**
 * @description
 * React only uses this value as a fallback if it can’t find a matching provider.
 */
const defaultContextValue = {
  nodes: [],
  edges: [],
  setEdges: () => {/* noop */},
  setNodes: () => {/* noop */},
  highlightNodes: () => {/* noop */},
  unhighlightNodes: () => {/* noop */},
  highlightEdges: () => {/* noop */},
  unhighlightEdges: () => {/* noop */},
  getNodesAndEdgesConnectedToMe: () => {/* noop */},
  onNodesChange: () => {/* noop */},
  onEdgesChange: () => {/* noop */},
} as unknown as RFState;
const ReactFlowTestContext = React.createContext<RFState>(defaultContextValue);
ReactFlowTestContext.displayName = "ReactFlowTestContext";

type ContextProviderProps = {
  defaultNodes: Node<NodeData>[];
  defaultEdges: Edge[];
  children: React.ReactNode;
};

/* --------------Utility Functions ------------- */

/**
 * @description
 * This provider is used for storing state related to the DeviceConnectionsViewer component.
 */
const ContextProvider = ({
  children,
  defaultNodes = [],
  defaultEdges = [],
}: ContextProviderProps) => {
  const reactFlowInstance = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState(defaultNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(defaultEdges);


  /**
   * @description
   * Get nodes and edges connected to current node.
   * The node we using to find connections is also included in the result set,
   * this is so that we could also highlight it in the UI as well
   */
  const getNodesAndEdgesConnectedToMe = (nodeId: string, includeSelf=true) => {
    const nodesConnectedToMeIds = new Set<string>();
    const edgesConnectedToMeIds = new Set<string>();

    // Iterate over edges to find connections to me
    reactFlowInstance.getEdges().forEach((edge) => {
      const isEdgeConnectedToMe =
        edge?.target === nodeId || edge?.source === nodeId;
      if (isEdgeConnectedToMe) {
        // 1.Save the edge connected to me
        edgesConnectedToMeIds.add(edge?.id);
        // 2. Save the IDs of the nodes connected to me by looking at the source & target value inside the edge.
        const nodesConnectedToMe = [edge?.source, edge?.target].filter(
          (nid) => {
            return typeof nid === "string" && nid !== nodeId;
          }
        );
        nodesConnectedToMe.forEach((nodeId: string) =>
          nodesConnectedToMeIds.add(nodeId)
        );
      }
      if (includeSelf) {
        nodesConnectedToMeIds.add(nodeId)
      }
    });
    return {
      nodesConnectedToMe: nodesConnectedToMeIds,
      edgesConnectedToMe: edgesConnectedToMeIds,
    };
  };

  /**
   * @description
   * Finds nodes in graph from list of nodeId & updates the node by adding certain CSS styles for highlighting.
   * predicate: (value: never, index: number, array: never[]) => value is S
   */
  const highlightNodes = ( predicateFn: (value: Node<NodeData>) => boolean ) => {
    const updatedNodes = reactFlowInstance.getNodes().map((node) => {
      const shouldUpdateNode = predicateFn(node as any)
      if (shouldUpdateNode) {
        node.data = { ...node.data, customCSSStyles: HIGHLIGHTED_NODE_STYLES };
      }
      else {
        // If not a match, remove the highlights if it has any in the previous searcj
        node.data = { ...node.data, customCSSStyles: DEFAULT_NODE_STYLES };
      }
      return node;
    });
    setNodes(updatedNodes);
  };

  const unhighlightNodes = ( predicateFn: (value: Node<NodeData>) => boolean ) => {
    const updatedNodes = reactFlowInstance.getNodes().map((node) => {
      const shouldUpdateNode = predicateFn(node as any)
      if (shouldUpdateNode) {
        node.data = { ...node.data, customCSSStyles: DEFAULT_NODE_STYLES };
      }
      return node;
    });
    setNodes(updatedNodes);
  };
  /**
   * @description
   * Finds edges in graph from list of nodeId & updates the node by adding certain CSS styles for highlighting.
   */
  const highlightEdges = ( predicateFn: (value: Edge<any>) => boolean ) => {
    const updatedEdges = reactFlowInstance.getEdges().map((edge) => {
      const shouldUpdateEdge = predicateFn(edge as any);
      if (shouldUpdateEdge) {
        edge.data = { ...edge.data, customCSSStyles: HIGHLIGHTED_EDGE_STYLES };
      }
      return edge;
    });
    setEdges(updatedEdges);
  };
  const unhighlightEdges = ( predicateFn: (value: Edge<any>) => boolean ) => {
    const updatedEdges = reactFlowInstance.getEdges().map((edge) => {
      const shouldUpdateEdge = predicateFn(edge as any);
      if (shouldUpdateEdge) {
        edge.data = { ...edge.data, customCSSStyles: {} };
      }
      return edge;
    });
    setEdges(updatedEdges);
  };


  const contextValues: RFState = {
    nodes,
    setNodes,
    edges,
    setEdges,
    highlightNodes,
    highlightEdges,
    unhighlightNodes,
    unhighlightEdges,
    getNodesAndEdgesConnectedToMe,
    onNodesChange,
    onEdgesChange,
  };
  return (
    <ReactFlowTestContext.Provider value={contextValues}>
      {children}
    </ReactFlowTestContext.Provider>
  );
};

/**
 * @description
 * A hook responsible for fetching data from the ReactFlowTestContext.
 */
const useReactFlowTestContext = () => {
  const context = React.useContext(ReactFlowTestContext);

  if (context === undefined || Object.keys(context).length === 0) {
    throw new Error(
      `useReactFlowTestContext must be used within a ContextProvider`
    );
  }

  return context;
};

export { ContextProvider, useReactFlowTestContext };
