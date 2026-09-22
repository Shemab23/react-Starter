import type { NextFunction, Request, RequestHandler, Response } from "express";

type AsyncRouteHandler = (req: Request, res: Response, next: NextFunction) => Promise<unknown>;

/**
 * Express doesn't forward rejected promises to the error middleware on its
 * own. Wrap every async controller with this so a thrown/rejected error
 * ends up in error.middleware.ts instead of hanging the request.
 *
 *   router.get("/", asyncHandler(productController.list));
 */
export function asyncHandler(fn: AsyncRouteHandler): RequestHandler {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
