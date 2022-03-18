import { Muscles, PrismaClient } from "@prisma/client";
import AppError from "../../../errors/AppError";

interface IRequest{
    name: string
}

export default class CreateNewMuscle{
    prismaClient: PrismaClient;

    constructor(prismaClient: PrismaClient){
        this.prismaClient = prismaClient;
    }

    public async execute({name}:IRequest): Promise<Muscles>{
        const muscleAlreadyExists = await this.prismaClient.muscles.findFirst({
            where: {
                name
            }
        })

        if(muscleAlreadyExists){
            throw new AppError("Muscle already exists.");
        }

        const muscle = await this.prismaClient.muscles.create({
            data: {
                name
            }
        }); 
    
        return muscle;
    }
}