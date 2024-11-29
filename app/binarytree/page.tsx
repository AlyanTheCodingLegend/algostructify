"use client";

import React, { useRef, useState } from "react";
import BinaryTree from "../_datastructures/BinaryTree";
import { TreeNode } from "./TreeNode";
import { toast } from "react-toastify";

export default function Page() {
    const [tree] = useState(new BinaryTree<number>());
    const [renderTrigger, setRenderTrigger] = useState(0);
    const [deleteLeftVal, setDeleteLeftVal] = useState(1);
    const [deleteRightVal, setDeleteRightVal] = useState(1);
    const [insertVal, setInsertVal] = useState(1);
    const [currentIndex, setCurrentIndex] = useState(-1);

    const svgRef = useRef<SVGSVGElement>(null);

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
        tree.deleteNodeLeft(data, (node)=> {
            const pathToDelete = svgRef.current?.getElementById(`${node.index}`);
            if (pathToDelete) {
                svgRef.current?.removeChild(pathToDelete);
            }
        });
        forceRender();
    }

    const deleteNodeRight = (data: number) => {
        if (!tree.root) {
            toast.error("No nodes in the Binary Tree.");
            return;
        }
        tree.deleteNodeRight(data, (node)=> {
            const pathToDelete = svgRef.current?.getElementById(`${node.index}`);
            if (pathToDelete) {
                svgRef.current?.removeChild(pathToDelete);
            }
        });
        forceRender();
    }

    const preOrderTraversal = () => {
        if (!tree.root) {
            toast.error("No nodes in the Binary Tree.");
            return;
        }   
        
        let delay = 0;

        tree.preOrderTraversal(tree.root, (index) => {
            setTimeout(() => {
                setCurrentIndex(index);
            }, delay += 1000);
        });

        setCurrentIndex(-1);
    }

    const inOrderTraversal = () => {
        if (!tree.root) {
            toast.error("No nodes in the Binary Tree.");
            return;
        }   
        
        let delay = 0;

        tree.inOrderTraversal(tree.root, (index) => {
            setTimeout(() => {
                setCurrentIndex(index);
            }, delay += 1000);
        });

        setCurrentIndex(-1);
    }

    const postOrderTraversal = () => {
        if (!tree.root) {
            toast.error("No nodes in the Binary Tree.");
            return;
        }   
        
        let delay = 0;

        tree.postOrderTraversal(tree.root, (index) => {
            setTimeout(() => {
                setCurrentIndex(index);
            }, delay += 1000);
        });

        setCurrentIndex(-1);
    }

    const renderTree = () => {
        if (!tree.root) return <div>No nodes in the Binary Tree.</div>;

        return (
            <div className="flex justify-center h-full w-full">
                <TreeNode index={0} node={tree.root} type="root" svgRef={svgRef} renderTrigger={renderTrigger} currentIndex={currentIndex}/>
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen w-screen">
            <h1 className="text-4xl font-semibold text-center">
                Binary Tree
            </h1>
            <div className="flex items-center justify-center space-x-4">
                <button
                    className="px-4 py-2 bg-green-500 h-20 w-32 text-white rounded-md shadow-md flex flex-col"
                >
                    <input className="text-black" value={insertVal} onChange={(event)=>setInsertVal(Number(event.target.value))} />
                    <button onClick={() => insertNode(insertVal)}>Insert Node</button>
                </button>
                <div
                    className="px-4 py-2 bg-red-500 h-20 w-32 text-white rounded-md shadow-md flex flex-col"
                >
                    <input className="text-black" value={deleteLeftVal} onChange={(event)=>setDeleteLeftVal(Number(event.target.value))} />
                    <button onClick={() => deleteNodeLeft(deleteLeftVal)}>Delete Left Node</button>
                </div>
                <button
                    className="px-4 py-2 bg-red-500 h-20 w-32 text-white rounded-md shadow-md flex flex-col"
                >
                    <input className="text-black" value={deleteRightVal} onChange={(event)=>setDeleteRightVal(Number(event.target.value))} />
                    <button onClick={() => deleteNodeRight(deleteRightVal)}>Delete Right Node</button>
                </button>
                <button
                    className="px-4 py-2 bg-red-500 text-white rounded-md shadow-md"
                    onClick={() => preOrderTraversal()}
                >
                    Pre-order Traversal
                </button>
                <button
                    className="px-4 py-2 bg-red-500 text-white rounded-md shadow-md"
                    onClick={() => inOrderTraversal()}
                >
                    In-order Traversal
                </button>
                <button
                    className="px-4 py-2 bg-red-500 text-white rounded-md shadow-md"
                    onClick={() => postOrderTraversal()}
                >
                    Post-order Traversal
                </button>
                
            </div>
            <div className="flex items-center justify-center w-screen h-screen overflow-scroll">
                {renderTree()}
            </div>
            <svg ref={svgRef} xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", width: "100%", height: "100%", pointerEvents: "none", zIndex: 10, top: 0, left: 0 }}>
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
        </div>
    );
}