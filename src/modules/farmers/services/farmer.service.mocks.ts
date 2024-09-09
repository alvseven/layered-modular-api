import type { StrictOmit } from "@/shared/helpers/types/strict-omit";
import type { ExtractParseSuccessResult } from "./farmer.service";

import type {
	createFarmerRequestDto,
	updateFarmerByIdRequestDto,
} from "../dtos/farmer-request.dto";

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

export const updateFarmerMock: StrictOmit<
	ExtractParseSuccessResult<ReturnType<typeof updateFarmerByIdRequestDto>>,
	"id"
> = {
	producerName: "Luke Berry",
	farmName: "Fazenda vsc",
	document: "20614895081",
	state: "SP",
	city: "São Paulo",
	totalArea: 300,
	arableArea: 150,
	vegetationArea: 70,
	crops: [{ name: "COTTON" }, { name: "SUGARCANE" }],
};
