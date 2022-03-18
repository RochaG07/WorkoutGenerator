import { Request, Response } from "express";
import prismaClient from "../../prismaClient";
import handleErrorResponse from "../../errors/handleErrorResponse";

import CreateNewEquipment from "./useCases/CreateNewEquipment";
import DeleteExistingEquipment from "./useCases/DeleteExistingEquipment";
import ShowAllEquipments from "./useCases/ShowAllEquipments";
import UpdateExistingEquipment from "./useCases/UpdateExistingEquipment";

export default class EquipmentsController{
    public async create(request: Request, response: Response): Promise<Response>{
        const {name} = request.body;

        const createNewEquipment = new CreateNewEquipment(prismaClient);

        try{
            const result = await createNewEquipment.execute({name});

            return response.json(result);
        } catch(error: any){
            return handleErrorResponse(error, response);
        }

    }

    public async read(request: Request, response: Response): Promise<Response>{
        const showAllEquipments = new ShowAllEquipments(prismaClient);

        const result = await showAllEquipments.execute();


        return response.json(result);
    }

    public async update(request: Request, response: Response): Promise<Response>{
        const {id} = request.params;
        const {name} = request.body;

        const updateExistingEquipment = new UpdateExistingEquipment(prismaClient);

        try{
            const result = await updateExistingEquipment.execute({id, name});

            return response.json(result);
        } catch(error: any){
            return handleErrorResponse(error, response);
        }
    }

    public async delete(request: Request, response: Response): Promise<Response>{
        const {id} = request.params;

        const deleteExistingEquipment = new DeleteExistingEquipment(prismaClient);
        
        try{
            await deleteExistingEquipment.execute({id});

            return response.status(204).json();

        } catch (error: any){
            return handleErrorResponse(error, response);
        }
    }
}