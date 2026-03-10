import { ModuleResult } from "../../types/module";

export function generateMongodb(): ModuleResult {
  return {
    files: [
      {
        path: "src/infrastructure/database/mongoose.ts",
        content: `
                import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in environment variables");
}

let isConnected = false;

export async function connectDatabase(): Promise<void> {
  if (isConnected) return;

  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: process.env.DB_NAME || "mydb",
    });
    isConnected = true;
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
}

export async function disconnectDatabase(): Promise<void> {
  if (!isConnected) return;
  await mongoose.disconnect();
  isConnected = false;
}
                `.trim(),
      },
      {
        path: ".env",
        content: `MONGODB_URI=mongodb://localhost:27017\nDB_NAME=mydb`,
      },
      {
        path: ".env.example",
        content: `MONGODB_URI=mongodb://localhost:27017\nDB_NAME=mydb`,
      },
    ],
    dependencies: {
      dependencies: {
        mongoose: "^8.0.0",
      },
      devDependencies: {
        "@types/mongoose": "^5.11.97",
      },
      scripts: {},
    },
  };
}
