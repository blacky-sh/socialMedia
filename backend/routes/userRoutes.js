import express from "express";
import {
  followUnFollowUser,
  getUserProfile,
  loginUser,
  logoutUser,
  signupUser,
  updateUser,
  getSuggestedUsers,
  freezeAccount,
  getUsersByIds,
  changePassword,
  banUser, // Add this import
  getUserPosts, // Add this import
} from "../controllers/userController.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.post("/getUsersByIds", getUsersByIds);
router.get("/profile/:query", getUserProfile);
router.get("/suggested", protectRoute, getSuggestedUsers);
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/follow/:id", protectRoute, followUnFollowUser); // Toggle state(follow/unfollow)
router.put("/update/:id", protectRoute, updateUser);
router.put("/freeze", protectRoute, freezeAccount);
router.put("/change-password", protectRoute, changePassword);
router.put("/ban/:id", protectRoute, banUser); // Add this route
router.get("/:userId/posts", protectRoute, getUserPosts); // Add this route

export default router;
