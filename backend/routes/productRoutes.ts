import express, { Router } from "express";
import { getProductById, getProducts } from "../controllers/productController.js";

const productRouter: Router = express.Router();

productRouter.route('/').get(getProducts)
productRouter.route('/:id').get(getProductById);

export default productRouter;