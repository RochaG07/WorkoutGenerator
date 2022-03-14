import { Equipments } from "@prisma/client";
import { prismaInstance } from "../../../app";

export default class ShowAllEquipments{
    public async execute(): Promise<Equipments[]>{
        return await prismaInstance.equipments.findMany();
    }
}