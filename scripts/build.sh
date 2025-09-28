#!/bin/bash

# Production build script

echo "🏗️  Building for production..."

# Build server
echo "📦 Building server..."
cd server && npm run build && cd ..

# Build client
echo "📦 Building client..."
cd client && npm run build && cd ..

echo "✅ Build complete!"
echo "📁 Server build: server/dist"
echo "📁 Client build: client/dist"