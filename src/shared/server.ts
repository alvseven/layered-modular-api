import "dotenv/config";

import { app } from "./app";

import { parsedEnvs } from "./config/envs";

app.listen(parsedEnvs.PORT, () => {
  console.log(`Server listening on port ${parsedEnvs.PORT}`);
});
