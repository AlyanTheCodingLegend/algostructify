import { NextRequest, NextResponse } from "next/server";
import { main } from "@/app/_backend/_quizModule/_src/app";
import { analyzePerformance } from "@/app/_backend/_quizModule/_src/_modules/recommendation";

export async function POST(request: NextRequest) {
  const req = await request.json();
  console.log("from server: ", req);

  const questions = await main(req.value.topic, req.value.difficulty, req.value.answer);
  return NextResponse.json(questions);
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const studentId = url.searchParams.get("studentId");

  if (studentId) {
    const recommendations = analyzePerformance(studentId);
    return NextResponse.json(recommendations);
  }

  return NextResponse.json({ message: "No studentId provided" });
}
