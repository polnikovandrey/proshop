import express, { Router } from "express";
import { addOrderItems, getOrderById, updateOrderToPaid } from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const orderRouter: Router = express.Router();

orderRouter.route('/').post(protect, addOrderItems);
orderRouter.route('/:id').get(protect, getOrderById);
orderRouter.route('/:id/paid').put(protect, updateOrderToPaid);

export default orderRouter;