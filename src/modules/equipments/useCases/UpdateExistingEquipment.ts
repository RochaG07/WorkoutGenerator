import { Equipments, PrismaClient } from "@prisma/client";
import AppError from "../../../errors/AppError";

interface IRequest{
    id: string,
    name: string
}

export default class UpdateExistingEquipment{
    prismaInstance: PrismaClient;

    constructor(prismaInstance: PrismaClient){
        this.prismaInstance = prismaInstance;
    }

    public async execute({id, name}: IRequest): Promise<Equipments>{
        let equipment = await this.prismaInstance.equipments.findUnique({
            where: {
                id
            }
        });

        if(!equipment){
            throw new AppError("Equipment not found.", 404);
        }

        equipment = await this.prismaInstance.equipments.update({
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