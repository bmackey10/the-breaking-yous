/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                'theme-navy-blue': '#2e294e',
                'theme-pale-blue': '#7180ac',
                'theme-dark-red': '#8d0801',
                'theme-cream-white': {
                    'default': '#ffe6cf',
                    'light': '#fff3e8',
                },
                'theme-star-yellow': '#f5d142',
            },
            fontFamily: {
                'merriweather': ['Merriweather', 'sans-serif'],
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
};
