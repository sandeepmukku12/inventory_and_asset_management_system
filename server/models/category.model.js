import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
  },
  { timestamps: true }
);

categorySchema.pre("findOneAndDelete", async function () {
  const doc = await this.model.findOne(this.getQuery());
  if (doc) {
    await mongoose.model("Product").deleteMany({ category: doc._id });
  }
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
