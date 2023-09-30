import { Router } from "express";
import {body, validationResult} from "express-validator"
import { createProduct, deleteProduct, getAllUserProducts, getOneUserProduct, updaterProduct } from "./handlers/product";
import { handleInputErrors } from "./modules/middleware";

const router = Router();
/**
 * Product
 */
router.get("/product", getAllUserProducts);

router.get("/product/:id", getOneUserProduct);

router.post("/product", body('name').isString(),handleInputErrors, createProduct);

router.put("/product/:id", body('name').isString(),handleInputErrors, updaterProduct);

router.delete("/product/:id", deleteProduct);

/**
 * Update
 */

router.get("/update", (req, res) => {});

router.get("/update/:id", (req, res) => {});

router.post("/update",
body('title').isString(),
body('body').isString(),
body('productId').isString(),
(req, res) => {});

router.put("/update/:id",
body('title').optional(),
body('body').optional(),
body('version').optional(),
body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']).optional(),
(req, res) => {});

router.delete("/update/:id", (req, res) => {});

/**
 * UpdatePoint
 */

router.get("/updatepoint", (req, res) => {});

router.get("/updatepoint/:id", (req, res) => {});

router.post("/updatepoint",
body('name').isString(), 
body('description').isString(),
body('updateId').isString(),
(req, res) => {});

router.put("/updatepoint/:id",
body('name').optional().isString(), 
body('description').optional().isString(),
(req, res) => {});

router.delete("/updatepoint/:id", (req, res) => {});

export default router;