import { loadPerformanceData } from "./performance";
import { connectDB } from "@/app/_backend/lib/mongodb";

interface TipData {
  topic: string
  description: string
}

// Load predefined tips
async function loadTips(): Promise<TipData[]> {
  const db = await connectDB();
  const tips = await db.collection<TipData>("tips").find({}).toArray();
  return tips || {};
}

// Analyze performance and classify topics
export async function analyzePerformance(studentId: string): Promise<{
  weakTopics: { topic: string; threshold: number }[];
  moderateTopics: { topic: string; threshold: number }[];
  strongTopics: { topic: string; threshold: number }[];
  tips: string[];
}>

{
  const performance = await loadPerformanceData(studentId);
  const tips = await loadTips();

  if (!performance) {
    return { weakTopics: [], moderateTopics: [], strongTopics: [], tips: [] };
  }

  const topics = performance.topics
  const weakTopics: { topic: string; threshold: number }[] = [];
  const moderateTopics: { topic: string; threshold: number }[] = [];
  const strongTopics: { topic: string; threshold: number }[] = [];
  const improvementTips: string[] = [];

  topics.forEach((topicData) => {
    const topic = Object.keys(topicData)[0];
    const { correct, attempted, time } = topicData[topic];

    const accuracy = correct / attempted;
    const maxTime = 60; // Maximum time allowed per question (in seconds)

    const normalizedAccuracy = accuracy * 100; // Convert accuracy to percentage
    const normalizedTime = (time/maxTime)*100; // Cap the time to the max time per difficulty

    // Calculate threshold
    const threshold = (0.3 * normalizedTime) + (0.7 * normalizedAccuracy);

    if (threshold < 60) {
      weakTopics.push({ topic, threshold });
      let tipFound = false;
      tips.forEach(tip => {
        if (tip.topic.toLowerCase() === topic.toLowerCase()) {
          improvementTips.push(tip.description);
          tipFound = true;
        }
      })
      if (!tipFound) {
        improvementTips.push("Practice more questions for this topic.");
      }
    } else if (threshold >= 60 && threshold < 80) {
      moderateTopics.push({ topic, threshold });
    } else {
      strongTopics.push({ topic, threshold });
    }
  });

  return { weakTopics, moderateTopics, strongTopics, tips: improvementTips };
}
