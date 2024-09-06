import { type ZodSchema, z } from "zod";

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
  const result = schema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  }

  const errorMessages = result.error.errors.map(
    (error) => `Validation error: ${error.message}`
  );

  return { success: false, errors: errorMessages };
};

export const getFarmerByIdRequestDto = (data: unknown) => {
  const getFarmerRequestSchema = z.string().uuid();

  return validate(getFarmerRequestSchema, data);
};

export const createFarmerRequestDto = (data: unknown) => {
  const createFarmerRequestSchema = z.object({
    name: z.string().min(3),
    document: z.union([z.string().length(11), z.string().length(14)]),
  });

  return validate(createFarmerRequestSchema, data);
};

export const updateFarmerByIdRequestDto = (data: unknown) => {
  const updateFarmerRequestSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(3),
  });

  return validate(updateFarmerRequestSchema, data);
};

export const removeFarmerByIdRequestDto = (data: unknown) => {
  const removeFarmerRequestSchema = z.string().uuid();

  return validate(removeFarmerRequestSchema, data);
};
