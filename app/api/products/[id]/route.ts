import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import mongoose from "mongoose";

export const dynamic = "force-dynamic"; // ⭐ IMPORTANT

/* -------- UPDATE PRODUCT -------- */
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const { id } = await params; // ✅ unwrap params
  const body = await req.json();

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { error: "Invalid product ID" },
      { status: 400 }
    );
  }

  const updated = await Product.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });

  if (!updated) {
    return NextResponse.json(
      { error: "Product not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(updated);
}

/* -------- DELETE PRODUCT -------- */
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();

  // ✅ UNWRAP params
  const { id } = await params;

  console.log("DELETE HIT");
  console.log("RAW ID:", id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { error: "Invalid product ID" },
      { status: 400 }
    );
  }

  const deletedProduct = await Product.findByIdAndDelete(id);


  if (!deletedProduct) {
    return NextResponse.json(
      { error: "Product not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(
    { message: "Product deleted successfully" },
    { status: 200 }
  );
}


export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const { id } = await params; // ✅ unwrap params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { error: "Invalid product ID" },
      { status: 400 }
    );
  }

  const product = await Product.findById(id);

  if (!product) {
    return NextResponse.json(
      { error: "Product not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(product);
}
