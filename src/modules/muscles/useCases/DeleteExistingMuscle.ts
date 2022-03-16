import AppError from "../../../errors/AppError";
import { PrismaClient } from "@prisma/client";

interface IRequest{
    id: string
}

export default class DeleteExistingMuscle{
    prismaInstance: PrismaClient;

    constructor(prismaInstance: PrismaClient){
        this.prismaInstance = prismaInstance;
    }

    public async execute({id}: IRequest): Promise<void>{
        const foundMuscle = await this.prismaInstance.muscles.findUnique({
            where: {
                id
            }
        });
    
        if(!foundMuscle){
            throw new AppError("Muscle not found.", 404);
        }
    
        await this.prismaInstance.exercises_Muscles.deleteMany({
            where:{
                fk_muscles_id: id
            }
        });
    
        await this.prismaInstance.muscles.delete({
            where:{
                id
            }
        });
    }
}