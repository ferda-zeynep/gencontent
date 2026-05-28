import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    const authObj = await auth();
    const userId = authObj.userId;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { id } = await context.params;

    if (!id) {
      return new NextResponse("Bad Request: Missing ID", { status: 400 });
    }

    await db.generatedContent.delete({
      where: {
        id: id,
        userId: userId,
      },
    });

    return new NextResponse("Success", { status: 200 });
  } catch (error) {
    console.error("API Error context:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
