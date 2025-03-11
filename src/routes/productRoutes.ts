import express from 'express';
import { getAllProducts, createProduct, deleteProduct, getSingleProduct, updateProduct } from '../controllers/productController';

const router = express.Router();

router.get("/", getAllProducts);
router.get("/singleProduct/:id", getSingleProduct);
router.post("/create", createProduct);
router.patch("/edit/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);

export default router;