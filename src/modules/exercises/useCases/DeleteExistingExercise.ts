import { prismaInstance } from "../../../app";
import AppError from "../../../errors/AppError";

interface IRequest{
    id: string
}

export default class DeleteExistingExercise{
    public async execute({id}: IRequest): Promise<void>{
        const foundExercise = await prismaInstance.exercises.findUnique({
            where: {
                id
            }
        });
    
        if(!foundExercise) {
            throw new AppError("Exercise not found.", 404);    
        }

        await prismaInstance.exercises_Muscles.deleteMany({
            where: {
                fk_exercises_id: id
            }
        });
    
        await prismaInstance.exercises.delete({
            where: {
                id
            }
        });
    }
}