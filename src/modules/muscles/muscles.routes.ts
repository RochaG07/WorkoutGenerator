import { Router } from "express";
import MusclesController from "./MusclesController";

const musclesRouter = Router();

const musclesController = new MusclesController();

musclesRouter.post("/", musclesController.create);
musclesRouter.get("/", musclesController.read);
musclesRouter.patch("/:id", musclesController.update)
musclesRouter.delete("/:id", musclesController.delete);

export default musclesRouter;