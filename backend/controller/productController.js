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

export const createProduct = asyncHandler(async (req, res) => {
  const product = new Products({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });
  const newProduct = await product.save();
  res.status(201).json({
    message: "Product Created Successfully",
    newProduct,
  });
});
