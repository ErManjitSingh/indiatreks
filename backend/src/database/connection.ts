import mongoose from "mongoose";
import { env } from "../config/env";
import { logger } from "../utils/logger";

export async function connectDatabase(): Promise<typeof mongoose> {
  mongoose.set("strictQuery", true);
  const conn = await mongoose.connect(env.MONGODB_URI, {
    dbName: env.MONGODB_DB,
    autoIndex: env.NODE_ENV !== "production",
  });
  logger.info("MongoDB connected", {
    host: conn.connection.host,
    db: conn.connection.name,
  });
  return conn;
}

export async function disconnectDatabase(): Promise<void> {
  await mongoose.disconnect();
  logger.info("MongoDB disconnected");
}
