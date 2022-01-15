import express, { Router } from "express";
import { addOrderItems } from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const orderRouter: Router = express.Router();

orderRouter.route('/').post(protect, addOrderItems);

export default orderRouter;