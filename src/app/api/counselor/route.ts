import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// আপনার .env ফাইলে GEMINI_API_KEY থাকতে হবে
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { message, context } = await req.json();
    const { gpa, ielts, country } = context;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // AI-কে ইনস্ট্রাকশন দেওয়া (System Prompt)
    const prompt = `
      You are an expert study abroad counselor for SCC Group. 
      A student provided this message: "${message}"
      
      Current Student Profile:
      - GPA: ${gpa || "Not provided"}
      - IELTS: ${ielts || "Not provided"}
      - Preferred Country: ${country || "Global"}

      Task:
      1. Analyze the profile briefly.
      2. Provide 2-3 specific university suggestions if GPA/IELTS are available.
      3. Write a professional 'Counselor Observation' (max 100 words) that will be used in a PDF report.
      4. Use a friendly yet professional tone. Respond in English, but you can use a bit of Bengali for greetings.

      Output Format (JSON):
      {
        "reply": "The response to show in the chat box",
        "suggestedUni": {
          "name": "Example University",
          "country": "UK",
          "fee": "15000"
        },
        "aiWrittenReport": "The formal observation text for the PDF"
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // JSON ক্লিনআপ (Gemini মাঝে মাঝে ```json ... ``` দিয়ে টেক্সট দেয়)
    const cleanedText = text.replace(/```json|
```/g, "").trim();
    const parsedData = JSON.parse(cleanedText);

    return NextResponse.json(parsedData);

  } catch (error) {
    console.error("Gemini Error:", error);
    return NextResponse.json(
      { reply: "দুঃখিত, আমি এই মুহূর্তে আপনার তথ্য প্রসেস করতে পারছি না। সরাসরি হেল্পলাইনে যোগাযোগ করুন।" },
      { status: 500 }
    );
  }
}