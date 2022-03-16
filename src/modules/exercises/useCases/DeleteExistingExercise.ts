import AppError from "../../../errors/AppError";
import { PrismaClient } from "@prisma/client";

interface IRequest{
    id: string
}

export default class DeleteExistingExercise{
    prismaInstance: PrismaClient;

    constructor(prismaInstance: PrismaClient){
        this.prismaInstance = prismaInstance;
    }

    public async execute({id}: IRequest): Promise<void>{
        const foundExercise = await this.prismaInstance.exercises.findUnique({
            where: {
                id
            }
        });
    
        if(!foundExercise) {
            throw new AppError("Exercise not found.", 404);    
        }

        await this.prismaInstance.exercises_Muscles.deleteMany({
            where: {
                fk_exercises_id: id
            }
        });
    
        await this.prismaInstance.exercises.delete({
            where: {
                id
            }
        });
    }
}