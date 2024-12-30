"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import { useGlobalStatesContext } from "../layout";
import { useRouter } from "next/navigation";

type DashboardProps = {
    params: Promise<{
        username: string;
        studentId: string;
    }>;
};

export default function Dashboard({ params }: DashboardProps) {
    const [topic, setTopic] = useState("Arrays");

    const router = useRouter();

    const { username, studentId } = use(params);

    const { isOpen, setHeading } = useGlobalStatesContext();

    useEffect(() => {
        setHeading("Dashboard");
    }, []);

    return (
        <div style={{marginLeft: isOpen ? "256px" : "64px", marginTop: "64px", width: `calc(100vw - ${isOpen ? "256px" : "64px"})`}} className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full h-full">
                <h1 className="text-4xl font-bold text-center mb-4">Dashboard</h1>
                <p className="text-gray-700 text-center mb-6 text-2xl">Welcome, {username}</p>
                <div className="space-y-4">
                    <Link href={`/${username}/${studentId}/menu`}>
                        <div className="w-full mb-2 py-2 px-4 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white text-sm text-center font-medium focus:outline-none focus:ring focus:ring-indigo-500">
                            Visualize Data Structures
                        </div>
                    </Link>
                    <div onClick={()=>router.push(`/${username}/${studentId}/quiz/leaderboard?topic=${topic}`)} className="w-full mb-2 py-2 px-4 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white text-sm text-center font-medium focus:outline-none focus:ring focus:ring-indigo-500">
                        View Leaderboard | Topic: 
                        <select onChange={(e)=>setTopic(e.target.value)} onClick={e=>e.stopPropagation()} className="mt-2 bg-gray-700 text-white p-2 rounded-lg">
                            <option>Arrays</option>
                            <option>Stacks</option>
                            <option>Queues</option>
                            <option>Linked Lists</option>
                            <option>Trees</option>
                            <option>Graphs</option>
                            <option>Sorting Algorithms</option>
                            <option>Searching Algorithms</option>
                            <option>Heaps</option>
                            <option>Binary Search Tree</option>
                            <option>Dynamic Programming</option>
                            <option>Recursion</option>
                            <option>Hashing</option>
                            <option>Trie</option>
                            <option>Segment Tree</option>
                            <option>Bit Manipulation</option>
                        </select>
                    </div>
                    <Link href={`/${username}/${studentId}/quiz/recommendations`}>
                        <div className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 mb-2 rounded-md text-white text-sm text-center font-medium focus:outline-none focus:ring focus:ring-indigo-500">
                            Get Recommendations
                        </div>
                    </Link>
                    <Link href={`/${username}/${studentId}/quiz`}>
                        <div className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 mb-2 rounded-md text-white text-sm text-center font-medium focus:outline-none focus:ring focus:ring-indigo-500">
                            Attempt A Quiz
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
