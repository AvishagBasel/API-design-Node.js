import { Router } from "express";
import {body} from "express-validator"
import { createProduct, deleteProduct, getAllUserProducts, getOneUserProduct, updaterProduct } from "./handlers/product";
import { createUpdate, deleteUpdate, getAllUserUpdates, getOneUserUpdate, updaterUpdate } from "./handlers/update";
import { handleInputErrors } from "./modules/middleware";

const router = Router();
/**
 * Product
 */
router.get("/product", getAllUserProducts);

router.get("/product/:id", getOneUserProduct);

router.post("/product", body('name').isString().notEmpty(),handleInputErrors, createProduct);

router.put("/product/:id", body('name').isString().notEmpty(),handleInputErrors, updaterProduct);

router.delete("/product/:id", deleteProduct);

/**
 * Update
 */

router.get("/update", getAllUserUpdates);

router.get("/update/:id", getOneUserUpdate);

router.post("/update",
body('title').isString().notEmpty(),
body('body').isString().notEmpty(),
body('productId').isString().notEmpty(),
handleInputErrors,
createUpdate);

router.put("/update/:id",
body('title').optional().isString().notEmpty(),
body('body').optional().isString().notEmpty(),
body('version').optional().isString().notEmpty(),
body('status').optional().isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']),
handleInputErrors,
updaterUpdate);

router.delete("/update/:id", deleteUpdate);

/**
 * UpdatePoint
 */

router.get("/updatepoint", () => {});

router.get("/updatepoint/:id", () => {});

router.post("/updatepoint",
body('name').isString().notEmpty(), 
body('description').isString().notEmpty(),
body('updateId').isString().notEmpty(),
handleInputErrors,
() => {});

router.put("/updatepoint/:id",
body('name').optional().isString().notEmpty(), 
body('description').optional().isString().notEmpty(),
handleInputErrors,
() => {});

router.delete("/updatepoint/:id", () => {});

export default router;