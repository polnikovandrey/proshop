import express, { Router } from "express";
import { deleteProduct, getProductById, getProducts } from "../controllers/productController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const productRouter: Router = express.Router();

productRouter.route('/').get(getProducts)
productRouter.route('/:id').get(getProductById).delete(protect, admin, deleteProduct);

export default productRouter;