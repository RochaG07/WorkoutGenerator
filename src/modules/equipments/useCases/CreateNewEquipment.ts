import { Equipments } from "@prisma/client";
import { prismaInstance } from "../../../app";
import AppError from "../../../errors/AppError";

interface IRequest{
    name: string
}

export default class CreateNewEquipment{
    public async execute({name}: IRequest): Promise<Equipments>{
        const equipmentAlreadyExists = await prismaInstance.equipments.findFirst({
            where: {
                name
            }
        })

        if(equipmentAlreadyExists){
            throw new AppError("Equipment already exists.");
        }

        const equipment = await prismaInstance.equipments.create({
            data:{
                name
            }
        });

        return equipment;
    }
}