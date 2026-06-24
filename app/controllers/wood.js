import { prisma } from "../../app.js";

export const getAll = async (req, res) => {
    try {
        const woods = await prisma.wood.findMany();

        res.status(200).json(woods);
    } catch (error) {

        res.status(500).json({
            error: error.message || "An error occurred while fetching the woods.",
        });
    }
};

export const readByHardness = async (req, res) => {
    try {
        const hardness = req.params.hardness;

        const woods = await prisma.wood.findMany({
            where: { hardness: hardness },
        });

        res.status(200).json(woods);
    } catch (error) {
        res.status(500).json({
            error: error.message || "An error occurred while fetching the woods.",
        });
    }
};