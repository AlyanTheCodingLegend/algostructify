import { loadPerformanceData } from "./performance";
import fs from "fs";

const TIPS_FILE = "./_data/tips.json";
const ACCURACY_THRESHOLD = 0.7; // 70% accuracy

interface TipData {
  [topic: string]: string;
}

// Load predefined tips
function loadTips(): TipData {
  return JSON.parse(fs.readFileSync(TIPS_FILE, "utf-8"));
}

// Analyze performance and return weak topics
export function analyzePerformance(studentId: string): { weakTopics: string[]; tips: string[] } {
  const performance = loadPerformanceData();
  const tips = loadTips();

  if (!performance[studentId]) return { weakTopics: [], tips: [] };

  const topics = performance[studentId].topics;
  const weakTopics: string[] = [];
  const improvementTips: string[] = [];

  Object.keys(topics).forEach((topic) => {
    const { correct, attempted, time } = topics[topic];
    const accuracy = correct / attempted;

    if (accuracy < ACCURACY_THRESHOLD || time > 120) {
      weakTopics.push(topic);
      improvementTips.push(tips[topic] || "Practice more questions for this topic.");
    }
  });

  return { weakTopics, tips: improvementTips };
}
