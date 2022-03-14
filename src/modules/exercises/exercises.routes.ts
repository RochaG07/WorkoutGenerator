import { Router } from "express";
import ExercisesController from "./ExercisesController";
import WorkoutController from "./WorkoutController";

const exercisesRouter = Router();

const exercisesController = new ExercisesController();
const workoutController = new WorkoutController();

exercisesRouter.post("/", exercisesController.create);
exercisesRouter.get("/", exercisesController.read);
exercisesRouter.patch("/:id", exercisesController.update);
exercisesRouter.delete("/:id", exercisesController.delete);

exercisesRouter.post("/workout/generate-fullbody-workout", workoutController.create);


export default exercisesRouter;