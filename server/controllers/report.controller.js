const Product = require("../models/Product");
const Category = require("../models/Category");

export const getAnalytics = async (req, res) => {
  try {
    // Aggregation 1: Count products per category
    const categoryDistribution = await Product.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "_id",
          foreignField: "_id",
          as: "categoryDetails",
        },
      },
      { $unwind: "$categoryDetails" },
      {
        $project: {
          name: "$categoryDetails.name",
          value: "$count",
        },
      },
    ]);

    res.json({ categoryDistribution });
  } catch (error) {
    res.status(500).json({ message: "Analytics generation failed" });
  }
};
