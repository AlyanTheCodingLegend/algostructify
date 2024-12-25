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

type Recommendation = {
  weakTopics: { topic: string; threshold: number }[];
  moderateTopics: { topic: string; threshold: number }[];
  strongTopics: { topic: string; threshold: number }[];
  tips: string[];
};

export default function Page() {
  const [value, setValue] = useState({ topic: "", difficulty: "Easy" as "Easy" | "Medium" | "Hard" });
  const [render, setRender] = useState<number>(0);
  const [question, setQuestion] = useState<Question | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation | null>(null);
  const [timer, setTimer] = useState<number>(0);

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
      } else {
        console.error("Invalid data format:", serverData);
      }

      setIsCorrect(null);
      setSelectedOption(null);
    }
    fetchData();
  }, [render]);

  // Set the timer dynamically based on difficulty
  useEffect(() => {
    if (question) {
      const difficultyTimer = question.difficulty === "Easy" ? 25 : question.difficulty === "Medium" ? 40 : 60;
      setTimer(difficultyTimer);

      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            handleNextQuestion(); // Skip to the next question
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [question]);

  // Fetch recommendations
  const fetchRecommendations = async () => {
    const response = await fetch(`/api/getData/?studentId=${studentId}`);
    const data = await response.json();
    setRecommendations(data);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption !== null && question) {
      setIsCorrect(selectedOption === question.correctAnswer);
    }
  };

  const handleNextQuestion = () => {
    setRender((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen bg-gray-100 p-4">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Quiz</h1>

        {/* Timer Display */}
        {timer > 0 && (
          <div className="text-lg font-bold text-gray-700 mb-4">Time Remaining: {timer}s</div>
        )}

        {/* Topic and Difficulty Selection */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Topic"
            className="w-full mb-2 p-2 border rounded text-gray-700"
            value={value.topic}
            onChange={(e) => setValue((prev) => ({ ...prev, topic: e.target.value }))}
          />
          <select
            className="w-full p-2 border rounded"
            value={value.difficulty}
            onChange={(e) =>
              setValue((prev) => ({ ...prev, difficulty: e.target.value as "Easy" | "Medium" | "Hard" }))
            }
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        {/* Question Display */}
        {question && (
          <div>
            <h2 className="text-lg font-semibold">{question.questionText}</h2>
            <ul>
              {question.options.map((option, index) => (
                <li key={index}>
                  <button
                    className={`w-full p-2 my-1 text-left rounded ${
                      selectedOption === index ? "bg-blue-500 text-white" : "bg-gray-100"
                    }`}
                    onClick={() => setSelectedOption(index)}
                  >
                    {option}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Feedback Display */}
        {isCorrect !== null && (
          <div
            className={`p-4 mt-4 rounded text-center ${
              isCorrect ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            {isCorrect ? "Correct!" : `Incorrect. ${question?.explanation}`}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleSubmitAnswer}
            disabled={selectedOption === null || isCorrect !== null}
          >
            Submit Answer
          </button>
          <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={handleNextQuestion}>
            Next Question
          </button>
        </div>

        {/* Recommendation Section */}
        <div className="mt-6">
          <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={fetchRecommendations}>
            Show Recommendations
          </button>

          {recommendations && (
            <div className="mt-6">
              <h3 className="text-lg font-bold text-gray-800">Performance Summary</h3>

              <div className="mt-4">
                <h4 className="text-md font-semibold text-red-600">Weak Topics:</h4>
                <ul>
                  {recommendations.weakTopics.map((topic, index) => (
                    <li key={index}>
                      {topic.topic}: {topic.threshold.toFixed(2)}%
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4">
                <h4 className="text-md font-semibold text-yellow-600">Moderate Topics:</h4>
                <ul>
                  {recommendations.moderateTopics.map((topic, index) => (
                    <li key={index}>
                      {topic.topic}: {topic.threshold.toFixed(2)}%
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4">
                <h4 className="text-md font-semibold text-green-600">Strong Topics:</h4>
                <ul>
                  {recommendations.strongTopics.map((topic, index) => (
                    <li key={index}>
                      {topic.topic}: {topic.threshold.toFixed(2)}%
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4">
                <h4 className="text-md font-semibold">Improvement Tips:</h4>
                <ul>
                  {recommendations.tips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
