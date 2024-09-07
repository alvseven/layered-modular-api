import {
  prisma,
  type FarmerModel,
} from "../../../shared/database/prisma-client";

import type { StrictOmit } from "@/shared/helpers/types/strict-omit";

/*  
  The FarmerModel serves as the contract (source of truth), so we avoid creating redundant types manually, which is also less error-prone.
  Instead, we leverage the existing types derived from the model to ensure consistency and reduce duplication.
*/

export const farmersRepository = () => {
  const repository = prisma.farmer;

  const getById = (id: FarmerModel["id"]) => {
    const farmerFound = repository.findUnique({ where: { id } });

    return farmerFound;
  };

  const getByDocument = (document: FarmerModel["document"]) => {
    const farmerFound = repository.findUnique({ where: { document } });

    return farmerFound;
  };

  const getAll = () => {
    const farmers = repository.findMany();

    return farmers;
  };

  const create = async (
    data: StrictOmit<FarmerModel, "id" | "createdAt" | "updatedAt">
  ) => {
    const createdFarmer = await repository.create({ data });

    return createdFarmer;
  };

  const updateById = async (
    id: FarmerModel["id"],
    data: StrictOmit<FarmerModel, "id" | "createdAt" | "updatedAt">
  ) => {
    const updatedFarmer = await repository.update({
      where: { id },
      data,
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
