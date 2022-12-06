import React from 'react';
import {
  Edge,
  Node,
} from 'reactflow';

export type NodeData = {
  color: string;
};

export type RFState = {
  nodes: Node<NodeData>[];
  edges: Edge[];
  setNodes: any;
  setEdges: any;
  updateNodeColor: (nodeId: string, color: string) => void;
};

/**
 * @description
 * React only uses this value as a fallback if it can’t find a matching provider.
 */
const defaultContextValue = {nodes: [], edges: [], setEdges: () =>{/* noop */}, setNodes: () => {/* noop */}}
const ReactFlowTestContext = React.createContext<any>(defaultContextValue); // TODO: remove any

ReactFlowTestContext.displayName = 'ReactFlowTestContext';

type ContextProviderProps = {
  defaultNodes: Node<NodeData>[];
  defaultEdges: Edge[];
  children: React.ReactNode
}
/**
 * @description
 * This provider is used for storing state related to the DeviceConnectionsViewer component.
 */
const ContextProvider = ({ children, defaultNodes=[], defaultEdges=[] }: ContextProviderProps) => {
  const [nodes, setNodes] = React.useState(defaultNodes)
  const [edges, setEdges] = React.useState(defaultEdges)

  const contextValues = {nodes, setNodes, edges, setEdges}

  console.log(`context change`, contextValues)
  return (
    <ReactFlowTestContext.Provider value={contextValues}>{children}</ReactFlowTestContext.Provider>
  );
};

/**
 * @description
 * A hook responsible for fetching data from the ReactFlowTestContext.
 */
const useReactFlowTestContext = () => {
  const context = React.useContext(ReactFlowTestContext);

  if (context === undefined || Object.keys(context).length === 0) {
    throw new Error(`useDeviceConnectionsViewer must be used within a ContextProvider`);
  }

  return context;
};

export { ContextProvider, useReactFlowTestContext };
