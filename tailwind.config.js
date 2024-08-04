/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./App.{js,jsx,ts,tsx}",
        "./app/**/*.{js,jsx,ts,tsx}",
        "./components/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#7CA9FF',
                dark: {
                    text: '#fff',
                    background: '#282828',
                    cardColor: '#3c3c3c'
                },
                light: {
                    text: '#000',
                    background: '#E5E5E5',
                    cardColor: '#ffffff'
                }
            }
        },
    },
    plugins: [],
}

