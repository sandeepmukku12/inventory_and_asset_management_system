import Category from "../models/category.model.js";

// GET all categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE new category
export const createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// UPDATE existing category
export const updateCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true, runValidators: true } // returns the updated document
    );

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE category (Triggers Cascade Delete in Model)
export const deleteCategory = async (req, res) => {
  try {
    // Use findOneAndDelete so the Mongoose 'pre' hook in the model captures the query
    const category = await Category.findOneAndDelete({ _id: req.params.id });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json({ message: "Category and linked products deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
