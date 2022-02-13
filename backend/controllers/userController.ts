import { UserDocument, UserModel } from "../models/userModel.js";
import expressAsyncHandler from "express-async-handler"; // Note usage of express-async-handler wrapper to catch express errors during async...await
import { Request, Response } from "express";
import generateToken from "../utils/generateToken.js";

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
export const authUser = expressAsyncHandler(async (req: Request, res: Response) => {
    const { email, password }: { email: string, password: string } = req.body;
    const userDocument: UserDocument = await UserModel.findByEmail(email);
    if (userDocument && (await userDocument.matchPassword(password))) {
        res.json(
            {
                _id: userDocument._id,
                name: userDocument.name,
                email: userDocument.email,
                admin: userDocument.admin,
                token: generateToken(userDocument._id)
            });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});


// @desc    Register a new user
// @route   POST /api/users
// @access  Public
export const registerUser = expressAsyncHandler(async (req: Request, res: Response) => {
    const { name, email, password }: { name: string, email: string, password: string } = req.body;
    const userDocument: UserDocument = await UserModel.findByEmail(email);
    if (userDocument) {
        res.status(400);
        throw new Error('User already exists');
    } else {
        const user = await UserModel.create({ name, email, password });
        if (user) {
            res.status(201)
                .json(
                    {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        admin: user.admin,
                        token: generateToken(user._id)
                    });
        } else {
            res.status(400);
            throw new Error('Invalid user data');
        }
    }
});


// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = expressAsyncHandler(async (req: Request, res: Response) => {
    const aUser: UserDocument = await UserModel.findById(req.body.user._id);
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
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = expressAsyncHandler(async (req: Request, res: Response) => {
    const profile: { _id: string, name: string, email: string, password: string } = req.body.userProfile;
    const aUser: UserDocument = await UserModel.findById(profile._id);
    if (aUser) {
        aUser.name = profile.name || aUser.name;
        aUser.email = profile.email || aUser.email;
        if (profile.password) {
            aUser.password = profile.password;
        }
        const updatedUser: UserDocument = await aUser.save();
        res.json(
            {
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                admin: updatedUser.admin,
                token: generateToken(updatedUser._id)
            });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
export const getUsers = expressAsyncHandler(async (req: Request, res: Response) => {
    const users: UserDocument[] = await UserModel.find({});
    res.json(users);
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
export const deleteUser = expressAsyncHandler(async (req: Request, res: Response) => {
    const user: UserDocument = await UserModel.findById(req.params.id);
    if (user) {
        await user.remove();
        res.json({ message: 'User removed' });
    } else {
        res.status(404);
        throw new Error('User not found')
    }
});

// @desc    Get user by id
// @route   GET /api/users/:id
// @access  Private/Admin
export const getUserById = expressAsyncHandler(async (req: Request, res: Response) => {
    const user: UserDocument = await UserModel.findById(req.params.id).select('-password');
    if (user) {
        res.json(user);
    } else {
        res.status(404);
        throw new Error('User not found')
    }
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
export const updateUser = expressAsyncHandler(async (req: Request, res: Response) => {
    const aUser: UserDocument = await UserModel.findById(req.params.id);
    if (aUser) {
        aUser.name = req.body.name || aUser.name;
        aUser.email = req.body.email || aUser.email;
        aUser.admin = req.body.admin;
        const updatedUser: UserDocument = await aUser.save();
        res.json(
            {
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                admin: updatedUser.admin
            });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});