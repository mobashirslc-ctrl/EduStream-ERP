import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// ডাইনামিক রেন্ডারিং নিশ্চিত করতে
export const dynamic = 'force-dynamic';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, context } = body;

    // Gemini Model সেটআপ
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // এআই-এর জন্য ইনস্ট্রাকশন তৈরি (Context সহ)
    const prompt = `
      You are an expert student counselor for the 'EduStream' study abroad agency. 
      Student's Profile:
      - GPA: ${context?.gpa || 'Not provided'}
      - IELTS/English Score: ${context?.ielts || 'Not provided'}
      
      User's Query: "${message}"
      
      Instructions:
      1. Provide a professional and helpful response.
      2. If GPA/IELTS is provided, give tailored advice for study abroad.
      3. Respond in a mix of Bengali and English (Banglish) or clean Bengali as per the user's tone.
      4. Keep the response concise and encouraging.
    `;

    // এআই থেকে রেসপন্স জেনারেট করা
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // সফল হলে রেসপন্স পাঠানো
    return NextResponse.json({ reply: text });

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    
    // এরর হ্যান্ডেলিং
    return NextResponse.json(
      { 
        error: "Failed to generate response", 
        details: error.message 
      }, 
      { status: 500 }
    );
  }
}