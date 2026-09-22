import type { Response } from "express";
import type { ApiSuccessResponse } from "../types/api.types.js";

export function successResponse<T>(
  res: Response,
  data: T,
  message?: string,
  statusCode = 200
): Response<ApiSuccessResponse<T>> {
  return res.status(statusCode).json({
    success: true,
    data,
    ...(message ? { message } : {}),
  });
}

export function createdResponse<T>(res: Response, data: T, message = "Created"): Response {
  return successResponse(res, data, message, 201);
}
