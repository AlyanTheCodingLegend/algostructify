import { NextRequest, NextResponse } from "next/server";
import { main } from "@/app/_backend/_quizModule/_src/app";

export async function POST(request: NextRequest) {
  const req = await request.json();

  const questions = await main(req.value.topic, req.value.difficulty, req.value.answer,req.value.numQuestions);
  return NextResponse.json(questions);
}
