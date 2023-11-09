import prisma from "../db";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";

export const createNewUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        const existingUser = await prisma.user.findUnique({
            where: {
                username,
            }
        });

        if (existingUser) {
            return res.status(409).json({ message: "Username already exists." });
        }

        const hashedPassword = await hashPassword(password);
        const newUser = await prisma.user.create({
            data: {
                username,
                password: hashedPassword,
            }
        });

        const token = createJWT(newUser);
        res.status(201).json({ token });
    } catch (e) {
        res.status(500).json({ message: "An error occurred while creating a new user." });
    }
};

export const signin = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await prisma.user.findUnique({
            where: {
                username,
            }
        });

        if (!user) {
            return res.status(401).json({ message: "Invalid username." }); 
        }

        const isValid = await comparePasswords(password, user.password);
        if (!isValid) {
            return res.status(401).json({ message: "Invalid password." });
        }

        const token = createJWT(user);
        res.json({ token }); 
    } catch (e) {
        res.status(500).json({ message: "An error occurred during sign-in." });
    }
};
