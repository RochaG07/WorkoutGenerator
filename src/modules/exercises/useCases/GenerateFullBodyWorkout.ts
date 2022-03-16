import { Exercises, PrismaClient } from "@prisma/client";

interface IRequest{
    finalizingMuscleName: string,
    quantityOfMultipleMusclesExercisesChosen: number
}

export default class GenerateFullBodyWorkout{
    prismaInstance: PrismaClient;

    constructor(prismaInstance: PrismaClient){
        this.prismaInstance = prismaInstance;
    }

    public async execute({finalizingMuscleName, quantityOfMultipleMusclesExercisesChosen}: IRequest):Promise<String[]>{
        const finalizingMuscle= await this.prismaInstance.muscles.findUnique({
            where: {
                name: finalizingMuscleName
            }
        });

        const allExercises = await this.prismaInstance.exercises.findMany();

        let multipleMusclesExercises: Exercises[] = [];
        let singleMuscleExercises: Exercises[] = [];
        let finalizingMuscleExercises: Exercises[] = [];

        /// Separa os musculos em isolados/compostos/finalizadores
        for (let i = 0; i < allExercises.length; i++) {
            const muscles = await this.prismaInstance.exercises_Muscles.findMany({
                where: {
                    fk_exercises_id: allExercises[i].id
                }
            });
           
            if(muscles.length > 1){
                multipleMusclesExercises.push(allExercises[i]);
            } else {    
                if(muscles[0].fk_muscles_id === finalizingMuscle?.id){
                    finalizingMuscleExercises.push(allExercises[i]);
                } else {
                    singleMuscleExercises.push(allExercises[i]);
                }
            }   
        }

        /// Quais musculos precisam ser selecionados ao selecionar os exercícios isolados 
        // Exclui os que precisam ir por último       
        let allAvaliableIsolatedMuscleGroupsNames: string[] = []; 
        
        for (let i = 0; i < singleMuscleExercises.length; i++) {
            const muscle_exercise = await this.prismaInstance.exercises_Muscles.findFirst({
                where: {
                   fk_exercises_id: singleMuscleExercises[i].id
                }
            })

            if(muscle_exercise){
                const muscle = await this.prismaInstance.muscles.findFirst({
                    where: {
                       id: muscle_exercise.fk_muscles_id
                    }
                })

                if(muscle && muscle.name !== finalizingMuscle?.name){
                    allAvaliableIsolatedMuscleGroupsNames.push(muscle.name);           
                }     
            }
        }

        // Remove duplicates
        allAvaliableIsolatedMuscleGroupsNames = allAvaliableIsolatedMuscleGroupsNames.filter(((muscle_name, i) => (
            !i || muscle_name != allAvaliableIsolatedMuscleGroupsNames[i - 1]
        )));

        
  
        let fullBodyWorkout:string[] = [];

        /// 1º set of exercises: multiple muscle exercises
        for (let i = 0; i < quantityOfMultipleMusclesExercisesChosen; i++) {
            // Pick exercises at random
            // There can be some overlap in muscles used in the multiple muscle exercises

            let chosenIndex = getRandomInt(0, multipleMusclesExercises.length);
            
            fullBodyWorkout.push(multipleMusclesExercises[chosenIndex].name);

            multipleMusclesExercises.splice(chosenIndex, 1);
        }

        /// 2º set of exercises: isolated muscle exercises 
        for (let i = 0; i < allAvaliableIsolatedMuscleGroupsNames.length; i++) {
            if(singleMuscleExercises.length > 0){
                let chosenIndex = getRandomInt( 0, singleMuscleExercises.length); 

                fullBodyWorkout.push(singleMuscleExercises[chosenIndex].name);

                singleMuscleExercises.splice(chosenIndex, 1);
            }    
        }

        /// 3º set of exercises: finalizing muscle exercises (just 1)
        let chosenIndex = getRandomInt(0, finalizingMuscleExercises.length);
        fullBodyWorkout.push(finalizingMuscleExercises[chosenIndex].name);


        return fullBodyWorkout;
    }
}

function getRandomInt(min: number, max: number){
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min) + min);
}