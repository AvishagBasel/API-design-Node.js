import prisma from "../db";

export const getAllUserProducts = async (req, res) => {
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
        res.status(404).json({ message: "No products found for the user or user does not exist." });
    }
};

export const getOneUserProduct = async (req, res) => {
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
        res.status(404).json({ message: "Product not found or does not belong to the user." });
    }
};

export const createProduct = async (req, res) => {
    try {
        const product = await prisma.product.create({
            data: {
                name: req.body.name,
                belongsToId: req.user.id
            }
        });
        res.status(201).json({ data: product });
    } catch (e) {
        res.status(500).json({ message: "An error occurred while creating the product." });
    }
};

export const updaterProduct = async (req, res) => {
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
        if (e.code === 'P2025') {
            res.status(404).json({ message: "Product not found or does not belong to the user." });
        } else {
            res.status(500).json({ message: "An error occurred while updating the product." });
        }
    }
};

export const deleteProduct = async (req, res) => {
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
        if (e.code === 'P2025') {
            res.status(404).json({ message: "Product not found or does not belong to the user." });
        } else {
            res.status(500).json({ message: "An error occurred while deleting the product." });
        }
    }
};
