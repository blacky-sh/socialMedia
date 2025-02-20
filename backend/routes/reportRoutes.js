import express from "express";
import {
  reportUser,
  reportPost,
  getReports,
  updateReportStatus,
} from "../controllers/reportController.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.post("/user", protectRoute, reportUser);
router.post("/post", protectRoute, reportPost);
router.get("/", protectRoute, getReports);
router.put("/:id", protectRoute, updateReportStatus);

export default router;
