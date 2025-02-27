<<<<<<< HEAD
import fs from "fs";
=======
import { connectDB } from "@/app/_backend/lib/mongodb";
>>>>>>> 72a9ca9f8182a6195185e7a30d81fb7ff307edde

// Interface for performance data
interface TopicPerformance {
  topic: string;
  correct: number;
  attempted: number;
  time: number; // Total time spent on the topic
}


interface StudentPerformance {
<<<<<<< HEAD
  [studentId: string]: {
    topics: { [topic: string]: TopicPerformance };
  };
}

const PERFORMANCE_FILE = "./app/_backend/_quizModule/_src/_data/performance.json";

// Load performance data
export function loadPerformanceData(): StudentPerformance {
  if (!fs.existsSync(PERFORMANCE_FILE)) return {};
  const data = fs.readFileSync(PERFORMANCE_FILE, "utf-8");
  return JSON.parse(data) as StudentPerformance;
}

// Save updated performance datA
export function savePerformanceData(data: StudentPerformance): void {
  fs.writeFileSync(PERFORMANCE_FILE, JSON.stringify(data, null, 2), "utf-8");
}

// Update performance after a quiz
export function updatePerformance(
=======
  studentId: string; 
  topics: { [topic: string]: TopicPerformance };
}

const COLLECTION_NAME = "performance";

// Load performance data
export async function loadPerformanceData(studentId: string): Promise<StudentPerformance | null> {
  const client = await connectDB()
  const db = client.db()
  const student = await db.collection<StudentPerformance>(COLLECTION_NAME).findOne({ studentId });

  return student;
}

// Save updated performance data
export async function savePerformanceData(data: StudentPerformance): Promise<void> {
  const client = await connectDB()
  const db = client.db()
  await db.collection<StudentPerformance>(COLLECTION_NAME).updateOne(
    { studentId: data.studentId },
    { $set: { topics: data.topics } },
    { upsert: true }
  );
}

// Update performance after a quiz
export async function updatePerformance(
>>>>>>> 72a9ca9f8182a6195185e7a30d81fb7ff307edde
  studentId: string,
  topic: string,
  correct: number,
  attempted: number,
  time: number
<<<<<<< HEAD
): void {
  const performance = loadPerformanceData();
  if (!performance[studentId]) performance[studentId] = { topics: {} };

  performance[studentId].topics[topic] = {
    topic, 
    correct: (performance[studentId].topics[topic]?.correct || 0) + correct,
    attempted: (performance[studentId].topics[topic]?.attempted || 0) + attempted,
    time: (performance[studentId].topics[topic]?.time || 0) + time,
  };

  savePerformanceData(performance);
=======
): Promise<void> {
  const client = await connectDB();
  const db = client.db();

  // Find student data
  const student = await db.collection<StudentPerformance>(COLLECTION_NAME).findOne({ studentId });

  // Merge new topic data with existing data
  const existingTopic = student?.topics?.[topic] || { correct: 0, attempted: 0, time: 0 };

  const updatedTopics = {
    ...student?.topics,
    [topic]: {
      topic,
      correct: existingTopic.correct + correct,
      attempted: existingTopic.attempted + attempted,
      time: existingTopic.time + time,
    },
  };

  await savePerformanceData({ studentId, topics: updatedTopics });
>>>>>>> 72a9ca9f8182a6195185e7a30d81fb7ff307edde
}
