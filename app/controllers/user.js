

export const signup = async (req, res) => {
    try {
        const response = req.body;
        const prisma = req.app.get('prisma');
        const newUser = await prisma.user.create({ data: response });

        // En cas de succès, renvoie l'objet utilisateur créé avec un statut 201 (Created)
        res.status(201).json(newUser);
    } catch (error) {
        // En cas d'échec, intercepte et renvoie l'erreur avec un statut 500 (Internal Server Error)
        res.status(500).json({ error: error.message });
    }
};

export const login = (req, res) => {
    res.send('You are logged in');
};