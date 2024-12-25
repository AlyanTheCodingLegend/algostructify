import { NextRequest, NextResponse } from "next/server";
import { main } from "@/app/_backend/_quizModule/_src/app";
import { analyzePerformance } from "@/app/_backend/_quizModule/_src/_modules/recommendation";
import { updateLeaderboard, getLeaderboard } from "@/app/_backend/_quizModule/_src/_modules/leaderboard";

export async function POST(request: NextRequest) {
  const req = await request.json();
  console.log("from server: ", req);

  const { studentId, score, topic } = req;
  if (studentId && score !== undefined && topic) {
    updateLeaderboard(studentId, score, topic);
    return NextResponse.json({ message: "Leaderboard updated" });
  }

  const questions = await main(req.value.topic, req.value.difficulty, req.value.answer);
  return NextResponse.json(questions);
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const studentId = url.searchParams.get("studentId");
  const topic = url.searchParams.get("topic");

  if (studentId) {
    const recommendations = analyzePerformance(studentId);
    return NextResponse.json(recommendations);
  }

  if (topic) {
    const leaderboard = getLeaderboard(topic);
    return NextResponse.json(leaderboard);
  }

  return NextResponse.json({ message: "Invalid request" });
}
