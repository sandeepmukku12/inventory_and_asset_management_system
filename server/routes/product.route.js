const express = require("express");
const router = express.Router();
const {
  getProducts,
  createProduct,
  updateProduct,
} = require("../controllers/product.controller");
const { protect, authorize } = require("../middleware/authMiddleware");

// Everyone (Admin & Staff) can view products
router.get("/", protect, getProducts);

// Admin & Staff can add/update inventory
router.post("/", protect, authorize("Admin", "Staff"), createProduct);
router.put("/:id", protect, authorize("Admin", "Staff"), updateProduct);

// ONLY Admin can delete products (Enterprise requirement)
router.delete("/:id", protect, authorize("Admin"), async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product removed from inventory" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
});

module.exports = router;
