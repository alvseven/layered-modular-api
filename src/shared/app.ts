import "express-async-errors";

import express from "express";
import pino from "pino-http";
import pinoPretty from "pino-pretty";

import farmersRoutes from "../modules/farmers/routes/farmer.route";

import { handleErrorMiddleware } from "./middlewares/handle-error";

export const app = express();

app.use(express.json());

const isTestEnv = process.env.NODE_ENV === "test";

if (!isTestEnv) {
  const stream = pinoPretty({
    colorize: true,
  });

  app.use(pino(stream));
}
app.use("/farmers", farmersRoutes);

app.use(handleErrorMiddleware);
