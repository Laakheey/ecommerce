import { createRouteHandler } from "uploadthing/next";

import { ourFileRouter } from "./core";
import { NextRequest, NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { fileKey } = body.data;
    const utApi = new UTApi();
    await utApi.deleteFiles(fileKey);

    return NextResponse.json({ msg: "Image deleted" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
