import { Muscles, PrismaClient } from "@prisma/client";

export default class ShowAllMuscles{
    prismaClient: PrismaClient;

    constructor(prismaClient: PrismaClient){
        this.prismaClient = prismaClient;
    }

    public async execute(): Promise<Muscles[]>{
        const muscles = await this.prismaClient.muscles.findMany();

        return muscles;
    }
}