import { defineConfig } from "vitest/config";

const testTimeoutInMilisseconds = 10000;

export default defineConfig({
  test: {
    dir: "./src",
    testTimeout: testTimeoutInMilisseconds,
    watch: false,
    alias: { "@/": new URL("./src/", import.meta.url).pathname },
  },
});
