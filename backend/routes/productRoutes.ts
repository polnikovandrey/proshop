import express, { Router } from "express";
import { Product, ProductModel } from "../models/productModel.js";
import expressAsyncHandler from "express-async-handler"; // Note usage of express-async-handler wrapper to catch express errors during async...await

const productRouter: Router = express.Router();

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
productRouter.get('/', expressAsyncHandler(async (request, response) => {
    const products: Product[] = await ProductModel.find({});
    response.json(products);
}));

// @desc    Fetch a single product
// @route   GET /api/products/:id
// @access  Public
productRouter.get('/:id', expressAsyncHandler(async (request, response) => {
    const product: Product = await ProductModel.findById(request.params.id);
    if (product) {
        response.json(product);
    } else {
        response.status(404);
        throw new Error('Product not found');
    }
}));

export default productRouter;