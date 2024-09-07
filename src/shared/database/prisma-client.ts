import { PrismaClient, type Farmer } from "@prisma/client";

export const prisma = new PrismaClient();

export type FarmerModel = Farmer;
