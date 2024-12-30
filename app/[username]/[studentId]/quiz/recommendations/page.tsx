"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react"

type Recommendations = {
    weakTopics: {
      topic: string;
      threshold: number;
    }[],
    moderateTopics: {
      topic: string;
      threshold: number;
    }[],
    strongTopics: {
      topic: string;
      threshold: number;
    }[],
    tips: string[];
  }

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

    if (
        recommendations &&
        (recommendations.weakTopics.length > 0 ||
          recommendations.moderateTopics.length > 0 ||
          recommendations.strongTopics.length > 0 ||
          recommendations.tips.length > 0)
      ) {
        return (
          <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 border-b pb-3">
              Recommendations
            </h2>
      
            {recommendations.weakTopics.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-red-600 mb-3">Weak Topics</h3>
                <ul className="space-y-2">
                  {recommendations.weakTopics.map((topic, index) => (
                    <li
                      key={index}
                      className="bg-red-50 border-l-4 border-red-500 p-3 rounded shadow-sm"
                    >
                      <span className="font-semibold">Topic:</span> {topic.topic} |{" "}
                      <span className="font-semibold">Threshold:</span> {topic.threshold}
                    </li>
                  ))}
                </ul>
              </div>
            )}
      
            {recommendations.moderateTopics.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-yellow-600 mb-3">
                  Moderate Topics
                </h3>
                <ul className="space-y-2">
                  {recommendations.moderateTopics.map((topic, index) => (
                    <li
                      key={index}
                      className="bg-yellow-50 border-l-4 border-yellow-500 p-3 rounded shadow-sm"
                    >
                      <span className="font-semibold">Topic:</span> {topic.topic} |{" "}
                      <span className="font-semibold">Threshold:</span> {topic.threshold}
                    </li>
                  ))}
                </ul>
              </div>
            )}
      
            {recommendations.strongTopics.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-green-600 mb-3">
                  Strong Topics
                </h3>
                <ul className="space-y-2">
                  {recommendations.strongTopics.map((topic, index) => (
                    <li
                      key={index}
                      className="bg-green-50 border-l-4 border-green-500 p-3 rounded shadow-sm"
                    >
                      <span className="font-semibold">Topic:</span> {topic.topic} |{" "}
                      <span className="font-semibold">Threshold:</span> {topic.threshold}
                    </li>
                  ))}
                </ul>
              </div>
            )}
      
            {recommendations.tips.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-blue-600 mb-3">Tips</h3>
                <ul className="space-y-2">
                  {recommendations.tips.map((tip, index) => (
                    <li
                      key={index}
                      className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded shadow-sm"
                    >
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      }
      

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h1 className="text-2xl font-bold text-center mb-4">No recommendations available</h1>
            </div>
        </div>
    )
}
