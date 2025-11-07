// Intelligent Performance Budgets
class PerformanceBudgets {
  constructor() {
    this.budgets = {
      cssSize: 50000, // 50KB
      unusedCSS: 20, // 20%
      renderTime: 100, // 100ms
      criticalCSS: 14000 // 14KB
    };
    this.violations = [];
    this.init();
  }

  init() {
    this.monitorBudgets();
    this.setupOptimizations();
    this.createBudgetDashboard();
  }

  monitorBudgets() {
    // Monitor CSS bundle size
    this.checkCSSSize();
    
    // Monitor unused CSS
    this.detectUnusedCSS();
    
    // Monitor render performance
    this.measureRenderMetrics();
    
    // Set up continuous monitoring
    setInterval(() => this.runBudgetCheck(), 5000);
  }

  checkCSSSize() {
    let totalSize = 0;
    const stylesheets = Array.from(document.styleSheets);
    
    stylesheets.forEach(sheet => {
      if (sheet.href && !sheet.href.includes('node_modules')) {
        fetch(sheet.href)
          .then(response => response.text())
          .then(css => {
            totalSize += css.length;
            if (totalSize > this.budgets.cssSize) {
              this.reportViolation('cssSize', totalSize, this.budgets.cssSize);
            }
          })
          .catch(() => {});
      }
    });
  }

  detectUnusedCSS() {
    const usedSelectors = new Set();
    const allSelectors = new Set();
    
    // Collect all CSS selectors
    Array.from(document.styleSheets).forEach(sheet => {
      try {
        Array.from(sheet.cssRules || []).forEach(rule => {
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
        // CORS or other errors
      }
    });
    
    const unusedPercentage = ((allSelectors.size - usedSelectors.size) / allSelectors.size) * 100;
    
    if (unusedPercentage > this.budgets.unusedCSS) {
      this.reportViolation('unusedCSS', unusedPercentage, this.budgets.unusedCSS);
      this.suggestOptimizations(Array.from(allSelectors).filter(s => !usedSelectors.has(s)));
    }
  }

  measureRenderMetrics() {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach(entry => {
        if (entry.name === 'first-contentful-paint' && entry.startTime > this.budgets.renderTime) {
          this.reportViolation('renderTime', entry.startTime, this.budgets.renderTime);
        }
      });
    });
    
    observer.observe({ entryTypes: ['paint'] });
  }

  reportViolation(type, actual, budget) {
    const violation = {
      type,
      actual,
      budget,
      timestamp: Date.now(),
      severity: this.calculateSeverity(actual, budget)
    };
    
    this.violations.push(violation);
    this.updateDashboard();
    
    if (violation.severity === 'critical') {
      this.triggerAutoOptimization(type);
    }
  }

  calculateSeverity(actual, budget) {
    const ratio = actual / budget;
    if (ratio > 2) return 'critical';
    if (ratio > 1.5) return 'warning';
    return 'info';
  }

  triggerAutoOptimization(type) {
    switch (type) {
      case 'unusedCSS':
        this.removeUnusedCSS();
        break;
      case 'cssSize':
        this.compressCSS();
        break;
      case 'renderTime':
        this.optimizeRender();
        break;
    }
  }

  removeUnusedCSS() {
    // Create optimized stylesheet
    const optimizedCSS = this.generateOptimizedCSS();
    
    // Inject optimized CSS
    const style = document.createElement('style');
    style.textContent = optimizedCSS;
    style.id = 'optimized-css';
    document.head.appendChild(style);
    
    console.log('🚀 Auto-optimization: Unused CSS removed');
  }

  generateOptimizedCSS() {
    const usedRules = [];
    
    Array.from(document.styleSheets).forEach(sheet => {
      try {
        Array.from(sheet.cssRules || []).forEach(rule => {
          if (rule.selectorText) {
            try {
              if (document.querySelector(rule.selectorText)) {
                usedRules.push(rule.cssText);
              }
            } catch (e) {
              // Keep rule if selector is invalid (might be pseudo-selector)
              usedRules.push(rule.cssText);
            }
          } else {
            // Keep non-selector rules (media queries, keyframes, etc.)
            usedRules.push(rule.cssText);
          }
        });
      } catch (e) {}
    });
    
    return usedRules.join('\n');
  }

  createBudgetDashboard() {
    if (document.getElementById('budget-dashboard')) return;
    
    const dashboard = document.createElement('div');
    dashboard.id = 'budget-dashboard';
    dashboard.innerHTML = `
      <div style="position: fixed; bottom: 20px; left: 20px; background: #1f2937; color: white; padding: 1rem; border-radius: 8px; font-family: monospace; z-index: 1000; max-width: 300px;">
        <h3 style="margin: 0 0 10px 0; color: #60a5fa;">Performance Budgets</h3>
        <div id="budget-metrics"></div>
        <div id="budget-violations" style="margin-top: 10px;"></div>
      </div>
    `;
    document.body.appendChild(dashboard);
    this.updateDashboard();
  }

  updateDashboard() {
    const metricsDiv = document.getElementById('budget-metrics');
    const violationsDiv = document.getElementById('budget-violations');
    
    if (!metricsDiv || !violationsDiv) return;
    
    // Update metrics
    metricsDiv.innerHTML = Object.entries(this.budgets).map(([key, value]) => 
      `<div style="margin: 5px 0;">${key}: ${value}${key.includes('Size') ? 'B' : key.includes('CSS') ? '%' : 'ms'}</div>`
    ).join('');
    
    // Update violations
    const recentViolations = this.violations.slice(-3);
    violationsDiv.innerHTML = recentViolations.map(v => 
      `<div style="margin: 5px 0; color: ${v.severity === 'critical' ? '#ef4444' : '#f59e0b'};">
        ⚠️ ${v.type}: ${Math.round(v.actual)} > ${v.budget}
      </div>`
    ).join('');
  }

  runBudgetCheck() {
    this.checkCSSSize();
    this.detectUnusedCSS();
  }

  suggestOptimizations(unusedSelectors) {
    console.group('🎯 Performance Optimization Suggestions');
    console.log(`Found ${unusedSelectors.length} unused selectors`);
    console.log('Consider removing:', unusedSelectors.slice(0, 5));
    console.groupEnd();
  }
}

// Auto-initialize
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    new PerformanceBudgets();
  });
}
