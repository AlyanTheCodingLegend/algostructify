"use client";

import React, { useState } from "react";
import HashMap from "@/app/_datastructures/HashMap";
import { toast } from "react-toastify";

export default function Page() {
    const [map] = useState(new HashMap<string, string>(10));
    const [, setRenderTrigger] = useState(0);
    const [entry, setEntry] = useState({ key: "", value: "" });
    const [removeKey, setRemoveKey] = useState("");

    const forceRender = () => setRenderTrigger((prev) => prev + 1);

    const insertEntry = (key: string, value: string) => {
        map.set(key, value);
        forceRender();
    };

    const removeEntry = (key: string) => {
        const deleted = map.delete(key);
        forceRender();
        if (!deleted) {
            toast.error("Key not found");
        } else {
            toast.success("Entry removed successfully");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen w-screen">
            <h1 className="text-4xl font-semibold text-center">
                Hash Map
            </h1>
            <div>
                <div
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex flex-col"
                >
                    <input className="text-black" placeholder="Key" value={entry.key} onChange={(e)=>setEntry(prev=>({...prev, key: e.target.value}))}/>
                    <input className="text-black" placeholder="Value" value={entry.value} onChange={(e)=>setEntry(prev=>({...prev, value: e.target.value}))}/>
                    <button onClick={() => insertEntry(entry.key, entry.value)}>Insert Entry</button>
                </div>
                <div
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex flex-col"
                >
                    <input className="text-black" placeholder="Enter key to remove" value={removeKey} onChange={(e)=>setRemoveKey(e.target.value)}/>
                    <button onClick={() => removeEntry(removeKey)}>Remove Entry</button>
                </div>
            </div>
            <div>
                {map.map.map((entry, index) => {
                    return (
                        <div key={index}>
                            {entry ? `Key: ${entry[0]}, Value: ${entry[1]}` : "Empty"}
                        </div>
                    );
                })}
            </div>
        </div>
    )
}