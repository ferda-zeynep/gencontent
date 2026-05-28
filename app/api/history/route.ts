import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const authObj = await auth();
    const userId = authObj.userId;
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const history = await db.generatedContent.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(history);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
