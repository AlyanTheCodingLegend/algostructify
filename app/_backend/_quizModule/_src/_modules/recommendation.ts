import { loadPerformanceData } from "./performance";
import fs from "fs";

const TIPS_FILE = "./_data/tips.json";

interface TipData {
  [topic: string]: string;
}

// Load predefined tips
function loadTips(): TipData {
  return JSON.parse(fs.readFileSync(TIPS_FILE, "utf-8"));
}

// Analyze performance and classify topics
export function analyzePerformance(studentId: string): {
  weakTopics: { topic: string; threshold: number }[];
  moderateTopics: { topic: string; threshold: number }[];
  strongTopics: { topic: string; threshold: number }[];
  tips: string[];
} {
  const performance = loadPerformanceData();
  const tips = loadTips();

  if (!performance[studentId]) {
    return { weakTopics: [], moderateTopics: [], strongTopics: [], tips: [] };
  }

  const topics = performance[studentId].topics;
  const weakTopics: { topic: string; threshold: number }[] = [];
  const moderateTopics: { topic: string; threshold: number }[] = [];
  const strongTopics: { topic: string; threshold: number }[] = [];
  const improvementTips: string[] = [];

  Object.keys(topics).forEach((topic) => {
    const { correct, attempted, time, difficulty } = topics[topic] as unknown as {
      correct: number;
      attempted: number;
      time: number;
      difficulty: string;
    };
    const accuracy = correct / attempted;
    const maxTime = difficulty === "Easy" ? 25 : difficulty === "Medium" ? 40 : 60;

    const normalizedAccuracy = accuracy * 100; // Convert accuracy to percentage
    const normalizedTime = (time/60)*100; // Cap the time to the max time per difficulty

    // Calculate threshold
    const threshold = (0.3 * normalizedTime) + (0.7 * normalizedAccuracy);

    if (threshold < 60) {
      weakTopics.push({ topic, threshold });
      improvementTips.push(tips[topic] || "Practice more questions for this topic.");
    } else if (threshold >= 60 && threshold < 80) {
      moderateTopics.push({ topic, threshold });
    } else {
      strongTopics.push({ topic, threshold });
    }
  });

  return { weakTopics, moderateTopics, strongTopics, tips: improvementTips };
}
