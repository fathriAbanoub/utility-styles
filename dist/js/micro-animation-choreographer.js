/**
 * Micro-Animation Choreographer
 * Coordinated micro-animations with performance monitoring
 */

class MicroAnimationChoreographer {
    constructor() {
        this.animations = new Map();
        this.sequences = new Map();
        this.performanceMonitor = { frameDrops: 0, avgFPS: 60 };
        this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.observer = new IntersectionObserver(this.handleIntersection.bind(this));
    }

    createAnimation(element, keyframes, options = {}) {
        if (this.isReducedMotion && !options.respectMotionPreference === false) {
            return null;
        }

        const defaultOptions = {
            duration: 300,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            fill: 'both'
        };

        const animation = element.animate(keyframes, { ...defaultOptions, ...options });
        const id = `anim_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        this.animations.set(id, { animation, element, keyframes, options });
        this.monitorPerformance(animation);
        
        return { id, animation };
    }

    // Predefined animation patterns
    fadeIn(element, options = {}) {
        return this.createAnimation(element, [
            { opacity: 0, transform: 'translateY(10px)' },
            { opacity: 1, transform: 'translateY(0)' }
        ], { duration: 250, ...options });
    }

    slideIn(element, direction = 'left', options = {}) {
        const transforms = {
            left: ['translateX(-20px)', 'translateX(0)'],
            right: ['translateX(20px)', 'translateX(0)'],
            up: ['translateY(20px)', 'translateY(0)'],
            down: ['translateY(-20px)', 'translateY(0)']
        };

        return this.createAnimation(element, [
            { opacity: 0, transform: transforms[direction][0] },
            { opacity: 1, transform: transforms[direction][1] }
        ], { duration: 300, ...options });
    }

    bounce(element, options = {}) {
        return this.createAnimation(element, [
            { transform: 'scale(1)' },
            { transform: 'scale(1.05)' },
            { transform: 'scale(0.95)' },
            { transform: 'scale(1)' }
        ], { duration: 400, ...options });
    }

    pulse(element, options = {}) {
        return this.createAnimation(element, [
            { transform: 'scale(1)', opacity: 1 },
            { transform: 'scale(1.02)', opacity: 0.8 },
            { transform: 'scale(1)', opacity: 1 }
        ], { duration: 600, iterationCount: Infinity, ...options });
    }

    shake(element, options = {}) {
        return this.createAnimation(element, [
            { transform: 'translateX(0)' },
            { transform: 'translateX(-5px)' },
            { transform: 'translateX(5px)' },
            { transform: 'translateX(-3px)' },
            { transform: 'translateX(3px)' },
            { transform: 'translateX(0)' }
        ], { duration: 400, ...options });
    }

    // Animation sequences
    createSequence(name, animations) {
        this.sequences.set(name, animations);
        return name;
    }

    async playSequence(name, delay = 100) {
        const sequence = this.sequences.get(name);
        if (!sequence) {
            console.warn(`Sequence ${name} not found`);
            return;
        }

        for (let i = 0; i < sequence.length; i++) {
            const { element, animation, options = {} } = sequence[i];
            
            if (element && animation) {
                this[animation](element, options);
                if (i < sequence.length - 1) {
                    await new Promise(resolve => setTimeout(resolve, delay));
                }
            }
        }
    }

    // Stagger animations
    staggerElements(elements, animation, options = {}) {
        const staggerDelay = options.staggerDelay || 100;
        const results = [];

        elements.forEach((element, index) => {
            setTimeout(() => {
                const result = this[animation](element, {
                    ...options,
                    delay: (options.delay || 0) + (index * staggerDelay)
                });
                results.push(result);
            }, index * staggerDelay);
        });

        return results;
    }

    // Intersection-based animations
    animateOnScroll(element, animation, options = {}) {
        const animationData = { element, animation, options, triggered: false };
        element.dataset.scrollAnimation = JSON.stringify(animationData);
        this.observer.observe(element);
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const animationData = JSON.parse(entry.target.dataset.scrollAnimation || '{}');
                if (!animationData.triggered) {
                    this[animationData.animation](entry.target, animationData.options);
                    animationData.triggered = true;
                    entry.target.dataset.scrollAnimation = JSON.stringify(animationData);
                }
            }
        });
    }

    // Performance monitoring
    monitorPerformance(animation) {
        let lastTime = performance.now();
        let frameCount = 0;
        
        const checkFrame = () => {
            const currentTime = performance.now();
            const deltaTime = currentTime - lastTime;
            
            if (deltaTime > 16.67) { // More than 60fps threshold
                this.performanceMonitor.frameDrops++;
            }
            
            frameCount++;
            if (frameCount % 60 === 0) {
                this.performanceMonitor.avgFPS = 1000 / (deltaTime / 60);
            }
            
            lastTime = currentTime;
            
            if (animation.playState === 'running') {
                requestAnimationFrame(checkFrame);
            }
        };
        
        requestAnimationFrame(checkFrame);
    }

    // Utility methods
    pauseAll() {
        this.animations.forEach(({ animation }) => animation.pause());
    }

    resumeAll() {
        this.animations.forEach(({ animation }) => animation.play());
    }

    cancelAll() {
        this.animations.forEach(({ animation }) => animation.cancel());
        this.animations.clear();
    }

    getPerformanceReport() {
        return {
            frameDrops: this.performanceMonitor.frameDrops,
            avgFPS: Math.round(this.performanceMonitor.avgFPS),
            activeAnimations: this.animations.size,
            reducedMotion: this.isReducedMotion
        };
    }

    // Auto-setup for common patterns
    setupHoverAnimations() {
        document.querySelectorAll('[data-hover-animation]').forEach(element => {
            const animationType = element.dataset.hoverAnimation;
            
            element.addEventListener('mouseenter', () => {
                if (this[animationType]) {
                    this[animationType](element, { duration: 200 });
                }
            });
        });
    }

    setupClickAnimations() {
        document.querySelectorAll('[data-click-animation]').forEach(element => {
            const animationType = element.dataset.clickAnimation;
            
            element.addEventListener('click', () => {
                if (this[animationType]) {
                    this[animationType](element, { duration: 150 });
                }
            });
        });
    }

    // Initialize common animations
    init() {
        this.setupHoverAnimations();
        this.setupClickAnimations();
        
        // Auto-animate elements with data attributes
        document.querySelectorAll('[data-animate-on-scroll]').forEach(element => {
            const animation = element.dataset.animateOnScroll || 'fadeIn';
            this.animateOnScroll(element, animation);
        });

        console.log('🎭 Micro-Animation Choreographer initialized');
    }
}

// Auto-initialize and expose globally
window.MicroAnimationChoreographer = MicroAnimationChoreographer;
window.animator = new MicroAnimationChoreographer();

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.animator.init());
} else {
    window.animator.init();
}

console.log('🎭 Micro-Animation Choreographer loaded');
