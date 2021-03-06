import { Request, Response } from "express";
import handleErrorResponse from "../../errors/handleErrorResponse";
import prismaClient from "../../prismaClient";

import CreateNewMuscle from "./useCases/CreateNewMuscle";
import DeleteExistingMuscle from "./useCases/DeleteExistingMuscle";
import ShowAllMuscles from "./useCases/ShowAllMuscles";
import UpdateExistingMuscle from "./useCases/UpdateExistingMuscle";

export default class MusclesController{
    public async create(request: Request, response: Response){
        const {name} = request.body;

        const createNewMuscle = new CreateNewMuscle(prismaClient);

        try{
            const result = await createNewMuscle.execute({name});
            response.status(201).json(result);

        } catch(error){
            return handleErrorResponse(error, response);
        }
    }

    public async read(request: Request, response: Response){

        const showAllMuscles = new ShowAllMuscles(prismaClient);
        const result = await showAllMuscles.execute();

        response.json(result);
    }

    public async update(request: Request, response: Response){
        const {id} = request.params;
        const {name} = request.body;

        const updateExistingMuscle = new UpdateExistingMuscle(prismaClient);


        try{
            const result = await updateExistingMuscle.execute({id, name});
            response.json(result);

        } catch(error){
            return handleErrorResponse(error, response);
        }

    
    }

    public async delete(request: Request, response: Response){
        const {id} = request.params;

        const deleteExistingMuscle = new DeleteExistingMuscle(prismaClient);

        try{
            await deleteExistingMuscle.execute({id});

            response.status(204).json();

        } catch(error){
            return handleErrorResponse(error, response);
        }
    }
}