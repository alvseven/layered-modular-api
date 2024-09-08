import axios from "axios";

import { parsedEnvs } from "./envs";

export const api = axios.create({
  baseURL: parsedEnvs.API_URL,
});
