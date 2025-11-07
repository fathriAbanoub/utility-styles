// Performance-First Utility Optimizer
class UtilityOptimizer {
  constructor() {
    this.usedClasses = new Set();
    this.observer = null;
    this.init();
  }

  init() {
    this.scanExistingClasses();
    this.setupMutationObserver();
    this.setupPerformanceMonitoring();
  }

  scanExistingClasses() {
    // Scan all elements for utility classes
    document.querySelectorAll('*').forEach(element => {
      if (element.className) {
        element.className.split(' ').forEach(className => {
          if (this.isUtilityClass(className)) {
            this.usedClasses.add(className);
          }
        });
      }
    });
  }

  setupMutationObserver() {
    this.observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const element = mutation.target;
          if (element.className) {
            element.className.split(' ').forEach(className => {
              if (this.isUtilityClass(className)) {
                this.usedClasses.add(className);
              }
            });
          }
        }
        
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              this.scanElement(node);
            }
          });
        }
      });
    });

    this.observer.observe(document.body, {
      attributes: true,
      childList: true,
      subtree: true,
      attributeFilter: ['class']
    });
  }

  scanElement(element) {
    if (element.className) {
      element.className.split(' ').forEach(className => {
        if (this.isUtilityClass(className)) {
          this.usedClasses.add(className);
        }
      });
    }
    
    // Scan children
    element.querySelectorAll('*').forEach(child => {
      if (child.className) {
        child.className.split(' ').forEach(className => {
          if (this.isUtilityClass(className)) {
            this.usedClasses.add(className);
          }
        });
      }
    });
  }

  isUtilityClass(className) {
    // Define utility class patterns
    const utilityPatterns = [
      /^(flex|grid|block|inline|hidden)$/,
      /^(p|m|px|py|mx|my)-\d+$/,
      /^text-(left|center|right|justify)$/,
      /^font-(light|normal|medium|semibold|bold)$/,
      /^text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl)$/,
      /^(w|h)-(full|auto|\d+)$/,
      /^(top|bottom|left|right)-\d+$/,
      /^z-\d+$/,
      /^opacity-\d+$/,
      /^rounded(-\w+)?$/,
      /^shadow(-\w+)?$/,
      /^transition$/,
      /^cursor-\w+$/,
      /^(sm|md|lg|xl):/
    ];

    return utilityPatterns.some(pattern => pattern.test(className));
  }

  setupPerformanceMonitoring() {
    // Monitor CSS performance
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach(entry => {
          if (entry.entryType === 'measure' && entry.name.includes('css')) {
            console.log(`CSS Performance: ${entry.name} took ${entry.duration}ms`);
          }
        });
      });
      
      observer.observe({ entryTypes: ['measure'] });
    }
  }

  // Get usage statistics
  getUsageStats() {
    return {
      totalUsedClasses: this.usedClasses.size,
      usedClasses: Array.from(this.usedClasses),
      timestamp: Date.now()
    };
  }

  // Critical CSS extraction
  extractCriticalCSS() {
    const criticalClasses = new Set();
    
    // Get above-the-fold elements
    const viewportHeight = window.innerHeight;
    document.querySelectorAll('*').forEach(element => {
      const rect = element.getBoundingClientRect();
      if (rect.top < viewportHeight) {
        if (element.className) {
          element.className.split(' ').forEach(className => {
            if (this.isUtilityClass(className)) {
              criticalClasses.add(className);
            }
          });
        }
      }
    });

    return Array.from(criticalClasses);
  }

  // Predictive loading based on navigation patterns
  predictNextClasses(currentPath) {
    const predictions = {
      '/': ['flex', 'flex-center', 'text-center', 'font-heading'],
      '/products': ['grid', 'gap-4', 'p-4', 'shadow-md'],
      '/product': ['flex-col', 'gap-6', 'font-price', 'font-button'],
      '/cart': ['flex', 'justify-between', 'font-medium', 'text-lg']
    };

    return predictions[currentPath] || [];
  }
}

// Auto-initialize optimizer
const utilityOptimizer = new UtilityOptimizer();

// Export for global access
window.UtilityOptimizer = UtilityOptimizer;
window.utilityOptimizer = utilityOptimizer;
