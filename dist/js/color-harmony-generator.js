/**
 * Dynamic Color Harmony Generator
 * Intelligent color palette creation with accessibility compliance
 */

class ColorHarmonyGenerator {
    constructor() {
        this.harmonies = {
            monochromatic: (h, s, l) => this.generateMonochromatic(h, s, l),
            analogous: (h, s, l) => this.generateAnalogous(h, s, l),
            complementary: (h, s, l) => this.generateComplementary(h, s, l),
            triadic: (h, s, l) => this.generateTriadic(h, s, l),
            tetradic: (h, s, l) => this.generateTetradic(h, s, l)
        };
        this.wcagLevels = { AA: 4.5, AAA: 7 };
    }

    hexToHsl(hex) {
        const r = parseInt(hex.slice(1, 3), 16) / 255;
        const g = parseInt(hex.slice(3, 5), 16) / 255;
        const b = parseInt(hex.slice(5, 7), 16) / 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }

        return [h * 360, s * 100, l * 100];
    }

    hslToHex(h, s, l) {
        h /= 360; s /= 100; l /= 100;
        const c = (1 - Math.abs(2 * l - 1)) * s;
        const x = c * (1 - Math.abs((h * 6) % 2 - 1));
        const m = l - c / 2;
        let r, g, b;

        if (h < 1/6) [r, g, b] = [c, x, 0];
        else if (h < 2/6) [r, g, b] = [x, c, 0];
        else if (h < 3/6) [r, g, b] = [0, c, x];
        else if (h < 4/6) [r, g, b] = [0, x, c];
        else if (h < 5/6) [r, g, b] = [x, 0, c];
        else [r, g, b] = [c, 0, x];

        r = Math.round((r + m) * 255);
        g = Math.round((g + m) * 255);
        b = Math.round((b + m) * 255);

        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    }

    generateMonochromatic(h, s, l) {
        return [
            this.hslToHex(h, s, Math.max(10, l - 40)),
            this.hslToHex(h, s, Math.max(20, l - 20)),
            this.hslToHex(h, s, l),
            this.hslToHex(h, s, Math.min(80, l + 20)),
            this.hslToHex(h, s, Math.min(90, l + 40))
        ];
    }

    generateAnalogous(h, s, l) {
        return [
            this.hslToHex((h - 30 + 360) % 360, s, l),
            this.hslToHex((h - 15 + 360) % 360, s, l),
            this.hslToHex(h, s, l),
            this.hslToHex((h + 15) % 360, s, l),
            this.hslToHex((h + 30) % 360, s, l)
        ];
    }

    generateComplementary(h, s, l) {
        const complement = (h + 180) % 360;
        return [
            this.hslToHex(h, s, Math.max(20, l - 20)),
            this.hslToHex(h, s, l),
            this.hslToHex(h, s, Math.min(80, l + 20)),
            this.hslToHex(complement, s, l),
            this.hslToHex(complement, s, Math.max(20, l - 20))
        ];
    }

    generateTriadic(h, s, l) {
        return [
            this.hslToHex(h, s, l),
            this.hslToHex((h + 120) % 360, s, l),
            this.hslToHex((h + 240) % 360, s, l),
            this.hslToHex(h, Math.max(20, s - 20), l),
            this.hslToHex((h + 120) % 360, Math.max(20, s - 20), l)
        ];
    }

    generateTetradic(h, s, l) {
        return [
            this.hslToHex(h, s, l),
            this.hslToHex((h + 90) % 360, s, l),
            this.hslToHex((h + 180) % 360, s, l),
            this.hslToHex((h + 270) % 360, s, l),
            this.hslToHex(h, Math.max(30, s - 30), Math.min(70, l + 10))
        ];
    }

    getContrastRatio(color1, color2) {
        const getLuminance = (hex) => {
            const rgb = [hex.slice(1, 3), hex.slice(3, 5), hex.slice(5, 7)]
                .map(x => parseInt(x, 16) / 255)
                .map(x => x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4));
            return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
        };

        const l1 = getLuminance(color1);
        const l2 = getLuminance(color2);
        return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
    }

    generateAccessiblePalette(baseColor, harmonyType = 'monochromatic') {
        const [h, s, l] = this.hexToHsl(baseColor);
        const colors = this.harmonies[harmonyType](h, s, l);
        
        // Generate accessible variations
        const palette = {
            primary: colors[2] || baseColor,
            secondary: colors[1] || this.hslToHex(h, s, Math.max(20, l - 20)),
            accent: colors[3] || this.hslToHex((h + 30) % 360, s, l),
            background: '#ffffff',
            surface: '#f8f9fa',
            text: '#212529',
            textSecondary: '#6c757d'
        };

        // Ensure WCAG AA compliance
        if (this.getContrastRatio(palette.text, palette.background) < this.wcagLevels.AA) {
            palette.text = '#000000';
        }
        if (this.getContrastRatio(palette.textSecondary, palette.background) < this.wcagLevels.AA) {
            palette.textSecondary = '#495057';
        }

        return { colors, palette, harmonyType };
    }

    applyPalette(palette) {
        const root = document.documentElement;
        Object.entries(palette.palette).forEach(([key, value]) => {
            root.style.setProperty(`--color-${key}`, value);
        });
        
        console.log(`🎨 Applied ${palette.harmonyType} color harmony:`, palette.palette);
        return palette;
    }

    generateSemanticTokens(baseColor) {
        const [h, s, l] = this.hexToHsl(baseColor);
        
        return {
            success: this.hslToHex(120, 60, 45),
            warning: this.hslToHex(45, 85, 55),
            error: this.hslToHex(0, 70, 50),
            info: this.hslToHex(210, 70, 55),
            neutral: {
                50: this.hslToHex(h, 10, 95),
                100: this.hslToHex(h, 10, 90),
                200: this.hslToHex(h, 10, 80),
                300: this.hslToHex(h, 10, 70),
                400: this.hslToHex(h, 10, 60),
                500: this.hslToHex(h, 10, 50),
                600: this.hslToHex(h, 10, 40),
                700: this.hslToHex(h, 10, 30),
                800: this.hslToHex(h, 10, 20),
                900: this.hslToHex(h, 10, 10)
            }
        };
    }

    analyzeColorPsychology(color) {
        const [h] = this.hexToHsl(color);
        
        if (h >= 0 && h < 30) return { mood: 'energetic', emotion: 'passion', use: 'call-to-action' };
        if (h >= 30 && h < 60) return { mood: 'optimistic', emotion: 'happiness', use: 'warnings' };
        if (h >= 60 && h < 120) return { mood: 'natural', emotion: 'growth', use: 'success' };
        if (h >= 120 && h < 180) return { mood: 'calming', emotion: 'trust', use: 'primary' };
        if (h >= 180 && h < 240) return { mood: 'professional', emotion: 'stability', use: 'corporate' };
        if (h >= 240 && h < 300) return { mood: 'creative', emotion: 'luxury', use: 'premium' };
        return { mood: 'romantic', emotion: 'femininity', use: 'beauty' };
    }

    exportPalette(palette, format = 'css') {
        if (format === 'css') {
            return `:root {\n${Object.entries(palette.palette)
                .map(([key, value]) => `  --color-${key}: ${value};`)
                .join('\n')}\n}`;
        }
        if (format === 'json') {
            return JSON.stringify(palette, null, 2);
        }
        return palette;
    }
}

// Auto-initialize and expose globally
window.ColorHarmonyGenerator = ColorHarmonyGenerator;
window.colorHarmony = new ColorHarmonyGenerator();

console.log('🎨 Color Harmony Generator loaded');
