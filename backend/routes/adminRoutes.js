import express from "express";
import {
  signupAdmin,
  loginAdmin,
  logoutAdmin,
  getAllUsers,
  getAllReportedPosts,
  deletePost,
  getAllPosts,
  getAllReportedUsers,
  banUser,
  getDashboardStats,
} from "../controllers/adminController.js";
import protectAdminRoute from "../middlewares/protectAdminRoute.js";

const router = express.Router();

router.post("/signup", signupAdmin);
router.post("/login", loginAdmin);
router.post("/logout", logoutAdmin);
router.get("/users", protectAdminRoute, getAllUsers);
router.get("/reported-posts", protectAdminRoute, getAllReportedPosts);
router.delete("/posts/:id", protectAdminRoute, deletePost);
router.get("/posts", protectAdminRoute, getAllPosts);
router.get("/reported-users", protectAdminRoute, getAllReportedUsers);
router.put("/ban-user/:id", protectAdminRoute, banUser);
router.get("/dashboard-stats", protectAdminRoute, getDashboardStats);

export default router;
