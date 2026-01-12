const express = require("express");
const router = express.Router();
const {
  getSuppliers,
  createSupplier,
  deleteSupplier,
} = require("../controllers/supplier.controller");
const { protect, authorize } = require("../middleware/authMiddleware");

router.get("/", protect, getSuppliers);
router.post("/", protect, authorize("Admin"), createSupplier);
router.delete("/:id", protect, authorize("Admin"), deleteSupplier);

module.exports = router;
