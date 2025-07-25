# URL Shortener Frontend (Next.js)

A modern, responsive web application for URL shortening built with Next.js, Tailwind CSS, and Clerk authentication. This is the frontend interface that connects to the AWS Lambda backend API.

## 🎨 Features

- ✅ **User Authentication**: Secure login/signup via Clerk.com
- ✅ **URL Shortening**: Intuitive interface for creating short URLs
- ✅ **URL Management**: View, copy, and delete your shortened URLs
- ✅ **Responsive Design**: Works seamlessly on desktop and mobile
- ✅ **Copy to Clipboard**: One-click copying of shortened URLs
- ✅ **Real-time Updates**: Dynamic UI updates without page refresh
- ✅ **Modern UI**: Clean design with Tailwind CSS

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Authentication**: Clerk.com
- **Deployment**: Vercel
- **Language**: JavaScript/React

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- Clerk.com account with application configured
- Backend API deployed and accessible

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd url-shortener-frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**

Create `.env.local` file:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_key_here
CLERK_SECRET_KEY=sk_test_your_clerk_secret_here
NEXT_PUBLIC_API_URL=https://your-lambda-api-url.execute-api.us-east-1.amazonaws.com/dev
DOMAIN_NAME=your-domain.com
```

4. **Run development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📱 User Interface

### Landing Page (Signed Out)
- Welcome message and sign-in prompt
- Clean, professional design
- Clerk authentication modal

### Dashboard (Signed In)
- **URL Shortening Form**: Paste long URLs and generate short versions
- **URL List**: View all your created short URLs with metadata
- **Management Actions**: Copy short URLs or delete unwanted ones
- **User Profile**: Access account settings via Clerk UserButton

## 🏗️ Project Structure

```
src/
├── app/
│   ├── layout.js          # Root layout with Clerk provider
│   ├── page.js            # Main dashboard component
│   └── globals.css        # Global styles and Tailwind imports
├── middleware.js          # Clerk authentication middleware
├── components/            # Reusable components (if needed)
└── lib/                   # Utility functions
```

### Key Components

**`app/layout.js`**
- Wraps app with ClerkProvider
- Sets up global styles and metadata

**`app/page.js`**
- Main application logic
- Handles URL shortening, listing, and deletion
- Manages authentication state

**`middleware.js`**
- Protects routes with Clerk authentication
- Handles public/private route logic

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk publishable key | Yes |
| `CLERK_SECRET_KEY` | Clerk secret key | Yes |
| `NEXT_PUBLIC_API_URL` | Backend API base URL | Yes |
| `DOMAIN_NAME` | Domain for display purposes | No |

### Clerk Setup

1. **Create Clerk Application**
   - Visit [clerk.com](https://clerk.com)
   - Create new application
   - Configure sign-in methods (email, Google, etc.)

2. **Get API Keys**
   - Copy publishable key and secret key
   - Add to `.env.local` file

3. **Configure Authentication**
   - Set up allowed domains
   - Configure redirect URLs
   - Customize sign-in/sign-up flows

## 🎨 Styling

The application uses Tailwind CSS for styling with a modern, clean design:

- **Color Scheme**: Blue primary, gray neutrals
- **Typography**: System font stack for optimal performance
- **Layout**: Responsive grid and flexbox layouts
- **Components**: Custom styled form elements and buttons

### Custom Styles

The `globals.css` file imports Tailwind base styles:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Connect Repository**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

2. **Configure Environment Variables**
   - Add all environment variables in Vercel dashboard
   - Ensure API URL points to production backend

3. **Custom Domain** (Optional)
   - Add custom domain in Vercel settings
   - Update DNS records as instructed

### Alternative Deployment Options

**Netlify**
```bash
npm run build
# Upload dist folder to Netlify
```

**Docker**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Development Workflow

1. **Start dev server**: `npm run dev`
2. **Make changes**: Edit files in `src/`
3. **Test locally**: Verify functionality works
4. **Deploy**: Push to main branch for auto-deployment

### API Integration

The frontend communicates with the backend via these endpoints:

```javascript
// Shorten URL
POST /shorten
{
  "originalUrl": "https://example.com",
  "userId": "clerk_user_id"
}

// Get user URLs
GET /urls/{userId}

// Delete URL
DELETE /urls/{userId}/{shortCode}
```

## 🔒 Security

### Authentication Flow
1. User signs in via Clerk
2. Clerk provides user ID and session
3. Frontend includes user ID in API requests
4. Backend validates and isolates user data

### Security Features
- **Protected Routes**: Middleware enforces authentication
- **User Isolation**: Each user only sees their own URLs
- **HTTPS**: Enforced in production
- **Input Validation**: URLs validated before submission

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: 1024px+

Key responsive features:
- Collapsible navigation
- Stacked layout on mobile
- Touch-friendly buttons
- Readable typography at all sizes

## 🐛 Troubleshooting

### Common Issues

**Authentication Errors**
```bash
# Check Clerk configuration
# Verify API keys in .env.local
# Ensure Clerk app settings match domain
```

**API Connection Issues**
```bash
# Verify NEXT_PUBLIC_API_URL is correct
# Check browser network tab for failed requests
# Ensure backend is deployed and accessible
```

**Build Errors**
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

**Environment Variable Issues**
- Ensure all `NEXT_PUBLIC_*` variables are available client-side
- Restart dev server after changing `.env.local`
- Check Vercel dashboard for production environment variables

## 📊 Performance

### Optimization Features
- **Next.js App Router**: Improved performance and SEO
- **Client-side Routing**: Fast page transitions
- **Optimistic Updates**: Immediate UI feedback
- **Code Splitting**: Automatic bundle optimization

### Performance Metrics
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3.5s

## 🧪 Testing

### Manual Testing Checklist
- [ ] User can sign up/sign in
- [ ] URL shortening works correctly
- [ ] Short URLs are copyable
- [ ] URL list displays correctly
- [ ] URL deletion works
- [ ] Responsive design functions
- [ ] Error handling works

### Future Testing Implementation
```bash
# Unit tests with Jest
npm install --save-dev jest @testing-library/react

# E2E tests with Playwright  
npm install --save-dev @playwright/test
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code Style
- Use ESLint configuration provided
- Follow React/Next.js best practices
- Maintain consistent naming conventions
- Add comments for complex logic

## 🔗 Related Repositories

- **Backend**: [url-shortener-lambda](../url-shortener-lambda) - AWS Lambda API
- **Documentation**: See deployment guide for full setup instructions
