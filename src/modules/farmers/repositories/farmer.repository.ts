import {
	type CropModel,
	type FarmerModel,
	prisma,
} from "../../../shared/database/prisma-client";

import type { StrictOmit } from "@/shared/helpers/types/strict-omit";

/*  
  The FarmerModel serves as the contract (source of truth), so we avoid creating redundant types manually, which is also less error-prone.
  Instead, we leverage the existing types derived from the model to ensure consistency and reduce duplication.
*/

export const farmersRepository = () => {
	const repository = prisma.farmer;

	const getById = (id: FarmerModel["id"]) => {
		const farmerFound = repository.findUnique({
			where: { id },
			include: {
				crops: true,
			},
		});

		return farmerFound;
	};

	const getByDocument = (document: FarmerModel["document"]) => {
		const farmerFound = repository.findUnique({ where: { document } });

		return farmerFound;
	};

	const getAll = () => {
		const farmers = repository.findMany({
			include: {
				crops: true,
			},
		});

		return farmers;
	};

	const create = async (
		data: StrictOmit<FarmerModel, "id" | "createdAt" | "updatedAt"> & {
			crops: Array<Pick<CropModel, "name">>;
		},
	) => {
		const createdFarmer = await repository.create({
			data: {
				...data,
				crops: {
					create: data.crops.map((crop) => ({
						name: crop.name,
					})),
				},
			},
			include: {
				crops: true,
			},
		});

		return createdFarmer;
	};

	const updateById = async (
		id: FarmerModel["id"],
		data: Partial<
			StrictOmit<FarmerModel, "id" | "createdAt" | "updatedAt"> & {
				crops: Array<Pick<CropModel, "name">>;
			}
		>,
	) => {
		const { crops, ...farmerData } = data;

		const cropsUpdate = crops
			? {
					crops: {
						deleteMany: {},
						create: crops.map((crop) => ({
							name: crop.name,
						})),
					},
				}
			: undefined;

		const updatedFarmer = await repository.update({
			where: { id },
			data: {
				...farmerData,
				...cropsUpdate,
			},
			include: {
				crops: true,
			},
		});

		return updatedFarmer;
	};

	const removeById = async (id: FarmerModel["id"]) => {
		await repository.delete({
			where: {
				id,
			},
		});
	};

	return {
		getById,
		getByDocument,
		getAll,
		create,
		updateById,
		removeById,
	};
};
