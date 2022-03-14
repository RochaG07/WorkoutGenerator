import { Muscles } from "@prisma/client";
import { prismaInstance } from "../../../app";

export default class ShowAllMuscles{
    public async execute(): Promise<Muscles[]>{
        const muscles = await prismaInstance.muscles.findMany();

        return muscles;
    }
}