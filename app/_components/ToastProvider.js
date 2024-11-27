"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ToastProvider;
require("react-toastify/dist/ReactToastify.css");
const react_toastify_1 = require("react-toastify");
function ToastProvider({ children }) {
    return (<>
      {children}
      <react_toastify_1.ToastContainer position="top-right" autoClose={2000} closeOnClick={true} draggable={false} theme="dark"/>
    </>);
}
