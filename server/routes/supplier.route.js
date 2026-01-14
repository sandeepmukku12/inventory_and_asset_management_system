import express from "express";
import {
  getSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplier,
} from "../controllers/supplier.controller.js";
import { protect, authorize } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protect, getSuppliers);
router.post("/", protect, authorize("Admin"), createSupplier);
router.put("/:id", protect, authorize("Admin"), updateSupplier);
router.delete("/:id", protect, authorize("Admin"), deleteSupplier);

export default router;
