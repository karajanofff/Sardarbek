/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: "#ff7a1a",
          soft: "#fff3ea",
          ink: "#111827",
          muted: "#6b7280"
        }
      },
      boxShadow: {
        soft: "0 14px 40px rgba(17, 24, 39, 0.08)"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};
