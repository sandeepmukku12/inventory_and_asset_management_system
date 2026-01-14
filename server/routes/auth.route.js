import express from "express";
const router = express.Router();
import {
  register,
  login,
  updatePassword,
} from "../controllers/auth.controller.js";
import { authorize, protect } from "../middleware/auth.middleware.js";

router.post("/signup", register);
router.post("/login", login);
router.put("/update-password", protect, updatePassword);

// Only Admins can register new users
router.post("/register", protect, authorize("Admin"), register);

export default router;
