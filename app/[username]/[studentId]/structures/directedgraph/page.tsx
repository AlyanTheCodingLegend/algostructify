"use client";

import { useEffect, useRef, useState } from "react";
import DirectedGraph from "@/app/_datastructures/DirectedGraph";
import Vertex from "./Vertex";
import { useGlobalStatesContext } from "../layout";
import { toast } from "react-toastify";

export default function Page() {
    const [graph] = useState(new DirectedGraph(5));
    const [renderTrigger, setRenderTrigger] = useState(0);
    const [insertVal, setInsertVal] = useState("");
    const [deleteVal, setDeleteVal] = useState("");
    const [insertEdgeVal, setInsertEdgeVal] = useState({ start: "", end: "" });
    const [deleteEdgeVal, setDeleteEdgeVal] = useState({ start: "", end: "" });
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [traversalInProcess, setTraversalInProcess] = useState(false);

    const svgRef = useRef<SVGSVGElement>(null);

    const { isOpen, setHeading } = useGlobalStatesContext();

    useEffect(()=>{
        setHeading("Directed Graph");
    }, []);

    const forceRender = () => setRenderTrigger((prev) => prev + 1);

    const insertVertex = (name: string) => {
        graph.addVertex(name);
        renderGraph();
        forceRender();
    };

    const insertEdge = (startVertex: string, endVertex: string) => {
        graph.addEdge(startVertex, endVertex);
        renderGraph();
        forceRender();
    };

    const deleteVertex = (name: string) => {
        const index = graph.vertexNames.indexOf(name);
        if (index === -1) {
            toast.error("Vertex not found in the graph!");
            return;
        }
        for (let i = 0; i < graph.vertexNames.length; i++) {
            if (i!==index) {
                svgRef.current?.removeChild(svgRef.current.getElementById(`${index}-${i}`));
                svgRef.current?.removeChild(svgRef.current.getElementById(`${i}-${index}`));
            }
        }
        graph.deleteVertex(name);
        renderGraph();
        forceRender();
    }

    const deleteEdge = (startVertex: string, endVertex: string) => {
        const startIndex = graph.vertexNames.indexOf(startVertex);
        const endIndex = graph.vertexNames.indexOf(endVertex);
        const edge = svgRef.current?.getElementById(`${startIndex}-${endIndex}`)
        if (!edge) {
            toast.error("Edge not found in the graph!");
            return;
        }
        svgRef.current?.removeChild(edge);
        graph.deleteEdge(startVertex, endVertex);
        renderGraph();
        forceRender();
    }

    const performBFS = () => {
        setTraversalInProcess(true);
        let delay = 0;

        graph.bfs(graph.vertexNames[0], (index) => {
            setTimeout(() => {
                setCurrentIndex(index);
            }, delay += 1000);
        });

        setTimeout(() => {
            setCurrentIndex(-1);
            setTraversalInProcess(false);
        }, delay + 1000);
    }

    const performDFS = () => {
        setTraversalInProcess(true);
        let delay = 0;

        graph.dfs(graph.vertexNames[0], (index) => {
            setTimeout(() => {
                setCurrentIndex(index);
            }, delay += 1000);
        });

        setTimeout(() => {
            setCurrentIndex(-1);
            setTraversalInProcess(false);
        }, delay + 1000);
    }

    const renderGraph = () => {
        if (!graph.matrix) {
            return <div className="text-gray-500">No vertices in the directed graph!</div>;
        }

        return graph.matrix.map((row, i) => {
            const adjMatrix = row;
            const name = graph.vertexNames[i];
            return (
                <Vertex
                    key={i}
                    index={i}
                    name={name}
                    adjMatrix={adjMatrix}
                    svgRef={svgRef}
                    renderTrigger={renderTrigger}
                    currentIndex={currentIndex}
                />
            );
        });
    };

    return (
        <div style={{marginLeft: isOpen ? "256px" : "64px", marginTop: "64px", width: `calc(100vw - ${isOpen ? "256px" : "64px"})`}} className="flex flex-col items-center justify-center h-full w-full bg-gradient-to-b from-blue-200 to-blue-50">
            <div className="flex items-center justify-center space-x-6 mb-6">
                
                <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-lg">
                    <input
                        className="w-full px-3 py-2 mb-2 text-sm border rounded focus:outline-none focus:ring focus:ring-blue-300"
                        placeholder="Vertex Name"
                        value={insertVal}
                        onChange={(event) => setInsertVal(event.target.value)}
                    />
                    <button
                        className="px-4 py-2 text-white bg-blue-500 rounded shadow hover:bg-blue-600"
                        onClick={(e) => {e.stopPropagation(); insertVertex(insertVal)}}
                    >
                        Insert Vertex
                    </button>
                </div>
                <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-lg">
                    <input
                        className="w-full px-3 py-2 mb-2 text-sm border rounded focus:outline-none focus:ring focus:ring-blue-300"
                        placeholder="Vertex Name"
                        value={deleteVal}
                        onChange={(event) => setDeleteVal(event.target.value)}
                    />
                    <button
                        className="px-4 py-2 text-white bg-blue-500 rounded shadow hover:bg-blue-600"
                        onClick={(e) => {e.stopPropagation(); deleteVertex(deleteVal)}}
                    >
                        Delete Vertex
                    </button>
                </div>
                
                <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-lg">
                    <div>
                    <label className="text-sm text-gray-600">Start Vertex:</label>
                    <select
                        value={insertEdgeVal.start}
                        className="w-full px-3 py-2 mb-2 text-sm border rounded focus:outline-none focus:ring focus:ring-blue-300"
                        onChange={(event) =>
                            setInsertEdgeVal(prev=>({...prev, start: event.target.value}))
                        }
                    >
                        {graph.vertexNames.map((name) => (
                            <option key={name} value={name}>
                                {name}
                            </option>
                        ))}
                    </select>
                    <label className="text-sm text-gray-600">End Vertex:</label>
                    <select
                        value={insertEdgeVal.end}
                        className="w-full px-3 py-2 mb-2 text-sm border rounded focus:outline-none focus:ring focus:ring-blue-300"
                        onChange={(event) =>
                            setInsertEdgeVal(prev=>({...prev, end: event.target.value}))
                        }
                    >
                        {graph.vertexNames.map((name) => (
                            <option key={name} value={name}>
                                {name}
                            </option>
                        ))}
                    </select>
                    <button
                        className="px-4 py-2 text-white bg-blue-500 rounded shadow hover:bg-blue-600"
                        onClick={(e) => {e.stopPropagation(); insertEdge(insertEdgeVal.start, insertEdgeVal.end)}}
                    >
                        Insert Edge
                    </button>
                    </div>
                    <div>
                    <label className="text-sm text-gray-600">Start Vertex:</label>
                    <select
                        value={deleteEdgeVal.start}
                        className="w-full px-3 py-2 mb-2 text-sm border rounded focus:outline-none focus:ring focus:ring-blue-300"
                        onChange={(event) =>
                            setDeleteEdgeVal(prev=>({...prev, start: event.target.value}))
                        }
                    >
                        {graph.vertexNames.map((name) => (
                            <option key={name} value={name}>
                                {name}
                            </option>
                        ))}
                    </select>
                    <label className="text-sm text-gray-600">End Vertex:</label>
                    <select
                        value={deleteEdgeVal.end}
                        className="w-full px-3 py-2 mb-2 text-sm border rounded focus:outline-none focus:ring focus:ring-blue-300"
                        onChange={(event) =>
                            setDeleteEdgeVal(prev=>({...prev, end: event.target.value}))
                        }
                    >
                        {graph.vertexNames.map((name) => (
                            <option key={name} value={name}>
                                {name}
                            </option>
                        ))}
                    </select>
                    <button
                        className="px-4 py-2 text-white bg-blue-500 rounded shadow hover:bg-blue-600"
                        onClick={(e) => {e.stopPropagation(); deleteEdge(deleteEdgeVal.start, deleteEdgeVal.end)}}
                    >
                        Delete Edge
                    </button>
                    </div>
                    <button
                        className={`px-4 py-2 text-white bg-blue-500 rounded shadow hover:bg-blue-600 ${traversalInProcess ? "opacity-50 cursor-not-allowed" : ""}`}
                        onClick={() => performBFS()}
                        disabled={traversalInProcess}
                    >
                        Perform BFS
                    </button>
                    <button
                        className={`px-4 py-2 text-white bg-blue-500 rounded shadow hover:bg-blue-600 ${traversalInProcess ? "opacity-50 cursor-not-allowed" : ""}`}
                        onClick={() => performDFS()}
                        disabled={traversalInProcess}
                    >
                        Perform DFS
                    </button>
                </div>
            </div>

            <div className="relative flex items-center justify-center w-full h-full">
                {renderGraph()}
                <svg
                // viewBox="0 0 1800 700"
                ref={svgRef}
                xmlns="http://www.w3.org/2000/svg"
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    pointerEvents: "none",
                    zIndex: 5,
                }}
            >
                <defs>
                    <marker
                        id="arrowhead"
                        markerWidth="10"
                        markerHeight="7"
                        refX="0"
                        refY="3.5"
                        orient="auto"
                    >
                        <polygon points="0 0, 10 3.5, 0 7" fill="blue" />
                    </marker>
                </defs>
                </svg>
            </div>
        </div>
    );
}
