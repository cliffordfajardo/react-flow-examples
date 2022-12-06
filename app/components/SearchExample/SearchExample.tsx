import React from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  ReactFlowProvider,
} from "reactflow";
import { CustomNode } from "./components/CustomNode";
import { CustomEdge } from "./components/CustomEdge";
import { useReactFlowTestContext, ContextProvider } from "./Context";
import { AutoComplete } from "antd";

const nodeTypes = {
  CustomNode: CustomNode,
};
const edgeTypes = {
  CustomEdge: CustomEdge,
};

export default function SearchExample() {
  const {nodes, edges, highlightNodes, unhighlightNodes, onNodesChange, onEdgesChange} = useReactFlowTestContext();

  const searchOptions:{ value: string }[] = nodes.map((node:any)=> {
    return {value: node.data.label as string}
  })
  const [options, setOptions] = React.useState<{ value: string }[]>(searchOptions);




  return (
      <section style={{ height: 500, width: 900, border: "2px solid black" }}>
        <AutoComplete
          options={options}
          style={{ width: 200 }}
          onSelect={(selectedValue) => {
            highlightNodes((node => {
              const isMatch = node.id.includes(selectedValue)
              return isMatch
            }))
          }}
          onSearch={(searchInputValue) => {
            if(searchInputValue.trim() === "") {
              unhighlightNodes((n) => true)
              return
            };
            highlightNodes((node => {
              const isMatch = node.id.includes(searchInputValue)
              return isMatch
            }))
          }}
          placeholder="input here"
          filterOption={(inputValue, option) =>
            option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
        />
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </section>
  );
}
