import { Request, Response } from "express";
import handleErrorResponse from "../../errors/handleErrorResponse";
import prismaInstance from "../../prismaInstance";
import GenerateFullBodyWorkout from "./useCases/GenerateFullBodyWorkout";


export default class WorkoutController{
    public async create(request: Request, response: Response):Promise<Response>{
        const {finalizingMuscleName, quantityOfMultipleMusclesExercisesChosen} = request.body;

        const generateFullBodyWorkout = new GenerateFullBodyWorkout(prismaInstance);

        try{
            const result = await generateFullBodyWorkout.execute({
                finalizingMuscleName, 
                quantityOfMultipleMusclesExercisesChosen
            });

            return response.json(result);
        } catch(error){
            return handleErrorResponse(error, response);
        }
    }
}