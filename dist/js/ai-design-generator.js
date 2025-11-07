// AI-Powered Design System Generator
class AIDesignGenerator {
  constructor() {
    this.patterns = new Map();
    this.colorAnalyzer = new ColorAnalyzer();
    this.init();
  }

  init() {
    this.analyzeExistingPatterns();
    this.setupGenerationInterface();
  }

  analyzeExistingPatterns() {
    const elements = document.querySelectorAll('[class*="bg-"], [class*="text-"], [class*="border-"]');
    const colorPatterns = new Map();
    
    elements.forEach(el => {
      const classes = Array.from(el.classList);
      const colors = classes.filter(c => c.includes('bg-') || c.includes('text-') || c.includes('border-'));
      
      colors.forEach(color => {
        colorPatterns.set(color, (colorPatterns.get(color) || 0) + 1);
      });
    });

    this.patterns.set('colors', colorPatterns);
  }

  generateDesignTokens(brandColor) {
    const tokens = {
      colors: this.generateColorPalette(brandColor),
      spacing: this.generateSpacingScale(),
      typography: this.generateTypographyScale()
    };
    
    this.applyTokens(tokens);
    return tokens;
  }

  generateColorPalette(baseColor) {
    const hsl = this.colorAnalyzer.hexToHsl(baseColor);
    const palette = {};
    
    // Generate semantic colors
    palette.primary = {
      50: this.colorAnalyzer.adjustLightness(hsl, 95),
      500: baseColor,
      900: this.colorAnalyzer.adjustLightness(hsl, 20)
    };
    
    // Generate complementary colors
    palette.secondary = {
      500: this.colorAnalyzer.getComplementary(baseColor)
    };
    
    return palette;
  }

  generateSpacingScale() {
    return {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem'
    };
  }

  generateTypographyScale() {
    return {
      xs: { fontSize: '0.75rem', lineHeight: '1rem' },
      sm: { fontSize: '0.875rem', lineHeight: '1.25rem' },
      base: { fontSize: '1rem', lineHeight: '1.5rem' },
      lg: { fontSize: '1.125rem', lineHeight: '1.75rem' },
      xl: { fontSize: '1.25rem', lineHeight: '1.75rem' }
    };
  }

  applyTokens(tokens) {
    const root = document.documentElement;
    
    // Apply color tokens
    Object.entries(tokens.colors.primary).forEach(([key, value]) => {
      root.style.setProperty(`--color-primary-${key}`, value);
    });
    
    // Apply spacing tokens
    Object.entries(tokens.spacing).forEach(([key, value]) => {
      root.style.setProperty(`--spacing-${key}`, value);
    });
  }

  setupGenerationInterface() {
    if (document.getElementById('ai-generator')) return;
    
    const interface = document.createElement('div');
    interface.id = 'ai-generator';
    interface.innerHTML = `
      <div style="position: fixed; top: 20px; right: 20px; background: white; padding: 1rem; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); z-index: 1000;">
        <h3>AI Design Generator</h3>
        <input type="color" id="brand-color" value="#3b82f6">
        <button onclick="window.aiGenerator.generateDesignTokens(document.getElementById('brand-color').value)">Generate</button>
      </div>
    `;
    document.body.appendChild(interface);
    window.aiGenerator = this;
  }
}

class ColorAnalyzer {
  hexToHsl(hex) {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    
    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    
    return [h * 360, s * 100, l * 100];
  }

  adjustLightness([h, s, l], newL) {
    return `hsl(${h}, ${s}%, ${newL}%)`;
  }

  getComplementary(hex) {
    const [h, s, l] = this.hexToHsl(hex);
    return `hsl(${(h + 180) % 360}, ${s}%, ${l}%)`;
  }
}

// Auto-initialize
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    new AIDesignGenerator();
  });
}
