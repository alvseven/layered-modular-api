import type { ExtractParseSuccessResult } from "./farmer.service";

import { createFarmerRequestDto } from "../dtos/farmer-request.dto";

export const createFarmerMock: ExtractParseSuccessResult<
  ReturnType<typeof createFarmerRequestDto>
> = {
  producerName: "Rafael Thayto",
  farmName: "Fazenda vim",
  document: "16445237878",
  state: "SP",
  city: "São Paulo",
  totalArea: 200,
  arableArea: 100,
  vegetationArea: 50,
  crops: [{ name: "SOYBEAN" }, { name: "CORN" }],
};
