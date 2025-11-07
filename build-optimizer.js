#!/usr/bin/env node

// Build-time Performance Optimizer
// Dead code elimination and critical CSS extraction
// Enhanced with AI module integration

const fs = require('fs');
const path = require('path');

class BuildOptimizer {
  constructor() {
    this.usedUtilities = new Set();
    this.criticalCSS = new Set();
    this.utilityMap = new Map();
    this.chunks = new Map();
  }

  // Analyze HTML/JS files for used utilities
  analyzeUsage(sourceDir) {
    const files = this.getSourceFiles(sourceDir);
    
    files.forEach(file => {
      const content = fs.readFileSync(file, 'utf8');
      this.extractUtilities(content);
    });
    
    // Also scan test files
    const testFiles = ['./test-utilities.html', './demo.html', './demo-advanced.html'];
    testFiles.forEach(testFile => {
      if (fs.existsSync(testFile)) {
        const content = fs.readFileSync(testFile, 'utf8');
        this.extractUtilities(content);
      }
    });
  }

  // Get all source files
  getSourceFiles(dir) {
    const files = [];
    const extensions = ['.html', '.js', '.jsx', '.ts', '.tsx', '.vue', '.svelte'];
    
    const walk = (currentDir) => {
      const items = fs.readdirSync(currentDir);
      
      items.forEach(item => {
        const fullPath = path.join(currentDir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
          walk(fullPath);
        } else if (stat.isFile() && extensions.some(ext => item.endsWith(ext))) {
          files.push(fullPath);
        }
      });
    };
    
    walk(dir);
    return files;
  }

  // Extract utility classes from content
  extractUtilities(content) {
    // Match class attributes and className props
    const classRegex = /(?:class|className)=["']([^"']+)["']/g;
    const templateRegex = /class:([a-zA-Z0-9-_]+)/g;
    
    let match;
    
    // Extract from class attributes
    while ((match = classRegex.exec(content)) !== null) {
      const classes = match[1].split(/\s+/);
      classes.forEach(cls => {
        if (this.isUtilityClass(cls)) {
          this.usedUtilities.add(cls);
        }
      });
    }
    
    // Extract from template literals
    while ((match = templateRegex.exec(content)) !== null) {
      if (this.isUtilityClass(match[1])) {
        this.usedUtilities.add(match[1]);
      }
    }
  }

  // Check if class is a utility class
  isUtilityClass(className) {
    const utilityPatterns = [
      // Layout
      /^(flex|grid|block|inline|hidden|relative|absolute|fixed|sticky)$/,
      // Spacing
      /^(p|m|px|py|mx|my|pl|pr|pt|pb|ml|mr|mt|mb)-\d+$/,
      // Colors and backgrounds
      /^(text|bg|border)-.+/,
      // Sizing
      /^(w|h|min-w|min-h|max-w|max-h)-(full|auto|\d+)$/,
      // Typography
      /^(font|text|leading|tracking)-.+/,
      // Borders and effects
      /^(rounded|shadow|opacity)-.*/,
      // Animations
      /^(transition|transform|animate)-.*/,
      // Spacing utilities
      /^(space-[xy]|gap|divide)-.*/,
      // Positioning
      /^(top|right|bottom|left|inset)-.*/,
      // Z-index and order
      /^(z|order)-.*/
    ];
    
    return utilityPatterns.some(pattern => pattern.test(className));
  }

  // Generate optimized CSS
  generateOptimizedCSS(sourceCSS) {
    // Split CSS by rules, handling minified CSS
    const rules = sourceCSS.match(/[^{}]+\{[^{}]*\}/g) || [];
    const optimizedRules = [];
    
    // Keep non-rule CSS (imports, variables, etc.)
    const nonRules = sourceCSS.replace(/[^{}]+\{[^{}]*\}/g, '').trim();
    if (nonRules) {
      optimizedRules.push(nonRules);
    }
    
    rules.forEach(rule => {
      const selectorPart = rule.split('{')[0].trim();
      const classMatches = selectorPart.match(/\.[a-zA-Z0-9\-_:]+/g);
      
      let keepRule = false;
      
      if (classMatches) {
        keepRule = classMatches.some(className => {
          const cleanName = className.substring(1).split(':')[0]; // Remove dot and pseudo-classes
          return this.usedUtilities.has(cleanName);
        });
      } else {
        // Keep non-class selectors (element selectors, :root, etc.)
        keepRule = true;
      }
      
      if (keepRule) {
        optimizedRules.push(rule);
      }
    });
    
    return optimizedRules.join('\n');
  }

  // Extract critical CSS
  extractCriticalCSS(sourceCSS, criticalSelectors) {
    // If no critical selectors provided, extract from test file
    if (criticalSelectors.size === 0) {
      const testFile = './test-utilities.html';
      if (fs.existsSync(testFile)) {
        const testContent = fs.readFileSync(testFile, 'utf8');
        this.extractUtilities(testContent);
        criticalSelectors = this.usedUtilities;
      }
    }
    
    // Split CSS by rules, handling minified CSS
    const rules = sourceCSS.match(/[^{}]+\{[^{}]*\}/g) || [];
    const criticalRules = [];
    
    // Keep CSS variables and imports
    const nonRules = sourceCSS.replace(/[^{}]+\{[^{}]*\}/g, '').trim();
    if (nonRules) {
      criticalRules.push(nonRules);
    }
    
    rules.forEach(rule => {
      const selectorPart = rule.split('{')[0].trim();
      const classMatches = selectorPart.match(/\.[a-zA-Z0-9\-_:]+/g);
      
      let isCritical = false;
      
      if (classMatches) {
        isCritical = classMatches.some(className => {
          const cleanName = className.substring(1).split(':')[0];
          return criticalSelectors.has(cleanName);
        });
      } else {
        // Keep base styles in critical CSS
        if (selectorPart.includes(':root') || selectorPart.includes('*') || 
            selectorPart.includes('html') || selectorPart.includes('body')) {
          isCritical = true;
        }
      }
      
      if (isCritical) {
        criticalRules.push(rule);
      }
    });
    
    return criticalRules.join('\n');
  }

  // Create CSS chunks
  createChunks(sourceCSS) {
    const chunkMap = {
      layout: ['flex', 'grid', 'block', 'inline', 'hidden', 'relative', 'absolute', 'fixed', 'sticky'],
      spacing: ['p-', 'm-', 'px-', 'py-', 'mx-', 'my-', 'space-', 'gap-'],
      typography: ['text-', 'font-', 'leading-', 'tracking-', 'uppercase', 'lowercase', 'capitalize'],
      colors: ['bg-', 'text-', 'border-', 'ring-', 'divide-'],
      borders: ['border', 'rounded', 'ring-', 'divide-'],
      effects: ['shadow', 'opacity-', 'blur-', 'brightness-', 'contrast-'],
      animations: ['transition', 'transform', 'animate-', 'duration-', 'ease-']
    };
    
    Object.entries(chunkMap).forEach(([chunkName, prefixes]) => {
      const chunkCSS = this.extractChunkCSS(sourceCSS, prefixes);
      this.chunks.set(chunkName, chunkCSS);
    });
  }

  // Extract CSS for a specific chunk
  extractChunkCSS(sourceCSS, prefixes) {
    // Split CSS by rules, handling minified CSS
    const rules = sourceCSS.match(/[^{}]+\{[^{}]*\}/g) || [];
    const chunkRules = [];
    
    rules.forEach(rule => {
      const selectorPart = rule.split('{')[0].trim();
      const classMatches = selectorPart.match(/\.[a-zA-Z0-9\-_:]+/g);
      
      if (classMatches) {
        const matchesChunk = classMatches.some(className => {
          const cleanName = className.substring(1).split(':')[0];
          return prefixes.some(prefix => 
            cleanName.startsWith(prefix) || cleanName === prefix.replace('-', '')
          );
        });
        
        if (matchesChunk) {
          chunkRules.push(rule);
        }
      }
    });
    
    return chunkRules.join('\n');
  }

  // Generate bundle analytics
  generateAnalytics() {
    return {
      totalUtilities: this.usedUtilities.size,
      criticalUtilities: this.criticalCSS.size,
      chunks: Array.from(this.chunks.keys()),
      unusedUtilities: this.getUnusedUtilities(),
      sizeSavings: this.calculateSizeSavings()
    };
  }

  // Calculate size savings
  calculateSizeSavings() {
    const originalPath = './dist/index.css';
    const optimizedPath = './dist/index.optimized.css';
    
    let originalSize = 0;
    let optimizedSize = 0;
    
    if (fs.existsSync(originalPath)) {
      originalSize = fs.statSync(originalPath).size;
    }
    
    if (fs.existsSync(optimizedPath)) {
      optimizedSize = fs.statSync(optimizedPath).size;
    }
    
    const savings = originalSize > 0 ? ((originalSize - optimizedSize) / originalSize * 100).toFixed(2) : '0';
    
    return {
      originalSize: `${(originalSize / 1024).toFixed(2)}KB`,
      optimizedSize: `${(optimizedSize / 1024).toFixed(2)}KB`,
      savings: `${savings}%`
    };
  }

  // Get unused utilities
  getUnusedUtilities() {
    // This would be populated from a complete utility list
    return [];
  }

  // Copy JavaScript modules to dist
  copyJSModules() {
    const jsSourceDir = './src/js';
    const jsDistDir = './dist/js';
    
    // Ensure dist/js directory exists
    if (!fs.existsSync(jsDistDir)) {
      fs.mkdirSync(jsDistDir, { recursive: true });
    }
    
    // Copy all JS files
    if (fs.existsSync(jsSourceDir)) {
      const jsFiles = fs.readdirSync(jsSourceDir);
      jsFiles.forEach(file => {
        if (file.endsWith('.js')) {
          const sourcePath = path.join(jsSourceDir, file);
          const destPath = path.join(jsDistDir, file);
          fs.copyFileSync(sourcePath, destPath);
          console.log(`📦 Copied ${file} to dist/js/`);
        }
      });
    }
  }

  // Main optimization process
  async optimize(options = {}) {
    const {
      sourceDir = './src',
      outputDir = './dist',
      sourceCSS = './dist/index.css',
      generateChunks = true,
      extractCritical = true
    } = options;

    console.log('🚀 Starting build optimization...');
    
    // Copy JavaScript modules
    this.copyJSModules();
    
    // Analyze usage
    this.analyzeUsage(sourceDir);
    console.log(`📊 Found ${this.usedUtilities.size} used utilities`);
    
    // Read source CSS
    const css = fs.readFileSync(sourceCSS, 'utf8');
    
    // Generate optimized CSS
    const optimizedCSS = this.generateOptimizedCSS(css);
    fs.writeFileSync(path.join(outputDir, 'index.optimized.css'), optimizedCSS);
    
    // Extract critical CSS if requested
    if (extractCritical) {
      const criticalCSS = this.extractCriticalCSS(css, this.criticalCSS);
      fs.writeFileSync(path.join(outputDir, 'critical.css'), criticalCSS);
    }
    
    // Create chunks if requested
    if (generateChunks) {
      this.createChunks(css);
      const chunksDir = path.join(outputDir, 'chunks');
      
      if (!fs.existsSync(chunksDir)) {
        fs.mkdirSync(chunksDir, { recursive: true });
      }
      
      this.chunks.forEach((chunkCSS, chunkName) => {
        fs.writeFileSync(path.join(chunksDir, `${chunkName}.css`), chunkCSS);
      });
    }
    
    // Generate analytics
    const analytics = this.generateAnalytics();
    fs.writeFileSync(
      path.join(outputDir, 'bundle-analytics.json'),
      JSON.stringify(analytics, null, 2)
    );
    
    console.log('✅ Optimization complete!');
    console.log(`📈 Analytics saved to ${outputDir}/bundle-analytics.json`);
    
    return analytics;
  }
}

// CLI usage
if (require.main === module) {
  const optimizer = new BuildOptimizer();
  optimizer.optimize().catch(console.error);
}

module.exports = BuildOptimizer;
