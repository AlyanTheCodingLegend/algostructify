import { MongoClient } from "mongodb";

const MONGODB_URI = "mongodb+srv://abdullahwaqar121105:rMdG1mcDcTfaWorD@algostructify.t96fr.mongodb.net/?retryWrites=true&w=majority&appName=AlgoStructify";

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

let cachedClient: MongoClient | null = null;

export async function connectDB() {
  if (cachedClient) return cachedClient;

  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  cachedClient = client;
  return client;
}