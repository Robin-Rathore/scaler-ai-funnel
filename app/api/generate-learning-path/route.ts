import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "demo-key",
})

export async function POST(request: NextRequest) {
  try {
    const assessmentData = await request.json()

    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === "demo-key") {
      // Return fallback learning path
      const fallbackLearningPath = [
        "Foundation Skills: Core programming concepts and industry basics",
        "Specialized Training: Domain-specific skills and hands-on projects",
        "Career Preparation: Portfolio building, interview prep, and job search",
      ]
      return NextResponse.json(fallbackLearningPath)
    }

    const prompt = `
    Create a 3-step learning path for someone with this profile:
    
    Experience: ${assessmentData.experience}
    Interests: ${assessmentData.interests?.join(", ")}
    Timeline: ${assessmentData.timeline}
    
    Return exactly 3 steps as a JSON array of strings:
    ["Step 1: Title - Description", "Step 2: Title - Description", "Step 3: Title - Description"]
    
    Make it specific to their experience level and interests.
    `

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an educational consultant creating personalized learning paths. Always respond with valid JSON array.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 300,
      temperature: 0.6,
    })

    const content = completion.choices[0]?.message?.content
    if (!content) {
      throw new Error("No content received from OpenAI")
    }

    const learningPath = JSON.parse(content)
    const validLearningPath = Array.isArray(learningPath)
      ? learningPath
      : [
          "Foundation Skills: Core programming concepts and industry basics",
          "Specialized Training: Domain-specific skills and hands-on projects",
          "Career Preparation: Portfolio building, interview prep, and job search",
        ]
    
    return NextResponse.json(validLearningPath)
  } catch (error) {
    console.error("OpenAI API error:", error)
    // Return fallback learning path on error
    const fallbackLearningPath = [
      "Foundation Skills: Core programming concepts and industry basics",
      "Specialized Training: Domain-specific skills and hands-on projects",
      "Career Preparation: Portfolio building, interview prep, and job search",
    ]
    return NextResponse.json(fallbackLearningPath)
  }
}
