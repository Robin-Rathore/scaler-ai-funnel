'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ArrowRight,
  Brain,
  Target,
  TrendingUp,
  Users,
  Calendar,
  CheckCircle,
} from 'lucide-react';
import CareerAssessment from '@/components/career-assessment';
import PersonalizedReport from '@/components/personalized-report';
import ConsultationBooking from '@/components/consultation-booking';

export default function ScalerFunnel() {
  const [currentStep, setCurrentStep] = useState('landing');
  const [assessmentData, setAssessmentData] = useState(null);
  const [leadScore, setLeadScore] = useState(0);

  const handleAssessmentComplete = (data: any) => {
    setAssessmentData(data);
    // AI-powered lead scoring
    const score = calculateLeadScore(data);
    setLeadScore(score);
    setCurrentStep('report');
  };

  const calculateLeadScore = (data: any) => {
    let score = 0;

    // Experience level scoring
    if (data.experience === 'senior') score += 30;
    else if (data.experience === 'mid') score += 20;
    else score += 10;

    // Career goal urgency
    if (data.timeline === 'immediate') score += 25;
    else if (data.timeline === '3months') score += 20;
    else score += 10;

    // Interest in premium features
    if (data.interests?.includes('mentorship')) score += 15;
    if (data.interests?.includes('certification')) score += 10;
    if (data.interests?.includes('placement')) score += 20;

    return Math.min(score, 100);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'landing':
        return (
          <LandingSection
            onStartAssessment={() => setCurrentStep('assessment')}
          />
        );
      case 'assessment':
        return <CareerAssessment onComplete={handleAssessmentComplete} />;
      case 'report':
        return (
          <PersonalizedReport
            data={assessmentData}
            leadScore={leadScore}
            onBookConsultation={() => setCurrentStep('booking')}
          />
        );
      case 'booking':
        return (
          <ConsultationBooking data={assessmentData} leadScore={leadScore} />
        );
      default:
        return (
          <LandingSection
            onStartAssessment={() => setCurrentStep('assessment')}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Progress Indicator */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img
                src="https://scaler-blog-prod-wp-content.s3.ap-south-1.amazonaws.com/wp-content/uploads/2021/04/22114217/74797539_118431542933200_2322441253926469632_o.png"
                alt="Scaler"
                className="h-8"
              />
              <Badge variant="secondary">AI-Powered Career Assessment</Badge>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div
                className={`flex items-center space-x-1 ${
                  currentStep === 'assessment' ||
                  currentStep === 'report' ||
                  currentStep === 'booking'
                    ? 'text-blue-600'
                    : ''
                }`}
              >
                <CheckCircle className="w-4 h-4" />
                <span>Assessment</span>
              </div>
              <ArrowRight className="w-4 h-4" />
              <div
                className={`flex items-center space-x-1 ${
                  currentStep === 'report' || currentStep === 'booking'
                    ? 'text-blue-600'
                    : ''
                }`}
              >
                <CheckCircle className="w-4 h-4" />
                <span>Report</span>
              </div>
              <ArrowRight className="w-4 h-4" />
              <div
                className={`flex items-center space-x-1 ${
                  currentStep === 'booking' ? 'text-blue-600' : ''
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Book Call</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {renderStep()}
    </div>
  );
}

function LandingSection({
  onStartAssessment,
}: {
  onStartAssessment: () => void;
}) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <Badge className="mb-4" variant="outline">
          <Brain className="w-4 h-4 mr-2" />
          AI-Powered Career Intelligence
        </Badge>
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Discover Your Perfect
          <span className="text-blue-600"> Tech Career Path</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Take our AI-powered assessment and get a personalized roadmap to land
          your dream tech job. Used by 50,000+ professionals to accelerate their
          careers.
        </p>
        <div className="flex items-center justify-center space-x-6 mb-8">
          <div className="flex items-center space-x-2 text-gray-600">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span>5-minute assessment</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span>Personalized insights</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span>Expert consultation</span>
          </div>
        </div>
        <Button
          size="lg"
          className="text-lg px-8 py-6 bg-blue-600 hover:bg-blue-700"
          onClick={onStartAssessment}
        >
          Start Free Assessment
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </div>

      {/* Social Proof */}
      <div className="grid md:grid-cols-4 gap-6 mb-16">
        <Card className="text-center">
          <CardContent className="pt-6">
            <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">50K+</div>
            <div className="text-sm text-gray-600">Professionals Helped</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">85%</div>
            <div className="text-sm text-gray-600">Career Switch Success</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">40%</div>
            <div className="text-sm text-gray-600">Average Salary Increase</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <Brain className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">AI</div>
            <div className="text-sm text-gray-600">Powered Insights</div>
          </CardContent>
        </Card>
      </div>

      {/* How It Works */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
        <p className="text-gray-600 mb-8">
          Get personalized career guidance in 3 simple steps
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Take Assessment</h3>
            <p className="text-gray-600">
              Answer questions about your background, goals, and preferences
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-green-600">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Get AI Report</h3>
            <p className="text-gray-600">
              Receive personalized career recommendations and learning path
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-purple-600">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Book Expert Call</h3>
            <p className="text-gray-600">
              Schedule a free consultation with our career experts
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
