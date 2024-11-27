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
const StackLL_1 = __importDefault(require("../_datastructures/StackLL"));
const react_toastify_1 = require("react-toastify");
function Page() {
    const [stack] = (0, react_1.useState)(new StackLL_1.default());
    const [, setRenderTrigger] = (0, react_1.useState)(0);
    const triggerRender = () => setRenderTrigger((prev) => prev + 1);
    const push = (value) => {
        stack.push(value);
        triggerRender();
    };
    const pop = () => {
        if (stack.isEmpty()) {
            react_toastify_1.toast.error("Stack is empty, nothing to pop.");
            return;
        }
        const poppedValue = stack.pop();
        react_toastify_1.toast.success(`Popped value: ${poppedValue}`);
        triggerRender();
    };
    const renderStack = () => {
        if (stack.isEmpty())
            return <div>No nodes in the Stack.</div>;
        const nodes = [];
        let current = stack.top;
        while (current !== null) {
            nodes.push(current);
            current = current.next;
        }
        return nodes.map((node, index) => (<div key={index} className="flex flex-col items-center justify-center relative">
                <div className={`flex justify-center items-center p-4 border-4 min-w-[80px] min-h-[80px] text-center text-xl font-semibold shadow-lg relative ${node === stack.top ? "border-red-500 bg-red-100" : "border-green-500 bg-green-100"}`}>
                    <span>{node.value}</span>
                </div>
                {index !== nodes.length - 1 && (<div className="flex justify-center items-center text-3xl text-green-500">
                        ↓
                    </div>)}
            </div>));
    };
    return (<div className="flex flex-col items-center justify-center h-full space-y-8">
            <h1 className="text-4xl font-semibold text-center">
                Stack using Linked List
            </h1>
            <div className="flex items-center justify-center space-x-4">
                <button className="p-4 bg-green-500 text-white font-semibold rounded-lg shadow-lg" onClick={() => push(Math.floor(Math.random() * 100))}>
                    Push
                </button>
                <button className="p-4 bg-red-500 text-white font-semibold rounded-lg shadow-lg" onClick={pop}>
                    Pop
                </button>
            </div>
            <div className="flex flex-col items-center justify-center">
                {renderStack()}
            </div>
        </div>);
}
