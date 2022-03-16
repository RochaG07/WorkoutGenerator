import { Exercises, PrismaClient } from "@prisma/client";
import AppError from "../../../errors/AppError";

interface IRequest{
    id: string,
    name: string
}

export default class UpdateExistingExercise{
    prismaInstance: PrismaClient;

    constructor(prismaInstance: PrismaClient){
        this.prismaInstance = prismaInstance;
    }

    public async execute({id, name}: IRequest): Promise<Exercises>{
        let exercise = await this.prismaInstance.exercises.findUnique({
            where:{
                id
            }
        })

        if(!exercise){
            throw new AppError("Exercise not found.", 404);
        }
        
        exercise = await this.prismaInstance.exercises.update({
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