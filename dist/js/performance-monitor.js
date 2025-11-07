// Real-time CSS Performance Monitor
class PerformanceMonitor {
  constructor() {
    this.metrics = {
      cssSize: 0,
      unusedCSS: 0,
      renderTime: 0,
      criticalCSS: 0
    };
    this.init();
  }

  init() {
    this.measureInitialMetrics();
    this.startMonitoring();
    this.createDashboard();
  }

  measureInitialMetrics() {
    // Measure CSS bundle size
    const stylesheets = Array.from(document.styleSheets);
    let totalSize = 0;
    
    stylesheets.forEach(sheet => {
      try {
        if (sheet.href) {
          fetch(sheet.href)
            .then(response => response.text())
            .then(css => {
              totalSize += css.length;
              this.metrics.cssSize = totalSize;
              this.updateDashboard();
            });
        }
      } catch (e) {
        // Handle CORS or other errors silently
      }
    });

    // Measure render performance
    this.measureRenderTime();
  }

  measureRenderTime() {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach(entry => {
        if (entry.entryType === 'paint') {
          this.metrics.renderTime = entry.startTime;
          this.updateDashboard();
        }
      });
    });

    try {
      observer.observe({ entryTypes: ['paint'] });
    } catch (e) {
      // Fallback for browsers without PerformanceObserver
      this.metrics.renderTime = performance.now();
    }
  }

  analyzeUnusedCSS() {
    const usedSelectors = new Set();
    const allSelectors = new Set();

    // Collect all CSS selectors
    Array.from(document.styleSheets).forEach(sheet => {
      try {
        Array.from(sheet.cssRules).forEach(rule => {
          if (rule.selectorText) {
            allSelectors.add(rule.selectorText);
            
            // Check if selector is used
            try {
              if (document.querySelector(rule.selectorText)) {
                usedSelectors.add(rule.selectorText);
              }
            } catch (e) {
              // Invalid selector, skip
            }
          }
        });
      } catch (e) {
        // Handle CORS errors
      }
    });

    const unusedCount = allSelectors.size - usedSelectors.size;
    const unusedPercentage = (unusedCount / allSelectors.size) * 100;
    
    this.metrics.unusedCSS = Math.round(unusedPercentage);
    return { unusedCount, totalCount: allSelectors.size, percentage: unusedPercentage };
  }

  identifyCriticalCSS() {
    const criticalSelectors = [];
    const viewportHeight = window.innerHeight;

    // Find elements in viewport
    const elementsInView = Array.from(document.querySelectorAll('*')).filter(el => {
      const rect = el.getBoundingClientRect();
      return rect.top < viewportHeight && rect.bottom > 0;
    });

    // Extract CSS rules for visible elements
    elementsInView.forEach(el => {
      const computedStyle = window.getComputedStyle(el);
      // Simplified critical CSS identification
      if (computedStyle.display !== 'none' && computedStyle.visibility !== 'hidden') {
        criticalSelectors.push(el.tagName.toLowerCase());
      }
    });

    this.metrics.criticalCSS = criticalSelectors.length;
    return criticalSelectors;
  }

  startMonitoring() {
    // Monitor every 5 seconds
    setInterval(() => {
      this.analyzeUnusedCSS();
      this.identifyCriticalCSS();
      this.updateDashboard();
    }, 5000);

    // Monitor on scroll for critical CSS changes
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        this.identifyCriticalCSS();
        this.updateDashboard();
      }, 100);
    });
  }

  createDashboard() {
    const dashboard = document.createElement('div');
    dashboard.id = 'performance-dashboard';
    dashboard.innerHTML = `
      <div class="perf-dashboard">
        <h3>CSS Performance Monitor</h3>
        <div class="metrics">
          <div class="metric">
            <span class="label">CSS Size:</span>
            <span class="value" id="css-size">0 KB</span>
          </div>
          <div class="metric">
            <span class="label">Unused CSS:</span>
            <span class="value" id="unused-css">0%</span>
          </div>
          <div class="metric">
            <span class="label">Render Time:</span>
            <span class="value" id="render-time">0ms</span>
          </div>
          <div class="metric">
            <span class="label">Critical Elements:</span>
            <span class="value" id="critical-css">0</span>
          </div>
        </div>
        <div class="recommendations" id="recommendations"></div>
      </div>
    `;

    // Add minimal styling
    dashboard.style.cssText = `
      position: fixed;
      top: 10px;
      right: 10px;
      background: rgba(0,0,0,0.9);
      color: white;
      padding: 15px;
      border-radius: 8px;
      font-family: monospace;
      font-size: 12px;
      z-index: 10000;
      max-width: 250px;
    `;

    document.body.appendChild(dashboard);
  }

  updateDashboard() {
    const sizeEl = document.getElementById('css-size');
    const unusedEl = document.getElementById('unused-css');
    const renderEl = document.getElementById('render-time');
    const criticalEl = document.getElementById('critical-css');
    const recommendationsEl = document.getElementById('recommendations');

    if (sizeEl) sizeEl.textContent = `${Math.round(this.metrics.cssSize / 1024)} KB`;
    if (unusedEl) unusedEl.textContent = `${this.metrics.unusedCSS}%`;
    if (renderEl) renderEl.textContent = `${Math.round(this.metrics.renderTime)}ms`;
    if (criticalEl) criticalEl.textContent = this.metrics.criticalCSS;

    // Generate recommendations
    const recommendations = this.generateRecommendations();
    if (recommendationsEl) {
      recommendationsEl.innerHTML = recommendations.length > 0 
        ? `<strong>Recommendations:</strong><ul>${recommendations.map(r => `<li>${r}</li>`).join('')}</ul>`
        : '';
    }
  }

  generateRecommendations() {
    const recommendations = [];

    if (this.metrics.unusedCSS > 30) {
      recommendations.push('Consider removing unused CSS to reduce bundle size');
    }

    if (this.metrics.cssSize > 100000) { // 100KB
      recommendations.push('CSS bundle is large, consider code splitting');
    }

    if (this.metrics.renderTime > 1000) {
      recommendations.push('Slow render time detected, optimize critical CSS');
    }

    return recommendations;
  }

  exportMetrics() {
    return {
      ...this.metrics,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent
    };
  }
}

// Initialize performance monitor
window.performanceMonitor = new PerformanceMonitor();
