"use client";

import React, { useState, useEffect } from "react";
import { TreeNode as TreeNodeClass } from "../_datastructures/BinaryTree";

type TreeNodeProps = {
    node: TreeNodeClass<number> | null;
    index: number;
    type: "left" | "right" | "root";
};

export const TreeNode: React.FC<TreeNodeProps> = ({ index, node, type }) => {
    const [path, setPath] = useState<string | undefined>();

    useEffect(() => {
        if (type === "root") return; // Root node has no parent

        // Parent index calculation
        const parentIndex = Math.floor((index - 1) / 2);

        // Get parent node element
        const parentNode = document.getElementById(`${parentIndex}`);
        if (!parentNode) return;

        // Get current node element
        const currentNode = document.getElementById(`${index}`);
        if (!currentNode) return;

        const parentRect = parentNode.getBoundingClientRect();
        const currentRect = currentNode.getBoundingClientRect();

        // Create path from current node to parent node
        const path = createPath(
            parentRect.left + parentRect.width / 2, // X center of parent node
            parentRect.bottom, // Y bottom of parent node
            currentRect.left + currentRect.width / 2, // X center of current node
            currentRect.top // Y top of current node
        );

        setPath(path);
    }, [index, type]);

    const createPath = (x1: number, y1: number, x2: number, y2: number) => {
        return `M ${x1} ${y1} C ${x1} ${(y1 + y2) / 2}, ${x2} ${(y1 + y2) / 2}, ${x2} ${y2}`;
    };

    if (!node) return null;

    return (
        <div className="relative flex flex-col items-center w-full h-full">
            {/* SVG for Path */}
            <svg
                className="absolute w-full h-full pointer-events-none overflow-visible"
                viewBox="0 0 600 600"
                xmlns="http://www.w3.org/2000/svg" 
                preserveAspectRatio="xMidYMid meet"
                style={{ zIndex: 0, width: "100%", height: "100%", top: 0, left: 0 }}
            >
                {path && (
                    <path
                        d={path}
                        stroke="black"
                        fill="transparent"
                        strokeWidth="2"
                        // markerEnd="url(#arrowhead)"
                    />
                    
                )}
                <defs>
                    <marker
                    id="arrowhead"
                    markerWidth="10"
                    markerHeight="7"
                    refX="10"
                    refY="3.5"
                    orient="auto"
                    >
                        <polygon points="0 0, 10 3.5, 0 7" fill="black" />
                    </marker>
                </defs>
            </svg>

            {/* Current Node */}
            <div
                id={`${index}`}
                className={`flex justify-center items-center p-4 border-4 min-w-[80px] min-h-[80px] text-center text-xl font-semibold shadow-lg ${
                    index === 0
                        ? "border-red-500 bg-red-100"
                        : "border-green-500 bg-green-100"
                }`}
            >
                <span>{node.data}</span>
            </div>

            {/* Left and Right Children */}
            <div className="flex gap-4 mt-4">
                {node.left && <TreeNode index={2 * index + 1} node={node.left} type="left" />}
                {node.right && <TreeNode index={2 * index + 2} node={node.right} type="right" />}
            </div>
        </div>
    );
};
