import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs'; // এটি নিশ্চিত করবে যে এটি সার্ভার সাইডেই রান করছে

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: NextRequest) {
    try {
        // রিকোয়েস্ট বডি পড়ার আগে চেক করা
        const body = await req.json();
        const { message, context } = body;

        if (!process.env.GEMINI_API_KEY) {
            console.error("Missing GEMINI_API_KEY");
            return NextResponse.json({ reply: "API Key Configuration Error" }, { status: 500 });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `Student Message: ${message}\nContext: ${JSON.stringify(context)}\nRespond in JSON format with 'reply', 'suggestedUni', and 'aiWrittenReport' keys.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // JSON ক্লিনআপ
        const cleanedText = text.replace(/```json|```/g, "").trim();
        const parsedData = JSON.parse(cleanedText);

        return NextResponse.json(parsedData);

    } catch (error: any) {
        console.error("Detailed API Error:", error);
        return NextResponse.json(
            { reply: "সার্ভার রেসপন্স করতে পারছে না। সরাসরি যোগাযোগ করুন।" },
            { status: 200 }
        );
    }
}

// ৪০৫ এরর এড়াতে অন্যান্য মেথডগুলো হ্যান্ডেল করা
export async function GET() {
    return NextResponse.json({ message: "Only POST requests are allowed" }, { status: 405 });
}