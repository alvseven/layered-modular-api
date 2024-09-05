import { farmersRepository } from "../repositories/farmer.repository";

export const get = async (id: string) => {
  const farmer = await farmersRepository().get(id);

  return farmer;
};

export const getAll = async () => {
  const farmers = await farmersRepository().getAll();

  return farmers;
};

export const create = async (data: any) => {
  const createdFarmer = await farmersRepository().create(data);

  return createdFarmer;
};

export const update = async (id: string, data: any) => {
  const updatedFarmer = await farmersRepository().update(id, data);

  return updatedFarmer;
};

export const remove = async (id: string) => {
  await farmersRepository().remove(id);
};
