import type { CorsOptions } from "cors";
import { env } from "./env.js";

/**
 * Single source of truth for CORS. Add additional trusted origins here
 * (e.g. a staging URL) rather than passing `origin: true` anywhere.
 */
const allowedOrigins = [env.CLIENT_URL];

export const corsOptions: CorsOptions = {
  origin(origin, callback) {
    // Allow requests with no origin (curl, server-to-server, mobile apps).
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }
    callback(new Error(`CORS: origin "${origin}" is not allowed`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
