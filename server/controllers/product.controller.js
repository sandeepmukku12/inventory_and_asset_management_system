import Product from "../models/product.model.js";

export const getProducts = async (req, res) => {
  try {
    const { search, category, status } = req.query;
    let query = {};

    if (search) query.name = { $regex: search, $options: "i" };
    if (category) query.category = category;
    if (status) query.status = status;

    const products = await Product.find(query)
      .populate("category", "name")
      .populate("supplier", "name")
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const product = new Product(req.body);

    const savedProduct = await product.save();

    const populatedProduct = await Product.findById(savedProduct._id)
      .populate("category", "name")
      .populate("supplier", "name");

    res.status(201).json(populatedProduct);
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    Object.assign(product, req.body);
    await product.save();
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
