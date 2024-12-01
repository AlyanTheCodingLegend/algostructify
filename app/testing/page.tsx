"use client";

import { useEffect } from "react"

export default function Page() {

  useEffect(()=>{
    async function fetchData() {
      const response = await fetch("/api/getData", { 
        body: JSON.stringify({email: "alyahskjhdkj", password: "jkshdjfkhsdkjhf"}),
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST"
      })
      const serverData = await response.json()
      console.log(serverData)
    }

    fetchData()
  }, [])

    return (
      <div className="flex flex-col items-center justify-center h-screen w-screen">
        <h1 className="text-3xl font-bold">Hello World</h1>
      </div>
    )
}