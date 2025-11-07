// Context-Aware Dynamic Theme Engine
class ContextAwareTheme {
  constructor() {
    this.contexts = {
      time: this.getTimeContext(),
      accessibility: this.getAccessibilityContext(),
      device: this.getDeviceContext(),
      user: this.getUserContext()
    };
    this.init();
  }

  init() {
    this.applyContextualTheme();
    this.watchContextChanges();
  }

  getTimeContext() {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 18) return 'afternoon';
    if (hour >= 18 && hour < 22) return 'evening';
    return 'night';
  }

  getAccessibilityContext() {
    const context = {};
    
    // High contrast preference
    if (window.matchMedia('(prefers-contrast: high)').matches) {
      context.contrast = 'high';
    }
    
    // Reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      context.motion = 'reduced';
    }
    
    // Color scheme preference
    context.colorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    
    return context;
  }

  getDeviceContext() {
    return {
      mobile: window.matchMedia('(max-width: 768px)').matches,
      touch: 'ontouchstart' in window,
      battery: navigator.getBattery ? 'available' : 'unavailable'
    };
  }

  getUserContext() {
    try {
      return JSON.parse(localStorage.getItem('userThemePrefs') || '{}');
    } catch {
      return {};
    }
  }

  applyContextualTheme() {
    const root = document.documentElement;
    const { time, accessibility, device, user } = this.contexts;

    // Time-based adjustments
    const timeThemes = {
      morning: { brightness: '1.1', warmth: '0.95' },
      afternoon: { brightness: '1.0', warmth: '1.0' },
      evening: { brightness: '0.9', warmth: '1.1' },
      night: { brightness: '0.7', warmth: '1.2' }
    };

    const timeTheme = timeThemes[time];
    root.style.setProperty('--theme-brightness', timeTheme.brightness);
    root.style.setProperty('--theme-warmth', timeTheme.warmth);

    // Accessibility adjustments
    if (accessibility.contrast === 'high') {
      root.style.setProperty('--contrast-ratio', '7:1');
      root.style.setProperty('--border-width', '2px');
    }

    if (accessibility.motion === 'reduced') {
      root.style.setProperty('--animation-duration', '0.01ms');
      root.style.setProperty('--transition-duration', '0.01ms');
    }

    // Device-specific adjustments
    if (device.mobile) {
      root.style.setProperty('--touch-target-size', '44px');
      root.style.setProperty('--font-size-base', '16px');
    }

    // Apply color scheme
    root.setAttribute('data-theme', accessibility.colorScheme);
    
    // User preference overrides
    Object.entries(user).forEach(([key, value]) => {
      root.style.setProperty(`--user-${key}`, value);
    });
  }

  watchContextChanges() {
    // Watch for time changes (every minute)
    setInterval(() => {
      const newTime = this.getTimeContext();
      if (newTime !== this.contexts.time) {
        this.contexts.time = newTime;
        this.applyContextualTheme();
      }
    }, 60000);

    // Watch for accessibility changes
    ['prefers-color-scheme', 'prefers-contrast', 'prefers-reduced-motion'].forEach(query => {
      window.matchMedia(`(${query.replace('prefers-', '')})`).addEventListener('change', () => {
        this.contexts.accessibility = this.getAccessibilityContext();
        this.applyContextualTheme();
      });
    });

    // Watch for device orientation changes
    window.addEventListener('orientationchange', () => {
      setTimeout(() => {
        this.contexts.device = this.getDeviceContext();
        this.applyContextualTheme();
      }, 100);
    });
  }

  setUserPreference(key, value) {
    this.contexts.user[key] = value;
    try {
      localStorage.setItem('userThemePrefs', JSON.stringify(this.contexts.user));
    } catch {}
    this.applyContextualTheme();
  }

  getRecommendations() {
    const { time, accessibility, device } = this.contexts;
    const recommendations = [];

    if (time === 'night' && accessibility.colorScheme === 'light') {
      recommendations.push('Consider switching to dark mode for better night viewing');
    }

    if (device.mobile && !accessibility.motion) {
      recommendations.push('Enable reduced motion for better mobile experience');
    }

    return recommendations;
  }
}

// Initialize context-aware theme
window.contextAwareTheme = new ContextAwareTheme();
