import nodemailer from 'nodemailer';

interface ConsultationDetails {
  name: string;
  email: string;
  phone: string;
  selectedSlot: any;
  assessmentData: any;
  leadScore: number;
  message?: string;
}

// Create transporter with fallback configuration
const createTransporter = () => {
  // Production configuration (Gmail/SMTP)
  if (
    process.env.EMAIL_HOST &&
    process.env.EMAIL_USER &&
    process.env.EMAIL_PASS
  ) {
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number.parseInt(process.env.EMAIL_PORT || '587'),
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  // Development/Demo configuration (Ethereal Email for testing)
  return nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'ethereal.user@ethereal.email',
      pass: 'ethereal.pass',
    },
  });
};

export async function sendConsultationConfirmation(
  details: ConsultationDetails
): Promise<boolean> {
  try {
    const transporter = createTransporter();

    const htmlTemplate = generateEmailTemplate(details);
    const textTemplate = generateTextTemplate(details);

    const mailOptions = {
      from: process.env.EMAIL_FROM || 'Scaler Career Team <career@scaler.com>',
      to: details.email,
      subject: `🎉 Your Career Consultation is Confirmed - ${details.selectedSlot?.date} at ${details.selectedSlot?.time}`,
      html: htmlTemplate,
      text: textTemplate,
      attachments: [
        {
          filename: 'career-preparation-guide.pdf',
          content: 'This would be a PDF guide in production',
          contentType: 'application/pdf',
        },
      ],
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);

    // For development, log the preview URL
    if (process.env.NODE_ENV === 'development') {
      console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
    }

    return true;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
}

function generateEmailTemplate(details: ConsultationDetails): string {
  const { name, selectedSlot, assessmentData, leadScore } = details;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Career Consultation Confirmed</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8fafc;
        }
        .container {
            background: white;
            border-radius: 12px;
            padding: 40px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 40px;
            padding-bottom: 20px;
            border-bottom: 2px solid #e2e8f0;
        }
        .logo {
            font-size: 28px;
            font-weight: bold;
            color: #2563eb;
            margin-bottom: 10px;
        }
        .confirmation-badge {
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
            padding: 8px 20px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 600;
            display: inline-block;
            margin-bottom: 20px;
        }
        .greeting {
            font-size: 24px;
            font-weight: 600;
            color: #1f2937;
            margin-bottom: 10px;
        }
        .subtitle {
            color: #6b7280;
            font-size: 16px;
        }
        .consultation-details {
            background: #f8fafc;
            border-radius: 8px;
            padding: 24px;
            margin: 30px 0;
            border-left: 4px solid #2563eb;
        }
        .detail-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 0;
            border-bottom: 1px solid #e5e7eb;
        }
        .detail-row:last-child {
            border-bottom: none;
        }
        .detail-label {
            font-weight: 600;
            color: #374151;
        }
        .detail-value {
            color: #1f2937;
            font-weight: 500;
        }
        .expert-card {
            background: white;
            border: 2px solid #e5e7eb;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
            text-align: center;
        }
        .expert-name {
            font-size: 18px;
            font-weight: 600;
            color: #1f2937;
            margin-bottom: 5px;
        }
        .expert-title {
            color: #6b7280;
            margin-bottom: 10px;
        }
        .expert-rating {
            color: #f59e0b;
            font-size: 14px;
        }
        .preparation-section {
            background: #fef3c7;
            border-radius: 8px;
            padding: 24px;
            margin: 30px 0;
            border-left: 4px solid #f59e0b;
        }
        .preparation-title {
            font-size: 18px;
            font-weight: 600;
            color: #92400e;
            margin-bottom: 15px;
        }
        .preparation-list {
            list-style: none;
            padding: 0;
        }
        .preparation-list li {
            padding: 8px 0;
            color: #78350f;
            position: relative;
            padding-left: 25px;
        }
        .preparation-list li:before {
            content: "✓";
            position: absolute;
            left: 0;
            color: #059669;
            font-weight: bold;
        }
        .cta-section {
            text-align: center;
            margin: 40px 0;
        }
        .cta-button {
            background: linear-gradient(135deg, #2563eb, #1d4ed8);
            color: white;
            padding: 14px 28px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            display: inline-block;
            margin: 10px;
            transition: transform 0.2s;
        }
        .cta-button:hover {
            transform: translateY(-2px);
        }
        .secondary-button {
            background: #f3f4f6;
            color: #374151;
            border: 2px solid #d1d5db;
        }
        .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            color: #6b7280;
            font-size: 14px;
        }
        .social-links {
            margin: 20px 0;
        }
        .social-links a {
            color: #2563eb;
            text-decoration: none;
            margin: 0 10px;
        }
        @media (max-width: 600px) {
            body {
                padding: 10px;
            }
            .container {
                padding: 20px;
            }
            .detail-row {
                flex-direction: column;
                align-items: flex-start;
            }
            .cta-button {
                display: block;
                margin: 10px 0;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">Scaler</div>
            <div class="confirmation-badge">✓ CONSULTATION CONFIRMED</div>
            <div class="greeting">Hi ${name}! 👋</div>
            <div class="subtitle">Your career consultation is all set. We're excited to help you accelerate your tech career!</div>
        </div>

        <div class="consultation-details">
            <h3 style="margin-top: 0; color: #1f2937;">📅 Consultation Details</h3>
            <div class="detail-row">
                <span class="detail-label">📅 Date & Time:</span>
                <span class="detail-value">${selectedSlot?.date} at ${
    selectedSlot?.time
  }</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">⏱️ Duration:</span>
                <span class="detail-value">30 minutes</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">💻 Meeting Type:</span>
                <span class="detail-value">Video Call (Google Meet)</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">🎯 Focus Areas:</span>
                <span class="detail-value">${
                  assessmentData.interests?.join(', ') || 'Career Growth'
                }</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">📊 Career Readiness Score:</span>
                <span class="detail-value">${leadScore}/100 ${
    leadScore > 80 ? '🔥' : leadScore > 60 ? '⭐' : '💪'
  }</span>
            </div>
        </div>

        <div class="expert-card">
            <div class="expert-name">${
              selectedSlot?.expert || 'Priya Sharma'
            }</div>
            <div class="expert-title">${
              selectedSlot?.speciality || 'Senior Career'
            } Expert • 8+ Years Experience</div>
            <div class="expert-rating">⭐⭐⭐⭐⭐ 4.9/5 (500+ consultations)</div>
        </div>

        <div class="preparation-section">
            <div class="preparation-title">🚀 How to Prepare for Maximum Impact</div>
            <ul class="preparation-list">
                <li>Review your career assessment results (attached)</li>
                <li>Prepare 2-3 specific questions about your career goals</li>
                <li>Have your resume ready for expert feedback</li>
                <li>Think about your ideal timeline for career transition</li>
                <li>Consider your salary expectations and growth targets</li>
            </ul>
        </div>

        <div class="cta-section">
            <a href="#" class="cta-button">📅 Add to Calendar</a>
            <a href="#" class="cta-button secondary-button">📋 Pre-Call Questionnaire</a>
        </div>

        <div style="background: #ecfdf5; border-radius: 8px; padding: 20px; margin: 30px 0; text-align: center;">
            <h4 style="color: #065f46; margin-top: 0;">💡 What to Expect in Your Session</h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-top: 15px;">
                <div>
                    <strong style="color: #047857;">Career Roadmap</strong><br>
                    <small style="color: #065f46;">Personalized path to your dream role</small>
                </div>
                <div>
                    <strong style="color: #047857;">Skill Gap Analysis</strong><br>
                    <small style="color: #065f46;">What to learn and in what order</small>
                </div>
                <div>
                    <strong style="color: #047857;">Market Insights</strong><br>
                    <small style="color: #065f46;">Salary trends and opportunities</small>
                </div>
                <div>
                    <strong style="color: #047857;">Action Plan</strong><br>
                    <small style="color: #065f46;">Next steps for immediate progress</small>
                </div>
            </div>
        </div>

        <div style="background: #fef2f2; border-radius: 8px; padding: 20px; margin: 30px 0; border-left: 4px solid #ef4444;">
            <h4 style="color: #dc2626; margin-top: 0;">⚠️ Important Reminders</h4>
            <ul style="color: #7f1d1d; margin: 0; padding-left: 20px;">
                <li>Meeting link will be sent 1 hour before the call</li>
                <li>Please join 2-3 minutes early to test your audio/video</li>
                <li>Have a stable internet connection and quiet environment</li>
                <li>Bring a notepad to jot down key insights and action items</li>
            </ul>
        </div>

        <div class="footer">
            <p><strong>Need to reschedule?</strong> Reply to this email or call us at +91-80-SCALER</p>
            <div class="social-links">
                <a href="#">LinkedIn</a> |
                <a href="#">Twitter</a> |
                <a href="#">YouTube</a> |
                <a href="#">Blog</a>
            </div>
            <p>Scaler Academy • Electronic City, Bengaluru<br>
            Helping 100,000+ professionals build their dream tech careers</p>
            <p style="font-size: 12px; color: #9ca3af;">
                This email was sent to ${
                  details.email
                }. If you no longer wish to receive these emails, 
                <a href="#" style="color: #6b7280;">unsubscribe here</a>.
            </p>
        </div>
    </div>
</body>
</html>
  `;
}

function generateTextTemplate(details: ConsultationDetails): string {
  return `
🎉 CONSULTATION CONFIRMED - Scaler Career Team

Hi ${details.name}!

Your career consultation is confirmed for ${details.selectedSlot?.date} at ${
    details.selectedSlot?.time
  }.

CONSULTATION DETAILS:
📅 Date & Time: ${details.selectedSlot?.date} at ${details.selectedSlot?.time}
⏱️ Duration: 30 minutes
💻 Meeting Type: Video Call (Google Meet)
👨‍💼 Expert: ${details.selectedSlot?.expert || 'Priya Sharma'} (${
    details.selectedSlot?.speciality || 'Senior Career'
  } Expert)
📊 Your Career Readiness Score: ${details.leadScore}/100

PREPARATION CHECKLIST:
✓ Review your career assessment results
✓ Prepare 2-3 specific career questions
✓ Have your resume ready for feedback
✓ Think about your ideal timeline
✓ Consider salary expectations

WHAT TO EXPECT:
• Personalized career roadmap
• Skill gap analysis and learning plan
• Market insights and salary trends
• Actionable next steps

IMPORTANT REMINDERS:
• Meeting link will be sent 1 hour before
• Join 2-3 minutes early to test audio/video
• Ensure stable internet and quiet environment
• Bring notepad for key insights

Need to reschedule? Reply to this email or call +91-80-SCALER

Best regards,
Scaler Career Team
Electronic City, Bengaluru

---
This email was sent to ${details.email}
Unsubscribe: [link]
  `;
}

// Utility function to send follow-up emails
export async function sendFollowUpEmail(
  email: string,
  name: string,
  type: 'reminder' | 'feedback'
): Promise<boolean> {
  try {
    const transporter = createTransporter();

    let subject = '';
    let content = '';

    if (type === 'reminder') {
      subject = `⏰ Your consultation is tomorrow - ${name}`;
      content = generateReminderTemplate(name);
    } else {
      subject = `📝 How was your consultation? Share your feedback`;
      content = generateFeedbackTemplate(name);
    }

    const mailOptions = {
      from: process.env.EMAIL_FROM || 'Scaler Career Team <career@scaler.com>',
      to: email,
      subject,
      html: content,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Failed to send follow-up email:', error);
    return false;
  }
}

function generateReminderTemplate(name: string): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2>Hi ${name}! 👋</h2>
      <p>Just a friendly reminder that your career consultation is scheduled for tomorrow.</p>
      <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3>Final Preparation Tips:</h3>
        <ul>
          <li>Test your video/audio setup</li>
          <li>Prepare your top 3 career questions</li>
          <li>Have your resume handy</li>
          <li>Find a quiet, well-lit space</li>
        </ul>
      </div>
      <p>We're excited to help you accelerate your career!</p>
      <p>Best regards,<br>Scaler Career Team</p>
    </div>
  `;
}

function generateFeedbackTemplate(name: string): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2>Hi ${name}! 👋</h2>
      <p>We hope your career consultation was valuable and insightful.</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="#" style="background: #2563eb; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold;">
          Share Your Feedback
        </a>
      </div>
      <p>Your feedback helps us improve our service and assist more professionals like you.</p>
      <p>Best regards,<br>Scaler Career Team</p>
    </div>
  `;
}
