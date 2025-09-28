#!/bin/bash

# Development setup script

echo "🚀 Setting up development environment..."

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install server dependencies
echo "📦 Installing server dependencies..."
cd server && npm install && cd ..

# Install client dependencies  
echo "📦 Installing client dependencies..."
cd client && npm install && cd ..

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "✅ Created .env file. Please update it with your configuration."
fi

echo "✅ Development environment setup complete!"
echo "🎯 Run 'npm run dev' to start both server and client"