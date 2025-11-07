// Performance-First Utility Optimizer
// Intelligent system that only includes CSS you actually use with predictive loading

class PerformanceOptimizer {
  constructor() {
    // Environment detection
    this.isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';
    
    if (!this.isBrowser) {
      console.warn('PerformanceOptimizer: Running in non-browser environment');
      return;
    }
    
    this.usedUtilities = new Set();
    this.criticalCSS = new Set();
    this.loadedChunks = new Map();
    this.observer = null;
    this.init();
  }

  init() {
    if (!this.isBrowser) return;
    
    this.setupMutationObserver();
    this.setupIntersectionObserver();
    this.trackInitialUtilities();
    this.setupPredictiveLoading();
  }

  // Track utilities currently in use
  trackInitialUtilities() {
    if (!this.isBrowser) return;
    
    const elements = document.querySelectorAll('[class]');
    elements.forEach(el => {
      const classes = el.className.split(' ');
      classes.forEach(cls => {
        if (this.isUtilityClass(cls)) {
          this.usedUtilities.add(cls);
          this.criticalCSS.add(cls);
        }
      });
    });
  }

  // Setup mutation observer for dynamic class changes
  setupMutationObserver() {
    if (!this.isBrowser || typeof MutationObserver === 'undefined') return;
    
    this.observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const target = mutation.target;
          const classes = target.className.split(' ');
          classes.forEach(cls => {
            if (this.isUtilityClass(cls) && !this.usedUtilities.has(cls)) {
              this.usedUtilities.add(cls);
              this.loadUtilityCSS(cls);
            }
          });
        }
      });
    });

    this.observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class'],
      subtree: true
    });
  }

  // Setup intersection observer for predictive loading
  setupIntersectionObserver() {
    const intersectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.predictAndLoadCSS(entry.target);
        }
      });
    }, { rootMargin: '50px' });

    // Observe elements that might need CSS
    document.querySelectorAll('[data-lazy-css]').forEach(el => {
      intersectionObserver.observe(el);
    });
  }

  // Check if a class is a utility class
  isUtilityClass(className) {
    const utilityPatterns = [
      /^(flex|grid|block|inline|hidden)/,
      /^(p|m|px|py|mx|my)-\d+/,
      /^(text|bg|border)-.+/,
      /^(w|h)-\d+/,
      /^(rounded|shadow|opacity)-.*/,
      /^(font|leading|tracking)-.*/,
      /^(transition|transform|animate)-.*/
    ];
    
    return utilityPatterns.some(pattern => pattern.test(className));
  }

  // Load CSS for specific utility
  async loadUtilityCSS(utilityClass) {
    if (this.loadedChunks.has(utilityClass)) {
      return this.loadedChunks.get(utilityClass);
    }

    const cssChunk = this.getUtilityChunk(utilityClass);
    const promise = this.loadCSSChunk(cssChunk);
    this.loadedChunks.set(utilityClass, promise);
    
    return promise;
  }

  // Get the CSS chunk for a utility
  getUtilityChunk(utilityClass) {
    // Map utility classes to their CSS chunks
    const chunkMap = {
      'flex': 'layout',
      'grid': 'layout',
      'p-': 'spacing',
      'm-': 'spacing',
      'text-': 'typography',
      'bg-': 'colors',
      'border-': 'borders',
      'rounded': 'borders',
      'shadow': 'effects',
      'transition': 'animations'
    };

    for (const [prefix, chunk] of Object.entries(chunkMap)) {
      if (utilityClass.startsWith(prefix)) {
        return chunk;
      }
    }

    return 'utilities';
  }

  // Load CSS chunk
  async loadCSSChunk(chunkName) {
    return new Promise((resolve, reject) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = `/dist/chunks/${chunkName}.css`;
      link.onload = resolve;
      link.onerror = reject;
      document.head.appendChild(link);
    });
  }

  // Predictive CSS loading based on user behavior
  predictAndLoadCSS(element) {
    const predictions = this.analyzeElement(element);
    predictions.forEach(prediction => {
      if (!this.usedUtilities.has(prediction)) {
        this.loadUtilityCSS(prediction);
      }
    });
  }

  // Analyze element to predict needed utilities
  analyzeElement(element) {
    const predictions = [];
    const tagName = element.tagName.toLowerCase();
    const role = element.getAttribute('role');
    
    // Predict based on element type
    if (tagName === 'button' || role === 'button') {
      predictions.push('transition', 'hover:bg-opacity-90', 'focus:outline-none');
    }
    
    if (tagName === 'form') {
      predictions.push('space-y-4', 'p-6');
    }
    
    if (element.classList.contains('modal')) {
      predictions.push('fixed', 'inset-0', 'z-50', 'bg-black', 'bg-opacity-50');
    }

    return predictions;
  }

  // Setup predictive loading based on navigation patterns
  setupPredictiveLoading() {
    // Track navigation patterns
    let navigationHistory = [];
    
    window.addEventListener('popstate', () => {
      navigationHistory.push(window.location.pathname);
      this.predictRouteCSS(window.location.pathname);
    });

    // Preload CSS for likely next pages
    document.addEventListener('mouseover', (e) => {
      const link = e.target.closest('a[href]');
      if (link && !link.href.startsWith('javascript:')) {
        this.preloadRouteCSS(link.href);
      }
    });
  }

  // Predict CSS needed for a route
  predictRouteCSS(route) {
    const routePatterns = {
      '/dashboard': ['grid', 'gap-6', 'p-6'],
      '/profile': ['flex', 'flex-col', 'space-y-4'],
      '/settings': ['divide-y', 'space-y-6'],
      '/': ['hero', 'gradient', 'text-center']
    };

    const predictions = routePatterns[route] || [];
    predictions.forEach(utility => {
      this.loadUtilityCSS(utility);
    });
  }

  // Preload CSS for a route
  preloadRouteCSS(href) {
    const url = new URL(href, window.location.origin);
    this.predictRouteCSS(url.pathname);
  }

  // Get bundle size analytics
  getBundleAnalytics() {
    return {
      totalUtilities: this.usedUtilities.size,
      criticalUtilities: this.criticalCSS.size,
      loadedChunks: this.loadedChunks.size,
      unusedUtilities: this.getUnusedUtilities(),
      recommendations: this.getOptimizationRecommendations()
    };
  }

  // Get unused utilities for cleanup
  getUnusedUtilities() {
    const allUtilities = this.getAllAvailableUtilities();
    return allUtilities.filter(utility => !this.usedUtilities.has(utility));
  }

  // Get all available utilities (would be generated at build time)
  getAllAvailableUtilities() {
    // This would be populated from the build process
    return [];
  }

  // Get optimization recommendations
  getOptimizationRecommendations() {
    const recommendations = [];
    
    if (this.criticalCSS.size > 50) {
      recommendations.push('Consider splitting critical CSS into smaller chunks');
    }
    
    if (this.usedUtilities.size < 100) {
      recommendations.push('Bundle size is optimal for current usage');
    }
    
    return recommendations;
  }

  // Clean up
  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

// Initialize the optimizer
const performanceOptimizer = new PerformanceOptimizer();

// Export for use in build tools
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PerformanceOptimizer;
}
