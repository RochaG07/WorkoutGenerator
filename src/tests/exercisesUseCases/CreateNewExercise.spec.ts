import { Equipments, Exercises } from "@prisma/client";
import CreateNewExercise from "../../modules/exercises/useCases/CreateNewExercise";
import { prismaMock } from "../../prismaMock";


describe("Create exercise", () => {
    it("Should be able to create a new exercise", async () => {
        const createNewExercise = new CreateNewExercise(prismaMock);

        const exercise: Exercises = {
            id: '1',
            name: 'test',
            execution_example_link: null,
            fk_equipment_id: null
        }

        prismaMock.exercises.create.mockResolvedValue(exercise);

        await expect(createNewExercise.execute({
            name: 'test',
            muscles_names: ['test muscle']
        }))
        .resolves.toEqual({
            id: '1',
            name: 'test',
            execution_example_link: null,
            fk_equipment_id: null
        })
        
    })
})