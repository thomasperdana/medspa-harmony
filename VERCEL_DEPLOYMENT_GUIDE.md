# Vercel Deployment Guide for MedSpa Harmony

This guide provides detailed instructions for deploying the MedSpa Harmony application to Vercel.

## Prerequisites

- A Vercel account (sign up at [vercel.com](https://vercel.com))
- Node.js installed on your local machine
- Git installed on your local machine (optional, but recommended)

## Option 1: Deploy Using the Deployment Script

The easiest way to deploy is using the provided deployment script:

1. Make sure you have the Vercel CLI installed:
   ```bash
   npm install -g vercel
   ```

2. Run the deployment script:
   ```bash
   ./deploy-to-vercel.sh
   ```

3. Follow the prompts to log in to Vercel and complete the deployment.

## Option 2: Manual Deployment via CLI

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

4. Follow the interactive prompts to configure your project.

## Option 3: Deploy via Vercel Dashboard

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket).

2. Go to [Vercel Dashboard](https://vercel.com/dashboard).

3. Click "New Project" and import your repository.

4. Configure the project settings:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: next build
   - Output Directory: .next

5. Add Environment Variables:
   - GOOGLE_AI_API_KEY: Your Google AI API key for Genkit
   - Any Firebase configuration variables if needed

6. Click "Deploy" to deploy your application.

## Environment Variables

Make sure to set up the following environment variables in your Vercel project:

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

## Post-Deployment

After deployment:

1. Verify that your application is working correctly by visiting the deployed URL.

2. Set up a custom domain if desired through the Vercel dashboard.

3. Configure any additional settings like analytics, performance monitoring, etc.

## Troubleshooting

If you encounter issues during deployment:

1. Check the build logs in the Vercel dashboard for errors.

2. Ensure all required environment variables are set correctly.

3. Verify that your project builds successfully locally with `npm run build`.

4. If using Firebase, make sure your Firebase project is properly configured and the API keys are correct.

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [Firebase Hosting with Vercel](https://firebase.google.com/docs/hosting/frameworks/nextjs)
