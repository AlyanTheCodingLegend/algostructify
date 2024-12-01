"use client";

import { useEffect } from "react"

export default function Page() {

  useEffect(()=>{
    async function fetchData() {
      const response = await fetch("/api/getData", { 
        body: {email: "alyahskjhdkj", password: "jkshdjfkhsdkjhf"},
        headers: {
        }
      })
      const serverData = await response.json()
      console.log(serverData)
    }

    fetchData()
  }, [])

    return (
      <div className="flex flex-col items-center justify-center h-screen w-screen">
    <svg xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", width: "100%", height: "100%", pointerEvents: "none", zIndex: 10, top: 0, left: 0 }}>
      <path
        d="M 576.4444580078125 224 C 576.4444580078125 232, 576.4444580078125 232, 576.4444580078125 240"
        stroke="black"
        fill="transparent"
        strokeWidth="2"
        // markerEnd="url(#arrowhead)"
      />
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="10"
          refY="3.5"
          orient="auto"
        >
          <polygon points="0 0, 10 3.5, 0 7" fill="black" />
        </marker>
      </defs>
    </svg>
    </div>
    )
}