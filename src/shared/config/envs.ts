import "dotenv/config";

import { z } from "zod";

const envSchema = z.object({
	NODE_ENV: z.enum(["test", "development", "production", "debug"]),
	PORT: z.coerce.number().positive(),
});

export const parsedEnvs = Object.freeze(envSchema.parse(process.env));
