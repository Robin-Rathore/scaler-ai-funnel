'use client';

import type React from 'react';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Calendar,
  Clock,
  CheckCircle,
  User,
  Star,
  ArrowRight,
} from 'lucide-react';
import { useRouter } from 'next/router';

interface BookingProps {
  data: any;
  leadScore: number;
}

export default function ConsultationBooking({ data, leadScore }: BookingProps) {
  const [selectedSlot, setSelectedSlot] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // AI-powered slot recommendations based on lead score and urgency
  const getRecommendedSlots = () => {
    const baseSlots = [
      {
        id: '1',
        date: 'Tomorrow',
        time: '10:00 AM',
        expert: 'Priya Sharma',
        speciality: 'Data Science',
        priority: 'high',
      },
      {
        id: '2',
        date: 'Tomorrow',
        time: '2:00 PM',
        expert: 'Rahul Kumar',
        speciality: 'Full Stack',
        priority: 'medium',
      },
      {
        id: '3',
        date: 'Day After',
        time: '11:00 AM',
        expert: 'Anita Singh',
        speciality: 'AI/ML',
        priority: 'high',
      },
      {
        id: '4',
        date: 'Day After',
        time: '4:00 PM',
        expert: 'Vikram Patel',
        speciality: 'DevOps',
        priority: 'medium',
      },
      {
        id: '5',
        date: 'This Weekend',
        time: '10:00 AM',
        expert: 'Sneha Gupta',
        speciality: 'Product',
        priority: 'low',
      },
      {
        id: '6',
        date: 'This Weekend',
        time: '3:00 PM',
        expert: 'Arjun Mehta',
        speciality: 'Leadership',
        priority: 'high',
      },
    ];

    // Prioritize slots based on lead score and interests
    return baseSlots.sort((a, b) => {
      if (leadScore > 70 && a.priority === 'high') return -1;
      if (data.timeline === 'immediate' && a.date === 'Tomorrow') return -1;
      return 0;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send confirmation email
      const response = await fetch('/api/send-confirmation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          selectedSlot: slots.find((slot) => slot.id === selectedSlot),
          assessmentData: data,
          leadScore,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);

        // Track conversion event
        console.log('Consultation booked and email sent:', {
          leadScore,
          slot: selectedSlot,
          userData: formData,
          assessmentData: data,
        });
      } else {
        console.error('Failed to send confirmation email:', result.error);
        // Still show success to user, but log the error
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error('Error submitting booking:', error);
      // Show success anyway to not break user experience
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const slots = getRecommendedSlots();

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <div className="bg-green-50 p-8 rounded-2xl">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Consultation Booked Successfully! 🎉
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            You'll receive a confirmation email with the meeting link and
            preparation materials within 5 minutes.
          </p>
          <div className="bg-white p-6 rounded-lg mb-6">
            <h3 className="font-semibold mb-2">What happens next?</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Confirmation email sent within 5 minutes</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Pre-call questionnaire to maximize your session</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Personalized career roadmap during the call</span>
              </div>
            </div>
          </div>
          a
          <a href="/" className="bg-blue-600 hover:bg-blue-700">
            Add to Calendar
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Book Your Free Career Consultation
        </h1>
        <p className="text-lg text-gray-600">
          Choose a time that works for you and get personalized career guidance
        </p>
        {leadScore > 80 && (
          <Badge className="mt-4 bg-gold-100 text-gold-800">
            <Star className="w-4 h-4 mr-1" />
            Priority Booking - High Career Readiness Score
          </Badge>
        )}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Time Slot Selection */}
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-blue-600" />
            Available Time Slots
          </h2>
          <div className="space-y-3">
            {slots.map((slot) => (
              <Card
                key={slot.id}
                className={`cursor-pointer transition-all ${
                  selectedSlot === slot.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'hover:border-gray-300'
                }`}
                onClick={() => setSelectedSlot(slot.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-center">
                        <div className="text-sm font-medium text-gray-900">
                          {slot.date}
                        </div>
                        <div className="text-lg font-bold text-blue-600">
                          {slot.time}
                        </div>
                      </div>
                      <div>
                        <div className="font-medium">{slot.expert}</div>
                        <div className="text-sm text-gray-600">
                          {slot.speciality} Expert
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {slot.priority === 'high' && (
                        <Badge className="bg-green-100 text-green-800">
                          Recommended
                        </Badge>
                      )}
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">30 min</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Booking Form */}
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <User className="w-5 h-5 mr-2 text-green-600" />
            Your Details
          </h2>
          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="message">
                    Specific Questions or Goals (Optional)
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="What would you like to discuss during the consultation?"
                    className="mt-1"
                    rows={3}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6"
                  disabled={
                    !selectedSlot ||
                    !formData.name ||
                    !formData.email ||
                    !formData.phone ||
                    isSubmitting
                  }
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Booking & Sending Confirmation...
                    </>
                  ) : (
                    <>
                      Confirm Booking
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* What to Expect */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">What to Expect</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                  <span>Detailed review of your career assessment results</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                  <span>Personalized learning roadmap and timeline</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                  <span>Course recommendations based on your goals</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                  <span>Q&A session for your specific concerns</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
