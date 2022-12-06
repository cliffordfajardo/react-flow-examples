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
import { useReactFlowTestContext, ContextProvider } from "./Context";

const nodeTypes = {
  CustomNode: CustomNode,
};
const edgeTypes = {
  CustomEdge: CustomEdge,
};

export default function ReactFlowHookExampleWithContext() {
  // const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  // const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const myHook = useReactFlowTestContext();
  myHook.setNodes(myHook.nodes);
  myHook.setEdges(myHook.edges);


  return (
    <ReactFlowProvider>
      <section style={{ height: 500, width: 900, border: "2px solid black" }}>
        <a href="/">Go back </a>
        <ReactFlow
          nodes={myHook.nodes}
          edges={myHook.edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </section>
    </ReactFlowProvider>
  );
}
