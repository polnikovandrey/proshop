import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { OrderModel } from "../models/orderModel.js";
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
        items: { productId: string, name: string, image: string, price: number, countInStock: number, qty: number }[],
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
            orderItems: items.map(item => ({
                name: item.name,
                quality: item.qty,
                image: item.image,
                price: item.price,
                product: new mongoose.Types.ObjectId(item.productId) })),
            shippingAddress,
            paymentMethod,
            taxPrice,
            shippingPrice,
            totalPrice
        }).save();
        res.status(201).json({ createdOrder });
    }
});