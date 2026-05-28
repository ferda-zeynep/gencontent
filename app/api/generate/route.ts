import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenAI } from "@google/genai";
import { db } from "@/lib/db";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const authObj = await auth();
    const userId = authObj.userId;
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { prompt, contentType, tone, language } = body;

    if (!prompt || !contentType || !tone || !language) {
      return new NextResponse("Missing fields", { status: 400 });
    }

    await db.user.upsert({
      where: { id: userId },
      update: {},
      create: {
        id: userId,
        email: `test-${userId}@gencontent.local`,
        name: "Active Developer",
      },
    });
    // ------------------------------------

    const systemInstruction = `You are an expert AI content generator. Generate high-quality content based on the user request. Output MUST be strictly in Markdown format. Do not include any conversational filler.`;
    const userPrompt = `Content Type: ${contentType}, Tone: ${tone}, Language: ${language}. Topic/Prompt: ${prompt}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
      },
    });

    const aiResponse = response.text || "";

    const content = await db.generatedContent.create({
      data: {
        userId,
        title: prompt.substring(0, 30) + "...",
        prompt,
        response: aiResponse,
        contentType,
        tone,
        language,
      },
    });

    return NextResponse.json(content);
  } catch (error) {
    console.error("[GEMINI_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
