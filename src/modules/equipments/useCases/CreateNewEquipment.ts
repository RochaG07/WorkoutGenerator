import { Equipments, PrismaClient } from "@prisma/client";
//import prismaInstance from "../../../prismaInstance";
import AppError from "../../../errors/AppError";

interface IRequest{
    name: string
}

export default class CreateNewEquipment{
    prismaInstance: PrismaClient;

    constructor(prismaInstance: PrismaClient){
        this.prismaInstance = prismaInstance;
    }

    public async execute({name}: IRequest): Promise<Equipments>{

        const equipmentAlreadyExists = await this.prismaInstance.equipments.findFirst({
            where: {
                name
            }
        })

        if(equipmentAlreadyExists){
            throw new AppError("Equipment already exists.");
        }

        const equipment = await this.prismaInstance.equipments.create({
            data:{
                name
            }
        });

        return equipment;
    }
}