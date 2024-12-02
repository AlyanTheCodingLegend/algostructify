"use client";

import { useEffect, useState } from "react"

export default function Page() {
  const [value, setValue] = useState<number>(-1)
  const [render, setRender] = useState<number>(0)

  const handleSubmit = () => {
    setRender(prev=>prev+1)
  }

  useEffect(()=>{
    async function fetchData() {
      const response = await fetch("/api/getData", { 
        body: JSON.stringify({value}),
        method: "POST"
      })
      const serverData = await response.json()
      console.log(serverData)
    }

    fetchData()
  }, [render])

    return (
      <div>
        <input type="number" className="text-black border-10" value={value} onChange={(e)=>setValue(Number(e.target.value))}/>
        <button onClick={handleSubmit}>Click to submit answer</button>
      </div>
    )
}