import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


async function main(){
    
    await prisma.muscles.createMany({
        data:[
            { name: "Peitoral"},
            { name: "Abdômen"},
            { name: "Tríceps"},
            { name: "Bíceps"},
            { name: "Deltóides"},
            { name: "Panturrilha"},
            { name: "Coxas"},
            { name: "Costas"}
        ]
    });
    
}

main();