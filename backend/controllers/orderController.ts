import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { Order, OrderModel } from "../models/orderModel.js";
import mongoose, { Document } from "mongoose";
import { UserDocument } from "../models/userModel.js";

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const addOrderItems = expressAsyncHandler(async (req: Request, res: Response) => {
    const { user } : { user: UserDocument } = req.body;
    const {
        items,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    }: {
        items: { productId: string, name: string, image: string, price: number, countInStock: number, quality: number }[],
        shippingAddress: string,
        paymentMethod: string,
        itemsPrice: number,
        taxPrice: number,
        shippingPrice: number,
        totalPrice: number
    } = req.body;
    if (items && items.length === 0) {
        res.status(400);
        throw new Error('No order items');
    } else {
        const createdOrder: Document = await new OrderModel({
            user: new mongoose.Types.ObjectId(user._id),
            items: items.map(item => ({
                name: item.name,
                quality: item.quality,
                image: item.image,
                price: item.price,
                product: new mongoose.Types.ObjectId(item.productId) })),
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        }).save();
        res.status(201).json(createdOrder);
    }
});

// @desc    Get order by id
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = expressAsyncHandler(async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const order: Order = await OrderModel.findById(id).populate('user', 'name email');
    if (order) {
        res.json(order);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});