import prisma from "../db";

export const getAllUserProducts = async (req, res, next) => {
    try {
        const userProducts = await prisma.user.findUniqueOrThrow({
            where: {
                id: req.user.id
            },
            include: {
                products: true
            }
        });
        res.json({ data: userProducts.products });
    } catch (e) {
        e.type= "notFound";
        next(e);
    }
};

export const getOneUserProduct = async (req, res,next) => {
    const id = req.params.id;
    try {
        const product = await prisma.product.findFirstOrThrow({
            where: {
                id,
                belongsToId: req.user.id
            }
        });
        res.json({ data: product });
    } catch (e) {
        e.type= "notFound";
        next(e);
    }
};

export const createProduct = async (req, res) => {
    const product = await prisma.product.create({
        data: {
            name: req.body.name,
            belongsToId: req.user.id
        }
    });
    res.status(201).json({ data: product });
};

export const updaterProduct = async (req, res,next) => {
    try {
        const updatedProduct = await prisma.product.update({
            where: {
                id_belongsToId: {
                    id: req.params.id,
                    belongsToId: req.user.id
                }
            },
            data: {
                name: req.body.name
            }
        });
        res.json({ data: updatedProduct });
    } catch (e) {
        e.type= "notFound";
        next(e);
    }
};

export const deleteProduct = async (req, res, next) => {
    try {
        const deletedProduct = await prisma.product.delete({
            where: {
                id_belongsToId: {
                    id: req.params.id,
                    belongsToId: req.user.id
                }
            }
        });
        res.json({ data: deletedProduct });
    } catch (e) {
        e.type= "notFound";
        next(e);
    }
};
