import express, { Router } from "express";
import { authUser, deleteUser, getUserProfile, getUsers, registerUser, updateUserProfile } from "../controllers/userController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const userRouter: Router = express.Router();

userRouter.route('/').post(registerUser).get(protect, admin, getUsers);
userRouter.post('/login', authUser);
userRouter.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
userRouter.route('/:id').delete(protect, admin, deleteUser);

export default userRouter;