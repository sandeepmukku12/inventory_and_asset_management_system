import Product from "../models/product.model.js";

export const getDashboardStats = async () => {
  // Basic counts
  const totalProducts = await Product.countDocuments();
  const lowStockItems = await Product.countDocuments({ status: "Low Stock" });
  const outOfStockItems = await Product.countDocuments({
    status: "Out of Stock",
  });

  // Calculate total inventory value
  const products = await Product.find();
  const totalValue = products.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Category Distribution (Pie Chart)
  const categoryStats = await Product.aggregate([
    { $group: { _id: "$category", count: { $sum: 1 } } },
    {
      $lookup: {
        from: "categories",
        localField: "_id",
        foreignField: "_id",
        as: "details",
      },
    },
    { $unwind: "$details" },
    { $project: { name: "$details.name", value: "$count" } },
  ]);

  // Products per Supplier (Bar Chart)
  const supplierStats = await Product.aggregate([
    { $group: { _id: "$supplier", count: { $sum: 1 } } },
    {
      $lookup: {
        from: "suppliers",
        localField: "_id",
        foreignField: "_id",
        as: "details",
      },
    },
    { $unwind: "$details" },
    { $project: { name: "$details.name", products: "$count" } },
  ]);

  return {
    totalProducts,
    lowStockItems,
    outOfStockItems,
    totalValue: totalValue.toFixed(2),
    categoryStats,
    supplierStats,
  };
};
