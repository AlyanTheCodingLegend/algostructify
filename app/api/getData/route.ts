import { NextRequest, NextResponse } from "next/server";

export function GET() {
    // get user name from db or other source

    return NextResponse.json({name: "alyan"})
}

export function POST(context: ContextType, request: NextRequest){
    const dataFromFrontend = request.body

    // fetch user record using email from db, compare db password to user inputted password
    if (wrongpassword) {
        return NextResponse.json({user: null, error: "wrong credentials"})
    }

    return NextResponse.json({user: userAgent, error: null})
}

