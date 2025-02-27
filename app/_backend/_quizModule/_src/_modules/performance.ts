import { connectDB } from "@/app/_backend/lib/mongodb";

// Interface for performance data
interface TopicPerformance {
  topic: string;
  correct: number;
  attempted: number;
  time: number; // Total time spent on the topic
}


interface StudentPerformance {
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
  studentId: string,
  topic: string,
  correct: number,
  attempted: number,
  time: number
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
}
