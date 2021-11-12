import mongoose from "mongoose";
import { User } from "./userModel";
import { Product } from "./productModel";

export interface Order {
    user: mongoose.Schema.Types.ObjectId,
    orderItems: OrderItem[],
    shippingAddress: ShippingAddress,
    paymentMethod: string,
    paymentResult: PaymentResult,
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

export interface ShippingAddress {
    address: string,
    city: string,
    postalCode: string,
    country: string
}

const shippingAddressSchema: mongoose.Schema<ShippingAddress> = new mongoose.Schema<ShippingAddress>(
    {
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
    }
);

export interface PaymentResult {
    id: string,
    status: string,
    updateTime: string,
    email_address: string
}

const paymentResultSchema: mongoose.Schema<PaymentResult> = new mongoose.Schema<PaymentResult>(
    {
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
    }
);

export interface OrderItem {
    name: string,
    quality: number,
    image: string,
    price: number,
    product: mongoose.Schema.Types.ObjectId
}

const orderItemSchema: mongoose.Schema<OrderItem> = new mongoose.Schema<OrderItem>(
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
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Product'
        }
    },
    {
        timestamps: true
    }
);

const orderSchema: mongoose.Schema<Order> = new mongoose.Schema<Order>(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        orderItems: [ orderItemSchema ],
        shippingAddress: shippingAddressSchema,
        paymentMethod: {
            type: String,
            required: true
        },
        paymentResult: paymentResultSchema,
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

export const OrderModel: mongoose.Model<Order> = mongoose.model<Order>('Order', orderSchema);