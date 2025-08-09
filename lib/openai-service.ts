import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "demo-key",
})

export interface CareerInsight {
  title: string
  description: string
  type: "strength" | "opportunity" | "action"
}

export interface CareerRecommendation {
  title: string
  match: number
  salary: string
  growth: string
  description: string
  skills: string[]
  timeline: string
  detailedAnalysis?: string
}

// Fallback data for when OpenAI is not available
const fallbackInsights: CareerInsight[] = [
  {
    type: "strength",
    title: "Strong Technical Foundation",
    description: "Your experience shows solid technical skills that are highly valued in the current market.",
  },
  {
    type: "opportunity",
    title: "Growing Market Demand",
    description: "The tech industry is experiencing unprecedented growth in your areas of interest.",
  },
  {
    type: "action",
    title: "Skill Enhancement Focus",
    description: "Consider focusing on emerging technologies to stay ahead of the curve.",
  },
]

const fallbackRecommendations: CareerRecommendation[] = [
  {
    title: "Full Stack Developer",
    match: 85,
    salary: "₹12-20 LPA",
    growth: "High",
    description: "Perfect match for your development interests with versatile opportunities",
    skills: ["React", "Node.js", "Databases", "Cloud"],
    timeline: "4-8 months",
  },
]

export async function generatePersonalizedInsights(assessmentData: any): Promise<CareerInsight[]> {
  try {
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === "demo-key") {
      console.log("Using fallback insights - OpenAI API key not configured")
      return generateFallbackInsights(assessmentData)
    }

    const prompt = `
    Based on this career assessment data, generate 3 personalized career insights:
    
    Experience: ${assessmentData.experience}
    Current Role: ${assessmentData.currentRole}
    Interests: ${assessmentData.interests?.join(", ")}
    Timeline: ${assessmentData.timeline}
    Goals: ${assessmentData.goals?.join(", ")}
    Challenges: ${assessmentData.challenges?.join(", ")}
    
    Generate exactly 3 insights in this JSON format:
    [
      {
        "type": "strength|opportunity|action",
        "title": "Brief title",
        "description": "Detailed description (max 100 characters)"
      }
    ]
    
    Make them specific to the user's profile and actionable.
    `

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a career counselor providing personalized insights based on assessment data. Always respond with valid JSON.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 500,
      temperature: 0.7,
    })

    const content = completion.choices[0]?.message?.content
    if (!content) {
      throw new Error("No content received from OpenAI")
    }

    try {
      const insights = JSON.parse(content)
      return Array.isArray(insights) ? insights : fallbackInsights
    } catch (parseError) {
      console.error("Failed to parse OpenAI response:", parseError)
      return generateFallbackInsights(assessmentData)
    }
  } catch (error) {
    console.error("OpenAI API error:", error)
    return generateFallbackInsights(assessmentData)
  }
}

export async function generateCareerRecommendations(assessmentData: any): Promise<CareerRecommendation[]> {
  try {
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === "demo-key") {
      console.log("Using fallback recommendations - OpenAI API key not configured")
      return generateFallbackRecommendations(assessmentData)
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
          content:
            "You are a career counselor with deep knowledge of the Indian tech job market. Always respond with valid JSON.",
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

    try {
      const recommendations = JSON.parse(content)
      return Array.isArray(recommendations) ? recommendations : generateFallbackRecommendations(assessmentData)
    } catch (parseError) {
      console.error("Failed to parse OpenAI response:", parseError)
      return generateFallbackRecommendations(assessmentData)
    }
  } catch (error) {
    console.error("OpenAI API error:", error)
    return generateFallbackRecommendations(assessmentData)
  }
}

export async function generateLearningPath(assessmentData: any): Promise<string[]> {
  try {
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === "demo-key") {
      return [
        "Foundation Skills: Core programming concepts and industry basics",
        "Specialized Training: Domain-specific skills and hands-on projects",
        "Career Preparation: Portfolio building, interview prep, and job search",
      ]
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
          content:
            "You are an educational consultant creating personalized learning paths. Always respond with valid JSON array.",
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

    try {
      const learningPath = JSON.parse(content)
      return Array.isArray(learningPath)
        ? learningPath
        : [
            "Foundation Skills: Core programming concepts and industry basics",
            "Specialized Training: Domain-specific skills and hands-on projects",
            "Career Preparation: Portfolio building, interview prep, and job search",
          ]
    } catch (parseError) {
      console.error("Failed to parse OpenAI response:", parseError)
      return [
        "Foundation Skills: Core programming concepts and industry basics",
        "Specialized Training: Domain-specific skills and hands-on projects",
        "Career Preparation: Portfolio building, interview prep, and job search",
      ]
    }
  } catch (error) {
    console.error("OpenAI API error:", error)
    return [
      "Foundation Skills: Core programming concepts and industry basics",
      "Specialized Training: Domain-specific skills and hands-on projects",
      "Career Preparation: Portfolio building, interview prep, and job search",
    ]
  }
}

function generateFallbackInsights(assessmentData: any): CareerInsight[] {
  const insights: CareerInsight[] = []

  if (assessmentData.experience === "senior") {
    insights.push({
      type: "strength",
      title: "Leadership Ready",
      description: "Your senior experience positions you well for leadership roles and mentoring opportunities.",
    })
  }

  if (assessmentData.timeline === "immediate") {
    insights.push({
      type: "opportunity",
      title: "Market Timing",
      description: "Current market conditions favor immediate job seekers with your profile.",
    })
  }

  if (assessmentData.challenges?.includes("skills-gap")) {
    insights.push({
      type: "action",
      title: "Skill Development Priority",
      description: "Focus on bridging identified skill gaps through targeted learning programs.",
    })
  }

  // Fill remaining slots with generic insights
  while (insights.length < 3) {
    const remaining = fallbackInsights.filter((f) => !insights.some((i) => i.title === f.title))
    if (remaining.length > 0) {
      insights.push(remaining[0])
    } else {
      break
    }
  }

  return insights
}

function generateFallbackRecommendations(assessmentData: any): CareerRecommendation[] {
  const recommendations: CareerRecommendation[] = []

  if (assessmentData.interests?.includes("ai-ml") || assessmentData.interests?.includes("data-science")) {
    recommendations.push({
      title: "Data Science & AI Specialist",
      match: 95,
      salary: "₹15-25 LPA",
      growth: "High",
      description: "Perfect match for your AI/ML interests with strong market demand",
      skills: ["Python", "Machine Learning", "Statistics", "Deep Learning"],
      timeline: "6-12 months",
    })
  }

  if (assessmentData.interests?.includes("web-dev") || assessmentData.interests?.includes("mobile-dev")) {
    recommendations.push({
      title: "Full Stack Developer",
      match: 88,
      salary: "₹12-20 LPA",
      growth: "High",
      description: "Great fit for your development interests with versatile opportunities",
      skills: ["React", "Node.js", "Databases", "Cloud"],
      timeline: "4-8 months",
    })
  }

  if (assessmentData.interests?.includes("devops") || assessmentData.interests?.includes("cybersecurity")) {
    recommendations.push({
      title: "DevOps Engineer",
      match: 82,
      salary: "₹14-22 LPA",
      growth: "Very High",
      description: "Excellent choice for infrastructure and security focus",
      skills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
      timeline: "5-10 months",
    })
  }

  // Ensure we have at least one recommendation
  if (recommendations.length === 0) {
    recommendations.push(...fallbackRecommendations)
  }

  return recommendations.slice(0, 3)
}
