import { Exercises } from "@prisma/client";
import { prismaInstance } from "../../../app";

export default class ShowAllExercises{
    public async execute(): Promise<Exercises[]>{
        const exercises = await prismaInstance.exercises.findMany();

        return exercises;
    }
}