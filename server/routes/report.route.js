import express from "express";
import { getAnalytics } from "../controllers/report.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// Only authenticated users can see the dashboard stats
router.get("/dashboard-stats", protect, getAnalytics);

export default router;
