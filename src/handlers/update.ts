import prisma from "../db";

export const getAllUserUpdates = async (req, res) => {
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
};

export const getOneUserUpdate = async (req, res, next) => {
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
        e.type= "notFound";
        next(e);
    }
};

export const createUpdate = async (req, res) => {
    const { title, body, productID } = req.body;
    const productExists = await prisma.product.findUnique({
        where: {
            id_belongsToId: {
                id: productID,
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
            productID,
        },
    });
    res.status(201).json({ data: update });
};

export const updaterUpdate = async (req, res,next) => {
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
        e.type= "notFound";
        next(e);
    }
};

export const deleteUpdate = async (req, res, next) => {
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
        e.type= "notFound";
        next(e);
    }
};
