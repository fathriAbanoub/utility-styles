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

console.log('🤖 Starting Final Wiki Update Agent...');

// Update API-Reference.md
const apiReferenceContent = `# API Reference

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

--transition-fast: 150ms;
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

### Positioning Classes
- \`.relative\` - position: relative
- \`.absolute\` - position: absolute
- \`.sticky\` - position: sticky
- \`.top-0\`, \`.bottom-0\`, \`.left-0\`, \`.right-0\` - positioning
- \`.z-{10,20,30,40,50}\` - z-index values

### Sizing Classes
- \`.w-full\`, \`.h-full\` - full width/height
- \`.w-auto\`, \`.h-auto\` - auto width/height

### Interaction Classes
- \`.cursor-pointer\` - pointer cursor
- \`.cursor-default\` - default cursor
- \`.select-none\` - disable text selection
- \`.pointer-events-none\` - disable pointer events

### Opacity Classes
- \`.opacity-{0,50,75,100}\` - opacity values

### Overflow Classes
- \`.overflow-hidden\` - hide overflow
- \`.overflow-auto\` - auto overflow
- \`.overflow-scroll\` - scroll overflow

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

### Style Variants
- \`.font-elegant\` - Montserrat-based styling
- \`.font-friendly\` - Poppins-based styling
- \`.font-readable\` - Open Sans-based styling

## Responsive Classes

### Breakpoints
- **sm**: max-width: 640px
- **md**: 641px - 768px
- **lg**: min-width: 769px
- **xl**: min-width: 1024px

### Responsive Utilities
- \`.sm:hidden\`, \`.md:hidden\`, \`.lg:hidden\`, \`.xl:hidden\`
- \`.sm:block\`, \`.md:block\`, \`.lg:block\`, \`.xl:block\`
- \`.sm:flex\`, \`.md:flex\`, \`.lg:flex\`, \`.xl:flex\`

## JavaScript API

### Font Detection
\`\`\`javascript
// Font detection functions (included in font-detection.js)
window.BobStyles = {
  detectFont: function(fontFamily) {
    // Detects if font is loaded
  },
  loadFallback: function(element) {
    // Applies fallback fonts
  }
};
\`\`\`

## SCSS Variables

### Default Values
\`\`\`scss
// Spacing scale
$space-1: 0.25rem !default;
$space-2: 0.5rem !default;
$space-3: 0.75rem !default;
$space-4: 1rem !default;
$space-6: 1.5rem !default;

// Typography scale
$font-size-sm: 0.875rem !default;
$font-size-base: 1rem !default;
$font-size-lg: 1.125rem !default;
$font-size-xl: 1.25rem !default;
$font-size-2xl: 1.5rem !default;
$font-size-3xl: 1.875rem !default;
\`\`\`

## Build Configuration

### Package.json Scripts
\`\`\`json
{
  "build": "npm run build:scss && npm run build:js && npm run optimize",
  "build:scss": "sass src/index.scss dist/index.css --style compressed --source-map",
  "build:js": "mkdir -p dist/js && cp src/js/*.js dist/js/",
  "optimize": "node build-optimizer.js",
  "dev": "sass --watch src/index.scss dist/index.css --source-map"
}
\`\`\`

### File Structure
\`\`\`
src/
├── index.scss                    # Main entry point
├── variables.scss                # CSS variables
├── css-variables-automation.scss # Variable automation
├── fonts.scss                    # Font imports
├── components.scss               # Component imports
├── fluid-typography.scss         # Fluid typography
├── component-system.scss         # Component system
└── js/
    └── font-detection.js        # Font detection script
\`\`\`

## Usage Examples

### Basic Implementation
\`\`\`scss
@import "bob-styles/src/index.scss";
\`\`\`

### Custom Variables
\`\`\`css
:root {
  --primary-color: #3b82f6;
  --secondary-color: #64748b;
}
\`\`\`

### Component Extension
\`\`\`scss
.custom-card {
  @extend .rounded-lg;
  @extend .shadow-md;
  @extend .p-4;
}
\`\`\`
`;

writeFile('API-Reference.md', apiReferenceContent);

console.log('✅ Final wiki update complete!');
console.log('📚 Updated: API-Reference.md');
console.log('🎉 All wiki files are now up to date with Bob Styles 2.0!');
