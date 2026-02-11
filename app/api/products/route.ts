import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export const dynamic = "force-dynamic"; // ⭐ IMPORTANT

/* -------- GET ALL PRODUCTS -------- */
export async function GET() {
  await connectDB();
  const products = await Product.find().sort({ createdAt: -1 });
  return NextResponse.json(products);
}

/* -------- ADD PRODUCT -------- */
export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();

  const { name, price, origin, roast, aroma, strength, description, category, image } = body;

  if (!name || !price) {
    return NextResponse.json({ error: "Name and price are required" }, { status: 400 });
  }

  const product = await Product.create({
    name,
    price,
    origin,
    roast,
    aroma,
    strength,
    description,
    category,
    image,
  });

  return NextResponse.json(product, { status: 201 });
}
