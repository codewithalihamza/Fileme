# Fileme - Professional Financial Services & Advisory

A modern, responsive website for Fileme, offering comprehensive professional services including tax services, accounting & financial reporting, business valuation, financial analysis, internal controls, and risk advisory. Built with Next.js 15, TypeScript, Tailwind CSS, and Shadcn UI.

## Features

- 🎨 Modern, responsive design
- 📱 Mobile-first approach
- 📧 Contact form with email functionality
- ⚡ Fast performance with Next.js 15
- 🔒 Secure form handling
- 🎯 SEO optimized
- 🚀 Production ready
- 🎭 Smooth animations and interactions
- 📋 Professional services overview

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI + Radix UI
- **Icons**: Lucide React
- **Email Service**: Resend
- **Notifications**: React Hot Toast
- **Fonts**: Geist (Local)
- **Carousel**: Embla Carousel

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Resend account for email functionality

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd fileme
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp env.example .env.local
```

4. Configure your environment variables in `.env.local`:

```env
# Email Configuration (Resend)
RESEND_API_KEY=your_resend_api_key_here
CONTACT_EMAIL=your@email.com
```

### Email Setup

1. Sign up for a [Resend account](https://resend.com)
2. Get your API key from the dashboard
3. Add your API key to `.env.local`
4. Update the `CONTACT_EMAIL` with your actual email address

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
fileme/
├── app/                          # Next.js App Router
│   ├── api/
│   │   └── contact/
│   │       └── route.ts          # Contact form API endpoint
│   ├── contact/
│   │   └── page.tsx              # Contact page
│   ├── demo/                     # Demo pages
│   ├── fonts/                    # Local font files
│   ├── favicon.ico               # Site favicon
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── components/
│   ├── ui/                       # Shadcn UI components
│   │   ├── animated-card.tsx     # Animated card component
│   │   ├── button.tsx            # Button component
│   │   ├── carousel.tsx          # Carousel component
│   │   ├── footer.tsx            # Footer component
│   │   ├── input.tsx             # Input component
│   │   ├── loading-spinner.tsx   # Loading animations
│   │   ├── navigation.tsx        # Navigation component
│   │   ├── select.tsx            # Select component
│   │   ├── table.tsx             # Table component
│   │   └── typeface.tsx          # Typeface component
│   └── view/                     # Page-specific components
│       └── home/
│           ├── cta-section.tsx   # Call-to-action section
│           ├── experts.tsx       # Experts carousel section
│           ├── hero-section.tsx  # Hero section
│           └── services-section.tsx # Services overview
├── constants/
│   └── component-types.ts        # Component type definitions
├── hooks/                        # Custom React hooks
│   ├── custom-hook.ts            # Example custom hook
│   ├── use-local-storage.ts      # Local storage hook
│   └── use-scroll-animation.ts   # Scroll animation hook
├── lib/
│   └── utils.ts                  # Utility functions
├── public/                       # Static assets
├── store/                        # State management
│   └── example.ts                # Example store
├── types/                        # TypeScript type definitions
│   └── index.ts                  # Global types
├── .husky/                       # Git hooks
├── .next/                        # Next.js build output
├── node_modules/                 # Dependencies
├── .cursorrules                  # Cursor IDE rules
├── .eslintrc.json               # ESLint configuration
├── .gitignore                   # Git ignore rules
├── .prettierrc                  # Prettier configuration
├── bitbucket-pipelines.yml      # CI/CD pipeline
├── components.json              # Shadcn UI configuration
├── Dockerfile                   # Docker configuration
├── env.example                  # Environment variables example
├── next.config.mjs              # Next.js configuration
├── next-env.d.ts                # Next.js TypeScript definitions
├── package.json                 # Project dependencies
├── postcss.config.mjs           # PostCSS configuration
├── README.md                    # Project documentation
├── sonar-project.properties     # SonarQube configuration
├── tailwind.config.ts           # Tailwind CSS configuration
└── tsconfig.json                # TypeScript configuration
```

## Pages

### Home Page (`/`)

- **Hero Section**: Deadline-focused messaging with call-to-action
- **Services Section**: Comprehensive professional services overview including tax services, accounting & financial reporting, business valuation, financial analysis, internal controls, and risk advisory
- **Experts Section**: Team showcase with interactive carousel
- **CTA Section**: Final call-to-action for tax filing

### Contact Page (`/contact`)

- Contact form with validation
- Contact information
- Email integration with Resend
- Toast notifications for form feedback

## API Routes

### POST `/api/contact`

Handles contact form submissions and sends emails via Resend.

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "I need help with my tax return..."
}
```

**Response:**

```json
{
  "message": "Email sent successfully",
  "data": { ... }
}
```

## Styling

The project uses Tailwind CSS with a custom design system:

- **Primary Colors**: Blue (#3b82f6) and Indigo (#6366f1)
- **Secondary Colors**: Green (#10b981) for success states
- **Typography**: Geist font family
- **Components**: Shadcn UI components with custom styling
- **Responsive**: Mobile-first approach with breakpoints
- **Gradients**: Subtle gradients for visual appeal

## Key Features

### Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Flexible grid layouts
- Touch-friendly interactions

### Performance

- Next.js 15 with App Router
- Server-side rendering
- Optimized images and assets
- Fast loading times

### Accessibility

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader friendly

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

The project is compatible with any platform that supports Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Environment Variables

| Variable         | Description                                       | Required |
| ---------------- | ------------------------------------------------- | -------- |
| `RESEND_API_KEY` | Resend API key for email functionality            | Yes      |
| `CONTACT_EMAIL`  | Email address to receive contact form submissions | Yes      |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

**Fileme** - Professional financial services and advisory. Comprehensive solutions for your business needs.
