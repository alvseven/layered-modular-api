import axios from "axios";

import { parsedEnvs } from "./envs";

export const api = axios.create({
  baseURL: parsedEnvs.API_URL,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      return { error: "oii" };
    }

    return { error: "vish" };
  }
);
