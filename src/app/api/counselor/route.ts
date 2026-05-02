export const dynamic = 'force-dynamic';

import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { message, context } = await req.json();
    
    // API Key চেক করার জন্য একটি লগ (Vercel লগে দেখা যাবে)
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("API Key is missing from environment variables");
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Student says: ${message}. Context: ${JSON.stringify(context)}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // রেজাল্ট ক্লিনআপ এবং রিটার্ন
    const cleanedText = text.replace(/
```json|```/g, "").trim();
    return NextResponse.json(JSON.parse(cleanedText));

  } catch (error: any) {
    console.error("Gemini Error:", error);
    return NextResponse.json(
      { reply: "সার্ভার কনফিগারেশনে সমস্যা হচ্ছে। অনুগ্রহ করে একটু পর আবার চেষ্টা করুন।" },
      { status: 200 } // Error হলেও চ্যাটে মেসেজ দেখানোর জন্য ২০০ রাখা ভালো
    );
  }
}