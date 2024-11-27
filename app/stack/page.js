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
const StackArray_1 = __importDefault(require("../_datastructures/StackArray"));
const react_toastify_1 = require("react-toastify");
function Page() {
    const [stack] = (0, react_1.useState)(new StackArray_1.default(7));
    const [, setRenderTrigger] = (0, react_1.useState)(0);
    const triggerRender = () => setRenderTrigger((prev) => prev + 1);
    const push = (value) => {
        if (stack.isFull()) {
            react_toastify_1.toast.error("Stack is full, cannot push.");
            return;
        }
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
        const stackArray = new Array(stack.maxSize).fill(null);
        stackArray.forEach((_, index) => {
            stackArray[index] = stack.items[index];
        });
        return stackArray.map((item, index) => (<div key={index}>
                <div className={`flex justify-center items-center p-4 border-4 min-w-[80px] min-h-[80px] text-center text-xl font-semibold shadow-lg relative ${(index === stack.top ? "border-red-500 bg-red-100" : "border-green-500 bg-green-100")}`}>
                    <span>{item}</span>
                </div>
            </div>));
    };
    return (<div className="flex flex-col h-screen w-screen justify-center items-center bg-gray-100">
            <div className="flex flex-col items-center justify-center space-x-0">
                {renderStack()}
            </div>    
            <button onClick={() => push(10)}>Push</button>
            <button onClick={() => pop()}>Pop</button>
        </div>);
}
