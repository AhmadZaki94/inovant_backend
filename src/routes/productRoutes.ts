import express from 'express';
import { getAllProducts, createProduct, deleteProduct, getSingleProduct, updateProduct } from '../controllers/productController';

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getSingleProduct);
router.post("/product", createProduct);
router.patch("/edit/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;