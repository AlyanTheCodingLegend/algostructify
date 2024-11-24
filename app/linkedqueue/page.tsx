"use client"

import React, { useState } from "react";
import CircularQueue, { ListNode } from "../_datastructures/CircularQueue";
import { toast } from "react-toastify";

export default function Page() {
    const [queue] = useState(new CircularQueue<number>(7));
    const [, setRenderTrigger] = useState(0);

    const triggerRender = () => setRenderTrigger((prev) => prev + 1);

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
                className="flex items-center justify-center relative"
            >
                <div className={`flex justify-center items-center p-4 border-4 min-w-[80px] min-h-[80px] text-center text-xl font-semibold shadow-lg relative ${(node===queue.front && node===queue.rear) && "border-purple-500 bg-purple-100"} ${node===queue.front ? "border-red-500 bg-red-100" : (node===queue.rear ?  "border-blue-500 bg-blue-100" : "border-green-500 bg-green-100")}`}>
                    <span>{node.value}</span>
                </div>
                {index!==nodes.length-1 && (
                    <div className="flex justify-center items-center text-3xl text-green-500">
                        →
                    </div>
                )}
            </div>
        ));
    }

    return (
        <div className="flex flex-col h-screen w-screen justify-center items-center bg-gray-100">
            <div className="flex items-center justify-center space-x-0">
                {renderQueue()}
            </div>    
            <button onClick={()=>enqueue(10)}>Enqueue</button>
            <button onClick={()=>dequeue()}>Dequeue</button>
        </div>
    )
}