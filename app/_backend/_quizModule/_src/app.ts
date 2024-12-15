// app.ts
"use server";

import readline from "readline";
import { loadQuestions, shuffleMap } from "./_modules/utils";
import { calculateScore } from "./_modules/quiz";

// Console interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Main function to start the quiz
export async function main(topic: string, difficulty: "Easy" | "Medium" | "Hard", answer: number) {
  console.log("Welcome to the DSA Quiz!");

  // Load the questions directly into the 'questionsMap' (HashMap)
  const questionsMap = loadQuestions(topic, difficulty);

  if (questionsMap.size === 0) {
    console.log("No questions available for the chosen topic and difficulty.");
    rl.close();
    return;
  }

  // Step 1: Shuffle the questions using the modified Fisher-Yates algorithm
  const shuffledQuestions = shuffleMap(questionsMap);

  // Step 2: Conduct the quiz
  const userAnswers: { questionId: number; selectedOption: number }[] = [];
  for (const question of shuffledQuestions) {
    console.log(`\n${question.questionText}`);
    question.options.forEach((option, index) => console.log(`${index + 1}. ${option}`));

    // Simulate user answer (you can replace this with actual user input)
    userAnswers.push({ questionId: question.id, selectedOption: answer });
  }

  // Step 3: Calculate the final score
  const score = calculateScore(userAnswers, shuffledQuestions);
  console.log(`\nYour final score is: ${score}/${shuffledQuestions.length}`);

  rl.close();
}
