import { useCallback } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  ReactFlowProvider,
} from "reactflow";
import { CustomNode } from "./CustomNode";
import { CustomEdge } from "./CustomEdge";

const initialNodes = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    data: { label: "1 - default node", customCSSStyles: {} },
    type: "CustomNode",
  },
  {
    id: "2",
    position: { x: 0, y: 100 },
    data: { label: "2 - default node", customCSSStyles: {} },
    type: "CustomNode",
  },
  {
    id: "3",
    position: { x: 0, y: 300 },
    data: { label: "3 - custom node", customCSSStyles: {} },
    type: "CustomNode",
  },
];

const initialEdges = [
  { id: "e1-2", source: "1", target: "2", type: "CustomEdge" },
];

const nodeTypes = {
  CustomNode: CustomNode,
};
const edgeTypes = {
  CustomEdge: CustomEdge,
};

export default function ReactFlowHookExample() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);



  return (
    // <ReactFlowProvider>
      <section style={{ height: 500, width: 900, border: "2px solid black" }}>
        <a href="/">Go back </a>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </section>
    // </ReactFlowProvider>
  );
}
