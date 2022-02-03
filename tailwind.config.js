module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./shared/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        purple: "#5C16C5",
        "dark-purple": "#2D0C5E",
        lime: "#14FF00",
        "purple-progress": "#51485F",
      },
      fontFamily: {
        roboto: ["Roboto", "ui-sans-serif"],
      },
    },
  },
  plugins: [],
};
