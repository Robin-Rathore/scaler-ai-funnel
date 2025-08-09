'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Target,
  TrendingUp,
  Clock,
  Star,
  CheckCircle,
  ArrowRight,
  Brain,
  BookOpen,
  Award,
} from 'lucide-react';
import { useState, useEffect } from 'react';

interface CareerInsight {
  title: string;
  description: string;
  type: 'strength' | 'opportunity' | 'action';
}

interface CareerRecommendation {
  title: string;
  match: number;
  salary: string;
  growth: string;
  description: string;
  skills: string[];
  timeline: string;
  detailedAnalysis?: string;
}

interface ReportProps {
  data: any;
  leadScore: number;
  onBookConsultation: () => void;
}

export default function PersonalizedReport({
  data,
  leadScore,
  onBookConsultation,
}: ReportProps) {
  // AI-powered career recommendations based on assessment data
  const [recommendations, setRecommendations] = useState<
    CareerRecommendation[]
  >([]);
  const [insights, setInsights] = useState<CareerInsight[]>([]);
  const [learningPath, setLearningPath] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadAIContent() {
      setIsLoading(true);
      try {
        // Call the new API endpoints instead of direct OpenAI service
        const [recommendationsRes, insightsRes, learningPathRes] =
          await Promise.all([
            fetch('/api/generate-recommendations', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data),
            }),
            fetch('/api/generate-insights', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data),
            }),
            fetch('/api/generate-learning-path', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data),
            }),
          ]);

        if (recommendationsRes.ok) {
          const aiRecommendations = await recommendationsRes.json();
          setRecommendations(aiRecommendations);
        }

        if (insightsRes.ok) {
          const aiInsights = await insightsRes.json();
          setInsights(aiInsights);
        }

        if (learningPathRes.ok) {
          const aiLearningPath = await learningPathRes.json();
          setLearningPath(aiLearningPath);
        }
      } catch (error) {
        console.error('Failed to load AI content:', error);
        // Fallback content will be used
      } finally {
        setIsLoading(false);
      }
    }

    loadAIContent();
  }, [data]);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <div className="animate-pulse">
          <Brain className="w-16 h-16 text-blue-600 mx-auto mb-4 animate-spin" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            AI is analyzing your profile...
          </h2>
          <p className="text-gray-600">
            Generating personalized career recommendations and insights
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <Brain className="w-8 h-8 text-blue-600 mr-3" />
          <Badge className="bg-blue-100 text-blue-800">
            AI-Generated Report
          </Badge>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Your Personalized Career Report
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Based on your assessment, here's your AI-powered career roadmap
        </p>

        {/* Lead Score Indicator */}
        <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-green-50 to-blue-50 px-6 py-3 rounded-full">
          <Star className="w-5 h-5 text-yellow-500" />
          <span className="font-semibold">
            Career Readiness Score: {leadScore}/100
          </span>
          <Progress value={leadScore} className="w-24 h-2" />
        </div>
      </div>

      {/* Career Recommendations */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Target className="w-6 h-6 mr-2 text-blue-600" />
          Top Career Matches
        </h2>
        <div className="grid gap-6">
          {recommendations.map((rec, index) => (
            <Card key={index} className="border-l-4 border-l-blue-500">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{rec.title}</CardTitle>
                    <CardDescription className="mt-2">
                      {rec.description}
                    </CardDescription>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    {rec.match}% Match
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <div>
                      <div className="text-sm text-gray-600">Salary Range</div>
                      <div className="font-semibold">{rec.salary}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <div>
                      <div className="text-sm text-gray-600">Timeline</div>
                      <div className="font-semibold">{rec.timeline}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="w-4 h-4 text-purple-600" />
                    <div>
                      <div className="text-sm text-gray-600">Growth</div>
                      <div className="font-semibold">{rec.growth}</div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-2">
                    Key Skills Needed:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {rec.skills.map((skill, i) => (
                      <Badge key={i} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Personalized Insights */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Brain className="w-6 h-6 mr-2 text-purple-600" />
          AI Insights
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {insights.map((insight, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-start space-x-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      insight.type === 'strength'
                        ? 'bg-green-100'
                        : insight.type === 'opportunity'
                        ? 'bg-blue-100'
                        : 'bg-orange-100'
                    }`}
                  >
                    <CheckCircle
                      className={`w-4 h-4 ${
                        insight.type === 'strength'
                          ? 'text-green-600'
                          : insight.type === 'opportunity'
                          ? 'text-blue-600'
                          : 'text-orange-600'
                      }`}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{insight.title}</h3>
                    <p className="text-sm text-gray-600">
                      {insight.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Learning Path */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <BookOpen className="w-6 h-6 mr-2 text-green-600" />
          Recommended Learning Path
        </h2>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {learningPath.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-3 p-4 rounded-lg ${
                    index === 0
                      ? 'bg-blue-50'
                      : index === 1
                      ? 'bg-green-50'
                      : 'bg-purple-50'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white ${
                      index === 0
                        ? 'bg-blue-600'
                        : index === 1
                        ? 'bg-green-600'
                        : 'bg-purple-600'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* CTA Section */}
      <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-2xl">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Accelerate Your Career?
        </h2>
        <p className="text-xl mb-6 opacity-90">
          Book a free consultation with our career experts to create your
          personalized action plan
        </p>
        <div className="flex items-center justify-center space-x-6 mb-6">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5" />
            <span>30-minute expert consultation</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5" />
            <span>Personalized roadmap</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5" />
            <span>Course recommendations</span>
          </div>
        </div>
        <Button
          size="lg"
          className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6"
          onClick={onBookConsultation}
        >
          Book Free Consultation Call
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
        <p className="text-sm mt-4 opacity-75">
          Limited slots available • Usually ₹2,000 • Free for assessment takers
        </p>
      </div>
    </div>
  );
}
