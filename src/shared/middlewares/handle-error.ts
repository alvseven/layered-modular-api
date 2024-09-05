import type { NextFunction, Request, Response } from "express";

import { AppError } from "../errors/app";
import { parsedEnvs } from "../config/envs";

const handleErrorMiddleware = async (
  error: Error,
  _request: Request,
  response: Response,
  _next: NextFunction
) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      message: error.message,
      ...(parsedEnvs.NODE_ENV === "development" && { stack: error.stack }),
    });
  }

  return response.status(500).json({
    message: "Internal server error",
    ...(parsedEnvs.NODE_ENV === "development" && { stack: error.stack }),
  });
};

export { handleErrorMiddleware };
