import { Popover } from "antd";
import React from "react";
import {
  Handle,
  NodeProps,
  Position,
  useReactFlow,
  useStoreApi,
} from "reactflow";
import { useReactFlowTestContext } from "../Context";

// TODO: should I just use global CSS?
export const DEFAULT_NODE_STYLES: React.CSSProperties = {
  border: "2px solid black",
  height: 50,
  position: "relative",
  pointerEvents: "all",
  width: 200
};
export const HIGHLIGHTED_NODE_STYLES: React.CSSProperties = {
  pointerEvents: "all",
  border: "2px solid #5f95ff",
  boxShadow: "1px -1px 2px 3px rgba(95,149,255,0.40)",
};

export const CustomNode = (nodeInfo: NodeProps) => {
  console.log(`nodeInfo`, nodeInfo)
  const {getNodesAndEdgesConnectedToMe, highlightNodes, highlightEdges, unhighlightEdges, unhighlightNodes } = useReactFlowTestContext();

  const handleType = nodeInfo.id === "asw1" ? "source" : "target"
  return (
    <Popover
      content={<div>
        <b>{nodeInfo.data.label}</b>
      </div>}
      title="Title">
    <div
      data-nodeid={nodeInfo.id}
      className="CustomNode"
      style={{
        ...DEFAULT_NODE_STYLES,
        // @ts-ignore
        ...nodeInfo.data?.customCSSStyles,
      }}
      onMouseOver={(event) => {
        const {nodesConnectedToMe, edgesConnectedToMe} = getNodesAndEdgesConnectedToMe(nodeInfo?.id);

        highlightNodes((node) => {
          const isNodeConnectedToMe = nodesConnectedToMe.has(node.id)
          const isSelf = node.id === nodeInfo.id
          const isMatch = isNodeConnectedToMe || isSelf;
          return isMatch;
        })
        highlightEdges((edge) => {
          const isEdgeConnectedToMe = edge.source === nodeInfo.id || edge?.target === nodeInfo.id
          return isEdgeConnectedToMe;
        })
      }}

      onMouseLeave={(event) => {
        unhighlightNodes(() => true)
        unhighlightEdges(() => true)
      }}
    >
      <Handle
        position={Position.Top}
        type={handleType}
        style={{
          background: "#555",
          position: "absolute",
          top: "50%",
          right: "50%",
          transform: "translate(50%,-50%)",
        }}
      />
      <div style={{textAlign: 'center'}}>
        {nodeInfo.data.label}
      </div>
    </div>
    </Popover>
  );
};
