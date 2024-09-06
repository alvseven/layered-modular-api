import { Router } from "express";

import * as farmersController from "../controllers/farmer.controller";

const farmersRoutes = Router();

farmersRoutes.get("", farmersController.getAll);

farmersRoutes.get("/:id", farmersController.getById);

farmersRoutes.post("", farmersController.create);

farmersRoutes.patch("/:id", farmersController.updateById);

farmersRoutes.delete("/:id", farmersController.removeById);

export default farmersRoutes;
