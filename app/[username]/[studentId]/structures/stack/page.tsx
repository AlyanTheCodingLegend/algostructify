"use client"

import React, { useEffect, useState } from "react";
import StackArr from "@/app/_datastructures/StackArray";
import { toast } from "react-toastify";
import { useGlobalStatesContext } from "../layout";

export default function Page() {
    const [stack] = useState(new StackArr<number>(7));
    const [, setRenderTrigger] = useState(0);

    const triggerRender = () => setRenderTrigger((prev) => prev + 1);

    const { isOpen, setHeading } = useGlobalStatesContext();

    useEffect(() => {
        setHeading("Stack using Array");
    }, []);

    const push = (value: number) => {
        if (stack.isFull()) {
            toast.error("Stack is full, cannot push.");
            return;
        }
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
        const stackArray = new Array<number | null>(stack.maxSize).fill(null);

        stackArray.forEach((_, index) => {
            stackArray[index] = stack.items[index];
        });

        return stackArray.map((item, index) => (
            <div key={index}>
                <div className={`flex justify-center items-center p-4 border-4 min-w-[80px] min-h-[80px] text-center text-xl font-semibold shadow-lg relative ${(index===stack.top ?  "border-red-500 bg-red-100" : "border-green-500 bg-green-100")}`}>
                    <span>{item}</span>
                </div>
            </div>
        ));
    }

    return (
        <div style={{marginLeft: isOpen ? "256px" : "64px"}} className="flex flex-col h-full w-full justify-center items-center bg-gray-100">
            <div className="flex flex-col items-center justify-center space-x-0">
                {renderStack()}
            </div>    
            <button onClick={()=>push(10)}>Push</button>
            <button onClick={()=>pop()}>Pop</button>
        </div>
    )
}