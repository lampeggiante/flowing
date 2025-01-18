/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    borderRadius: {
      none: '0',
      small: '2px',
      medium: '4px',
      large: '8px',
      circle: '50%'
    },
    size: {
      mini: '24px',
      small: '28px',
      default: '32px',
      large: '36px'
    },
    space: {
      mini: '4px',
      small: '8px',
      default: '12px',
      large: '16px'
    }
  }
}
