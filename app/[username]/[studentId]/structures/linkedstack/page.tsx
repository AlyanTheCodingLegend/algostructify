"use client"

import React, { useState } from "react";
import StackLL, { ListNode } from "@/app/_datastructures/StackLL";
import { toast } from "react-toastify";

export default function Page() {
    const [stack] = useState(new StackLL<number>());
    const [, setRenderTrigger] = useState(0);

    const triggerRender = () => setRenderTrigger((prev) => prev + 1);

    const push = (value: number) => {
        stack.push(value);
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
        if (stack.isEmpty()) return <div>No nodes in the Stack.</div>;

        const nodes: ListNode<number>[] = [];
        let current: ListNode<number> | null = stack.top;

        while (current !== null) {
            nodes.push(current);
            current = current.next;
        }

        return nodes.map((node, index) => (
            <div
                key={index}
                className="flex flex-col items-center justify-center relative"
            >
                <div className={`flex justify-center items-center p-4 border-4 min-w-[80px] min-h-[80px] text-center text-xl font-semibold shadow-lg relative ${node===stack.top ? "border-red-500 bg-red-100" : "border-green-500 bg-green-100"}`}>
                    <span>{node.value}</span>
                </div>
                {index!==nodes.length-1 && (
                    <div className="flex justify-center items-center text-3xl text-green-500">
                        ↓
                    </div>
                )}
            </div>
        ));
    }

    return (
        <div className="flex flex-col items-center justify-center h-full space-y-8">
            <h1 className="text-4xl font-semibold text-center">
                Stack using Linked List
            </h1>
            <div className="flex items-center justify-center space-x-4">
                <button
                    className="p-4 bg-green-500 text-white font-semibold rounded-lg shadow-lg"
                    onClick={() => push(Math.floor(Math.random() * 100))}
                >
                    Push
                </button>
                <button
                    className="p-4 bg-red-500 text-white font-semibold rounded-lg shadow-lg"
                    onClick={pop}
                >
                    Pop
                </button>
            </div>
            <div className="flex flex-col items-center justify-center">
                {renderStack()}
            </div>
        </div>
    );
}