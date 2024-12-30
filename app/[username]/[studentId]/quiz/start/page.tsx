"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { use, useEffect, useState } from "react";
import { type Question } from "@/app/_backend/_quizModule/_src/_types/questions";
import { useGlobalStatesContext } from "../../layout";
import { toast } from "react-toastify";

type StartQuizProps = {
    params: Promise<{
        username: string;
        studentId: string;
    }>;
};

export default function StartQuiz({ params }: StartQuizProps) {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [userAnswers, setUserAnswers] = useState<number[]>([]);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [timeTaken, setTimeTaken] = useState(0);
    const [submitted, setSubmitted] = useState(false);


    const { username, studentId } = use(params);

    const router = useRouter();
    const searchParams = useSearchParams();
    const topic = searchParams.get("topic");
    const difficulty = searchParams.get("difficulty");
    const numQuestions = searchParams.get("questions");

    const timeLimit = 60;

    const [timeLeft, setTimeLeft] = useState(timeLimit);

    const { isOpen, setHeading } = useGlobalStatesContext();

    useEffect(() => {
        async function getQuestions() {
            const response = await fetch("/api/getQuestions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    value: {
                        topic,
                        difficulty,
                        numQuestions,
                        answer: -1,
                    },
                }),
            });

            const res = await response.json();
            if (res.success && res.questions.length>0) {
                setQuestions(res.questions);
                setIsLoading(false);
                setUserAnswers(Array(Number(numQuestions)).fill(-1)); // Initialize answers
            } else {
                toast.error("No questions found for the selected topic and difficulty. Please try again later.");
                router.push(`/${username}/${studentId}/quiz`);
            }
        }

        if (topic && difficulty && numQuestions) {
            setHeading(`Quiz: ${topic} | Difficulty: ${difficulty}`);
            getQuestions();
        }
    }, [topic, difficulty, numQuestions]);

    useEffect(() => {
        if (timeLeft === 0) {
            handleNextQuestion();
        }

        if (!submitted) {
            const timer = setTimeout(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [timeLeft]);

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setSubmitted(false);
            setCurrentQuestionIndex((prev) => prev + 1);
            setTimeLeft(timeLimit); // Reset timer for the next question
        }
    };

    const handleAnswerChange = (answerIndex: number) => {
        const updatedAnswers = [...userAnswers];
        updatedAnswers[currentQuestionIndex] = answerIndex;
        setUserAnswers(updatedAnswers);
    };

    const handleSubmitAnswer = () => {
        const currentQuestion = questions[currentQuestionIndex];
        const userAnswer = userAnswers[currentQuestionIndex];

        if (userAnswer === -1) {
            return;
        }

        setTimeTaken((prev) => prev + (timeLimit - timeLeft));

        if (currentQuestion.correctAnswer === userAnswer) {
            setScore((prev) => prev + 1);
        }

        setSubmitted(true);
    }

    const handleSubmitQuiz = async () => {
        setIsLoading(true);

        // Submit score to the server
        await fetch("/api/updateLeaderboard", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                studentId,
                score: (score/questions.length)*100,
                topic,
            }),
        });

        // Update performance data
        await fetch("/api/updatePerformance", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                studentId,
                topic,
                correct: score,
                attempted: questions.length,
                time: timeTaken,
            }),
        });

        setShowResults(true);
        setHeading("Quiz Results");
        setIsLoading(false);
    };

    if (showResults) {
        return (
            <div style={{marginLeft: isOpen ? "256px" : "64px", marginTop: "64px", width: `calc(100vw - ${isOpen ? "256px" : "64px"})`}} className="flex items-center justify-center h-screen bg-gray-100">
                <div className="bg-white p-8 rounded shadow-md w-96">
                    <h1 className="text-2xl font-bold text-center mb-4">Results</h1>
                    <p className="text-gray-700 text-center mb-6">Your score: {score} / {questions.length}</p>
                    <button
                        onClick={() => router.push(`/${username}/${studentId}/quiz/recommendations?studentId=${studentId}`) }
                        className="py-2 px-4 mb-2 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white text-sm font-medium focus:outline-none focus:ring focus:ring-indigo-500"
                    >
                        Get Recommendations
                    </button>
                    <button
                        onClick={() => router.push(`/${username}/${studentId}/quiz/leaderboard?topic=${topic}`)}
                        className="py-2 px-4 mb-2 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white text-sm font-medium focus:outline-none focus:ring focus:ring-indigo-500"
                    >
                        Show Leaderboard
                    </button>
                    <button
                        onClick={() => router.push(`/${username}/${studentId}/quiz`)}
                        className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white text-sm font-medium focus:outline-none focus:ring focus:ring-indigo-500"
                    >
                        Go back to the quiz menu
                    </button>
                </div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div style={{marginLeft: isOpen ? "256px" : "64px", marginTop: "64px", width: `calc(100vw - ${isOpen ? "256px" : "64px"})`}} className="flex items-center justify-center h-screen bg-gray-100">
                <div className="bg-white p-8 rounded shadow-md w-96">
                    <h1 className="text-2xl font-bold text-center mb-4">Loading...</h1>
                </div>
            </div>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div style={{marginLeft: isOpen ? "256px" : "64px", marginTop: "64px", width: `calc(100vw - ${isOpen ? "256px" : "64px"})`}} className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96 relative">
                <h1 className="text-2xl font-bold text-center mb-4">Quiz</h1>
                <p className="text-gray-700 text-center mb-6">
                    Question {currentQuestionIndex + 1} of {questions.length}
                </p>
                <p className="text-gray-500 text-center mb-4">Time left: {timeLeft}s</p>

                <div className="bg-gray-50 p-4 rounded-md shadow-sm mb-6">
                    <p className="text-sm font-medium text-gray-700 mb-4">{currentQuestion.questionText}</p>
                    <div className="space-y-2">
                        {currentQuestion.options.map((option, index) => (
                            <div key={index} className="flex items-center">
                                <input
                                    type="radio"
                                    id={`${currentQuestionIndex}-${index}`}
                                    name={`question-${currentQuestionIndex}`}
                                    value={index}
                                    disabled={submitted}
                                    checked={userAnswers[currentQuestionIndex] === index}
                                    onChange={() => handleAnswerChange(index)}
                                    className="cursor-pointer"
                                />
                                <label
                                    htmlFor={`${currentQuestionIndex}-${index}`}
                                    className="ml-2 cursor-pointer"
                                >
                                    {option}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-between">
                        <button
                            onClick={handleSubmitAnswer}
                            disabled={submitted}
                            className={`${submitted ? "bg-gray-600 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"} py-2 px-4 rounded-md text-white text-sm font-medium focus:outline-none focus:ring focus:ring-green-500`}
                        >
                            Submit Answer
                        </button>
                    {currentQuestionIndex < questions.length - 1 ? (
                        <button
                            onClick={handleNextQuestion}
                            className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white text-sm font-medium focus:outline-none focus:ring focus:ring-indigo-500"
                        >
                            Next
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmitQuiz}
                            className="py-2 px-4 bg-red-600 hover:bg-red-700 rounded-md text-white text-sm font-medium focus:outline-none focus:ring focus:ring-green-500"
                        >
                            End Quiz
                        </button>
                    )}
                </div>
                {submitted && (
                    <div className={`${currentQuestion.correctAnswer === userAnswers[currentQuestionIndex] ? "bg-green-700" : "bg-red-700 text-white"} text-center mt-4`}>
                        <p className="text-white font-bold">
                            {currentQuestion.correctAnswer === userAnswers[currentQuestionIndex] ? "Correct!" : `Wrong! Explanation: ${currentQuestion.explanation}`}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
