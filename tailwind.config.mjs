/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            backgroundImage: {
                'grid-pattern': 'linear-gradient(#f6f6f6fe 1px, transparent 1px), linear-gradient(to right, #f6f6f6fe 1px, transparent 1px)',
            },
            backgroundSize: {
                'grid': '2ch 2ch',
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
                            backgroundColor: '#24292e',
                            borderRadius: '0.25rem',
                            padding: '0.25rem 0.4rem',
                        },
                        'pre': {
                            backgroundColor: '#24292e',
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