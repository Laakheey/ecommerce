import Product from "@/libs/models/Products";
import { connectDB } from "@/libs/MongoConnect";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const data = await Product.find();
    
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error, msg: "Internal Error" }, { status: 500});
  }
}
