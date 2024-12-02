"use server"

import readline from "readline";
import { loadQuestions, shuffleArray } from "./_modules/utils";
import { getQuestions, calculateScore } from "./_modules/quiz";

// Console interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to prompt user input
// const prompt = (query: string): Promise<string> =>
//   new Promise((resolve) => rl.question(query, resolve));

// Main function
export async function main(topic: string, difficulty: "Easy" | "Medium" | "Hard", answer: number) {
  console.log("Welcome to the DSA Quiz!");
  const questions = loadQuestions();

  // Step 1: Select topic
  console.log("\nAvailable Topics: Arrays, Trees");
  // const topic = (await prompt("Choose a topic: ")).trim();

  // // Step 2: Select difficulty
  // console.log("\nDifficulty Levels: Easy, Medium, Hard");
  // const difficulty = (await prompt("Choose a difficulty: ")).trim() as "Easy" | "Medium" | "Hard";

  // Step 3: Get questions
  let selectedQuestions = getQuestions(questions, topic, difficulty);
  if (selectedQuestions.length === 0) {
    console.log("No questions available for the chosen topic and difficulty.");
    rl.close();
    return;
  }

  // Shuffle questions
  selectedQuestions = shuffleArray(selectedQuestions);

  // Step 4: Conduct quiz
  const userAnswers: { questionId: number; selectedOption: number }[] = [];
  for (const question of selectedQuestions) {
    console.log(`\n${question.questionText}`);
    question.options.forEach((option, index) => console.log(`${index + 1}. ${option}`));

    // const answer = parseInt(await prompt("Your answer (1-4): "), 10) - 1;
    userAnswers.push({ questionId: question.id, selectedOption: answer });
  }

  // Step 5: Calculate score
  const score = calculateScore(userAnswers, selectedQuestions);
  console.log(`\nYour final score is: ${score}/${selectedQuestions.length}`);

  rl.close();
}
