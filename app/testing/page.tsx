"use client";

import { useState } from "react"

export default function Page() {
  const [value, setValue] = useState({topic: "Arrays", difficulty: "Easy", answer: 1})

  const handleSubmit = async () => {
    await fetch("/api/getData", { 
      body: JSON.stringify({value}),
      method: "POST"
    })
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <input className="text-black border-10" placeholder="Topic" value={value.topic} onChange={(e)=>setValue(prev=>({...prev, topic: e.target.value}))}/>
      <input className="text-black border-10" placeholder="Difficulty" value={value.difficulty} onChange={(e)=>setValue(prev=>({...prev, difficulty: e.target.value}))}/>
      <input type="number" min={1} max={4} className="text-black border-10" value={value.answer} onChange={(e)=>setValue(prev=>({...prev, answer: Number(e.target.value)}))}/>
      <button onClick={handleSubmit}>Click to submit answer</button>
    </div>
  )
}