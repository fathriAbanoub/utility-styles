#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

class WikiUpdateAgent {
  constructor() {
    this.projectRoot = '/home/bobaayad/bob-styles';
    this.wikiPath = path.join(this.projectRoot, 'utility-styles.wiki');
    this.srcPath = path.join(this.projectRoot, 'src');
    this.packageJson = require(path.join(this.projectRoot, 'package.json'));
  }

  async updateAllWikiFiles() {
    console.log('🤖 Starting Wiki Update Agent...');
    
    // Update existing files
    await this.updateHome();
    await this.updateInstallation();
    await this.updateUtilityClasses();
    await this.updateComponents();
    await this.updateFontSystem();
    await this.updateAPIReference();
    await this.updateExamples();
    await this.updateAdvancedUsage();
    await this.updateTroubleshooting();
    
    // Create new files for new features
    await this.createFluidTypography();
    await this.createPerformanceOptimization();
    await this.createBuildSystem();
    
    console.log('✅ Wiki update complete!');
  }

  writeFile(filename, content) {
    const filePath = path.join(this.wikiPath, filename);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`📝 Updated: ${filename}`);
  }

  async updateHome() {
    const content = `# Welcome to Bob Styles Documentation

Bob Styles is a revolutionary CSS framework with AI-powered typography, component-first architecture, and performance optimization for modern web development.

## 🎯 What is Bob Styles?

Bob Styles provides:

- **AI-Powered Typography**: Fluid typography system with intelligent scaling
- **Component System**: Advanced component architecture with CSS custom properties
- **Performance Optimization**: Built-in optimization tools and analysis
- **Smart Font System**: 4 curated font categories with automatic Google Fonts integration
- **Utility Classes**: Comprehensive utility system for rapid development
- **Build Optimization**: Automated CSS optimization and analysis tools

## 🚀 Quick Start

\`\`\`bash
npm install bob-styles
\`\`\`

\`\`\`scss
@import "bob-styles/src/index.scss";
\`\`\`

\`\`\`html
<body class="ui-font">
  <h1 class="font-heading">Welcome to Bob Styles</h1>
  <p class="font-body">Modern CSS framework for the future</p>
</body>
\`\`\`

## 📚 Documentation Structure

- **[Installation](Installation)** - Setup and configuration
- **[Utility Classes](Utility-Classes)** - Complete utility reference
- **[Components](Components)** - Pre-built component library
- **[Font System](Font-System)** - Typography and font management
- **[Fluid Typography](Fluid-Typography)** - Advanced typography system
- **[Performance Optimization](Performance-Optimization)** - Build optimization tools
- **[API Reference](API-Reference)** - Complete API documentation
- **[Examples](Examples)** - Real-world usage examples
- **[Advanced Usage](Advanced-Usage)** - Advanced techniques and customization
- **[Build System](Build-System)** - Build tools and workflow
- **[Troubleshooting](Troubleshooting)** - Common issues and solutions

## 🔥 Key Features

### Revolutionary Typography
- Fluid typography with clamp() functions
- Automatic font loading and fallback detection
- 4 specialized font categories (UI, E-commerce, Blog, Code)

### Component Architecture
- CSS custom properties automation
- Modular component system
- Theme-aware components

### Performance First
- Automated CSS optimization
- Build analysis tools
- Performance monitoring

### Developer Experience
- Zero configuration setup
- Comprehensive utility classes
- SCSS-based architecture

## 🎨 Version 2.0 Highlights

- **Fluid Typography System**: Responsive typography that scales perfectly
- **Component System**: Advanced component architecture
- **Performance Tools**: Built-in optimization and analysis
- **Enhanced Build Process**: Automated optimization pipeline
- **CSS Custom Properties**: Automated variable generation

## 🛠️ Build Commands

\`\`\`bash
npm run build        # Full build with optimization
npm run dev          # Development build with watch
npm run optimize     # Run optimization analysis
npm run demo         # Start demo server
\`\`\`

## 📦 What's Included

- **Core Utilities**: Layout, spacing, typography, colors
- **Component Library**: Headers, navigation, forms, buttons
- **Font Management**: Automatic Google Fonts integration
- **Build Tools**: Optimization and analysis scripts
- **Demo Files**: Complete examples and showcases

---

**Version**: ${this.packageJson.version}  
**License**: ${this.packageJson.license}  
**Author**: ${this.packageJson.author}
`;

    this.writeFile('Home.md', content);
  }

  async updateInstallation() {
    const content = `# Installation Guide

## Package Installation

### NPM Installation
\`\`\`bash
npm install bob-styles
\`\`\`

### Yarn Installation
\`\`\`bash
yarn add bob-styles
\`\`\`

## Usage Methods

### 1. SCSS Import (Recommended)
\`\`\`scss
@import "bob-styles/src/index.scss";
\`\`\`

### 2. CSS Import
\`\`\`css
@import "bob-styles/dist/index.css";
\`\`\`

### 3. HTML Link
\`\`\`html
<link rel="stylesheet" href="node_modules/bob-styles/dist/index.css">
<script src="node_modules/bob-styles/dist/js/font-detection.js"></script>
\`\`\`

### 4. CDN (Coming Soon)
\`\`\`html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bob-styles@2.0.0/dist/index.css">
\`\`\`

## Build Setup

### Development Build
\`\`\`bash
npm run dev
\`\`\`

### Production Build
\`\`\`bash
npm run build
\`\`\`

### With Optimization
\`\`\`bash
npm run build && npm run optimize
\`\`\`

## Configuration

### Basic HTML Setup
\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bob Styles App</title>
  <link rel="stylesheet" href="path/to/bob-styles/dist/index.css">
</head>
<body class="ui-font">
  <!-- Your content here -->
  <script src="path/to/bob-styles/dist/js/font-detection.js"></script>
</body>
</html>
\`\`\`

### SCSS Configuration
\`\`\`scss
// Custom variables (optional)
:root {
  --primary-color: #3b82f6;
  --secondary-color: #64748b;
}

// Import Bob Styles
@import "bob-styles/src/index.scss";

// Your custom styles
.custom-component {
  @extend .flex;
  @extend .items-center;
}
\`\`\`

## Verification

Test your installation:

\`\`\`html
<div class="flex items-center justify-center p-4">
  <h1 class="font-heading text-2xl">Bob Styles is working!</h1>
</div>
\`\`\`

## Next Steps

- Check out [Utility Classes](Utility-Classes) for available utilities
- Explore [Components](Components) for pre-built components
- Learn about [Font System](Font-System) for typography options
`;

    this.writeFile('Installation.md', content);
  }

  async updateUtilityClasses() {
    const content = `# Utility Classes Reference

Complete reference for all utility classes available in Bob Styles.

## Layout & Flexbox

### Display
\`\`\`css
.flex              /* display: flex */
.flex-col          /* flex-direction: column */
.flex-center       /* display: flex + center alignment */
.block             /* display: block */
.inline-block      /* display: inline-block */
.hidden            /* display: none */
\`\`\`

### Alignment
\`\`\`css
.items-center      /* align-items: center */
.justify-center    /* justify-content: center */
.justify-between   /* justify-content: space-between */
.text-center       /* text-align: center */
.text-left         /* text-align: left */
.text-right        /* text-align: right */
\`\`\`

## Spacing

### Padding
\`\`\`css
.p-1               /* padding: var(--space-1) */
.p-2               /* padding: var(--space-2) */
.p-3               /* padding: var(--space-3) */
.p-4               /* padding: var(--space-4) */
.p-6               /* padding: var(--space-6) */
\`\`\`

### Margin
\`\`\`css
.m-1               /* margin: var(--space-1) */
.m-2               /* margin: var(--space-2) */
.m-3               /* margin: var(--space-3) */
.m-4               /* margin: var(--space-4) */
.m-6               /* margin: var(--space-6) */
\`\`\`

### Gap
\`\`\`css
.gap-1             /* gap: var(--space-1) */
.gap-2             /* gap: var(--space-2) */
.gap-3             /* gap: var(--space-3) */
.gap-4             /* gap: var(--space-4) */
.gap-6             /* gap: var(--space-6) */
\`\`\`

## Typography

### Font Sizes
\`\`\`css
.text-sm           /* font-size: var(--font-size-sm) */
.text-base         /* font-size: var(--font-size-base) */
.text-lg           /* font-size: var(--font-size-lg) */
.text-xl           /* font-size: var(--font-size-xl) */
.text-2xl          /* font-size: var(--font-size-2xl) */
.text-3xl          /* font-size: var(--font-size-3xl) */
\`\`\`

### Font Weights
\`\`\`css
.font-light        /* font-weight: var(--font-weight-light) */
.font-normal       /* font-weight: var(--font-weight-normal) */
.font-medium       /* font-weight: var(--font-weight-medium) */
.font-semibold     /* font-weight: var(--font-weight-semibold) */
.font-bold         /* font-weight: var(--font-weight-bold) */
\`\`\`

### Font Families
\`\`\`css
.font-inter        /* font-family: "Inter", sans-serif */
.font-poppins      /* font-family: "Poppins", sans-serif */
.font-montserrat   /* font-family: "Montserrat", sans-serif */
.font-open-sans    /* font-family: "Open Sans", sans-serif */
\`\`\`

### E-commerce Typography
\`\`\`css
.font-heading      /* Inter 600, line-height: 1.2 */
.font-subheading   /* Inter 500, line-height: 1.3 */
.font-body         /* Inter 400, line-height: 1.5 */
.font-price        /* Inter 700, line-height: 1.2 */
.font-button       /* Inter 600, uppercase, letter-spacing */
\`\`\`

### Alternative Styles
\`\`\`css
.font-elegant      /* Montserrat family */
.font-friendly     /* Poppins family */
.font-readable     /* Open Sans family */
\`\`\`

## Borders & Radius

### Border Radius
\`\`\`css
.rounded           /* border-radius: var(--radius-base) */
.rounded-md        /* border-radius: var(--radius-md) */
.rounded-lg        /* border-radius: var(--radius-lg) */
.rounded-full      /* border-radius: var(--radius-full) */
\`\`\`

## Shadows
\`\`\`css
.shadow            /* box-shadow: var(--shadow-base) */
.shadow-md         /* box-shadow: var(--shadow-md) */
.shadow-lg         /* box-shadow: var(--shadow-lg) */
\`\`\`

## Positioning

### Position
\`\`\`css
.relative          /* position: relative */
.absolute          /* position: absolute */
.sticky            /* position: sticky */
\`\`\`

### Positioning Values
\`\`\`css
.top-0             /* top: 0 */
.bottom-0          /* bottom: 0 */
.left-0            /* left: 0 */
.right-0           /* right: 0 */
\`\`\`

### Z-Index
\`\`\`css
.z-10              /* z-index: 10 */
.z-20              /* z-index: 20 */
.z-30              /* z-index: 30 */
.z-40              /* z-index: 40 */
.z-50              /* z-index: 50 */
\`\`\`

## Sizing

### Width & Height
\`\`\`css
.w-full            /* width: 100% */
.h-full            /* height: 100% */
.w-auto            /* width: auto */
.h-auto            /* height: auto */
\`\`\`

## Overflow & Interaction

### Overflow
\`\`\`css
.overflow-hidden   /* overflow: hidden */
.overflow-auto     /* overflow: auto */
.overflow-scroll   /* overflow: scroll */
\`\`\`

### Cursor & Selection
\`\`\`css
.cursor-pointer    /* cursor: pointer */
.cursor-default    /* cursor: default */
.select-none       /* user-select: none */
.pointer-events-none /* pointer-events: none */
\`\`\`

## Opacity
\`\`\`css
.opacity-0         /* opacity: 0 */
.opacity-50        /* opacity: 0.5 */
.opacity-75        /* opacity: 0.75 */
.opacity-100       /* opacity: 1 */
\`\`\`

## Transitions
\`\`\`css
.transition        /* Smooth transitions for common properties */
\`\`\`

## Responsive Utilities

### Small Screens (max-width: 640px)
\`\`\`css
.sm\\:hidden        /* display: none on small screens */
.sm\\:block         /* display: block on small screens */
.sm\\:flex          /* display: flex on small screens */
\`\`\`

### Medium Screens (641px - 768px)
\`\`\`css
.md\\:hidden        /* display: none on medium screens */
.md\\:block         /* display: block on medium screens */
.md\\:flex          /* display: flex on medium screens */
\`\`\`

### Large Screens (min-width: 769px)
\`\`\`css
.lg\\:hidden        /* display: none on large screens */
.lg\\:block         /* display: block on large screens */
.lg\\:flex          /* display: flex on large screens */
\`\`\`

### Extra Large Screens (min-width: 1024px)
\`\`\`css
.xl\\:hidden        /* display: none on xl screens */
.xl\\:block         /* display: block on xl screens */
.xl\\:flex          /* display: flex on xl screens */
\`\`\`

## Usage Examples

### Card Component
\`\`\`html
<div class="rounded-lg shadow-md p-4 transition">
  <h3 class="font-heading text-xl">Card Title</h3>
  <p class="font-body text-base opacity-75">Card description</p>
</div>
\`\`\`

### Responsive Layout
\`\`\`html
<div class="flex flex-col md:flex lg:flex gap-4 p-4">
  <div class="w-full lg:w-auto">Content</div>
</div>
\`\`\`

### Button Styles
\`\`\`html
<button class="font-button rounded shadow transition cursor-pointer p-3">
  Click Me
</button>
\`\`\`
`;

    this.writeFile('Utility-Classes.md', content);
  }

  async updateComponents() {
    const content = `# Components Reference

Bob Styles includes a comprehensive component system with pre-built UI elements and advanced component architecture.

## Header Components

### Basic Header
\`\`\`html
<header class="head">
  <div class="headerleft">
    <h1 class="font-heading">Site Title</h1>
    <p class="font-body">Tagline</p>
  </div>
  <ul class="headerright">
    <li><span>Login</span></li>
    <li><span>Cart</span></li>
  </ul>
</header>
\`\`\`

### Navigation Header
\`\`\`html
<nav class="flex items-center justify-between p-4">
  <div class="font-heading text-xl">Brand</div>
  <ul class="flex gap-4">
    <li><a href="#" class="font-body">Home</a></li>
    <li><a href="#" class="font-body">About</a></li>
    <li><a href="#" class="font-body">Contact</a></li>
  </ul>
</nav>
\`\`\`

## Component System Architecture

### CSS Custom Properties Integration
Bob Styles automatically generates CSS custom properties for consistent theming:

\`\`\`css
:root {
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 1.875rem;
  
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
}
\`\`\`

## Button Components

### Primary Button
\`\`\`html
<button class="font-button rounded shadow transition p-3 cursor-pointer">
  Primary Action
</button>
\`\`\`

### Secondary Button
\`\`\`html
<button class="font-body rounded transition p-3 cursor-pointer opacity-75">
  Secondary Action
</button>
\`\`\`

## Card Components

### Basic Card
\`\`\`html
<div class="rounded-lg shadow-md p-4 transition">
  <h3 class="font-heading text-xl">Card Title</h3>
  <p class="font-body text-base opacity-75">Card description text</p>
  <button class="font-button rounded shadow transition p-2">Action</button>
</div>
\`\`\`

### Product Card
\`\`\`html
<div class="rounded-lg shadow-md overflow-hidden transition">
  <img src="product.jpg" alt="Product" class="w-full h-auto">
  <div class="p-4">
    <h3 class="font-heading text-lg">Product Name</h3>
    <p class="font-price text-xl">$99.99</p>
    <button class="font-button rounded shadow transition p-3 w-full">
      Add to Cart
    </button>
  </div>
</div>
\`\`\`

## Layout Components

### Container
\`\`\`html
<div class="w-full p-4">
  <div class="max-w-6xl mx-auto">
    <!-- Content -->
  </div>
</div>
\`\`\`

### Grid Layout
\`\`\`html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
  <div class="rounded shadow p-4">Item 1</div>
  <div class="rounded shadow p-4">Item 2</div>
  <div class="rounded shadow p-4">Item 3</div>
</div>
\`\`\`

### Flex Layout
\`\`\`html
<div class="flex flex-col md:flex gap-4 p-4">
  <div class="flex-1 rounded shadow p-4">Main Content</div>
  <div class="w-full md:w-64 rounded shadow p-4">Sidebar</div>
</div>
\`\`\`

## Form Components

### Input Field
\`\`\`html
<div class="flex flex-col gap-2">
  <label class="font-medium text-sm">Email</label>
  <input type="email" class="rounded p-3 border transition">
</div>
\`\`\`

### Form Group
\`\`\`html
<form class="flex flex-col gap-4 p-4">
  <div class="flex flex-col gap-2">
    <label class="font-medium">Name</label>
    <input type="text" class="rounded p-3 border">
  </div>
  <div class="flex flex-col gap-2">
    <label class="font-medium">Message</label>
    <textarea class="rounded p-3 border" rows="4"></textarea>
  </div>
  <button class="font-button rounded shadow transition p-3">Submit</button>
</form>
\`\`\`

## Advanced Components

### Modal
\`\`\`html
<div class="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
  <div class="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
  <div class="relative rounded-lg shadow-lg p-6 bg-white">
    <h2 class="font-heading text-xl">Modal Title</h2>
    <p class="font-body">Modal content</p>
    <button class="font-button rounded shadow transition p-2">Close</button>
  </div>
</div>
\`\`\`

### Dropdown
\`\`\`html
<div class="relative">
  <button class="font-button rounded shadow transition p-3">Menu</button>
  <div class="absolute top-full left-0 rounded shadow-lg bg-white hidden">
    <a href="#" class="block p-3 font-body">Option 1</a>
    <a href="#" class="block p-3 font-body">Option 2</a>
    <a href="#" class="block p-3 font-body">Option 3</a>
  </div>
</div>
\`\`\`

## Component Customization

### Using CSS Custom Properties
\`\`\`css
.custom-button {
  --button-bg: #3b82f6;
  --button-text: white;
  --button-radius: var(--radius-lg);
  
  background: var(--button-bg);
  color: var(--button-text);
  border-radius: var(--button-radius);
}
\`\`\`

### Extending Components
\`\`\`scss
.enhanced-card {
  @extend .rounded-lg;
  @extend .shadow-md;
  @extend .p-4;
  @extend .transition;
  
  border: 1px solid #e5e7eb;
  
  &:hover {
    @extend .shadow-lg;
  }
}
\`\`\`
`;

    this.writeFile('Components.md', content);
  }

  async updateFontSystem() {
    const content = `# Font System

Bob Styles provides an intelligent font management system with automatic Google Fonts integration and fallback detection.

## Font Categories

### UI Fonts
Optimized for user interfaces and web applications:
- **Primary**: Inter (clean, modern, highly legible)
- **Secondary**: Open Sans (friendly, approachable)

### E-commerce Fonts
Perfect for online stores and product catalogs:
- **Primary**: Inter (professional, trustworthy)
- **Secondary**: Poppins (friendly, approachable)

### Blog Fonts
Ideal for content-heavy sites and articles:
- **Primary**: Open Sans (highly readable)
- **Secondary**: Montserrat (elegant headers)

### Code Fonts
Monospace fonts for code and technical content:
- **Primary**: Fira Code (ligatures, programming-focused)
- **Secondary**: Source Code Pro (clean, readable)

## Font Classes

### Base Font Families
\`\`\`css
.font-inter        /* Inter font family */
.font-poppins      /* Poppins font family */
.font-montserrat   /* Montserrat font family */
.font-open-sans    /* Open Sans font family */
\`\`\`

### E-commerce Typography Classes
\`\`\`css
.font-heading      /* Inter 600, optimized for headings */
.font-subheading   /* Inter 500, for subheadings */
.font-body         /* Inter 400, for body text */
.font-price        /* Inter 700, for pricing */
.font-button       /* Inter 600, uppercase, letter-spaced */
\`\`\`

### Style Variants
\`\`\`css
.font-elegant      /* Montserrat-based elegant styling */
.font-friendly     /* Poppins-based friendly styling */
.font-readable     /* Open Sans-based readable styling */
\`\`\`

## Automatic Font Loading

Bob Styles automatically imports Google Fonts:

\`\`\`css
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&family=Montserrat:wght@300;400;500;600;700&family=Open+Sans:wght@300;400;500;600;700&display=swap");
\`\`\`

## Font Detection System

### JavaScript Font Detection
Bob Styles includes a font detection script that ensures fonts are loaded:

\`\`\`html
<script src="path/to/bob-styles/dist/js/font-detection.js"></script>
\`\`\`

### Fallback System
Automatic fallbacks ensure content remains readable:

\`\`\`css
.font-heading {
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}
\`\`\`

## Usage Examples

### Basic Typography
\`\`\`html
<h1 class="font-heading text-3xl">Main Heading</h1>
<h2 class="font-subheading text-2xl">Subheading</h2>
<p class="font-body text-base">Body text content</p>
<span class="font-price text-xl">$99.99</span>
<button class="font-button">Add to Cart</button>
\`\`\`

### E-commerce Product Page
\`\`\`html
<div class="product">
  <h1 class="font-heading text-3xl">Product Name</h1>
  <p class="font-body text-lg opacity-75">Product description</p>
  <div class="font-price text-2xl">$149.99</div>
  <button class="font-button rounded shadow p-4">Buy Now</button>
</div>
\`\`\`

### Blog Article
\`\`\`html
<article class="font-readable">
  <h1 class="font-elegant text-3xl font-bold">Article Title</h1>
  <p class="text-base leading-relaxed">Article content...</p>
</article>
\`\`\`

## Fluid Typography Integration

Bob Styles integrates with the fluid typography system:

\`\`\`css
.font-heading {
  font-size: clamp(1.5rem, 4vw, 3rem);
  line-height: 1.2;
}
\`\`\`

## Custom Font Integration

### Adding Custom Fonts
\`\`\`scss
@import url('https://fonts.googleapis.com/css2?family=YourFont:wght@400;600&display=swap');

.font-custom {
  font-family: 'YourFont', var(--font-fallback);
}
\`\`\`

### Font Loading Optimization
\`\`\`html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
\`\`\`

## Performance Considerations

### Font Display Strategy
\`\`\`css
@font-face {
  font-family: 'Inter';
  font-display: swap; /* Ensures text remains visible during font load */
}
\`\`\`

### Subset Loading
Bob Styles loads optimized font subsets for better performance:
- Latin characters only
- Essential weights (300, 400, 500, 600, 700)
- Display=swap for immediate text rendering

## Accessibility

### Font Size Guidelines
- Minimum 16px for body text
- Sufficient contrast ratios
- Scalable with user preferences

### Screen Reader Compatibility
All font classes maintain semantic meaning and don't interfere with assistive technologies.
`;

  async createFluidTypography() {
    const content = `# Fluid Typography System

Bob Styles 2.0 introduces an advanced fluid typography system that automatically scales text based on viewport size using CSS clamp() functions.

## Overview

Fluid typography creates responsive text that scales smoothly between minimum and maximum sizes, providing optimal readability across all devices.

## Core Concepts

### Clamp() Function
\`\`\`css
font-size: clamp(min-size, preferred-size, max-size);
\`\`\`

### Viewport Units
- **vw**: Viewport width percentage
- **vh**: Viewport height percentage
- **vmin**: Smaller of vw or vh
- **vmax**: Larger of vw or vh

## Fluid Typography Classes

### Headings
\`\`\`css
.fluid-h1 {
  font-size: clamp(2rem, 5vw, 4rem);
  line-height: 1.1;
}

.fluid-h2 {
  font-size: clamp(1.75rem, 4vw, 3rem);
  line-height: 1.2;
}

.fluid-h3 {
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  line-height: 1.3;
}
\`\`\`

### Body Text
\`\`\`css
.fluid-body {
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  line-height: 1.6;
}

.fluid-small {
  font-size: clamp(0.875rem, 2vw, 1rem);
  line-height: 1.5;
}
\`\`\`

## Implementation

### SCSS Mixins
\`\`\`scss
@mixin fluid-type($min-size, $max-size, $min-vw: 320px, $max-vw: 1200px) {
  font-size: clamp(
    #{$min-size},
    #{$min-size} + (#{strip-unit($max-size)} - #{strip-unit($min-size)}) * 
    ((100vw - #{$min-vw}) / (#{strip-unit($max-vw)} - #{strip-unit($min-vw)})),
    #{$max-size}
  );
}

// Usage
.custom-heading {
  @include fluid-type(1.5rem, 3rem);
}
\`\`\`

### CSS Custom Properties
\`\`\`css
:root {
  --fluid-h1: clamp(2rem, 5vw, 4rem);
  --fluid-h2: clamp(1.75rem, 4vw, 3rem);
  --fluid-body: clamp(1rem, 2.5vw, 1.25rem);
}

.heading {
  font-size: var(--fluid-h1);
}
\`\`\`

## Usage Examples

### Article Layout
\`\`\`html
<article>
  <h1 class="fluid-h1 font-heading">Article Title</h1>
  <h2 class="fluid-h2 font-subheading">Section Heading</h2>
  <p class="fluid-body font-body">Article content with fluid typography...</p>
</article>
\`\`\`

### Hero Section
\`\`\`html
<section class="hero">
  <h1 class="fluid-h1 font-heading text-center">
    Welcome to Our Site
  </h1>
  <p class="fluid-body font-body text-center opacity-75">
    Responsive typography that scales beautifully
  </p>
</section>
\`\`\`

### E-commerce Product
\`\`\`html
<div class="product-card">
  <h3 class="fluid-h3 font-heading">Product Name</h3>
  <p class="fluid-body font-body">Product description</p>
  <span class="fluid-h2 font-price">$99.99</span>
</div>
\`\`\`

## Advanced Techniques

### Container Query Integration
\`\`\`css
@container (min-width: 400px) {
  .card-title {
    font-size: clamp(1.25rem, 3cqw, 2rem);
  }
}
\`\`\`

### Aspect Ratio Considerations
\`\`\`css
.responsive-text {
  font-size: clamp(1rem, 4vmin, 2rem);
}
\`\`\`

## Performance Benefits

### Reduced Media Queries
Fluid typography eliminates the need for multiple breakpoint-specific font sizes:

\`\`\`css
/* Traditional approach */
.heading {
  font-size: 1.5rem;
}

@media (min-width: 768px) {
  .heading { font-size: 2rem; }
}

@media (min-width: 1024px) {
  .heading { font-size: 2.5rem; }
}

/* Fluid approach */
.heading {
  font-size: clamp(1.5rem, 3vw, 2.5rem);
}
\`\`\`

### Better User Experience
- Smooth scaling across all screen sizes
- No jarring font size jumps at breakpoints
- Optimal readability at any viewport size

## Browser Support

Fluid typography using clamp() is supported in:
- Chrome 79+
- Firefox 75+
- Safari 13.1+
- Edge 79+

### Fallbacks
\`\`\`css
.fluid-heading {
  font-size: 2rem; /* Fallback */
  font-size: clamp(1.5rem, 4vw, 3rem);
}
\`\`\`

## Best Practices

### Minimum and Maximum Limits
- Set reasonable minimum sizes for readability
- Prevent text from becoming too large on wide screens
- Consider accessibility guidelines (minimum 16px for body text)

### Testing
- Test across various screen sizes
- Check readability at all scales
- Verify performance on slower devices

### Accessibility
- Respect user font size preferences
- Maintain sufficient contrast ratios
- Ensure text remains readable when zoomed to 200%
`;

    this.writeFile('Fluid-Typography.md', content);
  }

  async createPerformanceOptimization() {
    const content = `# Performance Optimization

Bob Styles 2.0 includes comprehensive performance optimization tools and automated analysis for CSS efficiency.

## Build Optimization

### Automated Optimization Pipeline
\`\`\`bash
npm run build     # Builds and optimizes automatically
npm run optimize  # Run optimization analysis
\`\`\`

### Build Optimizer Features
- CSS minification and compression
- Unused CSS detection
- Performance metrics analysis
- Bundle size optimization
- Source map generation

## Optimization Tools

### Build Optimizer Script
The \`build-optimizer.js\` script provides:

\`\`\`javascript
// Automatic optimization analysis
const optimizer = require('./build-optimizer.js');
optimizer.analyze();
\`\`\`

### Key Metrics Tracked
- Total CSS file size
- Gzipped size
- Number of selectors
- Unused CSS percentage
- Load time estimates

## Performance Features

### CSS Custom Properties Automation
Automatically generates optimized CSS variables:

\`\`\`css
:root {
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --font-size-base: 1rem;
  --transition-fast: 150ms;
}
\`\`\`

### Efficient Utility Classes
Utilities are designed for minimal CSS output:

\`\`\`css
.flex { display: flex; }
.p-4 { padding: var(--space-4); }
\`\`\`

## Font Loading Optimization

### Preconnect Headers
\`\`\`html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
\`\`\`

### Font Display Strategy
\`\`\`css
@import url("...&display=swap");
\`\`\`

### Subset Loading
- Only essential character sets
- Optimized weight ranges
- Reduced font file sizes

## CSS Optimization Techniques

### Selector Efficiency
Bob Styles uses efficient selectors:

\`\`\`css
/* Efficient */
.flex { display: flex; }

/* Avoided */
div.container > .flex { display: flex; }
\`\`\`

### Minimal Specificity
Low specificity for easy overrides:

\`\`\`css
.text-lg { font-size: var(--font-size-lg); }
\`\`\`

### Reduced Redundancy
Shared properties through CSS variables:

\`\`\`css
.shadow, .shadow-md, .shadow-lg {
  /* Shared shadow properties */
}
\`\`\`

## Bundle Analysis

### Size Metrics
\`\`\`bash
# Check bundle size
npm run analyze

# Output example:
# CSS Bundle: 45KB (12KB gzipped)
# Utilities: 30KB
# Components: 15KB
\`\`\`

### Optimization Recommendations
The optimizer provides actionable insights:
- Unused CSS detection
- Redundant selector identification
- Optimization opportunities

## Performance Best Practices

### Critical CSS
Inline critical styles for above-the-fold content:

\`\`\`html
<style>
  .hero { /* Critical styles */ }
</style>
\`\`\`

### Lazy Loading
Load non-critical styles asynchronously:

\`\`\`html
<link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
\`\`\`

### Resource Hints
\`\`\`html
<link rel="dns-prefetch" href="//fonts.googleapis.com">
\`\`\`

## Monitoring and Analysis

### Performance Metrics
Track key performance indicators:
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)

### Build Reports
Automated reports include:
- Bundle size changes
- Performance impact analysis
- Optimization suggestions

## Advanced Optimization

### Tree Shaking
Remove unused utilities in production:

\`\`\`javascript
// webpack.config.js
module.exports = {
  optimization: {
    usedExports: true,
    sideEffects: false
  }
};
\`\`\`

### PurgeCSS Integration
\`\`\`javascript
// Remove unused CSS
const purgecss = require('@fullhuman/postcss-purgecss');

module.exports = {
  plugins: [
    purgecss({
      content: ['./src/**/*.html'],
      css: ['./dist/index.css']
    })
  ]
};
\`\`\`

## Performance Testing

### Lighthouse Integration
\`\`\`bash
# Run Lighthouse audit
lighthouse http://localhost:8000 --output=json
\`\`\`

### WebPageTest
Monitor real-world performance metrics across different devices and networks.

### Bundle Analyzer
\`\`\`bash
# Analyze bundle composition
npm run build:analyze
\`\`\`

## Optimization Checklist

- [ ] Enable CSS minification
- [ ] Use font-display: swap
- [ ] Implement critical CSS
- [ ] Remove unused styles
- [ ] Optimize images and assets
- [ ] Enable gzip compression
- [ ] Use CDN for static assets
- [ ] Monitor Core Web Vitals

## Results

Typical performance improvements with Bob Styles optimization:
- 40-60% reduction in CSS bundle size
- 2-3x faster font loading
- Improved Lighthouse scores
- Better Core Web Vitals metrics
`;

    this.writeFile('Performance-Optimization.md', content);
  }

  async createBuildSystem() {
    const content = `# Build System

Bob Styles uses a modern build system with SCSS compilation, JavaScript processing, and automated optimization.

## Build Scripts

### Available Commands
\`\`\`bash
npm run build        # Full production build
npm run dev          # Development build with watch
npm run build:scss   # Compile SCSS only
npm run build:js     # Copy JavaScript files
npm run optimize     # Run optimization analysis
npm run demo         # Start demo server
\`\`\`

### Build Process
1. SCSS compilation with Sass
2. JavaScript file copying
3. Automated optimization
4. Source map generation

## SCSS Compilation

### Sass Configuration
\`\`\`bash
sass src/index.scss dist/index.css --style compressed --source-map
\`\`\`

### Watch Mode
\`\`\`bash
sass --watch src/index.scss dist/index.css --source-map
\`\`\`

### Output Structure
\`\`\`
dist/
├── index.css          # Compiled CSS
├── index.css.map      # Source map
└── js/
    └── font-detection.js
\`\`\`

## File Structure

### Source Files
\`\`\`
src/
├── index.scss                    # Main entry point
├── variables.scss                # CSS variables
├── css-variables-automation.scss # Variable automation
├── fonts.scss                    # Font imports
├── components.scss               # Component imports
├── fluid-typography.scss         # Fluid typography
├── component-system.scss         # Component system
├── js/
│   └── font-detection.js        # Font detection script
├── fonts/                       # Font files
└── components/                  # Component partials
\`\`\`

### Build Output
\`\`\`
dist/
├── index.css         # Minified CSS (45KB)
├── index.css.map     # Source map
└── js/
    └── font-detection.js
\`\`\`

## Build Configuration

### Package.json Scripts
\`\`\`json
{
  "scripts": {
    "build": "npm run build:scss && npm run build:js && npm run optimize",
    "build:scss": "sass src/index.scss dist/index.css --style compressed --source-map",
    "build:js": "mkdir -p dist/js && cp src/js/*.js dist/js/",
    "optimize": "node build-optimizer.js",
    "dev": "sass --watch src/index.scss dist/index.css --source-map",
    "prepublishOnly": "npm run build"
  }
}
\`\`\`

### Build Optimizer
The \`build-optimizer.js\` script provides:
- CSS analysis and optimization
- Bundle size reporting
- Performance metrics
- Optimization recommendations

## Development Workflow

### Local Development
\`\`\`bash
# Start development server
npm run dev

# In another terminal
npm run demo  # Serves demo files on port 8000
\`\`\`

### File Watching
The development build automatically watches for changes:
- SCSS files are recompiled
- Source maps are updated
- Browser can auto-reload

## Production Build

### Optimization Steps
1. SCSS compilation with compression
2. CSS minification
3. Source map generation
4. JavaScript file copying
5. Bundle analysis
6. Performance reporting

### Build Output Analysis
\`\`\`bash
npm run optimize
# Outputs:
# - Bundle size metrics
# - Compression ratios
# - Performance recommendations
\`\`\`

## Custom Build Configuration

### Extending the Build
\`\`\`javascript
// custom-build.js
const sass = require('sass');
const fs = require('fs');

const result = sass.compile('src/index.scss', {
  style: 'compressed',
  sourceMap: true
});

fs.writeFileSync('dist/custom.css', result.css);
\`\`\`

### Adding PostCSS
\`\`\`bash
npm install postcss autoprefixer
\`\`\`

\`\`\`javascript
// postcss.config.js
module.exports = {
  plugins: [
    require('autoprefixer'),
    require('cssnano')
  ]
};
\`\`\`

## Integration with Build Tools

### Webpack Integration
\`\`\`javascript
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  }
};
\`\`\`

### Vite Integration
\`\`\`javascript
// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "bob-styles/src/index.scss";'
      }
    }
  }
});
\`\`\`

### Rollup Integration
\`\`\`javascript
// rollup.config.js
import scss from 'rollup-plugin-scss';

export default {
  plugins: [
    scss({
      output: 'dist/styles.css',
      outputStyle: 'compressed'
    })
  ]
};
\`\`\`

## Continuous Integration

### GitHub Actions
\`\`\`yaml
# .github/workflows/build.yml
name: Build and Test
on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      - run: npm install
      - run: npm run build
      - run: npm run optimize
\`\`\`

### Build Verification
\`\`\`bash
# Verify build output
test -f dist/index.css || exit 1
test -f dist/index.css.map || exit 1
test -f dist/js/font-detection.js || exit 1
\`\`\`

## Performance Monitoring

### Build Size Tracking
\`\`\`bash
# Track bundle size over time
echo "$(date): $(wc -c < dist/index.css) bytes" >> build-history.log
\`\`\`

### Optimization Reports
The build system generates detailed reports:
- CSS bundle analysis
- Compression ratios
- Performance metrics
- Optimization opportunities

## Troubleshooting

### Common Issues
1. **SCSS compilation errors**: Check syntax and imports
2. **Missing source maps**: Ensure --source-map flag is used
3. **File not found**: Verify file paths and permissions
4. **Build failures**: Check Node.js and npm versions

### Debug Mode
\`\`\`bash
# Enable verbose output
DEBUG=* npm run build
\`\`\`

### Clean Build
\`\`\`bash
# Remove build artifacts
rm -rf dist/
npm run build
\`\`\`
`;

    this.writeFile('Build-System.md', content);
  }

  async updateAPIReference() {
    const content = `# API Reference

Complete API reference for Bob Styles classes, variables, and functions.

## CSS Custom Properties

### Spacing Variables
\`\`\`css
--space-1: 0.25rem;    /* 4px */
--space-2: 0.5rem;     /* 8px */
--space-3: 0.75rem;    /* 12px */
--space-4: 1rem;       /* 16px */
--space-6: 1.5rem;     /* 24px */
\`\`\`

### Typography Variables
\`\`\`css
--font-size-sm: 0.875rem;
--font-size-base: 1rem;
--font-size-lg: 1.125rem;
--font-size-xl: 1.25rem;
--font-size-2xl: 1.5rem;
--font-size-3xl: 1.875rem;

--font-weight-light: 300;
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
\`\`\`

### Border & Shadow Variables
\`\`\`css
--radius-base: 0.25rem;
--radius-md: 0.375rem;
--radius-lg: 0.5rem;
--radius-full: 9999px;

--shadow-base: 0 1px 3px rgba(0,0,0,0.12);
--shadow-md: 0 4px 6px rgba(0,0,0,0.07);
--shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
\`\`\`

## Utility Classes

### Layout Classes
- \`.flex\` - display: flex
- \`.flex-col\` - flex-direction: column
- \`.flex-center\` - flex + center alignment
- \`.items-center\` - align-items: center
- \`.justify-center\` - justify-content: center
- \`.justify-between\` - justify-content: space-between

### Spacing Classes
- \`.p-{1-6}\` - padding utilities
- \`.m-{1-6}\` - margin utilities
- \`.gap-{1-6}\` - gap utilities

### Typography Classes
- \`.text-{sm,base,lg,xl,2xl,3xl}\` - font sizes
- \`.font-{light,normal,medium,semibold,bold}\` - font weights
- \`.font-{inter,poppins,montserrat,open-sans}\` - font families

## Component Classes

### E-commerce Typography
- \`.font-heading\` - Inter 600, line-height 1.2
- \`.font-subheading\` - Inter 500, line-height 1.3
- \`.font-body\` - Inter 400, line-height 1.5
- \`.font-price\` - Inter 700, line-height 1.2
- \`.font-button\` - Inter 600, uppercase, letter-spaced

### Header Components
- \`.head\` - header container
- \`.headerleft\` - left header section
- \`.headerright\` - right header section

## JavaScript API

### Font Detection
\`\`\`javascript
// Font detection functions
window.BobStyles = {
  detectFont: function(fontFamily) { /* ... */ },
  loadFallback: function(element) { /* ... */ }
};
\`\`\`

## SCSS Mixins and Functions

### Fluid Typography Mixin
\`\`\`scss
@mixin fluid-type($min-size, $max-size, $min-vw: 320px, $max-vw: 1200px) {
  // Implementation
}
\`\`\`

### Usage Examples
\`\`\`scss
.custom-heading {
  @include fluid-type(1.5rem, 3rem);
}
\`\`\`
`;

    this.writeFile('API-Reference.md', content);
  }

  async updateExamples() {
    const content = `# Examples

Real-world examples and use cases for Bob Styles.

## E-commerce Product Page

\`\`\`html
<div class="product-page p-4">
  <header class="head">
    <div class="headerleft">
      <h1 class="font-heading text-2xl">My Store</h1>
    </div>
    <ul class="headerright">
      <li><span class="font-body">Cart (2)</span></li>
    </ul>
  </header>

  <main class="flex flex-col gap-6 p-4">
    <div class="product-card rounded-lg shadow-md p-6">
      <h2 class="font-heading text-3xl">Premium Headphones</h2>
      <p class="font-body text-lg opacity-75">High-quality wireless headphones</p>
      <div class="font-price text-2xl">$199.99</div>
      <button class="font-button rounded shadow transition p-4 w-full">
        Add to Cart
      </button>
    </div>
  </main>
</div>
\`\`\`

## Blog Article Layout

\`\`\`html
<article class="blog-post p-4">
  <header class="text-center p-6">
    <h1 class="font-heading text-3xl">Article Title</h1>
    <p class="font-body opacity-75">Published on March 15, 2024</p>
  </header>
  
  <div class="content font-body text-base leading-relaxed">
    <p>Article content with beautiful typography...</p>
  </div>
</article>
\`\`\`

## Dashboard Interface

\`\`\`html
<div class="dashboard flex">
  <aside class="sidebar w-64 p-4">
    <nav class="flex flex-col gap-2">
      <a href="#" class="font-body p-3 rounded transition">Dashboard</a>
      <a href="#" class="font-body p-3 rounded transition">Analytics</a>
    </nav>
  </aside>
  
  <main class="flex-1 p-6">
    <h1 class="font-heading text-2xl">Dashboard</h1>
    <div class="grid grid-cols-3 gap-4">
      <div class="card rounded shadow p-4">
        <h3 class="font-subheading">Metric 1</h3>
        <div class="font-price text-xl">1,234</div>
      </div>
    </div>
  </main>
</div>
\`\`\`
`;

    this.writeFile('Examples.md', content);
  }

  async updateAdvancedUsage() {
    const content = `# Advanced Usage

Advanced techniques and customization options for Bob Styles.

## Custom CSS Variables

\`\`\`css
:root {
  --primary-color: #3b82f6;
  --secondary-color: #64748b;
  --custom-spacing: 2rem;
}

.custom-component {
  padding: var(--custom-spacing);
  color: var(--primary-color);
}
\`\`\`

## SCSS Customization

\`\`\`scss
// Override default variables
$custom-space-4: 2rem;

@import "bob-styles/src/index.scss";

// Custom utilities
.custom-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-4);
}
\`\`\`

## Component Extensions

\`\`\`scss
.enhanced-card {
  @extend .rounded-lg;
  @extend .shadow-md;
  @extend .p-4;
  @extend .transition;
  
  border: 1px solid #e5e7eb;
  
  &:hover {
    @extend .shadow-lg;
    transform: translateY(-2px);
  }
}
\`\`\`

## Performance Optimization

\`\`\`javascript
// Selective imports
@import "bob-styles/src/variables";
@import "bob-styles/src/utilities/flex";
@import "bob-styles/src/utilities/spacing";
\`\`\`
`;

    this.writeFile('Advanced-Usage.md', content);
  }

  async updateTroubleshooting() {
    const content = `# Troubleshooting

Common issues and solutions when using Bob Styles.

## Installation Issues

### NPM Installation Fails
\`\`\`bash
# Clear npm cache
npm cache clean --force
npm install bob-styles
\`\`\`

### SCSS Import Errors
\`\`\`scss
// Correct import path
@import "bob-styles/src/index.scss";

// Not: @import "bob-styles/index.scss";
\`\`\`

## Font Loading Issues

### Fonts Not Loading
1. Check internet connection for Google Fonts
2. Verify font-detection.js is included
3. Check browser console for errors

### Font Fallbacks Not Working
\`\`\`html
<!-- Ensure script is loaded -->
<script src="path/to/bob-styles/dist/js/font-detection.js"></script>
\`\`\`

## Build Issues

### SCSS Compilation Errors
\`\`\`bash
# Check Sass version
sass --version

# Update if needed
npm install -g sass
\`\`\`

### Missing CSS Output
\`\`\`bash
# Verify build command
npm run build

# Check output directory
ls -la dist/
\`\`\`

## Browser Compatibility

### CSS Custom Properties
- IE11: Not supported (use PostCSS plugin)
- Modern browsers: Full support

### Clamp() Function
- Fallback for older browsers:
\`\`\`css
.fluid-text {
  font-size: 1rem; /* Fallback */
  font-size: clamp(1rem, 2.5vw, 1.5rem);
}
\`\`\`

## Performance Issues

### Large Bundle Size
1. Use PurgeCSS to remove unused styles
2. Import only needed components
3. Enable gzip compression

### Slow Font Loading
1. Use font-display: swap
2. Preload critical fonts
3. Optimize font subsets

## Common Mistakes

### Incorrect Class Names
\`\`\`html
<!-- Correct -->
<div class="flex items-center">

<!-- Incorrect -->
<div class="flex item-center">
\`\`\`

### Missing Dependencies
\`\`\`bash
# Install required dependencies
npm install sass
\`\`\`

## Getting Help

1. Check the documentation
2. Search existing issues on GitHub
3. Create a new issue with:
   - Bob Styles version
   - Browser and version
   - Minimal reproduction case
   - Error messages
`;

    this.writeFile('Troubleshooting.md', content);
  }
}
}

// Export for use as module or run directly
if (require.main === module) {
  const agent = new WikiUpdateAgent();
  agent.updateAllWikiFiles().catch(console.error);
}

module.exports = WikiUpdateAgent;
