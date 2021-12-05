import { Product, ProductModel } from "../models/productModel.js";
import expressAsyncHandler from "express-async-handler"; // Note usage of express-async-handler wrapper to catch express errors during async...await

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
export const getProducts = expressAsyncHandler(async (req, res) => {
    const products: Product[] = await ProductModel.find({});
    res.json(products);
});

// @desc    Fetch a single product
// @route   GET /api/products/:id
// @access  Public
export const getProductById = expressAsyncHandler(async (req, res) => {
    const product: Product = await ProductModel.findById(req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});