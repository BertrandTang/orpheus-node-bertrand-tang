import { prisma } from '../app.js';
import bcrypt from "bcrypt";
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

    // Seeding users
    for (const user of usersData) {

        const hashedPassword = await bcrypt.hash(user.password, 10);

        await prisma.user.upsert({
            where: { email: user.email },
            update: {},
            create: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: hashedPassword,
            },
        });
    }
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