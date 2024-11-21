"use client";

import React, { useState } from "react"

import CircularLinkedList, { ListNode } from "../_datastructures/CircularLinkedList";
import './CircularLinkedList.css';
import LoopArrow from "./LoopArrow";

export default function Page() {
  const [cll] = useState(new CircularLinkedList<number>());
  const [, setRenderTrigger] = useState(0);

  const triggerRender = () => setRenderTrigger((prev) => prev + 1);

  const addNode = (value: number) => {
    cll.add(value);
    triggerRender();
  };

  const removeNode = (value: number) => {
    cll.remove(value);
    triggerRender();
  }

  const renderNodes = () => {
    if (!cll.head) return <div>No nodes in the Circular Linked List.</div>;

    const nodes: ListNode<number>[] = [];
    let current = cll.head;

    // Loop through the CLL starting from the head.
    do {
      if (!current) break;
      nodes.push(current);
      current = current.next!;
    } while (current !== cll.head);

    return nodes.map((node, index) => (
        <div key={index} className="flex flex-row h-full" id={`node-${index}`}>
            <div className="node">
                <span className="value">{node.data}</span>
            </div>
            {(node.next!=cll.head) ? (
              <div className="arrow">→</div>
            ) : (
              <LoopArrow startId={`node-${index}`} endId="node-0" />
          )}
        </div>
    ));
  };
  
  return (
    <div className="flex flex-col h-full w-full">
      <div className="cll-visualizer">
        <div className="nodes-container">{renderNodes()}</div>
      </div>
      <button className="justify-center items-center mt-5 bg-red-600 w-24 h-full rounded-full" onClick={()=>addNode(10)}>Add</button>
      <button className="justify-center items-center mt-5 bg-red-600 w-24 h-full rounded-full" onClick={()=>removeNode(10)}>Remove</button>
    </div>
  );
}