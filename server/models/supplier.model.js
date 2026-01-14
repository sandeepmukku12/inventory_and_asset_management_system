import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    contactPerson: { type: String },
    email: { type: String, required: true },
    phone: { type: String },
    address: { type: String },
  },
  { timestamps: true }
);

// CASCADE DELETE: Remove all products linked to this supplier
supplierSchema.pre("findOneAndDelete", async function () {
  const supplierId = this.getQuery()._id;
  try {
    await mongoose.model("Product").deleteMany({ supplier: supplierId });
  } catch (error) {
    return res.status(500).json({ message: error.message || "Server Error" });
  }
});

const Supplier = mongoose.model("Supplier", supplierSchema);

export default Supplier;
