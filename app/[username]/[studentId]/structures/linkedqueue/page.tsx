"use client"

import React, { useEffect, useState } from "react";
import CircularQueue, { ListNode } from "@/app/_datastructures/CircularQueue";
import { toast } from "react-toastify";
import { useGlobalStatesContext } from "../../layout";

export default function Page() {
    const [queue] = useState(new CircularQueue<number>(7));
    const [, setRenderTrigger] = useState(0);
    const [inputValue, setInputValue] = useState<number>(1);

    const triggerRender = () => setRenderTrigger((prev) => prev + 1);

    const { isOpen, setHeading } = useGlobalStatesContext();

    useEffect(() => {
        setHeading("Queue using Linked List");
    }, []);

    const enqueue = (value: number) => {
        if (queue.isFull()) {
            toast.error("Queue is full, cannot enqueue.");
            return;
        }
        queue.enqueue(value);
        triggerRender();
    };

    const dequeue = () => {
        if (queue.isEmpty()) {
            toast.error("Queue is empty, nothing to dequeue.");
            return;
        }
        const dequeuedValue = queue.dequeue();
        toast.success(`Dequeued value: ${dequeuedValue}`);
        triggerRender();
    };

    const renderQueue = () => {
        if (queue.isEmpty()) return <div>No nodes in the Queue.</div>;

        const nodes: ListNode<number>[] = [];
        let current: ListNode<number> | null = queue.front;

        // Loop through the CLL starting from the head.
        do {
            if (!current) break;
            nodes.push(current);
            current = current.next;
        } while (current !== queue.front);

        return nodes.map((node, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center relative"
            >
              <div
                className={`flex justify-center items-center p-4 border-4 w-20 h-20 text-center text-xl font-semibold shadow-lg relative ${
                  node === queue.front && node === queue.rear
                    ? "border-purple-500 bg-purple-100"
                    : node === queue.front
                    ? "border-red-500 bg-red-100"
                    : node === queue.rear
                    ? "border-blue-500 bg-blue-100"
                    : "border-green-500 bg-green-100"
                }`}
              >
                <span>{node.value}</span>
              </div>
              {index !== nodes.length - 1 && (
                <div className="text-3xl text-green-500 font-bold mx-2">↓</div>
              )}
            </div>
        ));
    }

    return (
        <div
          style={{
            marginLeft: isOpen ? "256px" : "64px",
            marginTop: "64px",
            width: `calc(100vw - ${isOpen ? "256px" : "64px"})`,
          }}
          className="relative flex flex-col items-center h-full w-full bg-gray-100"
        >
          {/* Fixed Top Bar */}
          <div style={{
            marginLeft: isOpen ? "256px" : "64px",
            marginTop: "0px",
            width: `calc(100vw - ${isOpen ? "256px" : "64px"})`,
          }} className="fixed right-0 bg-white shadow-md flex justify-between items-center px-4 py-2 z-10">
            <div className="flex items-center space-x-4">
              <input
                type="number"
                value={inputValue}
                onChange={(e) =>
                  setInputValue(Number(e.target.value))
                }
                placeholder="Enter value"
                className="px-4 py-2 border border-gray-300 rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={()=>enqueue(inputValue)}
                className="px-4 py-2 bg-green-500 text-white font-semibold rounded shadow hover:bg-green-600 transition"
              >
                Enqueue
              </button>
            </div>
            <button
              onClick={()=>dequeue()}
              className="px-4 py-2 bg-red-500 text-white font-semibold rounded shadow hover:bg-red-600 transition"
            >
              Dequeue
            </button>
          </div>
    
          {/* Queue Visualization */}
          <div className="flex flex-col items-center justify-center pt-20 space-y-4">
            {renderQueue()}
          </div>
        </div>
      );
}