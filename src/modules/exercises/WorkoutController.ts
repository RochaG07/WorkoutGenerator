import { Request, Response } from "express";
import handleErrorResponse from "../../errors/handleErrorResponse";
import GenerateFullBodyWorkout from "./useCases/GenerateFullBodyWorkout";


export default class WorkoutController{
    public async create(request: Request, response: Response):Promise<Response>{
        const generateFullBodyWorkout = new GenerateFullBodyWorkout();

        try{
            const result = await generateFullBodyWorkout.execute();

            return response.json(result);
        } catch(error){
            return handleErrorResponse(error, response);
        }

    }
}

