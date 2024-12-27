import { getLeaderboard, updateLeaderboard } from "@/app/_backend/_quizModule/_src/_modules/leaderboard";
import { analyzePerformance } from "@/app/_backend/_quizModule/_src/_modules/recommendation";
import { NextRequest, NextResponse } from "next/server";


// give data to frontend
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