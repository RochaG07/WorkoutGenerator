import { prismaInstance } from "../../../app";
import AppError from "../../../errors/AppError";

interface IRequest{
    id: string
}

export default class DeleteExistingMuscle{
    public async execute({id}: IRequest): Promise<void>{
        const foundMuscle = await prismaInstance.muscles.findUnique({
            where: {
                id
            }
        });
    
        if(!foundMuscle){
            throw new AppError("Muscle not found.", 404);
        }
    
        await prismaInstance.exercises_Muscles.deleteMany({
            where:{
                fk_muscles_id: id
            }
        });
    
        await prismaInstance.muscles.delete({
            where:{
                id
            }
        });
    }
}