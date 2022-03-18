import { Equipments, PrismaClient } from "@prisma/client";

export default class ShowAllEquipments{
    prismaClient: PrismaClient;

    constructor(prismaClient: PrismaClient){
        this.prismaClient = prismaClient;
    }

    public async execute(): Promise<Equipments[]>{
        return await this.prismaClient.equipments.findMany();
    }
}