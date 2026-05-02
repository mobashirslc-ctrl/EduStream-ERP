// src/app/api/counselor/route.ts

import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { message, context } = await req.json();
    const { gpa, ielts, country } = context;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are an expert counselor for SCC Group... [বাকি প্রম্পট আগের মতোই থাকবে]`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    // শক্তিশালী JSON ক্লিনআপ লজিক
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      text = jsonMatch[0];
    }

    const parsedData = JSON.parse(text);
    return NextResponse.json(parsedData);

  } catch (error) {
    console.error("Gemini Error:", error);
    // যদি JSON পার্সিং বা অন্য সমস্যা হয়, তবে একটি সাধারণ অবজেক্ট রিটার্ন করুন
    return NextResponse.json(
      { 
        reply: "দুঃখিত, আমি এই মুহূর্তে আপনার তথ্য প্রসেস করতে পারছি না। সরাসরি হেল্পলাইনে যোগাযোগ করুন।",
        aiWrittenReport: "Assessment could not be generated."
      },
      { status: 200 } // এরর মেসেজ দেখানোর জন্য স্ট্যাটাস ২০০ রাখা নিরাপদ
    );
  }
}