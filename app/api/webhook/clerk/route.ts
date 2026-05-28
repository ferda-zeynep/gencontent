import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, email_addresses, first_name, last_name } = body.data;
    const type = body.type;

    if (type === "user.created") {
      const email = email_addresses[0]?.email_address;
      const fullName = `${first_name || ""} ${last_name || ""}`.trim();

      await db.user.create({
        data: {
          id: id,
          email: email,
          name: fullName || null,
        },
      });

      return NextResponse.json(
        { message: "User created in DB" },
        { status: 201 },
      );
    }

    return NextResponse.json({ message: "Webhook received" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
