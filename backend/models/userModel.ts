import mongoose, { Model, ObjectId, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface User {
    _id: ObjectId,
    name: string,
    email: string,
    password: string,
    admin: boolean
}

interface UserDocument extends User, Document {
    save: () => Promise<void>,
    matchPassword: (enteredPassword: string) => Promise<boolean>
}

interface UserModel extends Model<UserDocument> {
    findByEmail: (email: string) => Promise<UserDocument>;
}

export const userSchema: Schema<UserDocument> = new mongoose.Schema(
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

userSchema.pre('save', async function (next) {
    // If the save call is creating a new user - hash the password, skip otherwise.
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    } else {
        next();
    }
});

userSchema.methods.matchPassword = async function(enteredPassword: string) {
    return bcrypt.compare(enteredPassword, this.password);
};

userSchema.statics.findByEmail = async function (email: string) {
    return this.findOne({ email });
}

export const UserModel = mongoose.model<UserDocument, UserModel>('User', userSchema);