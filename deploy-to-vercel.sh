#!/bin/bash

# Make script exit on first error
set -e

echo "=== MedSpa Harmony Vercel Deployment Script ==="
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "Vercel CLI not found. Installing..."
    npm install -g vercel
else
    echo "Vercel CLI is already installed."
fi

echo ""
echo "=== Building the project ==="
npm run build

echo ""
echo "=== Deploying to Vercel ==="
echo "You will be prompted to log in to Vercel if not already logged in."
echo "Follow the instructions in the terminal to complete the login process."
echo ""

# Deploy to Vercel
vercel deploy --prod

echo ""
echo "=== Deployment Complete ==="
echo "Your MedSpa Harmony application has been deployed to Vercel!"
echo "Check the URL above to access your live site."
