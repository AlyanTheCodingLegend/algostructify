import Link from "next/link";
import { use } from "react";

type DashboardProps = {
    params: Promise<{
        username: string;
        studentId: string;
    }>;
};

export default function Dashboard({ params }: DashboardProps) {
    const { username, studentId } = use(params);

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h1 className="text-2xl font-bold text-center mb-4">Dashboard</h1>
                <p className="text-gray-700 text-center mb-6">Welcome, {username}</p>
                <div className="space-y-4">
                    <Link href={`/${username}/${studentId}/menu`}>
                        <div className="w-full mb-2 py-2 px-4 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white text-sm text-center font-medium focus:outline-none focus:ring focus:ring-indigo-500">
                            Visualize Data Structures
                        </div>
                    </Link>
                    <Link href={`/${username}/${studentId}/quiz`}>
                        <div className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white text-sm text-center font-medium focus:outline-none focus:ring focus:ring-indigo-500">
                            Attempt A Quiz
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
