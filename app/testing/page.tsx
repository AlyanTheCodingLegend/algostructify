"use client";

import { useEffect, useState } from "react";

type Question = {
  id: number;
  topic: string;
  difficulty: "Easy" | "Medium" | "Hard";
  questionText: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
};

type LeaderboardEntry = {
  studentId: string;
  score: number;
  topic: string;
};

export default function Page() {
  const [value, setValue] = useState({ topic: "", difficulty: "Easy" as "Easy" | "Medium" | "Hard" });
  const [render, setRender] = useState<number>(0);
  const [question, setQuestion] = useState<Question | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  const studentId = "student123"; // Replace with actual student ID from context/auth

  // Fetch quiz questions
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/getData/", {
        body: JSON.stringify({ value }),
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const serverData = await response.json();

      if (Array.isArray(serverData) && serverData.length > 0) {
        setQuestion(serverData[0]);
        const difficultyTime = { Easy: 25, Medium: 40, Hard: 60 };
        setTimeLeft(difficultyTime[serverData[0].difficulty as keyof typeof difficultyTime]);
      }
    }
    fetchData();
  }, [render]);

  // Timer Logic
  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timerId);
    } else if (timeLeft === 0) {
      setRender((prev) => prev + 1); // Skip question
    }
  }, [timeLeft]);

  // Fetch leaderboard
  const fetchLeaderboard = async (topic: string) => {
    const response = await fetch(`/api/leaderboard?topic=${topic}`);
    const data = await response.json();
    setLeaderboard(data);
  };

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen bg-gray-100 p-4">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Quiz</h1>

        {/* Timer */}
        <div className="text-lg font-semibold text-red-600 mb-2">
          Time Left: {timeLeft}s
        </div>

        {/* Leaderboard Button */}
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => fetchLeaderboard(value.topic)}>
          Show Leaderboard
        </button>

        {/* Leaderboard Display */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Leaderboard</h3>
          <ul>
            {leaderboard.map((entry, index) => (
              <li key={index} className="flex justify-between">
                <span>{entry.studentId}</span>
                <span>{entry.score}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
