import { type RefinementCtx, type ZodSchema, z } from "zod";

import type { FarmerModel } from "@/shared/database/prisma-client";
import { validateCNPJ } from "../../../shared/helpers/validate-cnpj";
import { validateCPF } from "../../../shared/helpers/validate-cpf";
import { zodCustomErrorMap } from "../../../shared/helpers/zod-error-map";

type SuccessParse<T> = {
	success: true;
	data: T;
};

type ErrorParse = {
	success: false;
	errors: string[];
};

export type ParseResult<T> = SuccessParse<T> | ErrorParse;

const validate = <T>(schema: ZodSchema<T>, data: unknown): ParseResult<T> => {
	const result = schema.safeParse(data, {
		errorMap: zodCustomErrorMap,
	});

	if (result.success) {
		return { success: true, data: result.data };
	}

	const errorMessages = result.error.errors.map(
		(error) => `error: ${error.message} `,
	);

	return { success: false, errors: errorMessages };
};

const validateDocument = (document: string, ctx: RefinementCtx) => {
	if (document.length === 11 && !validateCPF(document)) {
		ctx.addIssue({
			path: ["document"],
			message: "Invalid CPF",
			code: "custom",
		});
	}
	if (document.length === 14 && !validateCNPJ(document)) {
		ctx.addIssue({
			path: ["document"],
			message: "Invalid CNPJ",
			code: "custom",
		});
	}
};

type AreaData = {
	arableArea: FarmerModel["arableArea"];
	vegetationArea: FarmerModel["vegetationArea"];
	totalArea: FarmerModel["totalArea"];
};

const validateArea = (
	{ arableArea, vegetationArea, totalArea }: AreaData,
	ctx: RefinementCtx,
) => {
	if (arableArea + vegetationArea > totalArea) {
		ctx.addIssue({
			path: ["totalArea"],
			message:
				"The sum of arable area and vegetation area cannot be greater than the total area",
			code: "custom",
		});
	}
};

export const getFarmerByIdRequestDto = (data: unknown) => {
	const getFarmerRequestSchema = z.string().uuid();

	return validate(getFarmerRequestSchema, data);
};

export const createFarmerRequestDto = (data: unknown) => {
	const cropSchema = z.object({
		name: z.enum(["SOYBEAN", "CORN", "COTTON", "COFFEE", "SUGARCANE"]),
	});

	const createFarmerRequestSchema = z
		.object({
			producerName: z.string().min(3),
			farmName: z.string().min(3),
			document: z.union([z.string().length(11), z.string().length(14)]),
			state: z.string().length(2),
			city: z.string().min(3),
			totalArea: z.number().positive().gt(0),
			arableArea: z.number().positive().gt(0),
			vegetationArea: z.number().positive().gt(0),
			crops: z.array(cropSchema),
		})
		.superRefine(({ document, arableArea, vegetationArea, totalArea }, ctx) => {
			validateArea({ arableArea, vegetationArea, totalArea }, ctx);
			validateDocument(document, ctx);
		});

	return validate(createFarmerRequestSchema, data);
};

export const updateFarmerByIdRequestDto = (data: unknown) => {
	const cropSchema = z.object({
		name: z.enum(["SOYBEAN", "CORN", "COTTON", "COFFEE", "SUGARCANE"]),
	});

	const updateFarmerRequestSchema = z
		.object({
			id: z.string().uuid(),
			producerName: z.string().min(3),
			farmName: z.string().min(3),
			city: z.string().min(5),
			state: z.string().length(2),
			totalArea: z.number().positive().gt(0),
			arableArea: z.number().positive().gt(0),
			vegetationArea: z.number().positive().gt(0),
			crops: z.array(cropSchema),
			document: z.union([z.string().length(11), z.string().length(14)]),
		})
		.superRefine(({ arableArea, vegetationArea, totalArea, document }, ctx) => {
			validateArea({ arableArea, vegetationArea, totalArea }, ctx);
			validateDocument(document, ctx);
		});

	return validate(updateFarmerRequestSchema, data);
};

export const removeFarmerByIdRequestDto = (data: unknown) => {
	const removeFarmerRequestSchema = z.string().uuid();

	return validate(removeFarmerRequestSchema, data);
};
