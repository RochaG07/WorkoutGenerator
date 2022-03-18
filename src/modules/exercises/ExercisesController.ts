import { Request, Response } from "express";
import handleErrorResponse from "../../errors/handleErrorResponse";
import prismaClient from "../../prismaClient";

import CreateNewExercise from "./useCases/CreateNewExercise";
import DeleteExistingExercise from "./useCases/DeleteExistingExercise";
import ShowAllExercises from "./useCases/ShowAllExercises";
import UpdateExistingExercise from "./useCases/UpdateExistingExercise";

export default class ExercisesController{
    public async create(request: Request, response: Response): Promise<Response>{
        const { name, muscles_names, necessary_equipment_name, execution_example_link} = request.body;

        const createNewExercise = new CreateNewExercise(prismaClient);

        try{
            const result = await createNewExercise.execute({name, muscles_names, necessary_equipment_name, execution_example_link});
            
            return response.status(201).json(result);
        } catch(error){
            return handleErrorResponse(error, response);
        }
    }

    
    public async read(request: Request, response: Response): Promise<Response>{
        const showAllExercises = new ShowAllExercises(prismaClient);
        const result = await showAllExercises.execute();

        return response.json(result);
    }

    public async update(request: Request, response: Response): Promise<Response>{
        const {id} = request.params;
        const {name} = request.body;

        const updateExistingExercise = new UpdateExistingExercise(prismaClient);

        try{
            const result = await updateExistingExercise.execute({id, name})

            return response.status(200).json(result);
        } catch(error){
            return handleErrorResponse(error, response);
        }
    
    }

    public async delete(request: Request, response: Response): Promise<Response>{
        const {id} = request.params;

        const deleteExistingExercise = new DeleteExistingExercise(prismaClient);

        try{
            await deleteExistingExercise.execute({id});

            return response.status(204).json();
        } catch(error){
            return handleErrorResponse(error, response);
        }

    }
}