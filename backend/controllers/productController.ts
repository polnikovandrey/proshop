import { ProductDocument, ProductModel } from "../models/productModel.js";
import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express"; // Note usage of express-async-handler wrapper to catch express errors during async...await

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
export const getProducts = expressAsyncHandler(async (req: Request, res: Response) => {
    const products: ProductDocument[] = await ProductModel.find({});
    res.json(products);
});

// @desc    Fetch a single product
// @route   GET /api/products/:id
// @access  Public
export const getProductById = expressAsyncHandler(async (req: Request, res: Response) => {
    const product: ProductDocument = await ProductModel.findById(req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = expressAsyncHandler(async (req: Request, res: Response) => {
    const product: ProductDocument = await ProductModel.findById(req.params.id);
    if (product) {
        await product.remove();
        res.json({ message: 'Product removed '});
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});