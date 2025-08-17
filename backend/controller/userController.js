import asyncHandler from "../middleware/asyncHandler.js";
import User from "../model/userModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error("User Not Exists!");
  }
  const isCrctPassword = await bcrypt.compare(password, user.password);
  if (!isCrctPassword) {
    res.status(401);
    throw new Error("Invalid Password");
  }

  if (user) {
    generateToken(res, user._id);
    res.status(200).json({
      message: "Logged In SuccessFully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } else {
    res.status(404);
    throw new Error("Invalid details");
  }
});
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill out all details");
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400);
    throw new Error("User Already Exists");
  }
  const user = await User.create({
    name,
    email,
    password,
  });
  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      message: "User Created Successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } else {
    res.status(404);
    throw new Error("Invalid details");
  }
});
export const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
  });
  return res.status(200).json({
    message: "Logged out Successfully!",
  });
});
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) {
    res.status(404);
    throw new Error("No user Exists");
  }
  return res.status(200).json({
    message: "Authorized User",
    user,
  });
});
export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }
  const isCrctPassword = await bcrypt.compare(password, user.password);
  if (!isCrctPassword) {
    res.status(401);
    throw new Error("Invalid Password");
  }
  if (user) {
    user.name = name;
    user.email = email;
    if (password) {
      user.password = password;
    }

    const updatedUser = await user.save();
    res.status(200).json({
      message: "User updated Successfully",
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      },
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});
export const getUsers = asyncHandler(async (req, res) => {
  res.send("admin getUsers");
});
export const getUserById = asyncHandler(async (req, res) => {
  res.send("admin getuser By id");
});
export const updateUser = asyncHandler(async (req, res) => {
  res.send("update user");
});
export const deleteUser = asyncHandler(async (req, res) => {
  res.send("delete user");
});
