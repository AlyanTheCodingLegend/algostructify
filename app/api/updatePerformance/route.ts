import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
// import path from "path";
const filePath = "./app/_backend/_quizModule/_src/_data/performance.json";

export async function POST(request: NextRequest) {
  const req = await request.json();

  const { studentId, topic, correct, attempted, time } = req;

  // Calculate accuracy, normalized accuracy, and normalized time
  const accuracy = correct / attempted;
  const normalizedAccuracy = accuracy * 100;
  const normalizedTime = (time / 60) * 100;

  // Calculate threshold
  const threshold = (0.3 * normalizedTime) + (0.7 * normalizedAccuracy);

  // Path to the performance.json file
//   const filePath = path.resolve(process.cwd(), "performance.json");

  // Read the performance.json file
  const fileContent = fs.readFileSync(filePath, "utf-8");
  let performanceData = JSON.parse(fileContent);

  // Check if studentId exists
  if (performanceData[studentId]) {
    // Check if the topic exists for the student
    const existingData = performanceData[studentId].topics[topic];

    if (existingData) {
      // Compare thresholds
      const existingThreshold = (0.3 * (existingData.time / 60) * 100) + (0.7 * (existingData.correct / existingData.attempted) * 100);

      if (threshold > existingThreshold) {
        // Update data if the new threshold is higher
        performanceData[studentId].topics[topic] = { topic, correct, attempted, time };
      }
    } else {
      // Add new topic if it doesn't exist
      performanceData[studentId].topics[topic] = { topic, correct, attempted, time };
    }
  } else {
    // Add new student and topic if studentId doesn't exist
    performanceData[studentId] = {
      topics: {
        [topic]: { topic, correct, attempted, time }
      }
    };
  }

  // Write updated data back to performance.json
  fs.writeFileSync(filePath, JSON.stringify(performanceData, null, 2));

  // Return success response
  return NextResponse.json({ success: true, message: "Data updated successfully" });
}
