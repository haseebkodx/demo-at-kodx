/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "640px",
      sm: "750px", //'640px',
      md: "992px", //'768px',
      lg: "1200px", //'1024px',
      xl: "1640px", //'1280px',
    },
    extend: {
      fontSize: {
        s: "8px",
        xxs: "10px",
      },
      borderWidth: {
        1: "0.54px"
      },
      fontFamily: {
        lato: ["Lato", "sans-serif"],
      },
      backgroundImage: {
        linearYellow:
          "linear-gradient(95.47deg, #DAB807 -0.22%, #DDBC18 10.66%, #FFDF3C 26.65%, #FFDF3C 78.95%, #E3C21E 93%, #FBDB3A 97.24%)",
        linearBlue300: "linear-gradient(99.59deg, #0B1E5A -2.14%, #172E77 100.3%)",
        linearBlue400:
          "linear-gradient(99.59deg, #0B1E5A -2.14%, #172E77 100.3%)",
        linearBlue500: "linear-gradient(93.08deg, #0B1E5A 0%, #172E77 100%)",
      },
      backgroundColor: {},
      screens: {
        mb: { max: "500px" },
        sm: { max: "700px" },
        md: {
          min: "700px",
          max: "1024px",
        },
        lg: {
          min: "1024px",
        },
        xl: {
          min: "1450px",
        },
      },
      colors: {
        primary: "#FFE45F",
        secondary: "#FFFFFF3B",
        yellow: {
          50: "#FFE45F"
        }
      },
    },
  },
  plugins: [],
};
