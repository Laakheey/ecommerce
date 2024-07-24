import Product from "@/libs/models/Products";
import { connectDB } from "@/libs/MongoConnect";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest, urlParams: any) {
  try {
    const id = urlParams.params.id;
    await connectDB();
    await Product.findByIdAndDelete(id);
    return NextResponse.json(
      { msg: "Product Deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error, msg: "Internal Error" }, { status: 500 });
  }
}
