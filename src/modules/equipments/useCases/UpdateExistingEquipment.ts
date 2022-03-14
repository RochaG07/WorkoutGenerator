import { Equipments } from "@prisma/client";
import { prismaInstance } from "../../../app";
import AppError from "../../../errors/AppError";

interface IRequest{
    id: string,
    name: string
}

export default class UpdateExistingEquipment{
    public async execute({id, name}: IRequest): Promise<Equipments>{
        let equipment = await prismaInstance.equipments.findUnique({
            where: {
                id
            }
        });

        if(!equipment){
            throw new AppError("Equipment not found.", 404);
        }

        equipment = await prismaInstance.equipments.update({
            where: {
                id
            },
            data: {
                name
            }
        })

        return equipment;
    }
}