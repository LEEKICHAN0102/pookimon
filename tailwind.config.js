/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        screens: {
            sm: { min: "390px", max: "819px" },
            md: { min: "820px", max: "1023px" },
            lg: { min: "1080px" },
        },
        extend: {
            fontFamily:{
                custom:["Galmuri11",'sans'],
            }
        },
    },
    plugins: [],
    darkMode:"class",
};