import typography from '@tailwindcss/typography';
import containerQueries from '@tailwindcss/container-queries';
import animate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: ['index.html', 'src/**/*.{js,ts,jsx,tsx,html,css}'],
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px'
            }
        },
        extend: {
            colors: {
                border: 'oklch(var(--border))',
                input: 'oklch(var(--input))',
                ring: 'oklch(var(--ring) / <alpha-value>)',
                background: 'oklch(var(--background))',
                foreground: 'oklch(var(--foreground))',
                primary: {
                    DEFAULT: 'oklch(var(--primary) / <alpha-value>)',
                    foreground: 'oklch(var(--primary-foreground))'
                },
                secondary: {
                    DEFAULT: 'oklch(var(--secondary) / <alpha-value>)',
                    foreground: 'oklch(var(--secondary-foreground))'
                },
                destructive: {
                    DEFAULT: 'oklch(var(--destructive) / <alpha-value>)',
                    foreground: 'oklch(var(--destructive-foreground))'
                },
                muted: {
                    DEFAULT: 'oklch(var(--muted) / <alpha-value>)',
                    foreground: 'oklch(var(--muted-foreground) / <alpha-value>)'
                },
                accent: {
                    DEFAULT: 'oklch(var(--accent) / <alpha-value>)',
                    foreground: 'oklch(var(--accent-foreground))'
                },
                popover: {
                    DEFAULT: 'oklch(var(--popover))',
                    foreground: 'oklch(var(--popover-foreground))'
                },
                card: {
                    DEFAULT: 'oklch(var(--card))',
                    foreground: 'oklch(var(--card-foreground))'
                },
                chart: {
                    1: 'oklch(var(--chart-1))',
                    2: 'oklch(var(--chart-2))',
                    3: 'oklch(var(--chart-3))',
                    4: 'oklch(var(--chart-4))',
                    5: 'oklch(var(--chart-5))'
                },
                flowerGreen: {
                    50: 'oklch(var(--flower-green-50))',
                    100: 'oklch(var(--flower-green-100))',
                    200: 'oklch(var(--flower-green-200))',
                    300: 'oklch(var(--flower-green-300))',
                    400: 'oklch(var(--flower-green-400))',
                    500: 'oklch(var(--flower-green-500))',
                    600: 'oklch(var(--flower-green-600))',
                    700: 'oklch(var(--flower-green-700))',
                    800: 'oklch(var(--flower-green-800))',
                    900: 'oklch(var(--flower-green-900))',
                },
                botanicalPurple: {
                    50: 'oklch(var(--botanical-purple-50))',
                    100: 'oklch(var(--botanical-purple-100))',
                    200: 'oklch(var(--botanical-purple-200))',
                    300: 'oklch(var(--botanical-purple-300))',
                    400: 'oklch(var(--botanical-purple-400))',
                    500: 'oklch(var(--botanical-purple-500))',
                    600: 'oklch(var(--botanical-purple-600))',
                    700: 'oklch(var(--botanical-purple-700))',
                    800: 'oklch(var(--botanical-purple-800))',
                    900: 'oklch(var(--botanical-purple-900))',
                },
                earthWarm: {
                    50: 'oklch(var(--earth-warm-50))',
                    100: 'oklch(var(--earth-warm-100))',
                    200: 'oklch(var(--earth-warm-200))',
                    300: 'oklch(var(--earth-warm-300))',
                    400: 'oklch(var(--earth-warm-400))',
                    500: 'oklch(var(--earth-warm-500))',
                    600: 'oklch(var(--earth-warm-600))',
                    700: 'oklch(var(--earth-warm-700))',
                    800: 'oklch(var(--earth-warm-800))',
                    900: 'oklch(var(--earth-warm-900))',
                },
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
                xl: 'calc(var(--radius) + 4px)',
                '2xl': 'calc(var(--radius) + 8px)',
                '3xl': 'calc(var(--radius) + 12px)',
            },
            boxShadow: {
                xs: '0 1px 2px 0 rgba(0,0,0,0.05)',
                organic: '0 4px 20px -2px rgba(75, 125, 44, 0.1), 0 2px 8px -2px rgba(123, 45, 122, 0.05)',
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' }
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' }
                }
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out'
            }
        }
    },
    plugins: [typography, containerQueries, animate]
};
