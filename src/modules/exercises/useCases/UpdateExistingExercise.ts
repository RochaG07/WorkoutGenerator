import { Exercises } from "@prisma/client";
import { prismaInstance } from "../../../app";
import AppError from "../../../errors/AppError";

interface IRequest{
    id: string,
    name: string
}

export default class UpdateExistingExercise{
    public async execute({id, name}: IRequest): Promise<Exercises>{
        let exercise = await prismaInstance.exercises.findUnique({
            where:{
                id
            }
        })

        if(!exercise){
            throw new AppError("Exercise not found.", 404);
        }
        
        exercise = await prismaInstance.exercises.update({
            where: {
                id
            },
            data: {
                name
            }
        });

        return exercise;
    }
}