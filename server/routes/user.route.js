import express from "express";
import {
  getUsers,
  updateUserRole,
  deleteUser,
} from "../controllers/user.controller.js";
import { protect, authorize } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protect, authorize("Admin"), getUsers);
router.put("/:id/role", protect, authorize("Admin"), updateUserRole);
router.delete("/:id", protect, authorize("Admin"), deleteUser);

export default router;
