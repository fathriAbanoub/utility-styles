#!/bin/bash

# Simple build script for bob-styles
echo "🎨 Building Bob Styles v1.1.0.."

# Create dist directory if it doesn't exist
mkdir -p dist/js

# Copy JavaScript file
echo "📄 Copying JavaScript files..."
cp src/js/font-detection.js dist/js/

# Try to compile SCSS if Sass is available
if command -v sass &> /dev/null; then
    echo "🔨 Compiling SCSS..."
    sass src/index.scss dist/index.css --style compressed
    echo "✅ Build completed successfully!"
    echo "📁 Output files:"
    echo "   - dist/index.css"
    echo "   - dist/js/font-detection.js"
else
    echo "⚠️  Sass not found. Please install Sass to compile SCSS:"
    echo "   npm install -g sass"
    echo "   or"
    echo "   npm install"
    echo "   npm run build"
    echo ""
    echo "📄 JavaScript files copied successfully:"
    echo "   - dist/js/font-detection.js"
fi

echo ""
echo "🚀 Your Bob Styles package is ready!"