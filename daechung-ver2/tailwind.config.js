/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend:{
      colors:{
        mainColor:"#D8E6E4",
        pointColor: "#4C7B90",
        bgColor:"#FAFCFC",
        textColor:"#565656"
      }
    }
    
  },
  plugins: [],
};

