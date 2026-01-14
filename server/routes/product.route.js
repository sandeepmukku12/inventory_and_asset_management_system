import express from "express";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";
import { protect, authorize } from "../middleware/auth.middleware.js";

const router = express.Router();

// Viewing and updating stock is open to both Admin and Staff
router.get("/", protect, getProducts);
router.post("/", protect, createProduct);
router.put("/:id", protect, updateProduct);

// Only Admins can permanently delete a product from the database
router.delete("/:id", protect, authorize("Admin"), deleteProduct);

export default router;
