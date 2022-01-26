import bcrypt from "bcryptjs";
import mongoose from 'mongoose';

export interface User {
    name: string,
    email: string,
    password: string,
    admin: boolean
}

export interface UserDocument extends User, mongoose.Document {
    matchPassword: (enteredPassword: string) => Promise<boolean>
}

interface UserModel extends mongoose.Model<UserDocument> {
    findByEmail: (email: string) => Promise<UserDocument>;
}

const userSchema: mongoose.Schema<UserDocument, UserModel> = new mongoose.Schema(
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

userSchema.pre<UserDocument>('save', async function (next) {
    // If the save call is creating a new user - hash the password, skip otherwise.
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    } else {
        next();
    }
})

userSchema.methods.matchPassword = async function (enteredPassword: string) {
    return bcrypt.compare(enteredPassword, this.password);
};

userSchema.statics.findByEmail = async function (email: string) {
    return this.findOne({ email });
};

export const UserModel = mongoose.model<UserDocument, UserModel>('User', userSchema);