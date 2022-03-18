import AppError from "../../../errors/AppError";
import { PrismaClient } from "@prisma/client";

interface IRequest{
    id: string
}

export default class DeleteExistingExercise{
    prismaClient: PrismaClient;

    constructor(prismaClient: PrismaClient){
        this.prismaClient = prismaClient;
    }

    public async execute({id}: IRequest): Promise<void>{
        const foundExercise = await this.prismaClient.exercises.findUnique({
            where: {
                id
            }
        });
    
        if(!foundExercise) {
            throw new AppError("Exercise not found.", 404);    
        }

        await this.prismaClient.exercises_Muscles.deleteMany({
            where: {
                fk_exercises_id: id
            }
        });
    
        await this.prismaClient.exercises.delete({
            where: {
                id
            }
        });
    }
}