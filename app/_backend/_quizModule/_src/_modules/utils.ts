// _modules/utils.ts
import { type Question } from "../_types/questions";
import HashMap from "@/app/_datastructures/HashMap"
import { connectDB } from "@/app/_backend/lib/mongodb";

// Function to load questions from JSON into a HashMap (keyed by question ID)
export async function loadQuestions(topic: string, difficulty: "Easy" | "Medium" | "Hard"): Promise<HashMap<number, Question>> {
  const questionsMap = new HashMap<number, Question>();

  // Load questions from the database
  const db = await connectDB();
  const questions = await db.collection<Question>('questions').find({ topic, difficulty }).toArray();

  console.log(db.databaseName);

  // Add questions to the HashMap
  questions.forEach((question) => {
    questionsMap.set(question.id, question);
  });

  return questionsMap;
}

// Shuffle the keys of the HashMap using a modified Fisher-Yates Algorithm
export function shuffleMap(map: HashMap<number, Question>): Question[] {
  const keys = Array.from(map.keys());  // Get an array of keys
  for (let i = keys.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // Swap the keys
    [keys[i], keys[j]] = [keys[j], keys[i]];
  }

  // Return the questions in shuffled order based on the shuffled keys
  return keys.map(key => map.get(key)!);
}
