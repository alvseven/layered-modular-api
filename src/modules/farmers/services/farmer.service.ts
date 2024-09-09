import { farmersRepository } from "../repositories/farmer.repository";

import { error, success } from "../../../shared/helpers/api-response";

import type {
	ParseResult,
	createFarmerRequestDto,
	getFarmerByIdRequestDto,
	removeFarmerByIdRequestDto,
	updateFarmerByIdRequestDto,
} from "../dtos/farmer-request.dto";

/*
  Instead of manually creating types such as `id: string`, we rely on the types derived from the DTOs, 
  which represent the source of truth and define our API contract. This approach ensures that the types 
  stay consistent with the request validation logic and are less error-prone.
*/

export type ExtractParseSuccessResult<T extends ParseResult<unknown>> = Extract<
	T,
	{ success: true }
>["data"];

export const getById = async (
	id: ExtractParseSuccessResult<ReturnType<typeof getFarmerByIdRequestDto>>,
) => {
	const farmer = await farmersRepository().getById(id);

	if (!farmer) {
		return error("Farmer not found", 404);
	}

	return success(farmer);
};

export const getAll = async () => {
	const farmers = await farmersRepository().getAll();

	return success(farmers);
};

export const create = async (
	data: ExtractParseSuccessResult<ReturnType<typeof createFarmerRequestDto>>,
) => {
	const farmerAlreadyExists = await farmersRepository().getByDocument(
		data.document,
	);

	if (farmerAlreadyExists) {
		return error("Farmer already registered", 409);
	}

	const createdFarmer = await farmersRepository().create(data);

	return success(createdFarmer, 201);
};

export const updateById = async ({
	id,
	...data
}: ExtractParseSuccessResult<
	ReturnType<typeof updateFarmerByIdRequestDto>
>) => {
	const farmer = farmersRepository().getById(id);

	if (!farmer) {
		return error("Farmer not found", 404);
	}

	const farmerAlreadyExists = await farmersRepository().getByDocument(
		data.document,
	);

	if (farmerAlreadyExists) {
		return error("Farmer already registered", 409);
	}

	const updatedFarmer = await farmersRepository().updateById(id, data);

	return success(updatedFarmer);
};

export const removeById = async (
	id: ExtractParseSuccessResult<ReturnType<typeof removeFarmerByIdRequestDto>>,
) => {
	const farmer = await farmersRepository().getById(id);

	if (!farmer) {
		return error("Farmer not found", 404);
	}

	await farmersRepository().removeById(id);

	return success(undefined, 204);
};
