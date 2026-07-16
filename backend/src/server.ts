import http from "node:http";
import { createApp } from "./app";
import { env } from "./config/env";
import { connectDatabase } from "./database/connection";
import { registerJobs } from "./jobs";
import { initSocket } from "./socket";
import { logger } from "./utils/logger";

async function bootstrap() {
  await connectDatabase();

  const app = createApp();
  const server = http.createServer(app);
  initSocket(server);
  registerJobs();

  server.listen(env.PORT, () => {
    logger.info(`${env.APP_NAME} listening`, {
      port: env.PORT,
      env: env.NODE_ENV,
      prefix: env.API_PREFIX,
    });
  });

  const shutdown = async (signal: string) => {
    logger.info(`${signal} received — shutting down`);
    server.close(async () => {
      const { disconnectDatabase } = await import("./database/connection");
      await disconnectDatabase();
      process.exit(0);
    });
  };

  process.on("SIGTERM", () => void shutdown("SIGTERM"));
  process.on("SIGINT", () => void shutdown("SIGINT"));
  process.on("unhandledRejection", (reason) => {
    logger.error("Unhandled rejection", { reason });
  });
  process.on("uncaughtException", (error) => {
    logger.error("Uncaught exception", { error });
    process.exit(1);
  });
}

bootstrap().catch((error) => {
  logger.error("Failed to start server", { error });
  process.exit(1);
});
