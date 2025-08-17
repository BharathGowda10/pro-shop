import express from "express";
import {
  authUser,
  deleteUser,
  getUserById,
  getUserProfile,
  getUsers,
  logoutUser,
  registerUser,
  updateUser,
  updateUserProfile,
} from "../controller/userController.js";
import { admin, protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(registerUser).get(protectRoute, admin, getUsers);
router.route("/auth").post(authUser);
router.route("/logout").post(logoutUser);
router
  .route("/profile")
  .get(protectRoute, getUserProfile)
  .put(protectRoute, updateUserProfile);
router
  .route("/:id")
  .delete(protectRoute, admin, deleteUser)
  .put(protectRoute, admin, updateUser)
  .get(protectRoute, admin, getUserById);

export default router;
