import Supplier from "../models/supplier.model.js";
import Product from "../models/product.model.js";

// GET all suppliers with product counts
export const getSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find().sort({ createdAt: -1 }).lean();

    const suppliersWithCount = await Promise.all(
      suppliers.map(async (supplier) => {
        const productCount = await Product.countDocuments({
          supplier: supplier._id,
        });
        return { ...supplier, productCount };
      })
    );

    res.json(suppliersWithCount);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE new supplier
export const createSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.create(req.body);
    res.status(201).json(supplier);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// UPDATE existing supplier
export const updateSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!supplier)
      return res.status(404).json({ message: "Supplier not found" });
    res.json(supplier);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE supplier (Triggers Cascade Delete in model)
export const deleteSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findOneAndDelete({ _id: req.params.id });
    if (!supplier)
      return res.status(404).json({ message: "Supplier not found" });
    res.json({ message: "Supplier and linked products deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
