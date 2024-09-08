import { type Farmer, PrismaClient, type Crop } from "@prisma/client";

export const prisma = new PrismaClient();

export type FarmerModel = Farmer;
export type CropModel = Crop;
