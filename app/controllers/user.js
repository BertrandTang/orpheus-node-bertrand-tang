import { prisma } from "../../app.js";
import { promisify } from "node:util";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

const signAsync = promisify(jwt.sign);


export const signup = async (req, res) => {
    try {
        const response = req.body;

        const hashedPassword = await bcrypt.hash(response.password, 10);

        const newUser = await prisma.user.create({
            data: {
                ...response,
                password: hashedPassword
            }
        });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({
            error: error.message || "An error occurred during user registration.",
        });
    }
};


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const token = await signAsync(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            user: {
                id: user.id,
                email: user.email
            },
            token: token
        });

    } catch (error) {
        res.status(500).json({
            error: error.message || "An error occurred during login",
        });
    }
};