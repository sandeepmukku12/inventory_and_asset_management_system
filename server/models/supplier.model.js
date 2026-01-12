const mongoose = require("mongoose");

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
supplierSchema.pre("findOneAndDelete", async function (next) {
  const supplierId = this.getQuery()._id;
  try {
    await mongoose.model("Product").deleteMany({ supplier: supplierId });
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("Supplier", supplierSchema);
