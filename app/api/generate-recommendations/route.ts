import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "demo-key",
})

export async function POST(request: NextRequest) {
  try {
    const assessmentData = await request.json()

    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === "demo-key") {
      // Return fallback recommendations
      const fallbackRecommendations = [
        {
          title: "Full Stack Developer",
          match: 85,
          salary: "₹12-20 LPA",
          growth: "High",
          description: "Perfect match for your development interests with versatile opportunities",
          skills: ["React", "Node.js", "Databases", "Cloud"],
          timeline: "4-8 months",
        },
        {
          title: "Data Science & AI Specialist",
          match: 90,
          salary: "₹15-25 LPA",
          growth: "Very High",
          description: "Excellent choice for AI/ML enthusiasts with strong market demand",
          skills: ["Python", "Machine Learning", "Statistics", "Deep Learning"],
          timeline: "6-12 months",
        },
        {
          title: "DevOps Engineer",
          match: 82,
          salary: "₹14-22 LPA",
          growth: "Very High",
          description: "Great fit for infrastructure and security focused professionals",
          skills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
          timeline: "5-10 months",
        },
      ]
      return NextResponse.json(fallbackRecommendations)
    }

    const prompt = `
    Based on this career assessment, recommend 3 specific career paths:
    
    Experience: ${assessmentData.experience}
    Interests: ${assessmentData.interests?.join(", ")}
    Goals: ${assessmentData.goals?.join(", ")}
    Timeline: ${assessmentData.timeline}
    
    Generate exactly 3 career recommendations in this JSON format:
    [
      {
        "title": "Specific job title",
        "match": 85,
        "salary": "₹XX-XX LPA",
        "growth": "High|Medium|Low",
        "description": "Why this matches their profile (max 120 chars)",
        "skills": ["skill1", "skill2", "skill3", "skill4"],
        "timeline": "X-X months",
        "detailedAnalysis": "Detailed explanation of why this career fits (max 200 chars)"
      }
    ]
    
    Make salary ranges realistic for Indian market. Match percentage should be 75-95.
    `

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a career counselor with deep knowledge of the Indian tech job market. Always respond with valid JSON.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 800,
      temperature: 0.7,
    })

    const content = completion.choices[0]?.message?.content
    if (!content) {
      throw new Error("No content received from OpenAI")
    }

    const recommendations = JSON.parse(content)
    return NextResponse.json(Array.isArray(recommendations) ? recommendations : [])
  } catch (error) {
    console.error("OpenAI API error:", error)
    // Return fallback recommendations on error
    const fallbackRecommendations = [
      {
        title: "Full Stack Developer",
        match: 85,
        salary: "₹12-20 LPA",
        growth: "High",
        description: "Perfect match for your development interests with versatile opportunities",
        skills: ["React", "Node.js", "Databases", "Cloud"],
        timeline: "4-8 months",
      },
      {
        title: "Data Science & AI Specialist",
        match: 90,
        salary: "₹15-25 LPA",
        growth: "Very High",
        description: "Excellent choice for AI/ML enthusiasts with strong market demand",
        skills: ["Python", "Machine Learning", "Statistics", "Deep Learning"],
        timeline: "6-12 months",
      },
      {
        title: "DevOps Engineer",
        match: 82,
        salary: "₹14-22 LPA",
        growth: "Very High",
        description: "Great fit for infrastructure and security focused professionals",
        skills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
        timeline: "5-10 months",
      },
    ]
    return NextResponse.json(fallbackRecommendations)
  }
}
