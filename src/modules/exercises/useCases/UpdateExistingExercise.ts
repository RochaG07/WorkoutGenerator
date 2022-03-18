import { Exercises, PrismaClient } from "@prisma/client";
import AppError from "../../../errors/AppError";

interface IRequest{
    id: string,
    name: string
}

export default class UpdateExistingExercise{
    prismaClient: PrismaClient;

    constructor(prismaClient: PrismaClient){
        this.prismaClient = prismaClient;
    }

    public async execute({id, name}: IRequest): Promise<Exercises>{
        let exercise = await this.prismaClient.exercises.findUnique({
            where:{
                id
            }
        })

        if(!exercise){
            throw new AppError("Exercise not found.", 404);
        }
        
        exercise = await this.prismaClient.exercises.update({
            where: {
                id
            },
            data: {
                name
            }
        });

        return exercise;
    }
}