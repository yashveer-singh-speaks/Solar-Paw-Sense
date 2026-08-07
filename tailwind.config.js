/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        solar: {
          bg: "#F8F6F1",
          bgSecondary: "#F2EEE7",
          card: "#FFFCF8",
          elevated: "#FCFAF6",
          glass: "rgba(255, 252, 248, 0.72)",
          forest: "#1F4A37",
          moss: "#305C49",
          sage: "#6E8B72",
          olive: "#93A487",
          gold: "#C8A75B",
          brass: "#A88439",
          amber: "#D7B86A",
          textPrimary: "#18221D",
          textSecondary: "#58655F",
          textMuted: "#7F8B85",
          placeholder: "#A5AEA8",
          disabled: "#C8CDC9",
          borderPrimary: "#E7E2D8",
          borderSecondary: "#DDD6C9",
          borderHover: "#CDBF9E",
          success: "#2F6B49",
          warning: "#C5962A",
          danger: "#C15A4D",
          info: "#5D7D8A",
        },
      },
      boxShadow: {
        'solar-soft': '0 4px 20px -2px rgba(20, 28, 20, 0.05)',
        'solar-medium': '0 8px 30px -4px rgba(20, 28, 20, 0.08)',
        'solar-floating': '0 16px 40px -6px rgba(20, 28, 20, 0.12)',
        'solar-glow': '0 0 25px rgba(200, 167, 91, 0.15)',
      },
      borderRadius: {
        'solar-xl': '20px',
        'solar-2xl': '24px',
        'solar-3xl': '28px',
      },
      backgroundImage: {
        'gradient-premium-green': 'linear-gradient(135deg, #1F4A37 0%, #305C49 100%)',
        'gradient-warm-ivory': 'linear-gradient(135deg, #FCFAF6 0%, #F2EEE7 100%)',
        'gradient-luxury-gold': 'linear-gradient(135deg, #D7B86A 0%, #A88439 100%)',
        'gradient-gold-cta': 'linear-gradient(135deg, #C8A75B 0%, #A88439 100%)',
        'gradient-nature': 'linear-gradient(135deg, #6E8B72 0%, #305C49 100%)',
      },
      fontFamily: {
        sans: ['Inter', 'SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
