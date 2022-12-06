import React from 'react';
import { EdgeProps, getBezierPath, getStraightPath } from 'reactflow';

/**
 * STYLES
 */
const DEFAULT_EDGE_STYLES = {

}
const HIGHLIGHTED_EDGE_STYLES: React.CSSProperties = {
  filter: 'drop-shadow( 0px 3px 1px rgba(0, 0, 0, .9))',
};

export const CustomEdge = React.memo((edgeInfo:EdgeProps) => {
  // console.log(`[CustomEdge] edgeInfo - `, edgeInfo)
  // const [edgePath] = getBezierPath({
  //   sourceX:edgeInfo.sourceX,
  //   sourceY:edgeInfo.sourceY,
  //   sourcePosition: edgeInfo.sourcePosition,
  //   targetX: edgeInfo.targetX,
  //   targetY: edgeInfo.targetY,
  //   targetPosition: edgeInfo.targetPosition,
  // });
  const [edgePath] = getStraightPath({
    sourceX:edgeInfo.sourceX,
    sourceY:edgeInfo.sourceY,
    targetX: edgeInfo.targetX,
    targetY: edgeInfo.targetY,
  });

  return (
    <>
      <path
        data-edgeid={edgeInfo.id}
        style={{
          ...DEFAULT_EDGE_STYLES,
          ...edgeInfo.data?.customCSSStyles
        }}
        className="react-flow__edge-path"
        onMouseOver={(event) => {
          const edge = event.target as HTMLElement;
          console.log(`[CustomEdge]`, edge)
          edge.style.filter = 'drop-shadow( 0px 3px 5px rgba(0, 0, 0, .9))';
        }}
        onMouseLeave={(event) => {
          const edge = event.target as HTMLElement;
          edge.style.filter = '';
        }}
        d={edgePath}
        markerEnd={edgeInfo.markerEnd}
      />
      <text>
        <textPath
          href={`#${edgeInfo.id}`}
          style={{ fontSize: '12px' }}
          startOffset="50%"
          textAnchor="middle"
        >
          {/* {edgeInfo.data.text} */}
          test
        </textPath>
      </text>
    </>
  );
});
