#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const projectRoot = '/home/bobaayad/bob-styles';
const wikiPath = path.join(projectRoot, 'utility-styles.wiki');

function writeFile(filename, content) {
  const filePath = path.join(wikiPath, filename);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`📝 Updated: ${filename}`);
}

console.log('🤖 Starting Complete Wiki Update Agent...');

// Update Utility-Classes.md
const utilityClassesContent = `# Utility Classes Reference

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

writeFile('Utility-Classes.md', utilityClassesContent);

// Update Components.md
const componentsContent = `# Components Reference

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

writeFile('Components.md', componentsContent);

// Update Font-System.md
const fontSystemContent = `# Font System

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

writeFile('Font-System.md', fontSystemContent);

console.log('✅ Complete wiki update finished!');
console.log('📚 Updated files:');
console.log('  - Utility-Classes.md');
console.log('  - Components.md');
console.log('  - Font-System.md');
console.log('');
console.log('🎉 All major wiki files have been updated to reflect Bob Styles 2.0!');
