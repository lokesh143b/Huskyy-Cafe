import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    origin: String,
    roast: String,
    aroma: String,
    strength: String,
    description: String,
    category: {
      type: String,
      default: "General", // optional default category
    },
    image: {
      type: String, // store image URL
      default: "",   // optional default
    },
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
