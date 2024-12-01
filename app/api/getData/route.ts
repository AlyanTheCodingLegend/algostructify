import { NextRequest, NextResponse } from "next/server";

export function GET() {
    // get user name from db or other source

    return NextResponse.json({name: "alyan"})
}

export async function POST(request: NextRequest){
    const userAgent = await request.json()

    return NextResponse.json({user: userAgent, error: null})
}

