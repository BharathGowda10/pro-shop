import express from "express";
import { admin, protectRoute } from "../middleware/authMiddleware.js";
import {
  createOrder,
  getAllOrders,
  getMyOrders,
  getOrderById,
  updateOrderIsDelivered,
  updateOrderIsPaid,
} from "../controller/orderController.js";

const router = express.Router();

router
  .route("/")
  .post(protectRoute, createOrder)
  .get(protectRoute, admin, getAllOrders);
router.route("/myOrders").get(protectRoute, getMyOrders);
router.route("/:id/pay").put(protectRoute, updateOrderIsPaid);
router.route("/:id/order").put(protectRoute, admin, updateOrderIsDelivered);
router.route("/:id").get(protectRoute, getOrderById);

export default router;
