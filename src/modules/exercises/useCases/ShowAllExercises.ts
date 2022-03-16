import { Exercises, PrismaClient } from "@prisma/client";

export default class ShowAllExercises{
    prismaInstance: PrismaClient;

    constructor(prismaInstance: PrismaClient){
        this.prismaInstance = prismaInstance;
    }

    public async execute(): Promise<Exercises[]>{
        
        const exercises = await this.prismaInstance.exercises.findMany();

        return exercises;
    }
}