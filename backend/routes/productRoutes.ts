import express, { Router } from "express";
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../controllers/productController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const productRouter: Router = express.Router();

productRouter.route('/').get(getProducts).post(protect, admin, createProduct);
productRouter.route('/:id').get(getProductById).delete(protect, admin, deleteProduct).put(protect, admin, updateProduct);

export default productRouter;