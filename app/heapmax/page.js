"use strict";
"use client";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Page;
const react_1 = __importStar(require("react"));
const HeapMax_1 = __importDefault(require("../_datastructures/HeapMax"));
const TreeNode_1 = require("./TreeNode");
function Page() {
    const [heap] = (0, react_1.useState)(new HeapMax_1.default());
    const [, setRenderTrigger] = (0, react_1.useState)(0);
    const triggerRender = () => setRenderTrigger((prev) => prev + 1);
    const insert = (value) => {
        heap.insert(value);
        triggerRender();
    };
    const deleteValue = (value) => {
        heap.deleteValue(value);
        triggerRender();
    };
    const renderHeap = () => {
        if (heap.size() === 0)
            return <div>No nodes in the Max Heap.</div>;
        return (<div className="flex justify-center">
                <TreeNode_1.TreeNode index={0} heap={heap}/>
            </div>);
    };
    return (<div className="flex flex-col items-center justify-center h-full space-y-8">
            <h1 className="text-4xl font-semibold text-center">
                Max Heap
            </h1>
            <div className="flex items-center justify-center space-x-4">
                <button className="px-4 py-2 bg-green-500 text-white rounded-md shadow-md" onClick={() => insert(Math.floor(Math.random() * 100))}>
                    Insert Random Value
                </button>
                <button className="px-4 py-2 bg-red-500 text-white rounded-md shadow-md" onClick={() => deleteValue(heap.peek() || 0)}>
                    Delete Max Value
                </button>
            </div>
            <div className="flex items-center justify-center space-x-4">
                {renderHeap()}
            </div>
        </div>);
}
