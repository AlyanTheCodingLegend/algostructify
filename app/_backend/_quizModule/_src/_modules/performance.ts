import { connectDB } from "@/app/_backend/lib/mongodb";

// Interface for performance data
interface TopicPerformance {
  correct: number;
  attempted: number;
  time: number; // Total time spent on the topic
}


interface StudentPerformance {
  studentId: string; 
  topics: { [topic: string]: TopicPerformance }[];
}

const COLLECTION_NAME = "performance";

// Load performance data
export async function loadPerformanceData(studentId: string): Promise<StudentPerformance | null> {
  const db = await connectDB();
  const student = await db.collection<StudentPerformance>(COLLECTION_NAME).findOne({ studentId });

  return student;
}

// Save updated performance data
export async function savePerformanceData(data: StudentPerformance): Promise<void> {
  const db = await connectDB()
  
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
  const db = await connectDB();

  // Find student data
  const student = await db.collection<StudentPerformance>(COLLECTION_NAME).findOne({ studentId });

  // Merge new topic data with existing data
  let existingTopic: TopicPerformance = { correct: 0, attempted: 0, time: 0 };
  student?.topics.forEach(t => {
    if (t[topic]) {
      existingTopic = t[topic];
    }
  })

  if (!student) {
    return;
  }

  const updatedTopics = [
    ...student.topics,
    {[topic]: {
      correct: existingTopic.correct + correct,
      attempted: existingTopic.attempted + attempted,
      time: existingTopic.time + time,
    }},
  ]

  await savePerformanceData({ studentId, topics: updatedTopics });
}
