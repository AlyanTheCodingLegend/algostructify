import { NextRequest, NextResponse } from "next/server";

export function GET() {
    // get user name from db or other source

    return NextResponse.json({name: "alyan"})
}

export async function POST(request: NextRequest){
    const req = await request.json()
    console.log(req.email)
    console.log(req.password)

    return NextResponse.json({loggedIn: true})
}


