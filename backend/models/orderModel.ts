import mongoose, { Model, Schema } from "mongoose";
import { User } from "./userModel";
import { Product } from "./productModel";

export interface Order {
    user: Schema.Types.ObjectId,
    orderItems: OrderItem[],
    shippingAddress: Object,        // TODO !!!
    paymentMethod: string,
    paymentResult: Object,          // TODO !!!
    taxPrice: number,
    shippingPrice: number,
    totalPrice: number,
    paid: boolean,
    paidAt: Date,
    delivered: boolean,
    deliveredAt: Date,
    email: string,
    password: string,
    admin: boolean
}

export interface OrderItem {
    name: string,
    quality: number,
    image: string,
    price: number,
    product: Schema.Types.ObjectId
}

const orderItemSchema: Schema<OrderItem> = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        quality: {
            type: Number,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        product: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Product'
        }
    },
    {
        timestamps: true
    }
);

const orderSchema: Schema<Order> = new mongoose.Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        orderItems: [ orderItemSchema ],
        shippingAddress: {
            address: {
                type: String,
                required: true
            },
            city: {
                type: String,
                required: true
            },
            postalCode: {
                type: String,
                required: true
            },
            country: {
                type: String,
                required: true
            }
        },
        paymentMethod: {
            type: String,
            required: true
        },
        paymentResult: {
            id: {
                type: String
            },
            status: {
                type: String
            },
            updateTime: {
                type: String
            },
            email_address: {
                type: String
            }
        },
        taxPrice: {
            type: Number,
            required: true,
            default: 0.0
        },
        shippingPrice: {
            type: Number,
            required: true,
            default: 0.0
        },
        totalPrice: {
            type: Number,
            required: true,
            default: 0.0
        },
        paid: {
            type: Boolean,
            required: true,
            default: false
        },
        paidAt: {
            type: Date
        },
        delivered: {
            type: Boolean,
            required: true,
            default: false
        },
        deliveredAt: {
            type: Date
        }
    },
    {
        timestamps: true
    }
);

export const OrderModel: Model<Order> = mongoose.model<Order>('Order', orderSchema);