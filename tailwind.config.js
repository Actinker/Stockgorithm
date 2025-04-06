// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        glow: "glowPulse 2.5s ease-in-out infinite alternate",
      },
      keyframes: {
        glowPulse: {
          "0%": {
            textShadow:
              "0px 0px 4px rgba(0, 102, 255, 0.4), 0px 0px 8px rgba(0, 102, 255, 0.2)",
          },
          "100%": {
            textShadow:
              "0px 0px 12px rgba(0, 102, 255, 0.6), 0px 0px 24px rgba(0, 102, 255, 0.4)",
          },
        },
      },
    },
  },
  plugins: [],
};
