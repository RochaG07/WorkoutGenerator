import { Router } from "express";
import EquipmentsController from "./EquipmentsController";

const equipmentsRouter = Router();

const equipmentsController = new EquipmentsController();

equipmentsRouter.post("/", equipmentsController.create);
equipmentsRouter.get("/", equipmentsController.read);
equipmentsRouter.patch("/:id", equipmentsController.update);
equipmentsRouter.delete("/:id", equipmentsController.delete)

export default equipmentsRouter;