import User from "../model/userModel.js";
import asyncHandler from "./asyncHandler.js";
import jwt from "jsonwebtoken";

export const protectRoute = asyncHandler(async (req, res, next) => {
  let token = req.cookies.token;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      console.log("token error", error);
      res.status(401);
      throw new Error("Not Authorized Invalid Token");
    }
  } else {
    res.status(401);
    throw new Error("Not Authorized No Token");
  }
});

export const admin = asyncHandler(async (req, res, next) => {
  const user = req.user;
  if (user && user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("User is not an admin");
  }
});
