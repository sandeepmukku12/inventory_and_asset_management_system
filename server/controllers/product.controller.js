const Product = require("../models/Product");

// @desc    Get all products with Search, Filter, and Stock Status logic
// @route   GET /api/products
export const getProducts = async (req, res) => {
  try {
    const { search, category, supplier, status } = req.query;
    let query = {};

    // Search Logic (Name or SKU)
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { sku: { $regex: search, $options: "i" } },
      ];
    }

    // Filter Logic
    if (category) query.category = category;
    if (supplier) query.supplier = supplier;
    if (status) query.status = status;

    const products = await Product.find(query)
      .populate("category", "name")
      .populate("supplier", "name")
      .sort({ createdAt: -1 });

    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch products", error: error.message });
  }
};

// @desc    Add new product
// @route   POST /api/products
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      sku,
      category,
      supplier,
      quantity,
      price,
      lowStockThreshold,
    } = req.body;

    // Check if SKU already exists to prevent duplicates
    const existingSku = await Product.findOne({ sku });
    if (existingSku) {
      return res
        .status(400)
        .json({
          message: "SKU already exists. Please use a unique identifier.",
        });
    }

    const newProduct = new Product({
      name,
      sku,
      category,
      supplier,
      quantity,
      price,
      lowStockThreshold,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating product", error: error.message });
  }
};

// @desc    Update product & auto-update status
// @route   PUT /api/products/:id
export const updateProduct = async (req, res) => {
  try {
    // We use findById and then save() so the 'pre-save' hook in the model
    // runs to update the stock status (Low Stock/In Stock) automatically.
    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = req.body.name || product.name;
      product.quantity = req.body.quantity ?? product.quantity;
      product.price = req.body.price || product.price;
      // ... update other fields as needed

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(400).json({ message: "Update failed", error: error.message });
  }
};