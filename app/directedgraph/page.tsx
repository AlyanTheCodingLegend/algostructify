"use client";

import { useRef, useState } from "react";
import DirectedGraph from "../_datastructures/DirectedGraph";
import Vertex from "./Vertex";

export default function Page() {
    const [graph] = useState(new DirectedGraph(5));
    const [renderTrigger, setRenderTrigger] = useState(0);
    const [insertVal, setInsertVal] = useState("");
    const [insertEdgeVal, setInsertEdgeVal] = useState({ start: "", end: "" });

    const svgRef = useRef<SVGSVGElement>(null);

    const forceRender = () => setRenderTrigger((prev) => prev + 1);

    const insertVertex = (name: string) => {
        graph.addVertex(name);
        forceRender();
    };

    const insertEdge = (startVertex: string, endVertex: string) => {
        graph.addEdge(startVertex, endVertex);
        forceRender();
    };

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
                />
            );
        });
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen w-screen bg-gradient-to-b from-blue-200 to-blue-50">
            <h1 className="text-4xl font-bold text-center text-blue-700 mb-6">
                Directed Graph Visualization
            </h1>
            <div className="flex items-center justify-center space-x-6 mb-6">
                {/* Vertex Input */}
                <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-lg">
                    <input
                        className="w-full px-3 py-2 mb-2 text-sm border rounded focus:outline-none focus:ring focus:ring-blue-300"
                        placeholder="Vertex Name"
                        value={insertVal}
                        onChange={(event) => setInsertVal(event.target.value)}
                    />
                    <button
                        className="px-4 py-2 text-white bg-blue-500 rounded shadow hover:bg-blue-600"
                        onClick={() => insertVertex(insertVal)}
                    >
                        Insert Vertex
                    </button>
                </div>

                {/* Edge Input */}
                <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-lg">
                    <label className="text-sm text-gray-600">Start Vertex:</label>
                    <select
                        value={insertEdgeVal.start}
                        className="w-full px-3 py-2 mb-2 text-sm border rounded focus:outline-none focus:ring focus:ring-blue-300"
                        onChange={(event) =>
                            setInsertEdgeVal({ ...insertEdgeVal, start: event.target.value })
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
                            setInsertEdgeVal({ ...insertEdgeVal, end: event.target.value })
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
                        onClick={() => insertEdge(insertEdgeVal.start, insertEdgeVal.end)}
                    >
                        Insert Edge
                    </button>
                </div>
            </div>

            <div className="relative flex items-center justify-center w-full h-full">
                {renderGraph()}
                <svg
                    ref={svgRef}
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        pointerEvents: "none",
                        zIndex: -1,
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
