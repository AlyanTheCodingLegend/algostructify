"use client";

import React, { useState } from "react";
import BinaryTree from "../_datastructures/BinaryTree";
import { TreeNode } from "./TreeNode";
import { toast } from "react-toastify";

export default function Page() {
    const [tree] = useState(new BinaryTree<number>());
    const [, setRenderTrigger] = useState(0);

    const forceRender = () => setRenderTrigger((prev) => prev + 1);

    const insertNode = (data: number) => {
        tree.insert(data);
        forceRender();
    };

    const deleteNodeLeft = (data: number) => {
        if (!tree.root) {
            toast.error("No nodes in the Binary Tree.");
            return;
        }
        tree.deleteNodeLeft(data);
        forceRender();
    }

    const deleteNodeRight = (data: number) => {
        if (!tree.root) {
            toast.error("No nodes in the Binary Tree.");
            return;
        }
        tree.deleteNodeRight(data);
        forceRender();
    }

    const renderTree = () => {
        if (!tree.root) return <div>No nodes in the Binary Tree.</div>;

        return (
            <div className="flex justify-center">
                <TreeNode index={0} node={tree.root} />
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center justify-center h-full space-y-8">
            <h1 className="text-4xl font-semibold text-center">
                Binary Tree
            </h1>
            <div className="flex items-center justify-center space-x-4">
                <button
                    className="px-4 py-2 bg-green-500 text-white rounded-md shadow-md"
                    onClick={() => insertNode(Math.floor(Math.random() * 100))}
                >
                    Insert Value
                </button>
                <button
                    className="px-4 py-2 bg-red-500 text-white rounded-md shadow-md"
                    onClick={() => deleteNodeLeft(tree.root?.data || 0)}
                >
                    Delete Left Node
                </button>
                <button
                    className="px-4 py-2 bg-red-500 text-white rounded-md shadow-md"
                    onClick={() => deleteNodeRight(tree.root?.data || 0)}
                >
                    Delete Right Node
                </button>
            </div>
            <div className="flex items-center justify-center space-x-4">
                {renderTree()}
            </div>
        </div>
    );
}