"use client";

import React, { useEffect, useState } from "react";
import StackLL, { ListNode } from "@/app/_datastructures/StackLL";
import { toast } from "react-toastify";
import { useGlobalStatesContext } from "../../layout";

export default function Page() {
  const [stack] = useState(new StackLL<number>());
  const [renderTrigger, setRenderTrigger] = useState(0);
  const [inputValue, setInputValue] = useState<number | "">("");

  const triggerRender = () => setRenderTrigger((prev) => prev + 1);

  const { isOpen, setHeading } = useGlobalStatesContext();

  useEffect(() => {
    setHeading("Stack using Linked List");
  }, []);

  const push = () => {
    if (inputValue === "" || isNaN(Number(inputValue))) {
      toast.error("Please enter a valid number.");
      return;
    }

    stack.push(Number(inputValue));
    toast.success(`Pushed value: ${inputValue}`);
    setInputValue(""); // Clear input field
    triggerRender();
  };

  const pop = () => {
    if (stack.isEmpty()) {
      toast.error("Stack is empty, nothing to pop.");
      return;
    }
    const poppedValue = stack.pop();
    toast.success(`Popped value: ${poppedValue}`);
    triggerRender();
  };

  const renderStack = () => {
    if (stack.isEmpty()) return <div className="text-gray-500">No nodes in the Stack.</div>;

    const nodes: ListNode<number>[] = [];
    let current: ListNode<number> | null = stack.top;

    while (current !== null) {
      nodes.push(current);
      current = current.next;
    }

    return nodes.map((node, index) => (
      <div
        key={index}
        className="flex flex-col items-center justify-center relative mb-4"
      >
        <div
          className={`flex justify-center items-center p-4 border-4 w-20 h-20 text-center text-xl font-semibold shadow-lg relative ${
            node === stack.top
              ? "border-red-500 bg-red-100"
              : "border-green-500 bg-green-100"
          }`}
        >
          <span>{node.value}</span>
        </div>
        {index !== nodes.length - 1 && (
          <div className="text-3xl text-green-500 font-bold">↓</div>
        )}
      </div>
    ));
  };

  return (
    <div
      style={{
        marginLeft: isOpen ? "256px" : "64px",
        marginTop: "64px",
        width: `calc(100vw - ${isOpen ? "256px" : "64px"})`,
      }}
      className="relative flex flex-col items-center h-full w-full bg-gray-100"
    >
      {/* Fixed Buttons */}
      <div style={{
        marginLeft: isOpen ? "256px" : "64px",
        marginTop: "0px",
        width: `calc(100vw - ${isOpen ? "256px" : "64px"})`,
      }} className="fixed -mt-1 left-0 right-0 bg-white shadow-md flex justify-between items-center px-4 py-2 z-10">
        <div className="flex items-center space-x-4">
          <input
            type="number"
            value={inputValue}
            onChange={(e) =>
              setInputValue(e.target.value === "" ? "" : Number(e.target.value))
            }
            placeholder="Enter value"
            className="px-4 py-2 border border-gray-300 rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={push}
            className="px-4 py-2 bg-green-500 text-white font-semibold rounded shadow hover:bg-green-600 transition"
          >
            Push
          </button>
        </div>
        <button
          onClick={pop}
          className="px-4 py-2 bg-red-500 text-white font-semibold rounded shadow hover:bg-red-600 transition"
        >
          Pop
        </button>
      </div>

      {/* Stack Visualization */}
      <div className="flex flex-col items-center justify-center pt-20">
        {renderStack()}
      </div>
    </div>
  );
}
