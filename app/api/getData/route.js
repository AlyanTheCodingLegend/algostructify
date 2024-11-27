"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
exports.POST = POST;
const server_1 = require("next/server");
function GET() {
    // get user name from db or other source
    return server_1.NextResponse.json({ name: "alyan" });
}
function POST(context, request) {
    const dataFromFrontend = request.body;
    // fetch user record using email from db, compare db password to user inputted password
    if (wrongpassword) {
        return server_1.NextResponse.json({ user: null, error: "wrong credentials" });
    }
    return server_1.NextResponse.json({ user: userAgent, error: null });
}
