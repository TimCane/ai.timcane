/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            backgroundImage: {
                'grid-pattern': 'linear-gradient(var(--grid-color) 1px, transparent 1px), linear-gradient(to right, var(--grid-color) 1px, transparent 1px)',
            },
            backgroundSize: {
                'grid': '2ch 2ch',
            },
            colors: {
                gray: {
                    100: 'var(--border)',
                    500: 'var(--text-muted)',
                    600: 'var(--text-muted)',
                    900: 'var(--text)',
                },
                purple: {
                    500: 'var(--accent)',
                    600: 'var(--accent)',
                    700: 'var(--accent-muted)',
                },
            },
            typography: {
                DEFAULT: {
                    css: {
                        'code::before': {
                            content: '""'
                        },
                        'code::after': {
                            content: '""'
                        },
                        'code': {
                            color: '#d6deeb',
                            backgroundColor: '#1a1a1a',
                            borderRadius: '0.25rem',
                            padding: '0.25rem 0.4rem',
                        },
                        'pre': {
                            backgroundColor: '#1a1a1a',
                            code: {
                                backgroundColor: 'transparent',
                                color: '#d6deeb',
                                padding: '0',
                            }
                        }
                    }
                }
            }
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
} 