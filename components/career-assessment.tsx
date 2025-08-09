'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, ArrowLeft } from 'lucide-react';

interface AssessmentData {
  experience: string;
  currentRole: string;
  interests: string[];
  timeline: string;
  budget: string;
  goals: string[];
  challenges: string[];
}

interface QuestionOption {
  value: string;
  label: string;
  description?: string;
}

interface Question {
  id: string;
  title: string;
  type: 'radio' | 'checkbox';
  options: QuestionOption[];
}

export default function CareerAssessment({
  onComplete,
}: {
  onComplete: (data: AssessmentData) => void;
}) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Partial<AssessmentData>>({
    interests: [],
    goals: [],
    challenges: [],
  });

  const questions: Question[] = [
    {
      id: 'experience',
      title: "What's your current experience level?",
      type: 'radio',
      options: [
        {
          value: 'fresher',
          label: 'Fresher (0-1 years)',
          description: 'Just starting my career',
        },
        {
          value: 'junior',
          label: 'Junior (1-3 years)',
          description: 'Some experience in tech',
        },
        {
          value: 'mid',
          label: 'Mid-level (3-7 years)',
          description: 'Solid experience, looking to grow',
        },
        {
          value: 'senior',
          label: 'Senior (7+ years)',
          description: 'Experienced, seeking leadership roles',
        },
      ],
    },
    {
      id: 'currentRole',
      title: 'What best describes your current situation?',
      type: 'radio',
      options: [
        {
          value: 'student',
          label: 'Student',
          description: 'Currently studying',
        },
        {
          value: 'employed',
          label: 'Employed in tech',
          description: 'Working in a tech role',
        },
        {
          value: 'non-tech',
          label: 'Employed in non-tech',
          description: 'Working outside tech industry',
        },
        {
          value: 'unemployed',
          label: 'Between jobs',
          description: 'Looking for opportunities',
        },
      ],
    },
    {
      id: 'interests',
      title: 'Which tech domains interest you most?',
      type: 'checkbox',
      options: [
        { value: 'web-dev', label: 'Web Development' },
        { value: 'mobile-dev', label: 'Mobile Development' },
        { value: 'data-science', label: 'Data Science & Analytics' },
        { value: 'ai-ml', label: 'AI & Machine Learning' },
        { value: 'devops', label: 'DevOps & Cloud' },
        { value: 'cybersecurity', label: 'Cybersecurity' },
        { value: 'product', label: 'Product Management' },
        { value: 'design', label: 'UI/UX Design' },
      ],
    },
    {
      id: 'timeline',
      title: 'When are you looking to make a career move?',
      type: 'radio',
      options: [
        {
          value: 'immediate',
          label: 'Immediately',
          description: 'Ready to start now',
        },
        {
          value: '3months',
          label: 'Within 3 months',
          description: 'Planning ahead',
        },
        {
          value: '6months',
          label: 'Within 6 months',
          description: 'Exploring options',
        },
        {
          value: '1year',
          label: 'Within a year',
          description: 'Long-term planning',
        },
      ],
    },
    {
      id: 'goals',
      title: 'What are your primary career goals?',
      type: 'checkbox',
      options: [
        { value: 'salary', label: 'Higher salary' },
        { value: 'skills', label: 'Learn new skills' },
        { value: 'leadership', label: 'Leadership role' },
        { value: 'startup', label: 'Join a startup' },
        { value: 'remote', label: 'Remote work' },
        { value: 'stability', label: 'Job security' },
      ],
    },
    {
      id: 'challenges',
      title: 'What challenges are you facing?',
      type: 'checkbox',
      options: [
        { value: 'skills-gap', label: 'Skills gap' },
        { value: 'interview', label: 'Interview preparation' },
        { value: 'portfolio', label: 'Building portfolio' },
        { value: 'networking', label: 'Professional networking' },
        { value: 'confidence', label: 'Self-confidence' },
        { value: 'time', label: 'Time management' },
      ],
    },
  ];

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (questionId: string, value: string | string[]) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onComplete(answers as AssessmentData);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const isAnswered = () => {
    const question = questions[currentQuestion];
    const answer = answers[question.id as keyof AssessmentData];

    if (question.type === 'checkbox') {
      return Array.isArray(answer) && answer.length > 0;
    }
    return answer && answer !== '';
  };

  const currentQ = questions[currentQuestion];

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">
            Career Assessment
          </h2>
          <span className="text-sm text-gray-600">
            {currentQuestion + 1} of {questions.length}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">{currentQ.title}</CardTitle>
          {currentQ.type === 'checkbox' && (
            <CardDescription>Select all that apply</CardDescription>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          {currentQ.type === 'radio' ? (
            <RadioGroup
              value={
                (answers[currentQ.id as keyof AssessmentData] as string) || ''
              }
              onValueChange={(value) => handleAnswer(currentQ.id, value)}
            >
              {currentQ.options.map((option) => (
                <div
                  key={option.value}
                  className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50"
                >
                  <RadioGroupItem
                    value={option.value}
                    id={option.value}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <Label
                      htmlFor={option.value}
                      className="font-medium cursor-pointer"
                    >
                      {option.label}
                    </Label>
                    {option.description && (
                      <p className="text-sm text-gray-600 mt-1">
                        {option.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </RadioGroup>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {currentQ.options.map((option) => (
                <div
                  key={option.value}
                  className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50"
                >
                  <Checkbox
                    id={option.value}
                    checked={(
                      (answers[
                        currentQ.id as keyof AssessmentData
                      ] as string[]) || []
                    ).includes(option.value)}
                    onCheckedChange={(checked) => {
                      const currentValues =
                        (answers[
                          currentQ.id as keyof AssessmentData
                        ] as string[]) || [];
                      if (checked) {
                        handleAnswer(currentQ.id, [
                          ...currentValues,
                          option.value,
                        ]);
                      } else {
                        handleAnswer(
                          currentQ.id,
                          currentValues.filter((v) => v !== option.value)
                        );
                      }
                    }}
                  />
                  <Label
                    htmlFor={option.value}
                    className="text-sm cursor-pointer"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={!isAnswered()}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {currentQuestion === questions.length - 1 ? 'Get My Report' : 'Next'}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
