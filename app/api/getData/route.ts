import { main } from "@/app/_backend/_quizModule/_src/app";
import { NextRequest, NextResponse } from "next/server";

export function GET() {
    // get user name from db or other source

    return NextResponse.json({name: "alyan"})
}

export async function POST(request: NextRequest){
    const { value } = await request.json()    

    await main(value.topic, value.difficulty, value.answer-1)
    
    return NextResponse.json({})
}


