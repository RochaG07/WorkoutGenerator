import { prismaInstance } from "../../../app";
import { Exercises } from "@prisma/client";

// Problema com exercícios que pertencem mais de um grupo muscular
// Devem contar separadamente como uma categoria separada? 
// Colocadas no topo de cada série?

//Mais de um exercício por grupo muscular

// Sortear exercícios com grande grupos musculares e coloca-lós na frente de cada série?
// 

// Exercícios finalizadores?
// Colocadas no final de cada série


export default class GenerateFullBodyWorkout{
    public async execute():Promise<String[]>{
        // Muitas chamadas ao banco de dados? 
        // tentar minimizar? 
        // pegar as tabelas que vou precisar de antemão? 

        const allExercises = await prismaInstance.exercises.findMany();

        let multipleMusclesExercises: Exercises[] = [];
        let singleMuscleExercises: Exercises[] = [];

        /// Separa os musculos em isolados/compostos
        for (let i = 0; i < allExercises.length; i++) {
            const muscles = await prismaInstance.exercises_Muscles.findMany({
                where: {
                    fk_exercises_id: allExercises[i].id
                }
            });
           
            if(muscles.length > 1){
                multipleMusclesExercises.push(allExercises[i]);
            } else {
                singleMuscleExercises.push(allExercises[i]);
            }   
        }

        /// Quais musculos precisam ser selecionados ao selecionar os exercícios isolados        
        let allAvaliableIsolatedMuscleGroupsNames: string[] = []; 
        
        for (let i = 0; i < singleMuscleExercises.length; i++) {
            const muscle_exercise = await prismaInstance.exercises_Muscles.findFirst({
                where: {
                   fk_exercises_id: singleMuscleExercises[i].id
                }
            })

            if(muscle_exercise){
                const muscle = await prismaInstance.muscles.findFirst({
                    where: {
                       id: muscle_exercise.fk_muscles_id
                    }
                })

                if(muscle){
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
        const quantityOfMultipleMusclesExercisesChosen = 3;
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
                let chosenIndex = getRandomInt( 1, singleMuscleExercises.length) - 1; 

                fullBodyWorkout.push(singleMuscleExercises[chosenIndex].name);

                singleMuscleExercises.splice(chosenIndex, 1);
            }    
        }

        // Move os exercícios que são abdominais para o final da série (versão gambiarra)
        // atributo = MuscleGroupThatMustBeMovedToLast?

        const abdominalExercises = fullBodyWorkout.map((exercise, i) => {
            if(exercise.includes("Abdominal")){
                fullBodyWorkout.splice(i, 0);
            }
        });
        


        return fullBodyWorkout;
    }
}

function getRandomInt(min: number, max: number){
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min) + min);
}