import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'head': 'rgb(var(--head) / <alpha-value>)',
        'body': 'rgb(var(--body) / <alpha-value>)',
        'muted': 'rgb(var(--muted) / <alpha-value>)',
        'bg': 'rgb(var(--bg) / <alpha-value>)',
        'bg-2': 'rgb(var(--bg-2) / <alpha-value>)',
        'card': 'rgb(var(--card) / <alpha-value>)',
        'soft': 'rgb(var(--soft) / <alpha-value>)',
        'line': 'rgb(var(--line) / <alpha-value>)',
        'line-2': 'rgb(var(--line-2) / <alpha-value>)',
        'edge': 'rgb(var(--edge) / <alpha-value>)',
        'node': 'rgb(var(--node) / <alpha-value>)',
        'accent': 'rgb(var(--accent) / <alpha-value>)',
        'accent-text': 'rgb(var(--accent-text) / <alpha-value>)',
        'tint': 'rgb(var(--tint) / <alpha-value>)',
        'tint-text': 'rgb(var(--tint-text) / <alpha-value>)',
        'ok': 'rgb(var(--ok) / <alpha-value>)',
        'ok-bg': 'rgb(var(--ok-bg) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        accent: ['var(--font-inter-italic)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-outfit)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono-arrow)', 'var(--font-jetbrains-mono)', 'ui-monospace', 'monospace'],
      },
      animation: {
        'caret': 'caret 1s step-end infinite',
        'marquee': 'marquee 80s linear infinite',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        caret: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
