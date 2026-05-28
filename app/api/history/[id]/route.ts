import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const authObj = await auth();
    const userId = authObj.userId;
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const contentId = params.id;

    await db.generatedContent.delete({
      where: {
        id: contentId,
        userId,
      },
    });

    return new NextResponse("Success", { status: 200 });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
