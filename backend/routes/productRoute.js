import express from "express";
import {
  fetchAllProducts,
  fetchSingleProduct,
} from "../controller/productController.js";

const router = express.Router();

router.get("/", fetchAllProducts);
router.get("/:id", fetchSingleProduct);

export default router;
