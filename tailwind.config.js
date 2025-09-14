/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // MultiLearn Enhanced Brand Colors - Using CSS Variables
        primary: {
          DEFAULT: 'var(--primary-default)',
          hover: 'var(--primary-hover)',
          pressed: 'var(--primary-pressed)',
          light: 'var(--primary-light)',
        },
        secondary: {
          DEFAULT: 'var(--secondary-default)',
          hover: 'var(--secondary-hover)',
          pressed: 'var(--secondary-pressed)',
          light: 'var(--secondary-light)',
        },
        accent: {
          purple: 'var(--accent-purple)',
          teal: 'var(--accent-teal)',
          emerald: 'var(--accent-emerald)',
          rose: 'var(--accent-rose)',
        },
        neutral: {
          50: 'var(--neutral-50)',
          100: 'var(--neutral-100)',
          200: 'var(--neutral-200)',
          300: 'var(--neutral-300)',
          400: 'var(--neutral-400)',
          500: 'var(--neutral-500)',
          600: 'var(--neutral-600)',
          700: 'var(--neutral-700)',
          800: 'var(--neutral-800)',
          900: 'var(--neutral-900)',
          // Legacy support
          'dark-grey': 'var(--neutral-dark-grey)',
          'grey': 'var(--neutral-grey)',
          'light-grey': 'var(--neutral-light-grey)',
          'white-grey': 'var(--neutral-white-grey)',
        },
        status: {
          info: 'var(--status-info)',
          success: 'var(--status-success)',
          warning: 'var(--status-warning)',
          danger: 'var(--status-danger)',
        },
        absolute: {
          black: 'var(--absolute-black)',
          white: 'var(--absolute-white)',
        },
        // Background colors
        bg: {
          primary: 'var(--bg-primary)',
          secondary: 'var(--bg-secondary)',
          tertiary: 'var(--bg-tertiary)',
        },
        // Text colors
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          tertiary: 'var(--text-tertiary)',
        },
        // Border colors
        border: {
          primary: 'var(--border-primary)',
          secondary: 'var(--border-secondary)',
        }
      },
      fontFamily: {
        'exo': ['Exo', 'sans-serif'],
        'jost': ['Jost', 'sans-serif'],
        'sans': ['Jost', 'sans-serif'], // Set Jost as default sans font
      },
      fontSize: {
        // Button sizes from design system
        'button-lg': ['18px', '150%'],
        'button-sm': ['14px', '150%'],
        // Input sizes from design system
        'input-lg': ['18px', '150%'],
        'input-sm': ['14px', '150%'],
      },
      spacing: {
        // Button padding from design system
        'button-lg': '10px 24px',
        'button-sm': '10px 15px',
        // Input padding from design system
        'input-lg': '10px 24px',
        'input-sm': '10px 15px',
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'card-hover': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      borderRadius: {
        'card': '8px',
        'button': '6px',
        'input': '6px',
      }
    },
  },
  plugins: [],
}
