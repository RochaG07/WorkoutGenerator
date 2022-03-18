import AppError from "../../../errors/AppError";
import { PrismaClient } from "@prisma/client";

interface IRequest{
    id: string
}

export default class DeleteExistingMuscle{
    prismaClient: PrismaClient;

    constructor(prismaClient: PrismaClient){
        this.prismaClient = prismaClient;
    }

    public async execute({id}: IRequest): Promise<void>{
        const foundMuscle = await this.prismaClient.muscles.findUnique({
            where: {
                id
            }
        });
    
        if(!foundMuscle){
            throw new AppError("Muscle not found.", 404);
        }
    
        await this.prismaClient.exercises_Muscles.deleteMany({
            where:{
                fk_muscles_id: id
            }
        });
    
        await this.prismaClient.muscles.delete({
            where:{
                id
            }
        });
    }
}