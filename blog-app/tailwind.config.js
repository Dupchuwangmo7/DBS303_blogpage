/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1a1a1a',
        secondary: '#666666',
      },
      typography: {
        DEFAULT: {
          css: {
            'p': {
              marginTop: '0.5rem',
              marginBottom: '0.5rem',
              lineHeight: '1.6',
            },
            'h1, h2, h3, h4, h5, h6': {
              marginTop: '1rem',
              marginBottom: '0.5rem',
            },
            'ul, ol': {
              marginTop: '0.5rem',
              marginBottom: '0.5rem',
            },
            'li': {
              marginTop: '0',
              marginBottom: '0',
            },
            'code': {
              padding: '0.25rem 0.5rem',
              backgroundColor: '#f3f3f3',
              borderRadius: '0.25rem',
            },
            'pre': {
              marginTop: '0.5rem',
              marginBottom: '0.5rem',
            },
            'blockquote': {
              marginTop: '0.5rem',
              marginBottom: '0.5rem',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
