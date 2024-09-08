import { z } from "zod";

import dotenv from "dotenv";

const envFile = process.env.NODE_ENV === "test" ? ".env.test" : ".env";

dotenv.config({ path: envFile });

const envSchema = z.object({
	NODE_ENV: z.enum(["test", "development", "production", "debug"]),
	PORT: z.coerce.number().positive(),
	API_URL: z.string().optional(),
});

export const parsedEnvs = Object.freeze(envSchema.parse(process.env));
