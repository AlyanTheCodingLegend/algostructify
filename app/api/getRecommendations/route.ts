import { NextRequest, NextResponse } from 'next/server';
import { analyzePerformance } from '@/app/_backend/_quizModule/_src/_modules/recommendation';

export async function GET(request: NextRequest) {
    const url = new URL(request.url);
    const studentId = url.searchParams.get("studentId");
  
    if (studentId) {
      const recommendations = analyzePerformance(studentId);
      return NextResponse.json(recommendations);
    }
    return NextResponse.json({ message: "Invalid request" });

}