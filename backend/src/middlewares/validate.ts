import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";
import { ApiError } from "../utils/ApiError";

type RequestPart = "body" | "query" | "params";

export const validate = (schema: ZodType, part: RequestPart = "body") => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[part]);
    if (!result.success) {
      const details = result.error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      }));
      throw new ApiError(422, "Validation failed", "VALIDATION_ERROR", details);
    }
    (req as Record<RequestPart, unknown>)[part] = result.data;
    next();
  };
};
