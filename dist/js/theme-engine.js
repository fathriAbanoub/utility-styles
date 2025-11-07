// Advanced Theme Engine with Runtime Switching
class ThemeEngine {
  constructor() {
    this.currentTheme = this.getStoredTheme() || this.getSystemTheme();
    this.init();
  }

  init() {
    try {
      this.applyTheme(this.currentTheme);
      this.watchSystemTheme();
    } catch (error) {
      console.warn('Theme engine initialization failed:', error);
      // Fallback to light theme
      this.currentTheme = 'light';
      this.applyTheme('light');
    }
  }

  getSystemTheme() {
    try {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch (error) {
      console.warn('System theme detection failed:', error);
      return 'light';
    }
  }

  getStoredTheme() {
    try {
      const stored = localStorage.getItem('theme');
      return ['light', 'dark'].includes(stored) ? stored : null;
    } catch (error) {
      console.warn('localStorage access failed:', error);
      return null;
    }
  }

  setTheme(theme) {
    if (!['light', 'dark'].includes(theme)) {
      console.warn('Invalid theme:', theme);
      return;
    }
    
    this.currentTheme = theme;
    this.applyTheme(theme);
    this.storeTheme(theme);
  }

  applyTheme(theme) {
    try {
      // Store previous theme before updating
      const previousTheme = this.currentTheme;
      
      document.documentElement.setAttribute('data-theme', theme);
      
      // Prevent flash of unstyled content
      document.documentElement.style.colorScheme = theme === 'dark' ? 'dark' : 'light';
      
      // Emit theme change event with correct previous theme
      window.dispatchEvent(new CustomEvent('themechange', { 
        detail: { theme, previousTheme } 
      }));
    } catch (error) {
      console.warn('Theme application failed:', error);
    }
  }

  storeTheme(theme) {
    try {
      if (theme === this.getSystemTheme()) {
        localStorage.removeItem('theme');
      } else {
        localStorage.setItem('theme', theme);
      }
    } catch (error) {
      console.warn('Theme storage failed:', error);
    }
  }

  toggleTheme() {
    const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }

  watchSystemTheme() {
    try {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!this.getStoredTheme()) {
          this.setTheme(e.matches ? 'dark' : 'light');
        }
      });
    } catch (error) {
      console.warn('System theme watching failed:', error);
    }
  }

  // Performance optimization: batch theme changes
  batchThemeChanges(changes) {
    try {
      const root = document.documentElement;
      Object.entries(changes).forEach(([property, value]) => {
        root.style.setProperty(`--${property}`, value);
      });
    } catch (error) {
      console.warn('Batch theme changes failed:', error);
    }
  }

  // Get current theme values
  getThemeValue(property) {
    try {
      return getComputedStyle(document.documentElement).getPropertyValue(`--${property}`).trim();
    } catch (error) {
      console.warn('Theme value retrieval failed:', error);
      return '';
    }
  }
}

// Auto-initialize theme engine with error handling
let themeEngine;
try {
  themeEngine = new ThemeEngine();
} catch (error) {
  console.error('Critical theme engine failure:', error);
  // Minimal fallback
  themeEngine = {
    setTheme: () => console.warn('Theme engine unavailable'),
    toggleTheme: () => console.warn('Theme engine unavailable'),
    currentTheme: 'light'
  };
}

// Export for global access
window.ThemeEngine = ThemeEngine;
window.themeEngine = themeEngine;
