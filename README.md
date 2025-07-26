Next.js frontend for URL shortening service with Clerk authentication.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables in `.env.local`:
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_API_URL=https://your-api-gateway-url.com
DOMAIN_NAME=your-domain.com
```

3. Run development server:
```bash
npm run dev
```

4. Deploy to Vercel:
```bash
npm run build
vercel --prod
```

## Features

- User authentication via Clerk
- URL shortening with custom short codes
- View all user's shortened URLs
- Delete URL mappings
- Copy short URLs to clipboard
- Responsive design with Tailwind CSS

## Configuration

### Clerk Setup
1. Create account at clerk.com
2. Create new application
3. Copy API keys to environment variables
4. Configure sign-in methods as needed

### Vercel Deployment
1. Connect GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on git push

---

# .env.local.example for Frontend
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
CLERK_SECRET_KEY=sk_test_your_secret_here
NEXT_PUBLIC_API_URL=https://your-api-gateway-url.execute-api.us-east-1.amazonaws.com/dev
DOMAIN_NAME=your-domain.com