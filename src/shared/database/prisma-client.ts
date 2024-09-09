import { type Crop, type Farmer, PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export type FarmerModel = Farmer;
export type CropModel = Crop;
