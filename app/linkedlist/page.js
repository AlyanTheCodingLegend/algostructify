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
const LinkedList_1 = __importDefault(require("../_datastructures/LinkedList"));
function Page() {
    const [list] = (0, react_1.useState)(new LinkedList_1.default());
    const [, setRenderTrigger] = (0, react_1.useState)(0);
    const triggerRender = () => setRenderTrigger((prev) => prev + 1);
    const addNode = (value) => {
        list.append(value);
        triggerRender();
    };
    const removeNode = (value) => {
        list.delete(value);
        triggerRender();
    };
    const renderNodes = () => {
        if (!list.head)
            return <div>No nodes in the Linked List.</div>;
        const nodes = [];
        let current = list.head;
        // Loop through the CLL starting from the head.
        do {
            if (!current)
                break;
            nodes.push(current);
            current = current.next;
        } while (current !== null);
        return nodes.map((node, index) => (<div key={index} className="flex items-center justify-center relative">
        <div className="flex justify-center items-center p-4 border-4 border-green-500 rounded-lg bg-green-100 min-w-[80px] min-h-[80px] text-center text-xl font-semibold shadow-lg relative">
          <span className="value">{node.value}</span>
        </div>
        {!!node.next && (<div className="flex justify-center items-center text-3xl text-green-500">
            →
          </div>)}
      </div>));
    };
    return (<div className="flex flex-col h-screen w-screen justify-center items-center bg-gray-100">
      <div className="flex flex-col items-center justify-center w-full h-full relative space-y-8">
        <div className="flex items-center justify-center">{renderNodes()}</div>
        <div className="flex justify-center items-center mt-10 space-x-6">
          <button className="bg-red-600 text-white w-28 h-12 rounded-full text-lg shadow-lg transform hover:scale-105 transition-all" onClick={() => addNode(10)}>
            Add Node
          </button>
          <button className="bg-red-600 text-white w-28 h-12 rounded-full text-lg shadow-lg transform hover:scale-105 transition-all" onClick={() => removeNode(10)}>
            Remove Node
          </button>
        </div>
      </div>
    </div>);
}
