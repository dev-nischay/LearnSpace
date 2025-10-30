/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        glow1: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(-20px, 20px) scale(1.1)" },
        },
        glow2: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(30px, -20px) scale(1.1)" },
        },
        glow3: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(-10px, 10px) scale(1.05)" },
        },
      },
      animation: {
        glow1: "glow1 10s ease-in-out infinite",
        glow2: "glow2 10s ease-in-out infinite",
        glow3: "glow3 10s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
