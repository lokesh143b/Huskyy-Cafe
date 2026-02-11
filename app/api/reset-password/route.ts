import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
  await connectDB();

  const { token, password } = await req.json();

  const user = await User.findOne({
    resetToken: token,
    resetTokenExp: { $gt: new Date() },
  });

  if (!user) {
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
  }

  user.password = await bcrypt.hash(password, 10);
  user.resetToken = undefined;
  user.resetTokenExp = undefined;
  await user.save();

  return NextResponse.json({ message: "Password updated successfully" });
}
