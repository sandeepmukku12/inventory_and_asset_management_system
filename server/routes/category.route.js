import express from "express";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";
import { protect, authorize } from "../middleware/auth.middleware.js";

const router = express.Router();

// Publicly viewable for authenticated users
router.get("/", protect, getCategories);

// Restricted actions (Admin only)
router.post("/", protect, authorize("Admin"), createCategory);
router.put("/:id", protect, authorize("Admin"), updateCategory);
router.delete("/:id", protect, authorize("Admin"), deleteCategory);

export default router;
