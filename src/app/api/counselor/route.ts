import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// API Key সরাসরি এখানে দেওয়া হয়েছে
const genAI = new GoogleGenerativeAI("AIzaSyD5_Evr9ttRECyLVCL_UT1fZV2M8crifcU");

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { profile } = body;

    if (!profile) {
      return NextResponse.json({ error: "Profile is required" }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // AI কে ইন্সট্রাকশন দেওয়া হচ্ছে
    const result = await model.generateContent(`You are 'EduStream Counselor'. Analyze these student details and provide professional advice: ${profile}`);
    const text = result.response.text();

    return NextResponse.json({ text });
  } catch (error: any) {
    console.error("Gemini Server Error:", error);
    return NextResponse.json({ error: "AI Service Failed" }, { status: 500 });
  }
}