import express, { Router } from "express";
import { authUser, getUserProfile } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const userRouter: Router = express.Router();

userRouter.post('/login', authUser);
userRouter.route('/profile').get(protect, getUserProfile);

export default userRouter;