import mongoose, { Model, ObjectId, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface User {
    _id: ObjectId,
    name: string,
    email: string,
    password: string,
    admin: boolean
}

export const userSchema: Schema<User> = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        admin: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    {
        timestamps: true
    }
);

export const matchUserPassword: (user: User, enteredPassword: string) => Promise<boolean> = (user, enteredPassword) => {
    return bcrypt.compare(enteredPassword, user.password);
};

export const UserModel: Model<User> = mongoose.model<User>('User', userSchema);