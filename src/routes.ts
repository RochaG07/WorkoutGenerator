import { Router } from "express";

import equipmentsRouter from "./modules/equipments/equipments.routes";
import exercisesRouter from "./modules/exercises/exercises.routes";
import musclesRouter from "./modules/muscles/muscles.routes";


const routes = Router()

routes.use('/exercises', exercisesRouter);
routes.use('/muscles', musclesRouter);
routes.use('/equipments', equipmentsRouter)

export default routes;