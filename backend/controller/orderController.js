import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../model/orderModel.js";
import Products from "../model/productModel.js";
import { calcPrices } from "../utils/calPrice.js";

export const createOrder = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(404);
    throw new Error("Order not Found");
  }
  const itemsFromDb = await Products.find({
    _id: { $in: orderItems.map((x) => x._id) },
  });
  const newOrderItems = orderItems.map((itemsFromClient) => {
    const matchingItemsFromDb = itemsFromDb.find(
      (x) => x._id.toString() === itemsFromClient._id
    );
    return {
      ...itemsFromClient,
      price: matchingItemsFromDb.price,
      product: itemsFromClient._id,
      _id: undefined,
    };
  });
  const { itemsPrice, taxPrice, shippingPrice, totalPrice } =
    calcPrices(newOrderItems);

  const order = new Order({
    orderItems: newOrderItems,
    user: req.user._id,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  });
  const newOrder = await order.save();
  res.status(201).json({
    message: "Order created Successfully",
    newOrder,
  });
});
export const getMyOrders = asyncHandler(async (req, res) => {
  const order = await Order.find({ user: req.user._id });

  if (!order) {
    res.status(404);
    throw new Error("Order Not Found");
  }
  return res.status(200).json({
    message: "Order Fetched Successfully",
    order,
  });
});
export const getOrderById = asyncHandler(async (req, res) => {
  const item = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (!item) {
    res.status(404);
    throw new Error("Order Not Found");
  }
  return res.status(200).json({
    message: "Order Fetched Successfully",
    order: item,
  });
});

export const updateOrderIsPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    const updateOrder = await order.save();
    res.status(200).json({
      message: "Order paid successfully",
      updateOrder,
    });
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});
export const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "name email");
  if (orders) {
    return res.status(200).json(orders);
  } else {
    res.status(404);
    throw new Error("No Orders Found");
  }
});

export const updateOrderIsDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const updateOrder = await order.save();
    res.status(200).json({
      message: "Order paid successfully",
      updateOrder,
    });
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});
