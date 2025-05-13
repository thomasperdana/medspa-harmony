# MedSpa Harmony

A modern Next.js application for a MedSpa business, featuring AI-powered service recommendations, appointment booking, and more.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
# Google AI API Key for Genkit
GOOGLE_AI_API_KEY=your_google_ai_api_key

# Firebase Configuration (if needed)
# FIREBASE_API_KEY=your_firebase_api_key
# FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
# FIREBASE_PROJECT_ID=your_firebase_project_id
# FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
# FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
# FIREBASE_APP_ID=your_firebase_app_id
```

## Deployment to Vercel

### Option 1: Using the Deployment Script

1. Make sure you have the Vercel CLI installed:
   ```bash
   npm install -g vercel
   ```

2. Run the deployment script:
   ```bash
   ./deploy-to-vercel.sh
   ```

3. Follow the prompts to log in to Vercel and complete the deployment.

### Option 2: Manual Deployment

1. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Log in to Vercel:
   ```bash
   vercel login
   ```

3. Deploy the application:
   ```bash
   vercel --prod
   ```

### Option 3: Deploy via Vercel Dashboard

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket).
2. Go to [Vercel Dashboard](https://vercel.com/dashboard).
3. Click "New Project" and import your repository.
4. Configure the project settings and add environment variables.
5. Click "Deploy" to deploy your application.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Documentation](https://vercel.com/docs)
