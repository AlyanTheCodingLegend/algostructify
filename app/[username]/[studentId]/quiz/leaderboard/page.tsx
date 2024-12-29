"use client";

import type { ScoreNode } from "@/app/_backend/_quizModule/_src/_modules/leaderboard";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Leaderboard() {
    const [leaderboard, setLeaderboard] = useState<ScoreNode[]>([]);

    const router = useRouter();

    const searchParams = useSearchParams();
    const topic = searchParams.get("topic");

    useEffect(() => {
        async function getLeaderboard() {
            const response = await fetch(`/api/getLeaderboard?topic=${topic}`)
            const res = await response.json();
            if (res.success) {
                setLeaderboard(res.leaderboard);
            } else (
                router.back()
            )
        }

        getLeaderboard();
    }, []);

    return (
        <div className="container mx-auto my-8 p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-4xl font-bold text-center text-indigo-600 mb-6">Leaderboard</h1>
            <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">Topic: {topic}</h2>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200 text-sm text-left">
                    <thead className="bg-indigo-100 text-indigo-800">
                        <tr>
                            <th className="px-6 py-3 border-b border-gray-200 font-medium">Rank</th>
                            <th className="px-6 py-3 border-b border-gray-200 font-medium">Student ID</th>
                            <th className="px-6 py-3 border-b border-gray-200 font-medium">Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaderboard.map((entry, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="px-6 py-4 border-b border-gray-200">{index + 1}</td>
                                <td className="px-6 py-4 border-b border-gray-200">{entry.studentId}</td>
                                <td className="px-6 py-4 border-b border-gray-200">{entry.score}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )

}