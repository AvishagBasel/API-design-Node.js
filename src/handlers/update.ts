import prisma from "../db";

export const getAllUserUpdates = async (req, res) => {
    try {
        const userUpdates = await prisma.update.findMany({
            where: {
                product: {
                    belongsToId: req.user.id,
                },
            },
        });
        if (userUpdates.length === 0) {
            return res.status(404).json({ message: "No updates found for the user." });
        }
        res.json({ data: userUpdates });
    } catch (e) {
        res.status(500).json({ message: "An error occurred while retrieving updates." });
    }
};

export const getOneUserUpdate = async (req, res) => {
    const id = req.params.id;
    try {
        const update = await prisma.update.findFirstOrThrow({
            where: {
                id,
                product: {
                    belongsToId: req.user.id,
                },
            },
        });
        res.json({ data: update });
    } catch (e) {
        res.status(404).json({ message: "Update not found or does not belong to the user." });
    }
};

export const createUpdate = async (req, res) => {
    try {
        const { title, body, productId } = req.body;
        const productExists = await prisma.product.findUnique({
            where: {
                id_belongsToId: {
                    id: productId,
                    belongsToId: req.user.id,
                },
            },
        });
        if (!productExists) {
            return res.status(404).json({ message: "Product not found or does not belong to the user." });
        }
        const update = await prisma.update.create({
            data: {
                title,
                body,
                product: {connect: {id: productExists.id}},
            },
        });
        res.status(201).json({ data: update });
    } catch (e) {
        res.status(500).json({ message: "An error occurred while creating the update." });
    }
};

export const updaterUpdate = async (req, res) => {
    const id = req.params.id;
    try {
        const updated = await prisma.update.update({
            where: {
                id,
                product: {
                    belongsToId: req.user.id,
                },
            },
            data: req.body,
        });
        res.json({ data: updated });
    } catch (e) {
        if (e.code === 'P2025') {
            res.status(404).json({ message: "Update not found or does not belong to the user." });
        } else {
            console.error(e)
            res.status(500).json({ message: "An error occurred while updating the update."});
        }
    }
};

export const deleteUpdate = async (req, res) => {
    const id = req.params.id;
    try {
        const deleted = await prisma.update.delete({
            where: {
                id,
                product: {
                    belongsToId: req.user.id,
                },
            },
        });
        res.json({ data: deleted });
    } catch (e) {
        if (e.code === 'P2025') {
            res.status(404).json({ message: "Update not found or does not belong to the user." });
        } else {
            res.status(500).json({ message: "An error occurred while deleting the update." });
        }
    }
};
