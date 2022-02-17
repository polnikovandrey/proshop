import express, { Router } from "express";
import { createProduct, createProductReview, deleteProduct, getProductById, getProducts, getTopProducts, updateProduct } from "../controllers/productController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const productRouter: Router = express.Router();

productRouter.route('/').get(getProducts).post(protect, admin, createProduct);
productRouter.route('/top').get(getTopProducts);
productRouter.route('/:id').get(getProductById).delete(protect, admin, deleteProduct).put(protect, admin, updateProduct);
productRouter.route('/:id/review').post(protect, createProductReview);

export default productRouter;