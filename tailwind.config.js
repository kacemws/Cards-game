const defaultColors = require("tailwindcss/colors");
const colors = {
  current: "currentColor",
  secondary: {
    100: "#D7ECFE",
    200: "#CDE7FF",
    300: "#C2E1FF",
    400: "#ADD6FF",
    500: "#99CCFF",
  },
  primary: {
    100: "#EDE4F2",
    200: "#E4D6EB",
    300: "#DAC8E4",
    400: "#D1BBDD",
    500: "#C7AED6",
  },
  blackText: {
    100: "#181818",
    200: "#181818",
    300: "#181818",
    400: "#181818",
    500: "#181818",
  },
  whiteText: {
    100: "#FEFEFE",
    200: "#FEFEFE",
    300: "#FEFEFE",
    400: "#FEFEFE",
    500: "#FEFEFE",
  },
  neutral: {
    100: "#FFFFFF",
    200: "#F4F5F7",
    300: "#E1E1E1",
    400: "#737581",
    500: "#4A4B53",
    600: "#000000",
  },
};

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {},
    colors: {
      ...defaultColors,
      ...colors,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
