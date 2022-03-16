import { Exercises, PrismaClient } from "@prisma/client";
import AppError from "../../../errors/AppError";
import CreateNewEquipment from "../../equipments/useCases/CreateNewEquipment";

interface IRequest{
    name: string,
    muscles_names: string[],
    necessary_equipment_name?: string | undefined;
    execution_example_link?: string | undefined;
}

export default class CreateNewExercise{
    prismaInstance: PrismaClient;

    constructor(prismaInstance: PrismaClient){
        this.prismaInstance = prismaInstance;
    }

    public async execute({name, muscles_names, necessary_equipment_name, execution_example_link}: IRequest): Promise<Exercises>{

        const exerciseAlreadyExists = await this.prismaInstance.exercises.findFirst({
            where: {
                name
            }
        })

        if(exerciseAlreadyExists){
            throw new AppError("Exercise already exists.");
        }
         

        let exercise: Exercises;

        if(necessary_equipment_name){
            let equipment = await this.prismaInstance.equipments.findFirst({
                where: {
                    name: necessary_equipment_name
                }
            })

            if(!equipment){
                const createNewEquipment = new CreateNewEquipment(this.prismaInstance);

                equipment = await createNewEquipment.execute({
                    name: necessary_equipment_name
                });
            }

            exercise = await this.prismaInstance.exercises.create({
                data: {
                    name,
                    exercises_muscles:{},
                    fk_equipment_id: equipment.id,
                    execution_example_link
                }
            })
        } else {
            exercise = await this.prismaInstance.exercises.create({
                data: {
                    name,
                    exercises_muscles:{},
                    execution_example_link
                }
            })
        }
        

        // Faz a relação com os músculos (n-n)
        muscles_names.forEach(async (muscle_name: string) => {
            await this.prismaInstance.exercises_Muscles.create({
                data:{
                    exercises:{
                        connect:{
                            id: exercise.id
                        }
                    },
                    muscles:{
                        connectOrCreate:{
                            where:{
                                name: muscle_name
                            },
                            create:{
                                name: muscle_name
                            }
                        }
                    }
                }
            });
        });

        return exercise;
    }
}