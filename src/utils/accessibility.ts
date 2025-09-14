// Accessibility utilities for MultiLearn

// Keyboard navigation helpers
export const handleKeyDown = {
  // Handle Enter key for buttons and links
  onEnter: (callback: () => void) => (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      callback();
    }
  },

  // Handle Escape key for modals and dropdowns
  onEscape: (callback: () => void) => (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      callback();
    }
  },

  // Handle arrow keys for navigation
  onArrowKeys: (onUp?: () => void, onDown?: () => void, onLeft?: () => void, onRight?: () => void) => 
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          onUp?.();
          break;
        case 'ArrowDown':
          e.preventDefault();
          onDown?.();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          onLeft?.();
          break;
        case 'ArrowRight':
          e.preventDefault();
          onRight?.();
          break;
      }
    },

  // Handle Tab key for focus management
  onTab: (callback: () => void) => (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      callback();
    }
  }
};

// Focus management utilities
export const focusManagement = {
  // Trap focus within an element
  trapFocus: (element: HTMLElement) => {
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    element.addEventListener('keydown', handleTabKey);
    firstElement?.focus();

    return () => {
      element.removeEventListener('keydown', handleTabKey);
    };
  },

  // Restore focus to previous element
  restoreFocus: (() => {
    let previousActiveElement: HTMLElement | null = null;

    return {
      save: () => {
        previousActiveElement = document.activeElement as HTMLElement;
      },
      restore: () => {
        if (previousActiveElement) {
          previousActiveElement.focus();
          previousActiveElement = null;
        }
      }
    };
  })(),

  // Focus first focusable element
  focusFirst: (element: HTMLElement) => {
    const focusableElement = element.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as HTMLElement;
    focusableElement?.focus();
  }
};

// ARIA utilities
export const aria = {
  // Generate unique IDs for ARIA relationships
  generateId: (() => {
    let counter = 0;
    return (prefix: string = 'id') => `${prefix}-${++counter}`;
  })(),

  // Create ARIA live region for announcements
  announce: (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;

    document.body.appendChild(announcement);

    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  },

  // Set ARIA attributes for form validation
  setFieldValidation: (element: HTMLElement, isValid: boolean, errorMessage?: string) => {
    element.setAttribute('aria-invalid', isValid ? 'false' : 'true');
    
    if (errorMessage) {
      const errorId = aria.generateId('error');
      element.setAttribute('aria-describedby', errorId);
      
      // Create or update error message element
      let errorElement = document.getElementById(errorId);
      if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.id = errorId;
        errorElement.className = 'sr-only';
        element.parentNode?.appendChild(errorElement);
      }
      errorElement.textContent = errorMessage;
    } else {
      element.removeAttribute('aria-describedby');
    }
  }
};

// Screen reader utilities
export const screenReader = {
  // Hide element from screen readers
  hide: (element: HTMLElement) => {
    element.setAttribute('aria-hidden', 'true');
  },

  // Show element to screen readers
  show: (element: HTMLElement) => {
    element.removeAttribute('aria-hidden');
  },

  // Make element only visible to screen readers
  srOnly: (element: HTMLElement) => {
    element.classList.add('sr-only');
  },

  // Remove screen reader only class
  removeSrOnly: (element: HTMLElement) => {
    element.classList.remove('sr-only');
  }
};

// Color contrast utilities
export const contrast = {
  // Calculate relative luminance
  getLuminance: (r: number, g: number, b: number): number => {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  },

  // Calculate contrast ratio
  getContrastRatio: (color1: [number, number, number], color2: [number, number, number]): number => {
    const lum1 = contrast.getLuminance(...color1);
    const lum2 = contrast.getLuminance(...color2);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
  },

  // Check if contrast ratio meets WCAG standards
  meetsWCAG: (color1: [number, number, number], color2: [number, number, number], level: 'AA' | 'AAA' = 'AA'): boolean => {
    const ratio = contrast.getContrastRatio(color1, color2);
    return level === 'AA' ? ratio >= 4.5 : ratio >= 7;
  }
};

// Motion and animation utilities
export const motion = {
  // Check if user prefers reduced motion
  prefersReducedMotion: (): boolean => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },

  // Apply reduced motion styles
  applyReducedMotion: (element: HTMLElement) => {
    if (motion.prefersReducedMotion()) {
      element.style.animation = 'none';
      element.style.transition = 'none';
    }
  }
};

// Export all utilities
export default {
  handleKeyDown,
  focusManagement,
  aria,
  screenReader,
  contrast,
  motion
};
