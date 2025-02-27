import { connectDB } from '@/app/_backend/lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

type User = {
    username: string;
    studentId: string;
    password: string;
};

export async function POST(request: NextRequest) {
    const req = await request.json();
    const { username, studentId, password } = req;

    // Check if all required fields are provided
    if (!username || !studentId || !password) {
        return NextResponse.json(
            { status: 400, message: 'Please provide username, student ID, and password.' },
            { status: 400 }
        );
    }

    // Check if the username or studentId already exists
    const db = await connectDB();
    const user = await db.collection<User>('users').findOne({ username });

    if (user) {
        return NextResponse.json(
            { status: 400, message: 'Username already exists. Please choose a different username.' },
            { status: 400 }
        );
    }

    const newPassword = await bcrypt.hash(password, 10);
    const newUser: User = { username, studentId, password: newPassword };
    
    await db.collection<User>('users').insertOne(newUser);  

    return NextResponse.json({ message: `Signup successful! Welcome, ${username}.` });
}
