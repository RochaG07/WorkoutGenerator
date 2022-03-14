import { prismaInstance } from "../../../app";
import { Muscles } from "@prisma/client";
import AppError from "../../../errors/AppError";

interface IRequest{
    name: string
}

export default class CreateNewMuscle{

    public async execute({name}:IRequest): Promise<Muscles>{
        const muscleAlreadyExists = await prismaInstance.muscles.findFirst({
            where: {
                name
            }
        })

        if(muscleAlreadyExists){
            throw new AppError("Muscle already exists.");
        }

        const muscle = await prismaInstance.muscles.create({
            data: {
                name
            }
        }); 
    
        return muscle;
    }
}