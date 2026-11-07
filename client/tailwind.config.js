module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          DEFAULT: '#ff7a01',
          glow: '#ffb347',
        },
        dark: {
          DEFAULT: '#101014',
          card: '#18181c',
          border: '#23232a',
        },
      },
      boxShadow: {
        glow: '0 0 12px 2px #ff7a01',
      },
      borderRadius: {
        xl: '1.25rem',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-dark': 'linear-gradient(135deg, #18181c 0%, #101014 100%)',
      },
    },
  },
  plugins: [],
};
