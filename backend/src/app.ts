import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import hpp from "hpp";
import morgan from "morgan";
import path from "node:path";
import swaggerUi from "swagger-ui-express";

import { corsOrigins, env } from "./config/env";
import { apiLimiter } from "./middlewares/rateLimiter";
import { errorHandler } from "./middlewares/errorHandler";
import { notFound } from "./middlewares/notFound";
import routes from "./routes";
import { swaggerSpec } from "./docs/swagger";
import { logger } from "./utils/logger";

export function createApp() {
  const app = express();

  app.set("trust proxy", 1);

  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: "cross-origin" },
    }),
  );
  app.use(
    cors({
      origin(origin, callback) {
        if (!origin || corsOrigins.includes(origin) || env.NODE_ENV !== "production") {
          callback(null, true);
          return;
        }
        callback(new Error(`CORS blocked for origin: ${origin}`));
      },
      credentials: true,
    }),
  );
  app.use(compression());
  app.use(cookieParser());
  app.use(express.json({ limit: "2mb" }));
  app.use(express.urlencoded({ extended: true, limit: "2mb" }));
  app.use(mongoSanitize());
  app.use(hpp());

  if (env.NODE_ENV !== "test") {
    app.use(
      morgan(env.NODE_ENV === "production" ? "combined" : "dev", {
        stream: {
          write: (message: string) => logger.info(message.trim()),
        },
      }),
    );
  }

  app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
  app.use("/api/uploads", express.static(path.join(process.cwd(), "uploads")));

  app.get("/", (_req, res) => {
    res.json({
      success: true,
      message: env.APP_NAME,
      docs: `${env.API_PREFIX}/docs`,
      health: `${env.API_PREFIX}/health`,
    });
  });

  app.use(`${env.API_PREFIX}/docs`, swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get(`${env.API_PREFIX}/docs.json`, (_req, res) => res.json(swaggerSpec));

  app.use(env.API_PREFIX, apiLimiter, routes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
