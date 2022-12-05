import { useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider
} from 'reactflow';
import {ReactFlowHookExample} from '~/components/ReactFlowHookExample'


export default function Index() {

  return (
    <ReactFlowProvider>
        <ReactFlowHookExample />
    </ReactFlowProvider>
  );
}
