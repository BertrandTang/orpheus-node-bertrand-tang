import { prisma } from '../app.js'; 
import "dotenv/config";

// Woods data
const woodsData = [
    { name: "Épicéa", type: "softwood", hardness: "tender" },
    { name: "Pin", type: "softwood", hardness: "medium_hard" },
    { name: "Padouk", type: "exotic_wood", hardness: "hard" },
    { name: "Érable", type: "noble_and_hardwoods", hardness: "medium_hard" },
    { name: "Hêtre", type: "noble_and_hardwoods", hardness: "medium_hard" },
    { name: "Itauba", type: "exotic_wood", hardness: "hard" },
    { name: "Douglas", type: "softwood", hardness: "tender" }
];

// Users Data
const usersData = [
    {
        firstName: "Naruto",
        lastName: "Uzumaki",
        email: "naruto.uzumaki@example.com",
        password: "narutouzumaki@2026",
    }
];

async function main() {
    console.log(`Début du seeding...`);

    // Seeding wood
    for (const wood of woodsData) {
        await prisma.wood.upsert({
            where: { name: wood.name },
            update: {},
            create: {
                name: wood.name,
                type: wood.type as any,
                hardness: wood.hardness as any,
            },
        });
    }
    console.log(`Essences de bois insérées.`);

    // Seeding users
    for (const user of usersData) {
        await prisma.user.upsert({
            where: { email: user.email }, 
            update: {},
            create: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: user.password,
            },
        });
    }
    console.log(`Utilisateurs insérés.`);

    console.log(`Seeding terminé avec succès.`);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });