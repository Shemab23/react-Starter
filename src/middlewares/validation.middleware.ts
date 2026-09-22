import type { NextFunction, Request, Response } from "express";
import type { ZodTypeAny } from "zod";

type RequestPart = "body" | "query" | "params";

/**
 * Usage in a routes file:
 *
 *   router.post("/", validate(createProductSchema), productController.create);
 *
 * On failure, the ZodError is forwarded to next() and handled centrally
 * by error.middleware.ts — validators never format their own responses.
 */
export function validate(schema: ZodTypeAny, part: RequestPart = "body") {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      req[part] = schema.parse(req[part]);
      next();
    } catch (err) {
      next(err);
    }
  };
}
