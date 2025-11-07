// Interactive CSS Playground with Live Preview
class CSSPlayground {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.utilities = this.loadUtilities();
    this.init();
  }

  init() {
    this.createInterface();
    this.bindEvents();
  }

  loadUtilities() {
    return {
      spacing: ['p-1', 'p-2', 'p-4', 'm-1', 'm-2', 'm-4'],
      colors: ['text-primary', 'bg-primary', 'text-secondary', 'bg-secondary'],
      typography: ['text-sm', 'text-lg', 'font-bold', 'font-light'],
      layout: ['flex', 'grid', 'block', 'inline-block'],
      sizing: ['w-full', 'h-full', 'w-1/2', 'h-1/2']
    };
  }

  createInterface() {
    this.container.innerHTML = `
      <div class="playground-interface">
        <div class="playground-controls">
          <div class="utility-categories">
            ${Object.keys(this.utilities).map(category => `
              <div class="category">
                <h3>${category}</h3>
                <div class="utility-buttons">
                  ${this.utilities[category].map(utility => `
                    <button class="utility-btn" data-utility="${utility}">${utility}</button>
                  `).join('')}
                </div>
              </div>
            `).join('')}
          </div>
          <div class="custom-input">
            <textarea id="custom-css" placeholder="Add custom CSS classes..."></textarea>
            <button id="apply-custom">Apply</button>
          </div>
        </div>
        <div class="playground-preview">
          <div class="preview-element" id="preview-target">
            <h2>Preview Element</h2>
            <p>This element will reflect your utility class changes in real-time.</p>
            <button>Sample Button</button>
          </div>
          <div class="applied-classes">
            <strong>Applied Classes:</strong>
            <span id="class-list"></span>
          </div>
        </div>
        <div class="playground-output">
          <h3>Generated CSS</h3>
          <pre id="generated-css"></pre>
          <button id="copy-css">Copy CSS</button>
        </div>
      </div>
    `;
  }

  bindEvents() {
    const previewTarget = document.getElementById('preview-target');
    const classList = document.getElementById('class-list');
    const generatedCSS = document.getElementById('generated-css');
    
    // Utility button clicks
    this.container.addEventListener('click', (e) => {
      if (e.target.classList.contains('utility-btn')) {
        const utility = e.target.dataset.utility;
        this.toggleUtility(previewTarget, utility);
        this.updateDisplay(previewTarget, classList, generatedCSS);
      }
    });

    // Custom CSS application
    document.getElementById('apply-custom').addEventListener('click', () => {
      const customCSS = document.getElementById('custom-css').value;
      this.applyCustomCSS(previewTarget, customCSS);
      this.updateDisplay(previewTarget, classList, generatedCSS);
    });

    // Copy CSS functionality
    document.getElementById('copy-css').addEventListener('click', () => {
      navigator.clipboard.writeText(generatedCSS.textContent);
    });
  }

  toggleUtility(element, utility) {
    element.classList.toggle(utility);
  }

  applyCustomCSS(element, cssText) {
    const classes = cssText.split(/\s+/).filter(cls => cls.trim());
    classes.forEach(cls => {
      if (cls && !element.classList.contains(cls)) {
        element.classList.add(cls);
      }
    });
  }

  updateDisplay(element, classListElement, cssElement) {
    const classes = Array.from(element.classList);
    classListElement.textContent = classes.join(' ');
    
    // Generate CSS from applied classes
    const css = this.generateCSS(classes);
    cssElement.textContent = css;
  }

  generateCSS(classes) {
    const cssRules = [];
    
    classes.forEach(cls => {
      const rule = this.classToCSS(cls);
      if (rule) cssRules.push(rule);
    });

    return cssRules.join('\n\n');
  }

  classToCSS(className) {
    const cssMap = {
      // Spacing
      'p-1': 'padding: 0.25rem;',
      'p-2': 'padding: 0.5rem;',
      'p-4': 'padding: 1rem;',
      'm-1': 'margin: 0.25rem;',
      'm-2': 'margin: 0.5rem;',
      'm-4': 'margin: 1rem;',
      
      // Colors
      'text-primary': 'color: var(--color-primary);',
      'bg-primary': 'background-color: var(--color-primary);',
      'text-secondary': 'color: var(--color-secondary);',
      'bg-secondary': 'background-color: var(--color-secondary);',
      
      // Typography
      'text-sm': 'font-size: 0.875rem;',
      'text-lg': 'font-size: 1.125rem;',
      'font-bold': 'font-weight: 700;',
      'font-light': 'font-weight: 300;',
      
      // Layout
      'flex': 'display: flex;',
      'grid': 'display: grid;',
      'block': 'display: block;',
      'inline-block': 'display: inline-block;',
      
      // Sizing
      'w-full': 'width: 100%;',
      'h-full': 'height: 100%;',
      'w-1/2': 'width: 50%;',
      'h-1/2': 'height: 50%;'
    };

    return cssMap[className] ? `.${className} {\n  ${cssMap[className]}\n}` : null;
  }

  exportConfiguration() {
    const previewTarget = document.getElementById('preview-target');
    const classes = Array.from(previewTarget.classList);
    
    return {
      classes,
      css: this.generateCSS(classes),
      timestamp: new Date().toISOString()
    };
  }
}

// Auto-initialize if playground container exists
document.addEventListener('DOMContentLoaded', () => {
  const playgroundContainer = document.getElementById('css-playground');
  if (playgroundContainer) {
    window.cssPlayground = new CSSPlayground('css-playground');
  }
});
