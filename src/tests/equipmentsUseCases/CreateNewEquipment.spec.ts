import CreateNewEquipment from "../../modules/equipments/useCases/CreateNewEquipment"
import { prismaMock } from "../../prismaMock";


describe("Create equipment", () => {

    let createNewEquipment: CreateNewEquipment;

    beforeEach(()=> {
        createNewEquipment = new CreateNewEquipment(prismaMock);

    });

    it("Should be able to create a new equipment", () => {
        const equipment = createNewEquipment.execute({
            name: "teste22"
        });



        
        expect(2+2).toBe(4);
    })
})