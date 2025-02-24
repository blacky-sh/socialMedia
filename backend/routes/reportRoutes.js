import express from "express";
import {
  reportUser,
  reportPost,
  getReports,
  updateReportStatus,
  removeReport,
  markPostAsSafe,
  markUserAsSafe, // Add this import
} from "../controllers/reportController.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.post("/user", protectRoute, reportUser);
router.post("/post", protectRoute, reportPost);
router.get("/", protectRoute, getReports);
router.put("/:id", protectRoute, updateReportStatus);
router.delete("/reported-posts/:postId", protectRoute, removeReport);
router.put("/mark-safe/:postId", protectRoute, markPostAsSafe);
router.put("/mark-safe-user/:userId", protectRoute, markUserAsSafe); // Add this route

export default router;
