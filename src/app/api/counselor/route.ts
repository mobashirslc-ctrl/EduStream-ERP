import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI("AIzaSyD5_Evr9ttRECyLVCL_UT1fZV2M8crifcU");

// ফাংশনের নাম অবশ্যই বড় হাতের অক্ষরে হতে হবে
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { profile } = body;

    if (!profile) {
      return NextResponse.json({ error: "Profile is required" }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(`You are 'EduStream Counselor'. Analyze student details: ${profile}`);
    const text = result.response.text();

    return NextResponse.json({ text });
  } catch (error: any) {
    console.error("Gemini Error:", error);
    return NextResponse.json({ error: "AI processing failed" }, { status: 500 });
  }
}