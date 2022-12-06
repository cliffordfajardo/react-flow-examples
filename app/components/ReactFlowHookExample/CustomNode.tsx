import React from "react";
import { Handle, NodeProps, Position, useReactFlow, useStoreApi } from "reactflow";

// TODO: should I just use global CSS?
const DEFAULT_NODE_STYLES:React.CSSProperties = {
  border: "2px solid black",
  height: 50,
  position: 'relative',
  pointerEvents: 'all',
}
const HIGHLIGHTED_NODE_STYLES:React.CSSProperties = {
  pointerEvents: 'all',
  border: '2px solid #5f95ff',
  boxShadow: '1px -1px 2px 3px rgba(95,149,255,0.40)'
}


export const CustomNode = (nodeInfo: NodeProps) => {
  const [, forceUpdate] = React.useReducer(x => x + 1, 0);

  console.log(`[CustomNode] - `, nodeInfo)
  const reactFlowInstance = useReactFlow();
  const store = useStoreApi()

  /**
   * @description
   * 1. Iterate over edges
   *  - find edges that contain my id
   */
  const highlightNodesandEdgesConnectedToMe = () => {
    const edgesConnectedToMeIds = new Set();
    const nodesConnectedToMeIds = new Set();

    alert(1)
    reactFlowInstance.getEdges().forEach(edge => {
      const isEdgeConnectedToMe = edge?.target === nodeInfo?.id || edge?.source === nodeInfo?.id;
      if(isEdgeConnectedToMe){

        // 1.Save the edge connected to me
        edgesConnectedToMeIds.add(edge?.id);

        // 2. Save the IDs of the nodes connected to me by looking at the source & target value inside the edge.
        const nodeIds = [edge?.source, edge?.target].filter( node => typeof node === 'string');
        nodeIds.forEach((nodeId:string) => nodesConnectedToMeIds.add(nodeId))
      }
    });


    const updatedNodes = reactFlowInstance.getNodes().map(node => {
      const shouldUpdateNode = nodesConnectedToMeIds.has(node?.id);
      if(shouldUpdateNode){
        node.data = {...node.data, customCSSStyles: HIGHLIGHTED_NODE_STYLES}
      }
      return node
    });

    // debugger;
    reactFlowInstance.setNodes(updatedNodes)
  }


  const _styles = {
    ...DEFAULT_NODE_STYLES,
    // @ts-ignore
    ...nodeInfo.data?.customCSSStyles
  }
  console.log(`styles--`, _styles)

  return (
    <div
      data-nodeid={nodeInfo.id}
      className="CustomNode"
      style={{..._styles}}
      onMouseOver={(event) => {
        highlightNodesandEdgesConnectedToMe()
      }}
      onMouseLeave={(event) => {
        // unhighlight
      }}
    >
      <Handle
        position={Position.Top}
        type={nodeInfo.id === '2' ? 'target' : 'source'}
        style={{
          background: "#555",
          position:'absolute',
          top: '50%',
          right: '50%',
          transform: 'translate(50%,-50%)'
        }}
      />
      <div>
        Custom Color Picker Node: <strong>{nodeInfo.data.label}</strong>
      </div>

    </div>
  );
};
