import "express-session";
import type { SessionUser } from "./auth.types.js";

declare module "express-session" {
  interface SessionData {
    userId?: SessionUser["id"];
  }
}

declare global {
  namespace Express {
    interface Request {
      /** Populated by auth.middleware.ts once authentication exists. */
      user?: SessionUser;
    }
  }
}

export {};
