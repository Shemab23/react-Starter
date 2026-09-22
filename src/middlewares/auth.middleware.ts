import type { NextFunction, Request, Response } from "express";
import { AppError } from "./error.middleware.js";

/**
 * Not wired into app.ts by default — this becomes active once a project
 * actually has authentication (a `users` table + login route).
 *
 * Usage on a protected route:
 *
 *   router.get("/me", requireAuth, userController.me);
 *
 * Expects req.session.userId to be set by a login flow (see types/auth.types.ts).
 */
export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (!req.session?.userId) {
    next(new AppError("Authentication required", 401));
    return;
  }
  next();
}
