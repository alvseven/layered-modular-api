import axios from "axios";

import { parsedEnvs } from "./envs";

export const api = axios.create({
	baseURL: parsedEnvs.API_URL,
	validateStatus: (status) => {
		return status >= 200 && status < 500;
	},
});
