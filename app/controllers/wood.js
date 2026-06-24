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

export const createWood = async (req, res) => {
    try {
        let pathname = null;

        if (req.file) {
            pathname = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
        }

        let parsedDatas = {};
        if (req.body.datas) {
            parsedDatas = typeof req.body.datas === "string"
                ? JSON.parse(req.body.datas)
                : req.body.datas;
        }

        const woodData = {
            name: parsedDatas.name ?? req.body.name,
            type: parsedDatas.type ?? req.body.type,
            hardness: parsedDatas.hardness ?? req.body.hardness,
        };

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

        res.status(201).json(newWood);

    } catch (error) {
        res.status(500).json({
            error: error.message || "An error occurred while creating the wood.",
        });
    }
};