import asyncHandler from "../middleware/asyncHandler.js";
import Products from "../model/productModel.js";

export const fetchAllProducts = asyncHandler(async (req, res) => {
  const products = await Products.find({});
  res.status(200).json(products);
});

export const fetchSingleProduct = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const product = await Products.findById(id);
  if (product) {
    return res.send(product);
  }
  res.status(404);
  throw new Error("Product not found");
});
