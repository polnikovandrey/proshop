import { ProductDocument, ProductModel, Review } from "../models/productModel.js";
import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { UserDocument } from "../models/userModel";

// @desc    Fetch all products
// @route   GET /api/product
// @access  Public
export const getProducts = expressAsyncHandler(async (req: Request, res: Response) => {
    const pageSize = 12;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword
        ? {
            name: {
                $regex: req.query.keyword,
                $options: 'i'
            }
        }
        : { };
    const count = await ProductModel.countDocuments({ ...keyword } as {});
    const products: ProductDocument[] = await ProductModel.find({ ...keyword } as {}).limit(pageSize).skip(pageSize * (page - 1));
    res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Fetch a single product
// @route   GET /api/product/:id
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

// @desc    Create a product
// @route   POST /api/product
// @access  Private/Admin
export const createProduct = expressAsyncHandler(async (req: Request, res: Response) => {
    const { user }: { user: UserDocument } = req.body;
    const createdProduct: ProductDocument = await ProductModel.create({
        user: user._id,
        name: 'Sample name',
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        description: 'Sample description',
        numReviews: 0,
        price: 0,
        countInStock: 0
    });
    res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/product/:id
// @access  Private/Admin
export const updateProduct = expressAsyncHandler(async (req: Request, res: Response) => {
    const { name, price, description,  image, brand, category, countInStock } = req.body;
    const product: ProductDocument = await ProductModel.findById(req.params.id);
    if (product) {
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock;
        const updatedProduct: ProductDocument = await product.save();
        res.status(201).json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Create new review
// @route   POST /api/product/:id/review
// @access  Private
export const createProductReview = expressAsyncHandler(async (req: Request, res: Response) => {
    const { rating, comment } = req.body;
    const { user }: { user: UserDocument } = req.body;
    const product: ProductDocument = await ProductModel.findById(req.params.id);
    if (product) {
        const alreadyReviewed = product.reviews.find(review => review.user.toString() === user._id.toString());
        if (alreadyReviewed) {
            res.status(400);
            throw new Error('Product already reviewed')
        } else {
            const review: Review = {
                name: user.name,
                rating: Number(rating),
                comment,
                user: user._id
            };
            product.reviews.push(review);
            product.numReviews = product.reviews.length;
            product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
            await product.save();
            res.status(201).json({ message: 'Review added' });
        }
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Get top-rated products
// @route   GET /api/product/top
// @access  Public
export const getTopProducts = expressAsyncHandler(async (req: Request, res: Response) => {
    const products: ProductDocument[] = await ProductModel.find({}).sort({ rating: -1 }).limit(3);
    res.json(products)
});