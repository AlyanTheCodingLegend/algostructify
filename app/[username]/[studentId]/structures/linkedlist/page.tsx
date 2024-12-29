"use client";

import React, { useEffect, useState } from "react";

import LinkedList, { ListNode } from "@/app/_datastructures/LinkedList";
import { useGlobalStatesContext } from "../layout";

export default function Page() {
  const [list] = useState(new LinkedList<number>());
  const [, setRenderTrigger] = useState(0);

  const triggerRender = () => setRenderTrigger((prev) => prev + 1);

  const { isOpen, setHeading } = useGlobalStatesContext();

  useEffect(() => {
    setHeading("Linked List");
  }, []);

  const addNode = (value: number) => {
    list.append(value);
    triggerRender();
  };

  const removeNode = (value: number) => {
    list.delete(value);
    triggerRender();
  };

  const renderNodes = () => {
    if (!list.head) return <div>No nodes in the Linked List.</div>;

    const nodes: ListNode<number>[] = [];
    let current : ListNode<number> | null = list.head;

    // Loop through the CLL starting from the head.
    do {
      if (!current) break;
      nodes.push(current);
      current = current.next;
    } while (current!==null);

    return nodes.map((node, index) => (
      <div
        key={index}
        className="flex items-center justify-center relative"
      >
        <div className="flex justify-center items-center p-4 border-4 border-green-500 rounded-lg bg-green-100 min-w-[80px] min-h-[80px] text-center text-xl font-semibold shadow-lg relative">
          <span className="value">{node.value}</span>
        </div>
        {!!node.next && (
          <div className="flex justify-center items-center text-3xl text-green-500">
            →
          </div>
        )}
      </div>
    ));
  };

  return (
    <div style={{marginLeft: isOpen ? "256px" : "64px"}} className="flex flex-col h-full w-full justify-center items-center bg-gray-100">
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
