import { useCallback } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';

const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
];

const initialEdges = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    style: {
      stroke: 'red',
      border: '3px solid black',
      // boxShadow: '0 0 6px 2px rgba(0, 0, 0, 0.08)',
      filter: 'drop-shadow( 3px 3px 2px rgba(0, 0, 0, .7))',
    },
  },
];

export default function ReactFlowHoverConnections() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <section style={{ height: 500, width: 900, border: '2px solid black' }}>
      <a href="/">Go back </a>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        onInit={(reactFlowInstance) => {
          // console.log(`reacFlowInstance ->`, reactFlowInstance);
        }}
        onNodeMouseEnter={(event, node) => {
          // console.log(`[onNodeMouseEnter] - event:`, event);
          // console.log(`[onNodeMouseEnter] - node:`, node);
          // const _node = event?.target as HTMLDivElement;
          // console.log(`[onNodeMouseEnter] - event.target:`, _node);
          // _node.style.border = '2px solid #5f95ff';
          // _node.style.boxShadow = '1px -1px 2px 3px rgba(95,149,255,0.40)';
        }}
        onNodeMouseLeave={(event, node) => {
          // console.log(`[onNodeMouseEnter] - event:`, event);
          // console.log(`[onNodeMouseEnter] - node:`, node);
          // const _node = event?.target as HTMLDivElement;
          // console.log(`[onNodeMouseEnter] - event.target:`, _node);
          // _node.style.border = '';
          // _node.style.boxShadow = '';
        }}
        onEdgeMouseEnter={(event, edge) => {
          console.log(`[onEdgeMouseEnter] - event:`, event);
          console.log(`[onEdgeMouseEnter] - edge:`, edge);
          const _edge = event?.target as HTMLDivElement;
          console.log(`[onEdgeMouseEnter] - event.target:`, _edge);
          // _edge.style.fill = 'red';
          // _edge.style.boxShadow = '1px -1px 2px 3px rgba(95,149,255,0.40)';
          _edge.style.filter = 'drop-shadow( 3px 3px 2px rgba(0, 0, 0, .7))';
        }}
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </section>
  );
}
