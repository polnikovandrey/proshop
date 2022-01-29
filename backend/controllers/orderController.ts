import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { Order, OrderDocument, OrderModel } from "../models/orderModel.js";
import mongoose from 'mongoose';
import { UserDocument } from "../models/userModel.js";

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const addOrderItems = expressAsyncHandler(async (req: Request, res: Response) => {
    const { user }: { user: UserDocument } = req.body;
    const {
        items,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    }: {
        items: { productId: string, name: string, image: string, price: number, countInStock: number, quantity: number }[],
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
        const createdOrder: Order = await new OrderModel({
            user: new mongoose.Types.ObjectId(user._id),
            items: items.map(item => ({
                name: item.name,
                quantity: item.quantity,
                image: item.image,
                price: item.price,
                product: new mongoose.Types.ObjectId(item.productId)
            })),
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

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
export const updateOrderToPaid = expressAsyncHandler(async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const order: OrderDocument = await OrderModel.findById(id);
    if (order) {
        order.paid = true;
        order.paidAt = new Date();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            updateTime: req.body.update_time,
            email_address: req.body.payer.email_address
        };
        const updatedOrder: Order = await order.save();
        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});

// @desc    Get logged-in user orders
// @route   GET /api/orders/userOrderList
// @access  Private
export const getUserOrderList = expressAsyncHandler(async (req: Request, res: Response) => {
    const { user }: { user: UserDocument } = req.body;
    const orders: Order[] = await OrderModel.find({ user: { _id: user._id }} as {});
    res.json(orders);
});