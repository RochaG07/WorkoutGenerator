import { Equipments } from "@prisma/client";
import CreateNewEquipment from "../../modules/equipments/useCases/CreateNewEquipment"
import prismaClient from "../../prismaClient";
import { prismaMock } from "../../prismaMock";


describe("Create equipment", () => {


    it("Should be able to create a new equipment", async () => {
        const createNewEquipment = new CreateNewEquipment(prismaMock);

        const equipment: Equipments = {
            id: '1',
            name: 'test'
        }

        prismaMock.equipments.create.mockResolvedValue(equipment);

        await expect(createNewEquipment.execute(equipment)).resolves.toEqual({
            id: '1',
            name: 'test',
        })
        
    })
})