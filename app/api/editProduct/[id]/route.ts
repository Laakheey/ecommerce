import Product from "@/libs/models/Products";
import { connectDB } from "@/libs/MongoConnect";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest, urlParams: any) {
  try {
    const body = await request.json()
    const id = urlParams.params.id;
    const { name, category, price } = body;
    
    await connectDB();
    const data = await Product.findByIdAndUpdate(id, {
        name,
        category,
        price
    });

    return NextResponse.json({data, msg: 'Updated successfully'}, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error, msg: "Internal Error" }, { status: 500});
  }
}
