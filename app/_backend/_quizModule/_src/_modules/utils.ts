import type { Question } from "../_types/questions";
import data from "../_data/questions.json"

// Function to load questions from JSON
export function loadQuestions(): Question[] {
  let questions: Question[] = []

  data.forEach((question) => {
    questions.push({...question, difficulty: question.difficulty as "Easy" | "Medium" | "Hard"})
  })

  return questions
}

// Shuffle questions (Fisher-Yates Algorithm)
export function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
