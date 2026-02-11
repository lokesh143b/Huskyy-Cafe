import mongoose, { Schema, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: String,
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    resetToken: String,
    resetTokenExp: Date,
  },
  { timestamps: true }
);

export default models.User || mongoose.model("User", UserSchema);
