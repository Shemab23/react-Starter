import { createServer } from "node:http";
import { createApp } from "./app.js";
import { env } from "./config/env.js";
import { pool } from "./database/client.js";
import { initSocket } from "./lib/socket.js";
import { logger } from "./utils/logger.js";

/**
 * The only job of this file: load environment → create the app → start
 * listening. No user registration, no product creation, no direct
 * database queries — that all lives below the app/router layer.
 */
async function main(): Promise<void> {
  // Fail fast if the database is unreachable, rather than starting a
  // server that will error on the first real request.
  await pool.query("SELECT 1");
  logger.info("Database connection verified.");

  const app = createApp();
  const httpServer = createServer(app);

  initSocket(httpServer);

  httpServer.listen(env.PORT, () => {
    logger.info(`Server listening on port ${env.PORT} [${env.NODE_ENV}]`);
  });

  const shutdown = async (signal: string): Promise<void> => {
    logger.info(`${signal} received — shutting down gracefully.`);
    httpServer.close(() => logger.info("HTTP server closed."));
    await pool.end();
    process.exit(0);
  };

  process.on("SIGINT", () => void shutdown("SIGINT"));
  process.on("SIGTERM", () => void shutdown("SIGTERM"));
}

main().catch((err) => {
  console.error("❌ Failed to start server:", err);
  process.exit(1);
});
