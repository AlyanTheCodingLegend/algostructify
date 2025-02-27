import { connectDB } from "@/app/_backend/lib/mongodb";
import { connectDB } from "@/app/_backend/lib/mongodb";

export type ScoreNode = {
  studentId: string;
  score: number;
  topic: string;
};

const COLLECTION_NAME = "leaderboard";

async function saveLeaderboard(data: ScoreNode) {
    const db = await connectDB();
    await db.collection<ScoreNode>(COLLECTION_NAME).updateOne(
      { studentId: data.studentId },
      { $set: { topic: data.topic, score: data.score } },
      { upsert: true }
    );
};

const COLLECTION_NAME = "leaderboard";

async function saveLeaderboard(data: ScoreNode) {
    const db = await connectDB();
    await db.collection<ScoreNode>(COLLECTION_NAME).updateOne(
      { studentId: data.studentId },
      { $set: { topic: data.topic, score: data.score } },
      { upsert: true }
    );
}

// Update leaderboard
export async function updateLeaderboard(studentId: string, score: number, topic: string) {
  const db = await connectDB();
  let student: ScoreNode | null = await db.collection<ScoreNode>(COLLECTION_NAME).findOne({ studentId, topic });

  // Update the score if the student and topic are found
  if (student) {
    if (score > student.score) {
      student.score = score;
    }
  } else {
    student = { studentId, score, topic };
export async function updateLeaderboard(studentId: string, score: number, topic: string) {
  const db = await connectDB();
  let student: ScoreNode | null = await db.collection<ScoreNode>(COLLECTION_NAME).findOne({ studentId, topic });

  // Update the score if the student and topic are found
  if (student) {
    if (score > student.score) {
      student.score = score;
    }
  } else {
    student = { studentId, score, topic };
  }

  saveLeaderboard(student);
  saveLeaderboard(student);
}


// Get leaderboard
export async function getLeaderboard(topic: string): Promise<ScoreNode[]> {
  const db = await connectDB();
  
  // Corrected collection type
  const leaderboard = await db.collection<ScoreNode>(COLLECTION_NAME).find({ topic }).sort({ score: -1 }).toArray();

  return leaderboard;
export async function getLeaderboard(topic: string): Promise<ScoreNode[]> {
  const db = await connectDB();
  
  // Corrected collection type
  const leaderboard = await db.collection<ScoreNode>(COLLECTION_NAME).find({ topic }).sort({ score: -1 }).toArray();

  return leaderboard;
}