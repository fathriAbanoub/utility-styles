// Contextual Typography Engine
class ContextualTypography {
  constructor() {
    this.contentAnalyzer = new ContentAnalyzer();
    this.typographyRules = this.loadTypographyRules();
    this.init();
  }

  init() {
    this.analyzeContent();
    this.applyContextualTypography();
    this.setupDynamicAdjustments();
  }

  loadTypographyRules() {
    return {
      blog: {
        body: { fontSize: '1.125rem', lineHeight: '1.7', fontFamily: 'Georgia, serif' },
        heading: { fontSize: '2.25rem', lineHeight: '1.2', fontWeight: '700' }
      },
      ui: {
        body: { fontSize: '0.875rem', lineHeight: '1.5', fontFamily: 'system-ui, sans-serif' },
        heading: { fontSize: '1.5rem', lineHeight: '1.3', fontWeight: '600' }
      },
      code: {
        body: { fontSize: '0.875rem', lineHeight: '1.6', fontFamily: 'Monaco, monospace' },
        heading: { fontSize: '1.25rem', lineHeight: '1.4', fontWeight: '500' }
      },
      ecommerce: {
        body: { fontSize: '1rem', lineHeight: '1.6', fontFamily: 'Inter, sans-serif' },
        heading: { fontSize: '1.875rem', lineHeight: '1.25', fontWeight: '700' }
      }
    };
  }

  analyzeContent() {
    const content = document.body.textContent;
    const context = this.contentAnalyzer.determineContext(content);
    
    this.currentContext = context;
    console.log(`📝 Content context detected: ${context}`);
  }

  applyContextualTypography() {
    const rules = this.typographyRules[this.currentContext] || this.typographyRules.ui;
    
    // Apply to body text
    const bodyElements = document.querySelectorAll('p, div:not([class*="heading"]), span');
    bodyElements.forEach(el => {
      if (!el.closest('[data-typography-locked]')) {
        this.applyTypographyRule(el, rules.body);
      }
    });
    
    // Apply to headings
    const headingElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, [class*="heading"]');
    headingElements.forEach(el => {
      if (!el.closest('[data-typography-locked]')) {
        this.applyTypographyRule(el, rules.heading);
      }
    });
  }

  applyTypographyRule(element, rule) {
    Object.entries(rule).forEach(([property, value]) => {
      const cssProperty = this.camelToKebab(property);
      element.style[property] = value;
      element.setAttribute('data-contextual-typography', this.currentContext);
    });
  }

  camelToKebab(str) {
    return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
  }

  setupDynamicAdjustments() {
    // Adjust based on reading time
    this.adjustForReadingTime();
    
    // Adjust based on viewport
    this.adjustForViewport();
    
    // Adjust based on user preferences
    this.adjustForUserPreferences();
  }

  adjustForReadingTime() {
    const wordCount = document.body.textContent.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200); // 200 WPM average
    
    if (readingTime > 10) {
      // Long content - optimize for reading comfort
      document.documentElement.style.setProperty('--reading-line-height', '1.8');
      document.documentElement.style.setProperty('--reading-font-size', '1.125rem');
    } else {
      // Short content - optimize for scanning
      document.documentElement.style.setProperty('--reading-line-height', '1.5');
      document.documentElement.style.setProperty('--reading-font-size', '1rem');
    }
  }

  adjustForViewport() {
    const updateTypography = () => {
      const vw = window.innerWidth;
      
      if (vw < 768) {
        // Mobile - larger text for readability
        document.documentElement.style.setProperty('--mobile-scale', '1.1');
      } else if (vw > 1200) {
        // Desktop - optimize for longer reading
        document.documentElement.style.setProperty('--desktop-scale', '1.05');
      }
    };
    
    updateTypography();
    window.addEventListener('resize', updateTypography);
  }

  adjustForUserPreferences() {
    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.documentElement.style.setProperty('--typography-transition', 'none');
    }
    
    // Check for high contrast preference
    if (window.matchMedia('(prefers-contrast: high)').matches) {
      document.documentElement.style.setProperty('--text-contrast', '1.2');
    }
  }
}

class ContentAnalyzer {
  determineContext(content) {
    const indicators = {
      blog: ['article', 'blog', 'post', 'read more', 'published', 'author'],
      ui: ['button', 'menu', 'navigation', 'form', 'input', 'click'],
      code: ['function', 'class', 'const', 'let', 'var', 'import', 'export'],
      ecommerce: ['price', 'buy', 'cart', 'product', 'order', 'shipping']
    };
    
    const lowerContent = content.toLowerCase();
    const scores = {};
    
    Object.entries(indicators).forEach(([context, words]) => {
      scores[context] = words.reduce((score, word) => {
        const matches = (lowerContent.match(new RegExp(word, 'g')) || []).length;
        return score + matches;
      }, 0);
    });
    
    // Return context with highest score, default to 'ui'
    return Object.entries(scores).reduce((a, b) => scores[a[0]] > scores[b[0]] ? a : b)[0] || 'ui';
  }
}

// Auto-initialize
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    new ContextualTypography();
  });
}
