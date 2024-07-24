import Product from "@/libs/models/Products";
import { connectDB } from "@/libs/MongoConnect";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { imgSrc, fileKey, name, category, price } = body;

    await connectDB();

    const data = await Product.create({
      imgSrc,
      fileKey,
      name,
      category,
      price,
    });

    return NextResponse.json(
      { data, msg: "Product added successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error, msg: "Internal Error" }, { status: 500 });
  }
}
