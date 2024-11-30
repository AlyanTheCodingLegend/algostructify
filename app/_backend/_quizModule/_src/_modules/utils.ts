import fs from "fs";
import path from "path";
import { Question } from "../_types/questions";

// Function to load questions from JSON
export function loadQuestions(): Question[] {
  const filePath = path.join(__dirname, "../_data/questions.json");
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data);
}

// Shuffle questions (Fisher-Yates Algorithm)
export function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
