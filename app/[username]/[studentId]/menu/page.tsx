"use client";

import Link from 'next/link';
import { use } from 'react';
import { useGlobalStatesContext } from '../layout';

export const dataStructures = [
    // { name: 'Doubly Linked List', route: '/doublelinkedlist' },
    { name: 'Circular Linked List', route: '/circularlinkedlist' },
    { name: 'Linked List', route: '/linkedlist' },
    { name: 'Hashmap', route: '/hashmap' },
    { name: 'Queue', route: '/queue' },
    { name: 'Stack', route: '/stack' },
    { name: 'Stack from Linked List', route: '/linkedstack' },
    { name: 'Queue from Linked List', route: '/linkedqueue' },
    { name: 'Directed Graph', route: '/directedgraph' },
    { name: 'Undirected Graph', route: '/undirectedgraph' },
    // { name: 'Weighted Graph', route: '/weightedgraph' },
    { name: 'Binary Tree', route: '/binarytree' },
    // { name: 'Heap Min', route: '/heapmin' },
    // { name: 'Heap Max', route: '/heapmax' },
    { name: 'AVL Tree', route: '/avltree' },
];

type MenuProps = {
    params: Promise<{
        username: string;
        studentId: string;
    }>;
};

export default function Menu({ params }: MenuProps) {
    const { username, studentId } = use(params)

    const { isOpen } = useGlobalStatesContext();

    return (
        <div style={{marginLeft: isOpen ? "256px" : "64px", marginTop: "64px", width: `calc(100vw - ${isOpen ? "256px" : "64px"})`}} className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-xl">
                <h2 className="text-2xl font-bold text-center mb-6">DSA Visualization Dashboard</h2>
                <p className="text-center mb-4">Select a data structure to visualize:</p>
                <div className="grid grid-cols-2 gap-4">
                    {dataStructures.map((ds) => (
                        <Link key={ds.route} href={`/${username}/${studentId}/structures${ds.route}`}>
                            <div className="block text-center bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
                                {ds.name}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
