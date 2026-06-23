import { prisma } from "../../app.js"; 

export const signup = async (req, res) => {
    try {
        const response = req.body;
        const newUser = await prisma.user.create({ data: response });

        // En cas de succès, renvoie l'objet utilisateur créé
        res.status(201).json(newUser);
    } catch (error) {
        // En cas d'échec, renvoie un message et les détails de l'erreur
        res.status(500).json({ 
            message: "Une erreur est survenue lors de l'inscription de l'utilisateur.",
            error: error.message 
        });
    }
};

export const login = (req, res) => {
    res.send('You are logged in');
};