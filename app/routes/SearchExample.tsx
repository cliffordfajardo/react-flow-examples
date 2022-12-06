import { useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider
} from 'reactflow';
import { ContextProvider } from '~/components/SearchExample/Context';
import SearchExample from '~/components/SearchExample/SearchExample';


const initialNodes = [
  {
    id: "asw1",
    position: { x: 0, y: 0 },
    data: { label: "asw1", customCSSStyles: {} },
    type: "CustomNode",
  },
  {
    id: "asw2",
    position: { x: 0, y: 100 },
    data: { label: "asw2", customCSSStyles: {} },
    type: "CustomNode",
  },
  {
    id: "csw1",
    position: { x: 0, y: 300 },
    data: { label: "csw3", customCSSStyles: {} },
    type: "CustomNode",
  },
];

const initialEdges = [
  { id: "asw1--to--asw2", source: "asw1", target: "asw2", type: "CustomEdge" },
];


export default function Index() {

  return (
    <ReactFlowProvider>
      <ContextProvider defaultNodes={initialNodes as any} defaultEdges={initialEdges}>
        <SearchExample />
      </ContextProvider>
    </ReactFlowProvider>
  );
}
