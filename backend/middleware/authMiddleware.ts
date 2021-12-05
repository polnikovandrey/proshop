import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/userModel.js";

export const protect = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const token: string = req.header('Authorization');
    if (token && token.startsWith('Bearer')) {
        try {
            const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET) as { id: string };
            req.body.user = await UserModel.findById(decoded.id).select('-password');        // Skipping 'password' for security reasons.
            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    } else {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});