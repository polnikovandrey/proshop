import mongoose, { Model, Schema } from "mongoose";
import { User } from "./userModel";

export interface Product {
    user: User,
    name: string,
    image: string,
    brand: string,
    category: string,
    description: string,
    reviews: Review[],
    rating: number,
    numReviews: number,
    price: number,
    countInStock: number
}

interface Review {
    name: string,
    rating: number,
    comment: string
}

const reviewSchema: Schema<Review> = new mongoose.Schema<Review>(
    {
        name: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true
        },
        comment: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export const productSchema: Schema<Product> = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        name: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        brand: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        reviews: [ reviewSchema ],
        rating: {
            type: Number,
            required: true,
            default: 0
        },
        numReviews: {
            type: Number,
            required: true,
            default: 0
        },
        price: {
            type: Number,
            required: true,
            default: 0
        },
        countInStock: {
            type: Number,
            required: true,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

export const ProductModel: Model<Product> = mongoose.model<Product>('Product', productSchema);