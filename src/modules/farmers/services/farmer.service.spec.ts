import { afterEach, describe, expect, test } from "vitest";

import { api } from "../../../shared/config/api-test";

import { prisma } from "../../../shared/database/prisma-client";
import { createFarmerMock, updateFarmerMock } from "./farmer.service.mocks";

describe("Farmers service", () => {
	afterEach(async () => {
		await prisma.farmer.deleteMany();
	});

	describe("Get farmers", () => {
		test("It should return an empty array when there is no farmers", async () => {
			const { data } = await api.get("/farmers");

			expect(Array.isArray(data)).toBe(true);

			expect(data.length).toBe(0);
		});

		test("It should list all farmers", async () => {
			await api.post("/farmers", createFarmerMock);

			const { data } = await api("/farmers");

			expect(Array.isArray(data)).toBe(true);

			expect(data.length).toBe(1);

			expect(data[0]).toMatchObject(createFarmerMock);
		});
	});

	describe("Get farmer", () => {
		test("It should get a farmer", async () => {
			const { data: createFarmerResponse } = await api.post(
				"/farmers",
				createFarmerMock,
			);

			const { data } = await api.get(`/farmers/${createFarmerResponse.id}`);

			expect(data).toMatchObject(createFarmerMock);
		});

		test("It should return an error if there's no farmer", async () => {
			const { data, status } = await api.get(`/farmers/${crypto.randomUUID()}`);

			expect(status).toBe(404);
			expect(data).toMatchObject({ message: "Farmer not found" });
		});
	});

	describe("Create farmer", () => {
		test("It should create a farmer", async () => {
			const { data } = await api.post("/farmers", createFarmerMock);

			expect(data).toMatchObject(createFarmerMock);
		});

		test("It should return an error if the farmer is already registered", async () => {
			await api.post("/farmers", createFarmerMock);

			const { data, status } = await api.post("/farmers", createFarmerMock);

			expect(status).toBe(409);
			expect(data).toMatchObject({
				message: "Farmer already registered",
			});
		});
	});

	describe("Update farmer", () => {
		test("It should update a farmer", async () => {
			const { data: createFarmerResponse } = await api.post(
				"/farmers",
				createFarmerMock,
			);

			const { data } = await api.patch(
				`/farmers/${createFarmerResponse.id}`,
				updateFarmerMock,
			);

			expect(data).toMatchObject(updateFarmerMock);
		});

		test("It should return an error if the farmer is already registered", async () => {
			const { data: createFarmerResponse } = await api.post(
				"/farmers",
				createFarmerMock,
			);

			const { data, status } = await api.patch(
				`/farmers/${createFarmerResponse.id}`,
				{ ...updateFarmerMock, document: createFarmerMock.document },
			);

			expect(status).toBe(409);
			expect(data).toMatchObject({
				message: "Farmer already registered",
			});
		});
	});

	describe("Delete farmer", () => {
		test("It should delete a farmer", async () => {
			const { data: createFarmerResponse } = await api.post(
				"/farmers",
				createFarmerMock,
			);

			const { status } = await api.delete(
				`/farmers/${createFarmerResponse.id}`,
			);

			expect(status).toBe(204);
		});

		test("It should return an error if farmer does not exist", async () => {
			const { data, status } = await api.delete(
				`/farmers/${crypto.randomUUID()}`,
			);

			expect(status).toBe(404);
			expect(data).toMatchObject({ message: "Farmer not found" });
		});
	});
});
