import { prisma } from "../../../shared/database/prisma-client";

export const farmersRepository = () => {
  const repository = prisma.farmer;

  const get = (id: string) => {
    const farmerFound = repository.findUnique({ where: { id } });

    return farmerFound;
  };

  const getAll = () => {
    const farmers = repository.findMany();

    return farmers;
  };

  const create = async (data: any) => {
    const createdFarmer = await repository.create(data);

    return createdFarmer;
  };

  const update = async (id: string, data: any) => {
    const updatedFarmer = await repository.update({
      where: { id },
      data,
    });

    return updatedFarmer;
  };

  const remove = async (id: string) => {
    await repository.delete({
      where: {
        id,
      },
    });
  };

  return {
    get,
    getAll,
    create,
    update,
    remove,
  };
};
