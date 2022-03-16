import AppError from "../../../errors/AppError";
import { PrismaClient } from "@prisma/client";

interface IRequest{
    id: string
}


export default class DeleteExistingEquipment{
    prismaInstance: PrismaClient;

    constructor(prismaInstance: PrismaClient){
        this.prismaInstance = prismaInstance;
    }

    public async execute({id}:IRequest): Promise<void>{
        const equipment = await this.prismaInstance.equipments.findUnique({
            where: {
                id
            }
        });
  
        if(!equipment){
            throw new AppError("Equipment not found!", 404);
        }
        

        await this.prismaInstance.equipments.delete({
            where: {
                id
            }
        });
    } 
}