import { main } from "@/app/_backend/_quizModule/_src/app";
import { ClientPageRoot } from "next/dist/client/components/client-page";
import { NextRequest, NextResponse } from "next/server";

export function GET() {
    // get user name from db or other source

    return NextResponse.json({name: "alyan"})
}

export async function POST(request: NextRequest){
    const req = await request.json()    
    console.log("from server: ",req)        

    const questions  =  await main(req.value.topic, req.value.difficulty, req.value.answer)
    console.log("hello: ",questions);
    return NextResponse.json(questions);
}


