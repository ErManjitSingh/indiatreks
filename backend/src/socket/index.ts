import type { Server as HttpServer } from "node:http";
import { Server } from "socket.io";
import { corsOrigins, env } from "../config/env";
import { logger } from "../utils/logger";

let io: Server | null = null;

export function initSocket(server: HttpServer): Server {
  io = new Server(server, {
    cors: {
      origin: corsOrigins.length ? corsOrigins : env.FRONTEND_URL,
      credentials: true,
    },
    path: "/socket.io",
  });

  io.on("connection", (socket) => {
    logger.debug("Socket connected", { id: socket.id });
    socket.on("join", (room: string) => {
      if (typeof room === "string" && room.length < 100) socket.join(room);
    });
    socket.on("disconnect", () => {
      logger.debug("Socket disconnected", { id: socket.id });
    });
  });

  return io;
}

export function getIO(): Server {
  if (!io) throw new Error("Socket.io not initialized");
  return io;
}

export function emitNotification(room: string, payload: unknown) {
  if (!io) return;
  io.to(room).emit("notification", payload);
}
