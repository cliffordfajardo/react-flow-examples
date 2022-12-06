import { useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider
} from 'reactflow';
import {ReactFlowHookExampleWithContext} from '~/components/ReactFlowHookExampleWithContext'
import { ContextProvider } from '~/components/ReactFlowHookExampleWithContext/Context';


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


export default function Index() {

  return (
    <ContextProvider defaultNodes={initialNodes as any} defaultEdges={initialEdges}>
      <ReactFlowHookExampleWithContext />
    </ContextProvider>
  );
}
