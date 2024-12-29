"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useState } from "react";
import { toast } from "react-toastify";

type QuizProps = {
    params: Promise<{
        username: string;
        studentId: string;
    }>;
};

type Settings = {
    topic: string;
    difficulty: string;
    numQuestions: number;
}

export default function Quiz({ params }: QuizProps) {
    const [settings, setSettings] = useState<Settings>({ topic: 'Arrays', difficulty: 'Easy', numQuestions: 5 });

    const router = useRouter();

    const { username, studentId } = use(params);

    const handleStartQuiz = () => {
        if (settings.topic === '' || settings.difficulty === '' || settings.numQuestions === 0) {
            toast.warning('Please fill in all fields');
        } else {
            router.push(`/${username}/${studentId}/quiz/start?topic=${settings.topic}&difficulty=${settings.difficulty}&questions=${settings.numQuestions}`);
        }
    }

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96 relative">
                {/* Back to Dashboard */}
                <div className="absolute top-4 left-4">
                    <Link href={`/${username}/${studentId}/dashboard`}>
                        <button className="py-1 px-3 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white text-sm font-medium focus:outline-none focus:ring focus:ring-indigo-500">
                            Back to Dashboard
                        </button>
                    </Link>
                </div>

                <h1 className="text-2xl font-bold text-center mb-4">Quiz</h1>
                <p className="text-gray-700 text-center mb-6">Welcome, {username}</p>

                {/* Settings Form */}
                <div className="space-y-4 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Topic</label>
                        <select onChange={(e)=>setSettings({...settings, topic: e.target.value})} className="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
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

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                        <select onChange={(e)=>setSettings({...settings, difficulty: e.target.value})} className="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                            <option>Easy</option>
                            <option>Medium</option>
                            <option>Hard</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Number of Questions</label>
                        <select onChange={(e)=>setSettings({...settings, numQuestions: Number(e.target.value)})} className="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                            <option>5</option>
                            <option>10</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-4">
                    <button onClick={handleStartQuiz} className="w-full mb-2 py-2 px-4 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white text-sm text-center font-medium focus:outline-none focus:ring focus:ring-indigo-500">
                        Start Quiz
                    </button>
                </div>
            </div>
        </div>
    );
}
