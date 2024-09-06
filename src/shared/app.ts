import "express-async-errors";

import express from "express";
import pino from "pino-http";
import pinoPretty from "pino-pretty";

import farmersRoutes from "../modules/farmers/routes/farmer.route";

import { handleErrorMiddleware } from "./middlewares/handle-error";

export const app = express();

const stream = pinoPretty({
	colorize: true,
});

app.use(express.json());
app.use(pino(stream));

app.use("/farmers", farmersRoutes);

app.use("/hello-world", (_request, res) =>
	res.json({
		date: new Date().toISOString(),
		status: "ok",
	}),
);

app.use(handleErrorMiddleware);
