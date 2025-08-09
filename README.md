# 🚀 Scaler AI Lead Conversion Funnel

An AI-powered lead acquisition and conversion system that transforms blog readers into consultation bookings through personalized career assessments, intelligent routing, and automated email notifications.

## ✨ Key Features

- **AI-Powered Personalization**: OpenAI integration for dynamic content generation
- **Smart Lead Scoring**: Intelligent qualification and routing system
- **Professional Email Automation**: Beautiful HTML email templates with Nodemailer
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Fallback Systems**: Works seamlessly with or without API keys

## 🎯 Business Impact

**Projected Results**:

- Blog-to-lead conversion: 2% → 8% (+300%)
- Lead-to-consultation: 5% → 15% (+200%)
- Consultation-to-sale: 20% → 35% (+75%)
- **Total Impact**: 2,000% increase in conversions

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone and install**
   \`\`\`bash
   git clone https://github.com/Robin-Rathore/scaler-ai-funnel.git
   cd scaler-ai-funnel
   npm install
   \`\`\`

2. **Environment setup**
   \`\`\`bash
   cp .env.example .env.local

# Add your API keys (optional for demo)

\`\`\`

3. **Run development server**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Open browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🤖 AI Integration

### OpenAI Features

- **Career Recommendations**: Personalized job suggestions with salary ranges
- **Learning Paths**: Custom skill development roadmaps
- **Insights Generation**: Dynamic career advice based on assessment
- **Fallback System**: Intelligent defaults when API unavailable

### Email Automation

- **Professional Templates**: Mobile-responsive HTML emails
- **Dynamic Content**: Personalized based on lead score and preferences
- **Multi-format**: HTML and text versions
- **Attachment Support**: PDF guides and resources

## 🏗️ Architecture

### Tech Stack

\`\`\`
Frontend: Next.js 14 + React + TypeScript
Styling: Tailwind CSS + shadcn/ui
AI: OpenAI GPT-3.5-turbo
Email: Nodemailer + HTML templates
State: React hooks + Context API
\`\`\`

### Project Structure

\`\`\`
scaler-ai-funnel/
├── app/
│ ├── page.tsx # Main funnel orchestrator
│ ├── api/send-confirmation/ # Email API endpoint
│ └── layout.tsx # Root layout
├── components/
│ ├── career-assessment.tsx # Multi-step assessment
│ ├── personalized-report.tsx # AI-generated report
│ ├── consultation-booking.tsx # Smart booking system
│ └── ui/ # Reusable components
├── lib/
│ ├── openai-service.ts # AI content generation
│ ├── email-service.ts # Email automation
│ └── utils.ts # Utilities
└── README.md
\`\`\`

## 🔧 Configuration

### Environment Variables

**Required for full functionality:**
\`\`\`bash

# OpenAI Integration

OPENAI_API_KEY=your_openai_api_key

# Email Configuration

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_FROM="Scaler Career Team <career@scaler.com>"
\`\`\`

**Development mode:**

- Works without API keys using intelligent fallbacks
- Uses Ethereal Email for testing email delivery

## 📊 Lead Scoring Algorithm

\`\`\`javascript
function calculateLeadScore(data) {
let score = 0;

// Experience Level (30 points)
if (data.experience === 'senior') score += 30;
else if (data.experience === 'mid') score += 20;
else score += 10;

// Timeline Urgency (25 points)
if (data.timeline === 'immediate') score += 25;
else if (data.timeline === '3months') score += 20;
else score += 10;

// Interest Alignment (20 points)
const highValueInterests = ['ai-ml', 'data-science'];
score += Math.min(data.interests.filter(i =>
highValueInterests.includes(i)).length \* 10, 20);

return Math.min(score, 100);
}
\`\`\`

## 🎨 Key Components

### 1. Career Assessment

- 6 strategic questions for qualification
- Progressive profiling approach
- Real-time validation and progress tracking

### 2. AI-Powered Report

- Dynamic career recommendations
- Personalized salary insights
- Custom learning paths
- Intelligent content generation

### 3. Smart Booking System

- Expert matching based on interests
- Priority slots for high-score leads
- Professional email confirmations

## 📧 Email Templates

### Confirmation Email Features

- **Professional Design**: Mobile-responsive HTML
- **Rich Content**: Consultation details, expert info, preparation tips
- **Dynamic Personalization**: Content adapts to lead score
- **Call-to-Action**: Calendar integration and preparation links

### Email Types

1. **Booking Confirmation**: Immediate after booking
2. **Reminder Email**: 24 hours before consultation
3. **Follow-up Email**: Post-consultation feedback request

## 🚀 Deployment

### ⚠️ Important: GitHub Pages Limitation

**GitHub Pages only supports static files** and cannot run Next.js API routes or server-side code. Your application requires API endpoints for:

- AI-powered career recommendations
- Personalized insights generation
- Learning path generation
- Email confirmation system

**Solution**: Deploy to a full-stack platform like Vercel, Netlify, or Railway.

### Vercel (Recommended - Free & Easy)

1. **Install Vercel CLI**:

   ```bash
   npm install -g vercel
   ```

2. **Deploy to Vercel**:

   ```bash
   # Login to Vercel
   vercel login

   # Deploy to production
   vercel --prod
   ```

3. **Environment Setup in Vercel Dashboard**:

   - Go to your project dashboard on [vercel.com](https://vercel.com)
   - Navigate to Settings → Environment Variables
   - Add the following variables:
     ```bash
     OPENAI_API_KEY=your_openai_api_key
     EMAIL_HOST=smtp.gmail.com
     EMAIL_PORT=587
     EMAIL_USER=your_email@gmail.com
     EMAIL_PASS=your_app_password
     EMAIL_FROM="Scaler Career Team <career@scaler.com>"
     ```

4. **Automatic Deployments**:
   - Connect your GitHub repository to Vercel
   - Every push to main branch will trigger automatic deployment

### Alternative Platforms

#### Netlify

```bash
# Build the project
npm run build

# Deploy to Netlify (requires Netlify CLI)
netlify deploy --prod
```

#### Railway

```bash
# Install Railway CLI
npm install -g @railway/cli

# Deploy to Railway
railway login
railway init
railway up
```

### GitHub Pages (Static Only)

If you must use GitHub Pages, you'll need to:

1. Remove all API routes
2. Use static data instead of dynamic AI content
3. Use client-side email services like EmailJS
4. Modify the app to be purely client-side

**Not recommended** as you'll lose the AI-powered features.

## 📈 Analytics & Tracking

### Conversion Funnel Metrics

- Landing → Assessment: Target 25%
- Assessment → Report: Target 80%
- Report → Booking: Target 15%
- Email Open Rate: Target 60%
- Booking Show-up: Target 70%

### Lead Quality Indicators

- Average lead score: Target 65+
- High-intent leads (80+): Target 30%
- Expert matching accuracy: Target 90%

## 🔮 Roadmap

### Phase 1: Enhanced AI (Weeks 1-2)

- [ ] Advanced ML models for better recommendations
- [ ] Voice-based assessment option
- [ ] Multi-language support
- [ ] A/B testing framework

### Phase 2: Scale & Optimize (Weeks 3-4)

- [ ] CRM integration (Salesforce/HubSpot)
- [ ] Advanced analytics dashboard
- [ ] WhatsApp automation
- [ ] Mobile app development

### Phase 3: Enterprise Features (Months 2-3)

- [ ] White-label solution
- [ ] API for third-party integrations
- [ ] Advanced reporting and insights
- [ ] Enterprise security features

## 🧪 Testing

### Manual Testing Scenarios

**High-Intent Lead:**

- Experience: Senior
- Timeline: Immediate
- Interests: AI/ML, Data Science
- Expected: Score 85+, priority booking

**Medium-Intent Lead:**

- Experience: Mid-level
- Timeline: 3 months
- Interests: Web Development
- Expected: Score 60-70, standard flow

### Email Testing

\`\`\`bash

# Test email delivery (development)

npm run test:email
\`\`\`

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

MIT License - see LICENSE file for details

## 🆘 Support

For questions or issues:

- Create GitHub issue
- Email: robinsingh248142@gmail.com
- Deployed Link: https://scaler-ai-funnel.vercel.app/
- Documentation: [Notion Documentation](https://husky-ceiling-603.notion.site/Scaler-AI-Lead-Conversion-Funnel-Complete-Documentation-24a34f63707880bfa351fa52ded8f8ae)

---

**Built with ❤️ for Scaler AI APM Internship Assignment**

_Transforming blog readers into paying customers through AI-powered personalization and intelligent automation._
