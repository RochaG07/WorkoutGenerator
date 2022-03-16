import { Muscles, PrismaClient } from "@prisma/client";
import AppError from "../../../errors/AppError";

interface IRequest{
    id: string,
    name: string,
}

export default class UpdateExistingMuscle{
    prismaInstance: PrismaClient;

    constructor(prismaInstance: PrismaClient){
        this.prismaInstance = prismaInstance;
    }

    public async execute({id, name}: IRequest): Promise<Muscles>{
        let muscle = await this.prismaInstance.muscles.findUnique({
            where: {
                id
            }
        })

        if(!muscle){
            throw new AppError("Muscle not found", 404);
        }
        
        muscle = await this.prismaInstance.muscles.update({
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