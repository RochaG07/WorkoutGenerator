import { Muscles, PrismaClient } from "@prisma/client";
import AppError from "../../../errors/AppError";

interface IRequest{
    id: string,
    name: string,
}

export default class UpdateExistingMuscle{
    prismaClient: PrismaClient;

    constructor(prismaClient: PrismaClient){
        this.prismaClient = prismaClient;
    }

    public async execute({id, name}: IRequest): Promise<Muscles>{
        let muscle = await this.prismaClient.muscles.findUnique({
            where: {
                id
            }
        })

        if(!muscle){
            throw new AppError("Muscle not found", 404);
        }
        
        muscle = await this.prismaClient.muscles.update({
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