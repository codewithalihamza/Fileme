# Fileme - Professional Tax Return Filing & Audit Services

A modern, responsive website for Fileme, offering professional tax return filing and audit services. Built with Next.js 15, TypeScript, Tailwind CSS, and Shadcn UI.

## Features

- 🎨 Modern, responsive design
- 📱 Mobile-first approach
- 📧 Contact form with email functionality
- ⚡ Fast performance with Next.js 15
- 🔒 Secure form handling
- 🎯 SEO optimized
- 🚀 Production ready

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI + Radix UI
- **Icons**: Lucide React
- **Email Service**: Resend
- **Notifications**: React Hot Toast
- **Fonts**: Geist (Local)

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
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts          # Contact form API endpoint
│   ├── contact/
│   │   └── page.tsx              # Contact page
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── components/
│   ├── ui/                       # Shadcn UI components
│   ├── footer.tsx                # Footer component
│   └── navigation.tsx            # Navigation component
├── lib/
│   └── utils.ts                  # Utility functions
└── public/                       # Static assets
```

## Pages

### Home Page (`/`)

- Hero section with deadline highlight
- Services overview (Tax Return Filing & Audit Services)
- Call-to-action sections
- Professional design with trust indicators

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
- **Typography**: Geist font family
- **Components**: Shadcn UI components with custom styling
- **Responsive**: Mobile-first approach with breakpoints

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

## Support

For support, email info@fileme.com or create an issue in the repository.

---

**Fileme** - Professional tax return filing and audit services. Secure, fast, and hassle-free.
