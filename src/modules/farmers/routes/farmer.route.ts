import { Router } from "express";

import * as farmersController from "../controllers/farmer.controller";

const farmersRoutes = Router();

farmersRoutes.get("", farmersController.getAll);

farmersRoutes.get("/:id", farmersController.get);

farmersRoutes.post("", farmersController.create);

farmersRoutes.patch("/:id", farmersController.update);

farmersRoutes.delete("/:id", farmersController.remove);

export default farmersRoutes;
