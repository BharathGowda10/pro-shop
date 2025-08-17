import express from "express";
import { protectRoute } from "../middleware/authMiddleware.js";
import {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderIsPaid,
} from "../controller/orderController.js";

const router = express.Router();

router.route("/").post(protectRoute, createOrder);
router.route("/myOrders").get(protectRoute, getMyOrders);
router.route("/:id/pay").put(protectRoute, updateOrderIsPaid);
router.route("/:id").get(protectRoute, getOrderById);

export default router;
