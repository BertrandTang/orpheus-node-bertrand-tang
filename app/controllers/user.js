import { prisma } from "../../app.js";

export const signup = async (req, res) => {
    try {
        const response = req.body;
        const newUser = await prisma.user.create({ data: response });

        // En cas de succès, renvoie l'objet utilisateur créé
        res.status(201).json(newUser);
    } catch (error) {
        // Envoie uniquement la propriété error avec un message de secours en anglais
        res.status(500).json({
            error: error.message || "An error occurred during user registration.",
        });
    }
};

export const login = (req, res) => {
    res.send("You are logged in");
};
