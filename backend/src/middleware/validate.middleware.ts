import { Request, Response, NextFunction } from "express";
import { z } from "zod";

type RequestSource = "body" | "query" | "params";

const validateRequest = (schema: z.ZodType, source: RequestSource) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[source]);
    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: result.error.issues.map((issue) => issue.message),
      });
    }

    if (source === "body") {
      req.body = result.data; // Assign the validated data back to the appropriate request property
    } else {
      res.locals[source] = result.data; // Assign the validated data back to the appropriate request property
    }

    next();
  };
};

export default validateRequest;
