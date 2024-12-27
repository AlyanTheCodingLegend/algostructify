import { updateLeaderboard } from "@/app/_backend/_quizModule/_src/_modules/leaderboard";
import { NextRequest, NextResponse } from "next/server";
// import { main } from "@/app/_backend/_quizModule/_src/app";

export async function POST(request: NextRequest) {
  const req = await request.json();
  console.log("from server: ", req);

  const { studentId, score, topic } = req;
  if (req) {
    updateLeaderboard(studentId, score, topic);
    return NextResponse.json({ message: "Leaderboard updated" });
  } else {
    return NextResponse.json({ message: "Invalid request" });
  }
}