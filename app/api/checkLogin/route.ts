// this API route is responsible for checking if the user's login
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { connectDB } from '@/app/_backend/lib/mongodb';

type User = {
    username: string;
    studentId: string;
    password: string;
};

const COLLECTION_NAME = "users";

export async function POST(request: NextRequest) {
    const req = await request.json();
    const { username, studentId, password } = req;

    // Check if all required fields are provided
    if (!username || !studentId || !password) {
        return NextResponse.json(
            { message: 'Please provide username, student ID, and password.' },
            { status: 400 }
        );
    }

    // Find the user with the given username, studentId, and password
    const db = await connectDB();
    const user = await db.collection<User>(COLLECTION_NAME).findOne({ studentId, username });

    if (user && bcrypt.compareSync(password, user.password)) {
        return NextResponse.json({
            success: true,
            message: `Login successful! Welcome, ${user.username}.`,
        });
    } else {
        return NextResponse.json(
            { success: false, message: 'Invalid username, student ID, or password.' },
            { status: 401 }
        );
    }
}
