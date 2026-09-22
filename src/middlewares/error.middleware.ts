import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { isDev } from "../config/env.js";
import { logger } from "../utils/logger.js";

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Converts anything thrown or passed to next() into one consistent JSON
 * error shape. This must be the LAST middleware registered in app.ts.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorMiddleware(err: unknown, req: Request, res: Response, next: NextFunction): void {
  if (err instanceof ZodError) {
    res.status(422).json({
      success: false,
      message: "Validation failed",
      errors: err.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      })),
    });
    return;
  }

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
    return;
  }

  const error = err instanceof Error ? err : new Error("Unknown error");
  logger.error(error.stack ?? error.message);

  res.status(500).json({
    success: false,
    message: "Internal server error",
    ...(isDev ? { stack: error.stack } : {}),
  });
}
