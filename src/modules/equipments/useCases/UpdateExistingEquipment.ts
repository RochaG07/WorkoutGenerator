import { Equipments, PrismaClient } from "@prisma/client";
import AppError from "../../../errors/AppError";

interface IRequest{
    id: string,
    name: string
}

export default class UpdateExistingEquipment{
    prismaClient: PrismaClient;

    constructor(prismaClient: PrismaClient){
        this.prismaClient = prismaClient;
    }

    public async execute({id, name}: IRequest): Promise<Equipments>{
        let equipment = await this.prismaClient.equipments.findUnique({
            where: {
                id
            }
        });

        if(!equipment){
            throw new AppError("Equipment not found.", 404);
        }

        equipment = await this.prismaClient.equipments.update({
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