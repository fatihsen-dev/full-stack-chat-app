/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
   theme: {
      extend: {
         colors: {
            lightv1: "#ffffff",
            dark: "#282828",
            lightv2: "#EEEEEE",
            gray: "#DDDDDD",
            blue: "#0C8F8F",
            green: "#73B06F",
            yellow: "#FFAD08",
            NavyBlue: "#405059",
         },
      },
      container: {
         padding: {
            DEFAULT: "0rem",
            sm: "0rem",
            lg: "0rem",
            xl: "0rem",
            "2xl": "10rem",
         },
      },
   },
   plugins: [],
};
