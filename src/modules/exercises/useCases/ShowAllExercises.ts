import { Exercises, PrismaClient } from "@prisma/client";

export default class ShowAllExercises{
    prismaClient: PrismaClient;

    constructor(prismaClient: PrismaClient){
        this.prismaClient = prismaClient;
    }

    public async execute(): Promise<Exercises[]>{
        
        const exercises = await this.prismaClient.exercises.findMany();

        return exercises;
    }
}