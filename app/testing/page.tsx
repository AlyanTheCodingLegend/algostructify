"use client";

import { useEffect, useState } from "react"

type Value = {
  topic: string,
  difficulty: "Easy" | "Medium" | "Hard",
  answer: number
}

export default function Page() {
  const [value, setValue] = useState<Value>({topic: '', difficulty: "Easy", answer: -1})
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
      <div className="flex justify-center items-center w-screen h-screen">
        <input type="number" className="text-black border-10" value={value.answer} onChange={(e)=>setValue(prev=>({...prev, answer: (Number(e.target.value))}))}/>
        <input type="text" className="text-black" value={value.topic} onChange={(e)=>setValue(prev=>({...prev, topic: e.target.value}))}/>
        <input type="text" className="text-black" value={value.difficulty} onChange={(e)=>setValue(prev=>({...prev, difficulty: e.target.value as "Easy" | "Medium" | "Hard"}))}/>
        <button className="bg-red-700 text-white rounded-full" onClick={handleSubmit}>Click to submit answer</button>
      </div>
    )
}