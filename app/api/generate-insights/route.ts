import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'demo-key',
});

export async function POST(request: NextRequest) {
  try {
    const assessmentData = await request.json();

    if (
      !process.env.OPENAI_API_KEY ||
      process.env.OPENAI_API_KEY === 'demo-key'
    ) {
      // Return fallback insights
      const fallbackInsights = [
        {
          type: 'strength',
          title: 'Strong Technical Foundation',
          description:
            'Your experience shows solid technical skills that are highly valued in the current market.',
        },
        {
          type: 'opportunity',
          title: 'Growing Market Demand',
          description:
            'The tech industry is experiencing unprecedented growth in your areas of interest.',
        },
        {
          type: 'action',
          title: 'Skill Enhancement Focus',
          description:
            'Consider focusing on emerging technologies to stay ahead of the curve.',
        },
      ];
      return NextResponse.json(fallbackInsights);
    }

    const prompt = `
    Based on this career assessment data, generate 3 personalized career insights:
    
    Experience: ${assessmentData.experience}
    Current Role: ${assessmentData.currentRole}
    Interests: ${assessmentData.interests?.join(', ')}
    Timeline: ${assessmentData.timeline}
    Goals: ${assessmentData.goals?.join(', ')}
    Challenges: ${assessmentData.challenges?.join(', ')}
    
    Generate exactly 3 insights in this JSON format:
    [
      {
        "type": "strength|opportunity|action",
        "title": "Brief title",
        "description": "Detailed description (max 100 characters)"
      }
    ]
    
    Make them specific to the user's profile and actionable.
    `;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            'You are a career counselor providing personalized insights based on assessment data. Always respond with valid JSON.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No content received from OpenAI');
    }

    const insights = JSON.parse(content);
    return NextResponse.json(Array.isArray(insights) ? insights : []);
  } catch (error) {
    console.error('OpenAI API error:', error);
    // Return fallback insights on error
    const fallbackInsights = [
      {
        type: 'strength',
        title: 'Strong Technical Foundation',
        description:
          'Your experience shows solid technical skills that are highly valued in the current market.',
      },
      {
        type: 'opportunity',
        title: 'Growing Market Demand',
        description:
          'The tech industry is experiencing unprecedented growth in your areas of interest.',
      },
      {
        type: 'action',
        title: 'Skill Enhancement Focus',
        description:
          'Consider focusing on emerging technologies to stay ahead of the curve.',
      },
    ];
    return NextResponse.json(fallbackInsights);
  }
}
