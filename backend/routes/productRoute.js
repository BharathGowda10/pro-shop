import express from "express";
import {
  createProduct,
  fetchAllProducts,
  fetchSingleProduct,
} from "../controller/productController.js";
import { protectRoute, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(fetchAllProducts)
  .post(protectRoute, admin, createProduct);
router.get("/:id", fetchSingleProduct);

export default router;
