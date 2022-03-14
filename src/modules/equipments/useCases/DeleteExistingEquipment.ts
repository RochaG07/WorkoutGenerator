import { prismaInstance } from "../../../app"
import AppError from "../../../errors/AppError";

interface IRequest{
    id: string
}


export default class DeleteExistingEquipment{
    public async execute({id}:IRequest): Promise<void>{
        const equipment = await prismaInstance.equipments.findUnique({
            where: {
                id
            }
        });
  
        if(!equipment){
            throw new AppError("Equipment not found!", 404);
        }
        

        await prismaInstance.equipments.delete({
            where: {
                id
            }
        });
    } 
}