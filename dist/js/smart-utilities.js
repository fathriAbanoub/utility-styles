// Smart Utility Generator with Pattern Recognition
class SmartUtilities {
  constructor() {
    this.patterns = this.loadCommonPatterns();
    this.conflicts = this.loadConflictRules();
    this.usage = this.loadUsageStats();
    this.init();
  }

  init() {
    this.observeClassUsage();
    this.createSuggestionInterface();
  }

  loadCommonPatterns() {
    return {
      'card': ['bg-white', 'rounded-lg', 'shadow-md', 'p-6'],
      'button-primary': ['bg-blue-500', 'text-white', 'px-4', 'py-2', 'rounded'],
      'flex-center': ['flex', 'items-center', 'justify-center'],
      'grid-responsive': ['grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3'],
      'text-heading': ['text-2xl', 'font-bold', 'text-gray-900'],
      'input-field': ['border', 'border-gray-300', 'rounded', 'px-3', 'py-2']
    };
  }

  loadConflictRules() {
    return {
      display: ['block', 'inline', 'flex', 'grid', 'hidden'],
      position: ['static', 'relative', 'absolute', 'fixed', 'sticky'],
      textAlign: ['text-left', 'text-center', 'text-right', 'text-justify'],
      fontSize: ['text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl'],
      fontWeight: ['font-thin', 'font-light', 'font-normal', 'font-medium', 'font-bold']
    };
  }

  loadUsageStats() {
    try {
      return JSON.parse(localStorage.getItem('utilityUsageStats') || '{}');
    } catch {
      return {};
    }
  }

  observeClassUsage() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const element = mutation.target;
          const classes = Array.from(element.classList);
          this.recordUsage(classes);
        }
      });
    });

    observer.observe(document.body, {
      attributes: true,
      subtree: true,
      attributeFilter: ['class']
    });
  }

  recordUsage(classes) {
    classes.forEach(cls => {
      this.usage[cls] = (this.usage[cls] || 0) + 1;
    });

    // Save usage stats periodically
    if (Math.random() < 0.1) { // 10% chance to save
      try {
        localStorage.setItem('utilityUsageStats', JSON.stringify(this.usage));
      } catch {}
    }
  }

  suggestClasses(currentClasses = []) {
    const suggestions = [];

    // Pattern-based suggestions
    Object.entries(this.patterns).forEach(([patternName, patternClasses]) => {
      const matchCount = patternClasses.filter(cls => currentClasses.includes(cls)).length;
      if (matchCount > 0 && matchCount < patternClasses.length) {
        const missing = patternClasses.filter(cls => !currentClasses.includes(cls));
        suggestions.push({
          type: 'pattern',
          pattern: patternName,
          classes: missing,
          confidence: matchCount / patternClasses.length
        });
      }
    });

    // Usage-based suggestions
    const popularClasses = Object.entries(this.usage)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([cls]) => cls)
      .filter(cls => !currentClasses.includes(cls));

    if (popularClasses.length > 0) {
      suggestions.push({
        type: 'popular',
        classes: popularClasses.slice(0, 3),
        confidence: 0.7
      });
    }

    return suggestions.sort((a, b) => b.confidence - a.confidence);
  }

  detectConflicts(classes) {
    const conflicts = [];

    Object.entries(this.conflicts).forEach(([category, conflictingClasses]) => {
      const presentClasses = classes.filter(cls => conflictingClasses.includes(cls));
      if (presentClasses.length > 1) {
        conflicts.push({
          category,
          conflicting: presentClasses,
          suggestion: `Keep only one ${category} class: ${presentClasses[presentClasses.length - 1]}`
        });
      }
    });

    return conflicts;
  }

  optimizeClasses(classes) {
    const optimized = [...classes];
    const conflicts = this.detectConflicts(classes);

    // Remove conflicting classes (keep the last one)
    conflicts.forEach(conflict => {
      conflict.conflicting.slice(0, -1).forEach(cls => {
        const index = optimized.indexOf(cls);
        if (index > -1) optimized.splice(index, 1);
      });
    });

    return {
      optimized,
      removed: classes.filter(cls => !optimized.includes(cls)),
      conflicts
    };
  }

  createSuggestionInterface() {
    const interface = document.createElement('div');
    interface.id = 'smart-utilities-interface';
    interface.innerHTML = `
      <div class="smart-utilities">
        <h3>Smart Utility Assistant</h3>
        <div class="current-classes">
          <label>Current Classes:</label>
          <input type="text" id="class-input" placeholder="Enter classes separated by spaces">
          <button id="analyze-btn">Analyze</button>
        </div>
        <div class="suggestions" id="suggestions"></div>
        <div class="conflicts" id="conflicts"></div>
        <div class="optimized" id="optimized"></div>
      </div>
    `;

    interface.style.cssText = `
      position: fixed;
      bottom: 10px;
      left: 10px;
      background: white;
      border: 1px solid #ccc;
      border-radius: 8px;
      padding: 15px;
      max-width: 400px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      font-family: system-ui, sans-serif;
      font-size: 14px;
      z-index: 9999;
    `;

    document.body.appendChild(interface);
    this.bindInterfaceEvents();
  }

  bindInterfaceEvents() {
    const input = document.getElementById('class-input');
    const analyzeBtn = document.getElementById('analyze-btn');

    analyzeBtn.addEventListener('click', () => {
      const classes = input.value.split(/\s+/).filter(cls => cls.trim());
      this.analyzeAndDisplay(classes);
    });

    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const classes = input.value.split(/\s+/).filter(cls => cls.trim());
        this.analyzeAndDisplay(classes);
      }
    });
  }

  analyzeAndDisplay(classes) {
    const suggestions = this.suggestClasses(classes);
    const conflicts = this.detectConflicts(classes);
    const optimization = this.optimizeClasses(classes);

    // Display suggestions
    const suggestionsEl = document.getElementById('suggestions');
    suggestionsEl.innerHTML = suggestions.length > 0 
      ? `<h4>Suggestions:</h4>${suggestions.map(s => 
          `<div class="suggestion">
            <strong>${s.type}:</strong> ${s.classes.join(', ')}
            ${s.pattern ? `(${s.pattern} pattern)` : ''}
          </div>`
        ).join('')}`
      : '<p>No suggestions available</p>';

    // Display conflicts
    const conflictsEl = document.getElementById('conflicts');
    conflictsEl.innerHTML = conflicts.length > 0
      ? `<h4>Conflicts:</h4>${conflicts.map(c => 
          `<div class="conflict">
            <strong>${c.category}:</strong> ${c.conflicting.join(', ')}
            <br><em>${c.suggestion}</em>
          </div>`
        ).join('')}`
      : '';

    // Display optimization
    const optimizedEl = document.getElementById('optimized');
    if (optimization.removed.length > 0) {
      optimizedEl.innerHTML = `
        <h4>Optimized:</h4>
        <div>Optimized: ${optimization.optimized.join(' ')}</div>
        <div>Removed: ${optimization.removed.join(', ')}</div>
      `;
    } else {
      optimizedEl.innerHTML = '<p>Classes are already optimized</p>';
    }
  }

  generateComponent(patternName) {
    const pattern = this.patterns[patternName];
    if (!pattern) return null;

    return {
      name: patternName,
      classes: pattern,
      html: `<div class="${pattern.join(' ')}"><!-- ${patternName} component --></div>`,
      css: pattern.map(cls => `.${cls}`).join(', ') + ' { /* Generated component */ }'
    };
  }

  exportAnalytics() {
    return {
      usage: this.usage,
      patterns: this.patterns,
      totalClasses: Object.keys(this.usage).length,
      mostUsed: Object.entries(this.usage)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10),
      timestamp: new Date().toISOString()
    };
  }
}

// Initialize smart utilities
window.smartUtilities = new SmartUtilities();
