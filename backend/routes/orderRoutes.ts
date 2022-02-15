import express, { Router } from "express";
import { addOrderItems, getOrderById, getOrders, getUserOrderList, updateOrderToPaid } from "../controllers/orderController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const orderRouter: Router = express.Router();

orderRouter.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);
orderRouter.route('/userOrderList').get(protect, getUserOrderList);
orderRouter.route('/:id').get(protect, getOrderById);
orderRouter.route('/:id/paid').put(protect, updateOrderToPaid);

export default orderRouter;