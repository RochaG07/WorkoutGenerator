import { Muscles, PrismaClient } from "@prisma/client";

export default class ShowAllMuscles{
    prismaInstance: PrismaClient;

    constructor(prismaInstance: PrismaClient){
        this.prismaInstance = prismaInstance;
    }

    public async execute(): Promise<Muscles[]>{
        const muscles = await this.prismaInstance.muscles.findMany();

        return muscles;
    }
}