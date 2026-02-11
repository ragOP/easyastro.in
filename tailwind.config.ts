import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        body: ['var(--font-alegreya)', 'serif'],
        headline: ['var(--font-belleza)', 'sans-serif'],
        code: ['monospace'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        'spin-slow': {
          from: {
            transform: 'rotate(0deg)',
          },
          to: {
            transform: 'rotate(360deg)',
          },
        },
        'float-heart': {
          '0%, 100%': {
            transform: 'translateY(0) translateX(0) scale(1)',
            opacity: '0.75',
          },
          '25%': {
            transform: 'translateY(-12px) translateX(6px) scale(1.08)',
            opacity: '0.95',
          },
          '50%': {
            transform: 'translateY(-6px) translateX(-8px) scale(0.98)',
            opacity: '0.7',
          },
          '75%': {
            transform: 'translateY(-16px) translateX(4px) scale(1.05)',
            opacity: '0.9',
          },
        },
        'heart-pop': {
          '0%': {
            transform: 'scale(0)',
            opacity: '0',
          },
          '45%': {
            transform: 'scale(1.4)',
            opacity: '0.95',
          },
          '65%': {
            transform: 'scale(1.08)',
            opacity: '0.9',
          },
          '100%': {
            transform: 'scale(1)',
            opacity: '0.85',
          },
        },
        'heart-burst': {
          '0%, 100%': {
            transform: 'scale(1) translateY(0)',
            opacity: '0.8',
          },
          '30%': {
            transform: 'scale(1.5) translateY(-15px)',
            opacity: '1',
          },
          '60%': {
            transform: 'scale(1.15) translateY(-5px)',
            opacity: '0.9',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'spin-slow': 'spin-slow 3s linear infinite',
        'float-heart': 'float-heart 5s ease-in-out infinite',
        'heart-pop': 'heart-pop 2.5s ease-out infinite',
        'heart-burst': 'heart-burst 2s ease-in-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
