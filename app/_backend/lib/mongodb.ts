import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;

const cachedClient: MongoClient | null = null;

export async function connectDB() {
  if (cachedClient) return cachedClient.db("algostructify");

  if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable");
  }

  const client = new MongoClient(MONGODB_URI, {
    tls: true,
    tlsAllowInvalidCertificates: true,
    retryWrites: true,
  });
  await client.connect();
  return client.db("algostructify");
}