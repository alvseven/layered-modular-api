import type { NextFunction, Request, Response } from "express";

import { parsedEnvs } from "../config/envs";

const handleErrorMiddleware = async (
  error: Error,
  _request: Request,
  response: Response,
  _next: NextFunction
) => {
  const isDebugMode = parsedEnvs.NODE_ENV === "debug";

  if (error.name === "SyntaxError" && error.message.includes("JSON")) {
    return response.status(400).json({
      status: "error",
      message: "Invalid JSON",
    });
  }

  return response.status(500).json({
    message: "Internal server error",
    ...(isDebugMode && { stack: error.stack }),
  });
};

export { handleErrorMiddleware };
