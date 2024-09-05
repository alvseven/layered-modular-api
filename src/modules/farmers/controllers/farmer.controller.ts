import * as farmersService from "../services/farmer.service";

import type { Request, Response } from "express";

export const get = async (request: Request, response: Response) => {
  const farmer = await farmersService.get(request.params.id);

  return response.json(farmer);
};

export const getAll = async (_request: Request, response: Response) => {
  const farmers = await farmersService.getAll();

  return response.json(farmers);
};

export const create = async (request: Request, response: Response) => {
  const createdFarmer = await farmersService.create(request.body);

  return response.status(201).json(createdFarmer);
};

export const update = async (request: Request, response: Response) => {
  const updatedFarmer = await farmersService.update(
    request.params.id,
    request.body
  );

  return response.json(updatedFarmer);
};

export const remove = async (request: Request, response: Response) => {
  await farmersService.remove(request.params.id);

  return response.status(204).send();
};
