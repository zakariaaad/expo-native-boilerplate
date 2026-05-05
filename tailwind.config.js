const { hairlineWidth } = require('nativewind/theme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],

  // 'class' strategy → toggle dark mode by adding className="dark" on the root view
  darkMode: 'class',

  theme: {
    extend: {
      colors: {
        // ── Brand ──────────────────────────────────────────────
        primary: {
          DEFAULT: '#6366F1',
          dark: '#818CF8',
          foreground: '#FFFFFF',
        },

        // ── Semantic surfaces ──────────────────────────────────
        background: {
          DEFAULT: '#F9FAFB',   // light
          dark: '#0F172A',      // dark
        },
        card: {
          DEFAULT: '#FFFFFF',
          dark: '#1E293B',
        },

        // ── Text ──────────────────────────────────────────────
        foreground: {
          DEFAULT: '#111827',
          dark: '#F1F5F9',
        },
        muted: {
          DEFAULT: '#6B7280',
          dark: '#94A3B8',
        },

        // ── Utility ───────────────────────────────────────────
        border: {
          DEFAULT: '#E5E7EB',
          dark: '#334155',
        },
        destructive: {
          DEFAULT: '#EF4444',
          dark: '#F87171',
        },
        success: {
          DEFAULT: '#22C55E',
          dark: '#4ADE80',
        },
      },

      borderWidth: {
        hairline: hairlineWidth(),
      },

      fontFamily: {
        sans: ['System'],
      },
    },
  },

  plugins: [],
};
