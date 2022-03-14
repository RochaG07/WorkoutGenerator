import { Muscles } from "@prisma/client";
import { prismaInstance } from "../../../app";
import AppError from "../../../errors/AppError";

interface IRequest{
    id: string,
    name: string,
}

export default class UpdateExistingMuscle{

    public async execute({id, name}: IRequest): Promise<Muscles>{
        let muscle = await prismaInstance.muscles.findUnique({
            where: {
                id
            }
        })

        if(!muscle){
            throw new AppError("Muscle not found", 404);
        }
        
        muscle = await prismaInstance.muscles.update({
            where: {
                id
            },
            data: {
                name
            }
        });

        return muscle;
    }
}