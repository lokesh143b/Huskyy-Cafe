import { NextResponse } from "next/server";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
  await connectDB();

  const { email } = await req.json();
  const user = await User.findOne({ email });

  if (!user) {
    return NextResponse.json({ message: "If email exists, reset link sent" });
  }

  const token = crypto.randomBytes(32).toString("hex");

  user.resetToken = token;
  user.resetTokenExp = new Date(Date.now() + 60 * 60 * 1000);
  await user.save();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    to: email,
    subject: "Reset Password – Huskyy Coffee ☕",
    html: `
      <p>Click below to reset your password:</p>
      <a href="${process.env.NEXTAUTH_URL}/reset-password/${token}">
        Reset Password
      </a>
    `,
  });

  return NextResponse.json({ message: "Reset email sent" });
}
