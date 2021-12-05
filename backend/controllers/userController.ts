import { matchUserPassword, User, UserModel } from "../models/userModel.js";
import expressAsyncHandler from "express-async-handler"; // Note usage of express-async-handler wrapper to catch express errors during async...await
import { Request, Response } from "express";
import generateToken from "../utils/generateToken.js";

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
export const authUser = expressAsyncHandler(async (req: Request, res: Response) => {
    const { email, password }: { email: string, password: string } = req.body;
    const user: User = await UserModel.findOne({ email });
    if (user && (await matchUserPassword(user, password))) {
        res.json(
            {
                _id: user._id,
                name: user.name,
                email: user.email,
                admin: user.admin,
                token: generateToken(user._id)
            });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

// @desc    Get logged-in user
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = expressAsyncHandler(async (req: Request, res: Response) => {
    const aUser: User = await UserModel.findById(req.body.user._id);
    if (aUser) {
        res.json(
            {
                _id: aUser._id,
                name: aUser.name,
                email: aUser.email,
                admin: aUser.admin,
                token: generateToken(aUser._id)
            }
        );
    } else {
        res.status(404);
        throw new Error('User not found');
    }
    res.send(req.body.user);
});