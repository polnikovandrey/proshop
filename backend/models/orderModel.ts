import mongoose from 'mongoose';

export interface ShippingAddress {
    address: string,
    city: string,
    postalCode: string,
    country: string
}

export interface PaymentResult {
    id: string,
    status: string,
    updateTime: string,
    email_address: string
}

export interface OrderItem {
    name: string,
    quantity: number,
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
        quantity: {
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

export interface Order {
    user: mongoose.Schema.Types.ObjectId,
    items: OrderItem[],
    shippingAddress: ShippingAddress,
    paymentMethod: string,
    paymentResult: PaymentResult,
    itemsPrice: number,
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

export interface OrderDocument extends Order, mongoose.Document {
}

interface OrderModel extends mongoose.Model<OrderDocument> {
}

const orderSchema: mongoose.Schema<OrderDocument, OrderModel> = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        items: [ orderItemSchema ],
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
        itemsPrice: {
            type: Number,
            required: true,
            default: 0.0
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

export const OrderModel = mongoose.model<OrderDocument, OrderModel>('Order', orderSchema);