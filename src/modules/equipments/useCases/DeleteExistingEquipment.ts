import AppError from "../../../errors/AppError";
import { PrismaClient } from "@prisma/client";

interface IRequest{
    id: string
}


export default class DeleteExistingEquipment{
    prismaClient: PrismaClient;

    constructor(prismaClient: PrismaClient){
        this.prismaClient = prismaClient;
    }

    public async execute({id}:IRequest): Promise<void>{
        const equipment = await this.prismaClient.equipments.findUnique({
            where: {
                id
            }
        });
  
        if(!equipment){
            throw new AppError("Equipment not found!", 404);
        }
        

        await this.prismaClient.equipments.delete({
            where: {
                id
            }
        });
    } 
}