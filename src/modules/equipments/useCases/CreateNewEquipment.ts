import { Equipments, PrismaClient } from "@prisma/client";
//import prismaClient from "../../../prismaClient";
import AppError from "../../../errors/AppError";

interface IRequest{
    name: string
}

export default class CreateNewEquipment{
    prismaClient: PrismaClient;

    constructor(prismaClient: PrismaClient){
        this.prismaClient = prismaClient;
    }

    public async execute({ name}: IRequest): Promise<Equipments>{
        const equipmentAlreadyExists = await this.prismaClient.equipments.findFirst({
            where: {
                name
            }
        })

        if(equipmentAlreadyExists){
            throw new AppError("Equipment already exists.");
        }

        const equipment = await this.prismaClient.equipments.create({
            data:{
                name
            }
        });

        return equipment;
    }
}