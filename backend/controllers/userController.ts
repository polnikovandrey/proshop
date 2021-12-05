import { matchUserPassword, User, UserModel } from "../models/userModel.js";
import expressAsyncHandler from "express-async-handler"; // Note usage of express-async-handler wrapper to catch express errors during async...await
import { Request, Response } from "express";

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
export const authUser = expressAsyncHandler(async (req: Request, res: Response) => {
    const { email, password }: { email: string, password: string } = req.body;
    const user: User = await UserModel.findOne({ email });
    if (user && (await matchUserPassword(user, password))) {
        res.json({ _id: user._id, name: user.name, email: user.email, admin: user.admin, token: null });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});