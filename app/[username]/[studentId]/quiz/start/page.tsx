"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { use, useEffect, useState } from "react";
import { Recommendations, type Question } from "@/app/_backend/_quizModule/_src/_types/questions";

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
    const [recommendations, setRecommendations] = useState<Recommendations | undefined>();

    const { username, studentId } = use(params);

    const router = useRouter();
    const searchParams = useSearchParams();
    const topic = searchParams.get("topic");
    const difficulty = searchParams.get("difficulty");
    const numQuestions = searchParams.get("questions");

    const timeLimit = difficulty === "Easy" ? 25 : difficulty === "Medium" ? 40 : 60;

    const [timeLeft, setTimeLeft] = useState(timeLimit);

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
            if (res.success) {
                setQuestions(res.questions);
                setIsLoading(false);
                setUserAnswers(Array(Number(numQuestions)).fill(-1)); // Initialize answers
            } else {
                router.push(`/${username}/quiz`);
            }
        }

        if (topic && difficulty && numQuestions) {
            getQuestions();
        }
    }, [topic, difficulty, numQuestions]);

    useEffect(() => {
        if (timeLeft === 0) {
            handleNextQuestion();
        }

        const timer = setTimeout(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [timeLeft]);

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
            setTimeLeft(timeLimit); // Reset timer for the next question
        }
    };

    const handleAnswerChange = (answerIndex: number) => {
        const updatedAnswers = [...userAnswers];
        updatedAnswers[currentQuestionIndex] = answerIndex;
        setUserAnswers(updatedAnswers);
    };

    const handleSubmitQuiz = async () => {
        setIsLoading(true);

        // Calculate score
        let quizScore = 0;
        questions.forEach((question, index) => {
            if (question.correctAnswer === userAnswers[index]) {
                quizScore++;
            }
        });

        setScore(quizScore);

        // Submit score to the server
        const response = await fetch("/api/updateLeaderboard", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                studentId,
                score,
                topic,
            }),
        });

        const reponsetwo = await fetch(`/api/getRecommendations?studentId=${studentId}`);
        const restwo = await reponsetwo.json();
        if (restwo.success) {
            setRecommendations(restwo.recommendations);
        }

        setShowResults(true);
        setIsLoading(false);
    };

    if (showResults) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <div className="bg-white p-8 rounded shadow-md w-96">
                    <h1 className="text-2xl font-bold text-center mb-4">Results</h1>
                    <p className="text-gray-700 text-center mb-6">Your score: {score} / {numQuestions}</p>
                    {(recommendations && (recommendations.weakTopics.length>0 || recommendations.moderateTopics.length>0 || recommendations.strongTopics.length>0 || recommendations.tips.length>0)) && (
                        <>
                            <h2 className="text-lg font-bold text-center mb-4">Recommendations</h2>
                            {recommendations.weakTopics.length > 0 && (
                                <div className="mb-4">
                                    <h3 className="text-md font-bold text-center mb-2">Weak Topics</h3>
                                    <ul className="list-disc list-inside">
                                        {recommendations.weakTopics.map((topic, index) => (
                                            <li key={index}>Topic: {topic.topics} | Threshold: {topic.threshold}</li>
                                        ))}
                                    </ul>
                                </div>    
                            )}
                            {recommendations.moderateTopics.length > 0 && (
                                <div className="mb-4">
                                    <h3 className="text-md font-bold text-center mb-2">Moderate Topics</h3>
                                    <ul className="list-disc list-inside">
                                        {recommendations.moderateTopics.map((topic, index) => (
                                            <li key={index}>Topic: {topic.topics} | Threshold: {topic.threshold}</li>
                                        ))}
                                    </ul>
                                </div>    
                            )}
                            {recommendations.strongTopics.length > 0 && (
                                <div className="mb-4">
                                    <h3 className="text-md font-bold text-center mb-2">Strong Topics</h3>
                                    <ul className="list-disc list-inside">
                                        {recommendations.strongTopics.map((topic, index) => (
                                            <li key={index}>Topic: {topic.topics} | Threshold: {topic.threshold}</li>
                                        ))}
                                    </ul>
                                </div>    
                            )}
                            {recommendations.tips.length > 0 && (
                                <div className="mb-4">
                                    <h3 className="text-md font-bold text-center mb-2">Tips</h3>
                                    <ul className="list-disc list-inside">
                                        {recommendations.tips.map((tip, index) => (
                                            <li key={index}>{tip}</li>
                                        ))}
                                    </ul>
                                </div>  
                            )}
                        </>
                    )}
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
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <div className="bg-white p-8 rounded shadow-md w-96">
                    <h1 className="text-2xl font-bold text-center mb-4">Loading...</h1>
                </div>
            </div>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
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
                            className="py-2 px-4 bg-green-600 hover:bg-green-700 rounded-md text-white text-sm font-medium focus:outline-none focus:ring focus:ring-green-500"
                        >
                            Submit Quiz
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
