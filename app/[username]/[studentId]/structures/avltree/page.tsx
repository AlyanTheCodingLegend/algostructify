"use client";

import React, { useEffect, useRef, useState } from "react";
import AVLTree from "@/app/_datastructures/AVLTree";
import { TreeNode } from "./TreeNode";
import { toast } from "react-toastify";
import { useGlobalStatesContext } from "../layout";

export default function Page() {
    const [tree] = useState(new AVLTree<number>());
    const [renderTrigger, setRenderTrigger] = useState(0);
    const [insertVal, setInsertVal] = useState(1);
    const [deleteVal, setDeleteVal] = useState(1);
    const svgRef = useRef<SVGSVGElement>(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [traversalInProcess, setTraversalInProcess] = useState(false);
    const [scrollY, setScrollY] = useState(0);

    const { setHeading } = useGlobalStatesContext();

    useEffect(() => {
        setHeading("AVL Tree");

        const handleResize = () => {
            forceRender();
        };

        const handleScroll = () => {
            setScrollY(window.scrollY);
            forceRender();
        };

        const scrollableTree = document.getElementById("scrollable-tree");

        window.addEventListener('resize', handleResize);
        scrollableTree?.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('resize', handleResize);
            scrollableTree?.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const forceRender = () => setRenderTrigger((prev) => prev + 1);

    const insertNode = (data: number) => {
        tree.insert(data);
        forceRender();
    };

    const deleteNode = (data: number) => {
        tree.delete(data);
        forceRender();
    };

    const preOrderTraversal = () => {
        if (!tree.root) {
            toast.error("No nodes in the Binary Tree.");
            return;
        }   
        
        setTraversalInProcess(true);
        let delay = 0;

        tree.preOrderTraversal((index) => {
            setTimeout(() => {
                setCurrentIndex(index);
            }, delay += 1000);
        });

        setTimeout(() => {
            setCurrentIndex(-1);
            setTraversalInProcess(false);
        }, delay + 1000);
    }

    const inOrderTraversal = () => {
        if (!tree.root) {
            toast.error("No nodes in the Binary Tree.");
            return;
        }   
        
        setTraversalInProcess(true);
        let delay = 0;

        tree.inOrderTraversal((index) => {
            setTimeout(() => {
                setCurrentIndex(index);
            }, delay += 1000);
        });

        setTimeout(() => {
            setCurrentIndex(-1);
            setTraversalInProcess(false);
        }, delay + 1000);
    }

    const postOrderTraversal = () => {
        if (!tree.root) {
            toast.error("No nodes in the Binary Tree.");
            return;
        }   
        
        setTraversalInProcess(true);
        let delay = 0;

        tree.postOrderTraversal((index) => {
            setTimeout(() => {
                setCurrentIndex(index);
            }, delay += 1000);
        });

        setTimeout(() => {
            setCurrentIndex(-1);
            setTraversalInProcess(false);
        }, delay + 1000);
    }

    const renderTree = () => {
        if (!tree.root) return <div>No nodes in the Binary Tree.</div>;

        return (
            <div className="flex justify-center h-full w-full">
                <TreeNode index={0} node={tree.root} type="root" svgRef={svgRef} renderTrigger={renderTrigger} currentIndex={currentIndex} scrollY={scrollY}/>
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen w-screen">
            <h1 className="text-4xl font-semibold text-center">
                AVL Tree
            </h1>
            <div className="flex items-center z-10 justify-center space-x-4">
                <div
                    className="px-4 py-2 bg-green-500 h-20 w-32 text-white rounded-md shadow-md flex flex-col"
                >
                    <input className="text-black" value={insertVal} onChange={(event)=>setInsertVal(Number(event.target.value))} />
                    <button onClick={() => insertNode(Math.floor((Math.random()+1)*200))}>Insert Node</button>
                </div>
                <div
                    className="px-4 py-2 bg-red-500 h-20 w-32 text-white rounded-md shadow-md flex flex-col"
                >
                    <input className="text-black" value={deleteVal} onChange={(event)=>setDeleteVal(Number(event.target.value))} />
                    <button onClick={() => deleteNode(deleteVal)}>Delete Node</button>
                </div>
                <button
                    className="px-4 py-2 bg-red-500 text-white rounded-md shadow-md"
                    onClick={() => preOrderTraversal()}
                    disabled={traversalInProcess}
                >
                    Pre-order Traversal
                </button>
                <button
                    className="px-4 py-2 bg-red-500 text-white rounded-md shadow-md"
                    onClick={() => inOrderTraversal()}
                    disabled={traversalInProcess}
                >
                    In-order Traversal
                </button>
                <button
                    className="px-4 py-2 bg-red-500 text-white rounded-md shadow-md"
                    onClick={() => postOrderTraversal()}
                    disabled={traversalInProcess}
                >
                    Post-order Traversal
                </button>
                
            </div>
            <div className="flex items-center justify-center w-screen h-screen overflow-scroll" id="scrollable-tree">
                {renderTree()}
                <svg ref={svgRef} xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", width: "100%", height: "100%", pointerEvents: "none", zIndex: -1, top: 0, left: 0 }}></svg>
            </div>
        </div>
    );
}