import prisma from "../db";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";

export const createNewUser = async (req, res,next) => {
    try {
        const { username, password } = req.body;

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
        e.type = 'auth';
        next(e)
    }
};

export const signin = async (req, res) => {
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
};
