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
const QueueArray_1 = __importDefault(require("../_datastructures/QueueArray"));
const react_toastify_1 = require("react-toastify");
function Page() {
    const [queue] = (0, react_1.useState)(new QueueArray_1.default(7));
    const [, setRenderTrigger] = (0, react_1.useState)(0);
    const triggerRender = () => setRenderTrigger((prev) => prev + 1);
    const enqueue = (value) => {
        if (queue.isFull()) {
            react_toastify_1.toast.error("Queue is full, cannot enqueue.");
            return;
        }
        queue.enqueue(value);
        triggerRender();
    };
    const dequeue = () => {
        if (queue.isEmpty()) {
            react_toastify_1.toast.error("Queue is empty, nothing to dequeue.");
            return;
        }
        const dequeuedValue = queue.dequeue();
        react_toastify_1.toast.success(`Dequeued value: ${dequeuedValue}`);
        triggerRender();
    };
    const renderQueue = () => {
        const queueArray = new Array(queue.capacity).fill(null);
        queueArray.forEach((_, index) => {
            queueArray[index] = queue.queue[index];
        });
        return queueArray.map((item, index) => (<div key={index}>
                <div className={`flex justify-center items-center p-4 border-4 min-w-[80px] min-h-[80px] text-center text-xl font-semibold shadow-lg relative ${(index === queue.front && index === queue.rear) && "border-purple-500 bg-purple-100"} ${index === queue.front ? "border-red-500 bg-red-100" : (index === queue.rear ? "border-blue-500 bg-blue-100" : "border-green-500 bg-green-100")}`}>
                    <span>{item}</span>
                </div>
            </div>));
    };
    return (<div className="flex flex-col h-screen w-screen justify-center items-center bg-gray-100">
            <div className="flex flex-col items-center justify-center space-x-0">
                {renderQueue()}
            </div>    
            <button onClick={() => enqueue(10)}>Enqueue</button>
            <button onClick={() => dequeue()}>Dequeue</button>
        </div>);
}
