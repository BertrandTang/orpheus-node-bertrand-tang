import { prisma } from "../../app.js";

export const getAll = async (req, res) => {
    try {
        const woods = await prisma.wood.findMany();
        const baseUrl = `${req.protocol}://${req.get("host")}/api/woods`;

        // Ajout des liens spécifiques (self et sameHardness) pour chaque bois
        const woodsWithLinks = woods.map((wood) => ({
            ...wood,
            links: [
                { rel: "self", method: "GET", href: `${baseUrl}/${wood.id}` },
                { rel: "sameHardness", method: "GET", href: `${baseUrl}/hardness/${wood.hardness}` }
            ]
        }));

        res.status(200).json(woodsWithLinks);
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
        const baseUrl = `${req.protocol}://${req.get("host")}/api/woods`;

        // Ajout des liens spécifiques pour chaque bois de cette collection
        const woodsWithLinks = woods.map((wood) => ({
            ...wood,
            links: [
                { rel: "self", method: "GET", href: `${baseUrl}/${wood.id}` },
                { rel: "sameHardness", method: "GET", href: `${baseUrl}/hardness/${wood.hardness}` }
            ]
        }));

        res.status(200).json(woodsWithLinks);
    } catch (error) {
        res.status(500).json({
            error: error.message || "An error occurred while fetching the woods.",
        });
    }
};

export const createWood = async (req, res) => {
    try {
        let pathname = null;

        if (req.file) {
            pathname = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
        }

        const woodData = req.body.datas
            ? JSON.parse(req.body.datas)
            : req.body;

        if (!woodData.name || !woodData.type || !woodData.hardness) {
            return res.status(400).json({
                error: "Missing required fields: name, type, hardness. With form-data, add them as Text fields (not in the raw JSON tab).",
            });
        }

        const newWood = await prisma.wood.create({
            data: {
                ...woodData,
                image: pathname,
            },
        });

        const baseUrl = `${req.protocol}://${req.get("host")}/api/woods`;

        res.status(201).json({
            ...newWood,
            links: [
                { rel: "self", method: "GET", href: `${baseUrl}/${newWood.id}` },
                { rel: "sameHardness", method: "GET", href: `${baseUrl}/hardness/${newWood.hardness}` }
            ]
        });

    } catch (error) {
        res.status(500).json({
            error: error.message || "An error occurred while creating the wood.",
        });
    }
};