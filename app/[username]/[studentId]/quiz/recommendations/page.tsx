"use client";

import { Recommendations } from "@/app/_backend/_quizModule/_src/_types/questions";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react"

export default function Page() {
    const { studentId } = useParams();

    const [recommendations, setRecommendations] = useState<Recommendations | undefined>();


    useEffect(() => {
        async function getRecommendations() {
            const response = await fetch(`/api/getRecommendations?studentId=${studentId}`);
            const res = await response.json();
            if (res.success) {
                setRecommendations(res.recommendations);
            }
        }

        getRecommendations();
    }, []);

    if (recommendations && (recommendations.weakTopics.length>0 || recommendations.moderateTopics.length>0 || recommendations.strongTopics.length>0 || recommendations.tips.length>0)) { return (
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

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h1 className="text-2xl font-bold text-center mb-4">No recommendations available</h1>
            </div>
        </div>
    )
}
