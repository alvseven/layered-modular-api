import { describe, expect, test, afterEach } from "vitest";

import { api } from "@/shared/config/api-test";

import { createFarmerMock } from "./farmer.service.mocks";

describe("Farmers service", () => {
  describe("Get farmers", () => {
    test("It should return an empty list when there is no farmers", async () => {
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
  test.skip("Get farmer", async () => {
    const getFarmersResponse = await api("/farmers");

    expect(getFarmersResponse).toBeDefined();
  });
  test.skip("Create farmer", async () => {
    const getFarmersResponse = await api("/farmers");

    expect(getFarmersResponse).toBeDefined();
  });
  test.skip("Update farmer", async () => {
    const getFarmersResponse = await api("/farmers");

    expect(getFarmersResponse).toBeDefined();
  });
  test.skip("Delete farmer", async () => {
    const getFarmersResponse = await api("/farmers");

    expect(getFarmersResponse).toBeDefined();
  });
});
