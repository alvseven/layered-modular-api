import type { Request, Response } from "express";

import type { Result } from "@/shared/helpers/api-response";

import * as farmersService from "../services/farmer.service";

import {
  createFarmerRequestDto,
  getFarmerByIdRequestDto,
  removeFarmerByIdRequestDto,
  updateFarmerByIdRequestDto,
} from "../dtos/farmer-request.dto";

const handleResponse = <T>(result: Result<T>, response: Response) => {
  if (result.status === "error") {
    return response.status(result.code).json({ message: result.message });
  }

  return response.status(result.code).json(result.data);
};

export const getById = async (request: Request, response: Response) => {
  const parsedRequest = getFarmerByIdRequestDto(request.params.id);

  if (!parsedRequest.success) {
    return response
      .status(400)
      .json({ status: "error", errors: parsedRequest.errors });
  }

  const result = await farmersService.getById(request.params.id);

  return handleResponse(result, response);
};

export const getAll = async (_request: Request, response: Response) => {
  const result = await farmersService.getAll();

  return handleResponse(result, response);
};

export const create = async (request: Request, response: Response) => {
  const parsedRequest = createFarmerRequestDto(request.params.id);

  if (!parsedRequest.success) {
    return response
      .status(400)
      .json({ status: "error", errors: parsedRequest.errors });
  }

  const result = await farmersService.create(request.body);

  return handleResponse(result, response);
};

export const updateById = async (request: Request, response: Response) => {
  const parsedRequest = updateFarmerByIdRequestDto(request.params.id);

  if (!parsedRequest.success) {
    return response
      .status(400)
      .json({ status: "error", errors: parsedRequest.errors });
  }

  const result = await farmersService.updateById({
    ...request.params,
    ...request.body,
  });

  return handleResponse(result, response);
};

export const removeById = async (request: Request, response: Response) => {
  const parsedRequest = removeFarmerByIdRequestDto(request.params.id);

  if (!parsedRequest.success) {
    return response
      .status(400)
      .json({ status: "error", errors: parsedRequest.errors });
  }

  const result = await farmersService.removeById(request.params.id);

  return handleResponse(result, response);
};
