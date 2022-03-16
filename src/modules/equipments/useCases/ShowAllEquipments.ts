import { Equipments, PrismaClient } from "@prisma/client";

export default class ShowAllEquipments{
    prismaInstance: PrismaClient;

    constructor(prismaInstance: PrismaClient){
        this.prismaInstance = prismaInstance;
    }

    public async execute(): Promise<Equipments[]>{
        return await this.prismaInstance.equipments.findMany();
    }
}