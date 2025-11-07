/**
 * Visual Regression Testing Suite
 * Automated screenshot comparison and visual change detection
 */

class VisualRegressionTester {
    constructor() {
        this.baselineImages = new Map();
        this.testResults = [];
        this.threshold = 0.1; // 10% difference threshold
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
    }

    async captureElement(selector, testName) {
        const element = document.querySelector(selector);
        if (!element) {
            console.warn(`Element ${selector} not found for test ${testName}`);
            return null;
        }

        // Use html2canvas-like functionality with native APIs
        const rect = element.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;

        // Create image from element
        const imageData = await this.elementToImageData(element);
        return imageData;
    }

    async elementToImageData(element) {
        // Simplified image capture using DOM-to-canvas conversion
        const rect = element.getBoundingClientRect();
        const svg = `
            <svg xmlns="http://www.w3.org/2000/svg" width="${rect.width}" height="${rect.height}">
                <foreignObject width="100%" height="100%">
                    <div xmlns="http://www.w3.org/1999/xhtml" style="font-size: 14px;">
                        ${element.outerHTML}
                    </div>
                </foreignObject>
            </svg>
        `;
        
        const img = new Image();
        const blob = new Blob([svg], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        
        return new Promise((resolve) => {
            img.onload = () => {
                this.ctx.drawImage(img, 0, 0);
                const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
                URL.revokeObjectURL(url);
                resolve(imageData);
            };
            img.src = url;
        });
    }

    setBaseline(testName, imageData) {
        this.baselineImages.set(testName, imageData);
        localStorage.setItem(`vrt_baseline_${testName}`, JSON.stringify(Array.from(imageData.data)));
        console.log(`✓ Baseline set for test: ${testName}`);
    }

    loadBaseline(testName) {
        const stored = localStorage.getItem(`vrt_baseline_${testName}`);
        if (stored) {
            const data = new Uint8ClampedArray(JSON.parse(stored));
            const imageData = new ImageData(data, this.canvas.width, this.canvas.height);
            this.baselineImages.set(testName, imageData);
            return imageData;
        }
        return null;
    }

    compareImages(baseline, current) {
        if (!baseline || !current) return { match: false, difference: 1 };
        
        if (baseline.data.length !== current.data.length) {
            return { match: false, difference: 1 };
        }

        let diffPixels = 0;
        const totalPixels = baseline.data.length / 4;

        for (let i = 0; i < baseline.data.length; i += 4) {
            const rDiff = Math.abs(baseline.data[i] - current.data[i]);
            const gDiff = Math.abs(baseline.data[i + 1] - current.data[i + 1]);
            const bDiff = Math.abs(baseline.data[i + 2] - current.data[i + 2]);
            
            if (rDiff > 10 || gDiff > 10 || bDiff > 10) {
                diffPixels++;
            }
        }

        const difference = diffPixels / totalPixels;
        return {
            match: difference <= this.threshold,
            difference,
            diffPixels,
            totalPixels
        };
    }

    async runTest(selector, testName) {
        const current = await this.captureElement(selector, testName);
        if (!current) return null;

        let baseline = this.baselineImages.get(testName) || this.loadBaseline(testName);
        
        if (!baseline) {
            this.setBaseline(testName, current);
            return { status: 'baseline_created', testName };
        }

        const comparison = this.compareImages(baseline, current);
        const result = {
            testName,
            selector,
            timestamp: Date.now(),
            ...comparison
        };

        this.testResults.push(result);
        
        if (result.match) {
            console.log(`✓ Visual test passed: ${testName}`);
        } else {
            console.warn(`✗ Visual regression detected: ${testName} (${(result.difference * 100).toFixed(2)}% different)`);
        }

        return result;
    }

    async runTestSuite(tests) {
        console.log('🔍 Running visual regression test suite...');
        const results = [];
        
        for (const test of tests) {
            const result = await this.runTest(test.selector, test.name);
            if (result) results.push(result);
        }

        const passed = results.filter(r => r.match || r.status === 'baseline_created').length;
        const failed = results.filter(r => r.match === false).length;
        
        console.log(`📊 Test Results: ${passed} passed, ${failed} failed`);
        return { results, passed, failed };
    }

    generateReport() {
        const report = {
            timestamp: new Date().toISOString(),
            totalTests: this.testResults.length,
            passed: this.testResults.filter(r => r.match).length,
            failed: this.testResults.filter(r => !r.match).length,
            results: this.testResults
        };

        localStorage.setItem('vrt_last_report', JSON.stringify(report));
        return report;
    }

    clearBaselines() {
        this.baselineImages.clear();
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith('vrt_baseline_')) {
                localStorage.removeItem(key);
            }
        });
        console.log('🗑️ All baselines cleared');
    }
}

// Auto-initialize and expose globally
window.VisualRegressionTester = VisualRegressionTester;
window.vrt = new VisualRegressionTester();

console.log('📸 Visual Regression Tester loaded');
