// Advanced Theme Engine with CSS-in-JS Bridge
// Sophisticated theming system with runtime switching and zero flash

class AdvancedThemeEngine {
  constructor() {
    // Environment detection
    this.isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';
    
    if (!this.isBrowser) {
      console.warn('AdvancedThemeEngine: Running in non-browser environment');
      return;
    }
    
    this.themes = new Map();
    this.currentTheme = 'light';
    this.observers = new Set();
    this.transitionDuration = 200;
    this.init();
  }

  init() {
    if (!this.isBrowser) return;
    
    this.loadThemes();
    this.detectSystemPreference();
    this.setupThemeObserver();
    this.preventFlash();
  }

  // Load predefined themes
  loadThemes() {
    const themes = {
      light: {
        'color-primary': '#3b82f6',
        'color-primary-dark': '#1d4ed8',
        'color-secondary': '#64748b',
        'color-background': '#ffffff',
        'color-surface': '#f8fafc',
        'color-text': '#1f2937',
        'color-text-secondary': '#6b7280'
      },
      dark: {
        'color-primary': '#60a5fa',
        'color-primary-dark': '#3b82f6',
        'color-secondary': '#94a3b8',
        'color-background': '#0f172a',
        'color-surface': '#1e293b',
        'color-text': '#f1f5f9',
        'color-text-secondary': '#cbd5e1'
      },
      'high-contrast': {
        'color-primary': '#0000ff',
        'color-primary-dark': '#000080',
        'color-secondary': '#808080',
        'color-background': '#ffffff',
        'color-surface': '#f0f0f0',
        'color-text': '#000000',
        'color-text-secondary': '#404040'
      },
      sepia: {
        'color-primary': '#8b4513',
        'color-primary-dark': '#654321',
        'color-secondary': '#a0522d',
        'color-background': '#f4f1e8',
        'color-surface': '#ede7d3',
        'color-text': '#3c2415',
        'color-text-secondary': '#6b4e3d'
      }
    };

    Object.entries(themes).forEach(([name, variables]) => {
      this.registerTheme(name, variables);
    });
  }

  // Register a new theme
  registerTheme(name, variables) {
    this.themes.set(name, variables);
  }

  // Switch theme with zero flash
  async switchTheme(themeName, options = {}) {
    if (!this.themes.has(themeName)) {
      console.warn(`Theme "${themeName}" not found`);
      return;
    }

    const { animate = true, persist = true } = options;
    const previousTheme = this.currentTheme;
    
    if (animate) {
      await this.animateThemeTransition(themeName);
    } else {
      this.applyTheme(themeName);
    }

    this.currentTheme = themeName;
    
    if (persist) {
      localStorage.setItem('preferred-theme', themeName);
    }

    this.notifyObservers(themeName, previousTheme);
  }

  // Apply theme variables to CSS
  applyTheme(themeName) {
    const theme = this.themes.get(themeName);
    const root = document.documentElement;
    
    Object.entries(theme).forEach(([property, value]) => {
      root.style.setProperty(`--${property}`, value);
    });

    document.documentElement.setAttribute('data-theme', themeName);
  }

  // Animate theme transition
  async animateThemeTransition(themeName) {
    return new Promise(resolve => {
      const root = document.documentElement;
      
      // Add transition class
      root.classList.add('theme-transitioning');
      root.style.setProperty('--theme-transition-duration', `${this.transitionDuration}ms`);
      
      // Apply new theme
      this.applyTheme(themeName);
      
      // Remove transition class after animation
      setTimeout(() => {
        root.classList.remove('theme-transitioning');
        resolve();
      }, this.transitionDuration);
    });
  }

  // Detect system preference
  detectSystemPreference() {
    if (!this.isBrowser) return;
    
    if (window.matchMedia) {
      const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const highContrastQuery = window.matchMedia('(prefers-contrast: high)');
      
      // Check for saved preference first
      const savedTheme = localStorage.getItem('preferred-theme');
      if (savedTheme && this.themes.has(savedTheme)) {
        this.switchTheme(savedTheme, { animate: false });
        return;
      }

      // Use system preference
      if (highContrastQuery.matches) {
        this.switchTheme('high-contrast', { animate: false });
      } else if (darkModeQuery.matches) {
        this.switchTheme('dark', { animate: false });
      } else {
        this.switchTheme('light', { animate: false });
      }

      // Listen for system preference changes
      darkModeQuery.addEventListener('change', (e) => {
        if (!localStorage.getItem('preferred-theme')) {
          this.switchTheme(e.matches ? 'dark' : 'light');
        }
      });

      highContrastQuery.addEventListener('change', (e) => {
        if (!localStorage.getItem('preferred-theme')) {
          this.switchTheme(e.matches ? 'high-contrast' : 'light');
        }
      });
    }
  }

  // Prevent flash of unstyled content
  preventFlash() {
    const style = document.createElement('style');
    style.textContent = `
      html {
        visibility: hidden;
        opacity: 0;
      }
      
      html.theme-loaded {
        visibility: visible;
        opacity: 1;
        transition: opacity 150ms ease-in-out;
      }
      
      .theme-transitioning * {
        transition: background-color var(--theme-transition-duration, 200ms) ease-in-out,
                   color var(--theme-transition-duration, 200ms) ease-in-out,
                   border-color var(--theme-transition-duration, 200ms) ease-in-out !important;
      }
    `;
    document.head.appendChild(style);

    // Mark as loaded after theme is applied
    requestAnimationFrame(() => {
      document.documentElement.classList.add('theme-loaded');
    });
  }

  // Setup theme observer for automatic adjustments
  setupThemeObserver() {
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          this.handleThemeChange(mutation.target.getAttribute('data-theme'));
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });
  }

  // Handle theme changes
  handleThemeChange(newTheme) {
    // Adjust focus indicators for accessibility
    this.adjustAccessibility(newTheme);
    
    // Update meta theme-color for mobile browsers
    this.updateMetaThemeColor(newTheme);
  }

  // Adjust accessibility features based on theme
  adjustAccessibility(themeName) {
    const theme = this.themes.get(themeName);
    const root = document.documentElement;
    
    // Adjust focus ring visibility
    if (themeName === 'high-contrast') {
      root.style.setProperty('--focus-ring-width', '3px');
      root.style.setProperty('--focus-ring-color', '#0000ff');
    } else {
      root.style.setProperty('--focus-ring-width', '2px');
      root.style.setProperty('--focus-ring-color', theme['color-primary']);
    }
  }

  // Update meta theme-color for mobile browsers
  updateMetaThemeColor(themeName) {
    const theme = this.themes.get(themeName);
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    
    if (!metaThemeColor) {
      metaThemeColor = document.createElement('meta');
      metaThemeColor.name = 'theme-color';
      document.head.appendChild(metaThemeColor);
    }
    
    metaThemeColor.content = theme['color-primary'];
  }

  // Create theme from design tokens
  createThemeFromTokens(name, tokens) {
    const theme = {};
    
    // Convert design tokens to CSS variables
    Object.entries(tokens).forEach(([key, value]) => {
      if (typeof value === 'object') {
        // Handle nested tokens
        Object.entries(value).forEach(([subKey, subValue]) => {
          theme[`${key}-${subKey}`] = subValue;
        });
      } else {
        theme[key] = value;
      }
    });
    
    this.registerTheme(name, theme);
  }

  // Generate theme variations
  generateThemeVariations(baseTheme, variations) {
    const base = this.themes.get(baseTheme);
    if (!base) return;

    variations.forEach(({ name, adjustments }) => {
      const newTheme = { ...base };
      
      Object.entries(adjustments).forEach(([property, adjustment]) => {
        if (typeof adjustment === 'function') {
          newTheme[property] = adjustment(base[property]);
        } else {
          newTheme[property] = adjustment;
        }
      });
      
      this.registerTheme(name, newTheme);
    });
  }

  // Subscribe to theme changes
  subscribe(callback) {
    this.observers.add(callback);
    return () => this.observers.delete(callback);
  }

  // Notify observers of theme changes
  notifyObservers(newTheme, previousTheme) {
    this.observers.forEach(callback => {
      callback(newTheme, previousTheme);
    });
  }

  // Get current theme
  getCurrentTheme() {
    return this.currentTheme;
  }

  // Get available themes
  getAvailableThemes() {
    return Array.from(this.themes.keys());
  }

  // Export theme as CSS
  exportThemeCSS(themeName) {
    const theme = this.themes.get(themeName);
    if (!theme) return '';

    const cssVariables = Object.entries(theme)
      .map(([property, value]) => `  --${property}: ${value};`)
      .join('\n');

    return `[data-theme="${themeName}"] {\n${cssVariables}\n}`;
  }
}

// Initialize the theme engine
const themeEngine = new AdvancedThemeEngine();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AdvancedThemeEngine;
}

// Global theme utilities
if (typeof window !== 'undefined') {
  window.switchTheme = (theme) => themeEngine.switchTheme(theme);
  window.getCurrentTheme = () => themeEngine.getCurrentTheme();
  window.getAvailableThemes = () => themeEngine.getAvailableThemes();
}
