import { Muscles } from "@prisma/client";
import CreateNewMuscle from "../../modules/muscles/useCases/CreateNewMuscle";
import { prismaMock } from "../../prismaMock";


describe("Create muscle", () => {
    it("Should be able to create a new muscle", async () => {
        const createNewMuscle = new CreateNewMuscle(prismaMock);

        const muscle: Muscles = {
            id: '1',
            name: 'test'
        }

        prismaMock.muscles.create.mockResolvedValue(muscle);

        await expect(createNewMuscle.execute(muscle)).resolves.toEqual({
            id: '1',
            name: 'test',
        })
    })
})