import { type ZodErrorMap, z } from "zod";

type Error = Parameters<ZodErrorMap>["0"];
type Ctx = Parameters<ZodErrorMap>["1"];
type Field = string | number | undefined;

const handleInvalidTypeError = (
	error: z.ZodInvalidTypeIssue,
	ctx: Ctx,
	field: Field,
) => {
	const { received, expected } = error;

	if (received === "undefined") {
		return { message: `O campo [${field}] é obrigatório` };
	}

	switch (expected) {
		case "string":
			return { message: `O campo [${field}] deve ser uma string` };

		case "number":
			return { message: `O campo [${field}] deve ser um número` };
	}

	return { message: ctx.defaultError };
};

const handleTooSmallError = (
	error: z.ZodTooSmallIssue,
	ctx: Ctx,
	field: Field,
) => {
	const { type, minimum } = error;

	switch (type) {
		case "string":
			if (error.exact) {
				return {
					message: `O campo [${field}] deve conter ${minimum} caracteres`,
				};
			}
			return {
				message: `O campo [${field}] deve conter no mínimo ${minimum} caracteres`,
			};

		case "number":
			if (error.exact) {
				return { message: `O campo [${field}] deve ser igual a ${minimum}` };
			}
			return {
				message: `O campo [${field}] deve ser maior ou igual a ${minimum}`,
			};
	}

	return { message: ctx.defaultError };
};

const handleTooBigError = (error: z.ZodTooBigIssue, ctx: Ctx, field: Field) => {
	const { type, maximum } = error;

	switch (type) {
		case "string":
			if (error.exact) {
				return {
					message: `O campo [${field}] deve conter ${maximum} caracteres`,
				};
			}
			return {
				message: `O campo [${field}] deve conter no máximo ${maximum} caracteres`,
			};

		case "number":
			if (error.exact) {
				return { message: `O campo [${field}] deve ser igual a ${maximum}` };
			}
			return {
				message: `O campo [${field}] deve ser menor ou igual a ${maximum}`,
			};
	}

	return { message: ctx.defaultError };
};

const handleInvalidStringError = (
	error: z.ZodInvalidStringIssue,
	ctx: Ctx,
	field: Field,
) => {
	const { validation } = error;

	switch (validation) {
		case "email":
			return { message: `O campo [${field}] deve ser um email válido` };

		case "uuid":
			return { message: `O campo [${field}] deve ser um UUID válido` };

		default:
			return { message: ctx.defaultError };
	}
};

export const zodCustomErrorMap: ZodErrorMap = (error: Error, ctx: Ctx) => {
	const { code, path } = error;

	const currentField = path.at(-1);

	switch (code) {
		case z.ZodIssueCode.invalid_type:
			return handleInvalidTypeError(error, ctx, currentField);

		case z.ZodIssueCode.too_small:
			return handleTooSmallError(error, ctx, currentField);

		case z.ZodIssueCode.too_big:
			return handleTooBigError(error, ctx, currentField);

		case z.ZodIssueCode.invalid_string:
			return handleInvalidStringError(error, ctx, currentField);

		default:
			return { message: ctx.defaultError };
	}
};
