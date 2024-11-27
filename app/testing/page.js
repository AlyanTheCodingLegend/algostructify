"use strict";
"use client";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Page;
const react_1 = require("react");
function Page() {
    (0, react_1.useEffect)(() => {
        function fetchData() {
            return __awaiter(this, void 0, void 0, function* () {
                const response = yield fetch("/api/getData", {
                    body: { email: "alyahskjhdkj", password: "jkshdjfkhsdkjhf" },
                    headers: {}
                });
                const serverData = yield response.json();
                console.log(serverData);
            });
        }
        fetchData();
    }, []);
    return (<svg xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", width: "100%", height: "100%", pointerEvents: "none", zIndex: 10, top: 0, left: 0 }}>
      <path d="M 716.2222290039062 331.3263854980469 C 766.2222290039062 231.32638549804688, 86.22222900390625 231.32638549804688, 136.22222900390625 331.3263854980469" stroke="black" fill="transparent" strokeWidth="2" markerEnd="url(#arrowhead)"/>
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="black"/>
        </marker>
      </defs>
    </svg>);
}
