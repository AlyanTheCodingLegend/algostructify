"use client";

import { useEffect, useState } from "react"

// type Value = {
//   topic: string,
//   difficulty: "Easy" | "Medium" | "Hard",
//   answer: number
// }
type Question = {
  id: number;
  topic: string;
  difficulty: "Easy" | "Medium" | "Hard";
  questionText: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
};

type AnswerState = {
  selectedOption: number | null;
  isCorrect: boolean | null;
};

export default function Page() {
  const [value, setValue] = useState({ topic: "", difficulty: "Easy" as "Easy" | "Medium" | "Hard" });
  const [render, setRender] = useState<number>(0)
  const [question, setQuestion] = useState<Question | null>(null); // Set initial state to `null`
  const [answerState, setAnswerState] = useState<AnswerState>({ selectedOption: null, isCorrect: null });

  const handleSubmit = () => {
    setRender(prev=>prev+1)
  }

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/getData/", { 
        body: JSON.stringify({ value }),
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });
      const serverData = await response.json();
  
      if (Array.isArray(serverData) && serverData.length > 0) {
        setQuestion(serverData[0]); // Access the first object in the array
      } else {
        console.error("Invalid data format:", serverData);
      }
  
      setAnswerState({ selectedOption: null, isCorrect: null });
      console.log("from pagetsx: ", serverData);
      console.log("Options: ", serverData[0]?.options);
    }
  
    fetchData();
  }, [render]);
  

  const handleSubmitAnswer = () => {
    if (answerState.selectedOption !== null && question) {
      const isCorrect = answerState.selectedOption === question.correctAnswer;
      setAnswerState((prev) => ({ ...prev, isCorrect }));
    }
  };

  const handleNextQuestion = () => {
    setRender((prev) => prev + 1);
  };
  
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen bg-gray-100 p-4">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Quiz</h1>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Topic"
            className="w-full mb-2 p-2 border rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={value.topic}
            onChange={(e) => setValue((prev) => ({ ...prev, topic: e.target.value }))}
          />
          <select
            className="w-full p-2 border rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={value.difficulty}
            onChange={(e) => setValue((prev) => ({ ...prev, difficulty: e.target.value as "Easy" | "Medium" | "Hard" }))}
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        {question && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800">{question.questionText}</h2>
            <ul className="mt-4">
            {question?.options.map((option: string, index: number) => (
    <li key={index} className="mb-2">
      <button
        className={`w-full text-left p-2 rounded border ${
          answerState.selectedOption === index
            ? "bg-blue-500 text-white"
            : "bg-gray-100 text-gray-800"
        } hover:bg-blue-100`}
        onClick={() =>
          setAnswerState((prev) => ({ ...prev, selectedOption: index }))
        }
      >
        {option}
      </button>
    </li>
  ))}
            </ul>
          </div>
        )}

        {answerState.isCorrect !== null && (
          <div
            className={`p-4 rounded-lg text-center font-semibold ${
              answerState.isCorrect ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            {answerState.isCorrect ? "Correct!" : `Incorrect. ${question?.explanation}`}
          </div>
        )}

        <div className="flex justify-between mt-6">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleSubmitAnswer}
            disabled={answerState.selectedOption === null || answerState.isCorrect !== null}
          >
            Submit Answer
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            onClick={handleNextQuestion}
          >
            Next Question
          </button>
        </div>
      </div>
    </div>
  );
}
