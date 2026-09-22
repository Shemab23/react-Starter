import type { Request, Response } from "express";

/**
 * Registered after all routes, before the error handler. Anything that
 * reaches here matched no route at all.
 */
export function notFoundMiddleware(req: Request, res: Response): void {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
}
