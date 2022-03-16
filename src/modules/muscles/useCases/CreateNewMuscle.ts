import { Muscles, PrismaClient } from "@prisma/client";
import AppError from "../../../errors/AppError";

interface IRequest{
    name: string
}

export default class CreateNewMuscle{
    prismaInstance: PrismaClient;

    constructor(prismaInstance: PrismaClient){
        this.prismaInstance = prismaInstance;
    }

    public async execute({name}:IRequest): Promise<Muscles>{
        const muscleAlreadyExists = await this.prismaInstance.muscles.findFirst({
            where: {
                name
            }
        })

        if(muscleAlreadyExists){
            throw new AppError("Muscle already exists.");
        }

        const muscle = await this.prismaInstance.muscles.create({
            data: {
                name
            }
        }); 
    
        return muscle;
    }
}