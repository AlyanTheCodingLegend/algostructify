"use client";

import React, { useState } from "react";

import CircularLinkedList, { ListNode } from "../_datastructures/CircularLinkedList";
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
  };

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
      <div
        key={index}
        className="flex items-center justify-center relative"
        id={`node-${index}`}
      >
        <div className="flex justify-center items-center p-4 border-4 border-green-500 rounded-lg bg-green-100 min-w-[80px] min-h-[80px] text-center text-xl font-semibold shadow-lg relative">
          <span className="value">{node.data}</span>
        </div>
        {node.next !== cll.head ? (
          <div className="flex justify-center items-center text-3xl text-green-500">
            →
          </div>
        ) : (
          <LoopArrow startId={`node-${index}`} endId="node-0" />
        )}
      </div>
    ));
  };

  return (
    <div className="flex flex-col h-screen w-screen justify-center items-center bg-gray-100">
      <div className="flex flex-col items-center justify-center w-full h-full relative space-y-8">
        <div className="flex items-center justify-center">{renderNodes()}</div>
        <div className="flex justify-center items-center mt-10 space-x-6">
          <button
            className="bg-red-600 text-white w-28 h-12 rounded-full text-lg shadow-lg transform hover:scale-105 transition-all"
            onClick={() => addNode(10)}
          >
            Add Node
          </button>
          <button
            className="bg-red-600 text-white w-28 h-12 rounded-full text-lg shadow-lg transform hover:scale-105 transition-all"
            onClick={() => removeNode(10)}
          >
            Remove Node
          </button>
        </div>
      </div>
    </div>
  );
}
