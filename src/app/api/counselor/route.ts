import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI("AIzaSyD5_Evr9ttRECyLVCL_UT1fZV2M8crifcU");

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { profile } = body;

    if (!profile) {
      return NextResponse.json({ error: "Profile is required" }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(`You are 'EduStream Counselor'. Analyze: ${profile}`);
    const text = result.response.text();

    return NextResponse.json({ text });
  } catch (error) {
    console.error("AI Error:", error);
    return NextResponse.json({ error: "AI failed to respond" }, { status: 500 });
  }
}