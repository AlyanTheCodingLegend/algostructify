"use client"

import React, { useState } from "react";
import Queue from "../_datastructures/QueueArray";
import { toast } from "react-toastify";

export default function Page() {
    const [queue] = useState(new Queue<number>(7));
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
        const queueArray = new Array<number | null>(queue.capacity).fill(null);

        queueArray.forEach((_, index) => {
            queueArray[index] = queue.queue[index];
        });

        return queueArray.map((item, index) => (
            <div key={index}>
                <div className={`flex justify-center items-center p-4 border-4 min-w-[80px] min-h-[80px] text-center text-xl font-semibold shadow-lg relative ${(index===queue.front && index===queue.rear) && "border-purple-500 bg-purple-100"} ${index===queue.front ? "border-red-500 bg-red-100" : (index===queue.rear ?  "border-blue-500 bg-blue-100" : "border-green-500 bg-green-100")}`}>
                    <span>{item}</span>
                </div>
            </div>
        ));
    }

    return (
        <div className="flex flex-col h-screen w-screen justify-center items-center bg-gray-100">
            <div className="flex flex-col items-center justify-center space-x-0">
                {renderQueue()}
            </div>    
            <button onClick={()=>enqueue(10)}>Enqueue</button>
            <button onClick={()=>dequeue()}>Dequeue</button>
        </div>
    )
}