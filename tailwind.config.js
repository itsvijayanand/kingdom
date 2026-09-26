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
        kingdom: {
          bg: "#070A0F",
          deepnavy: "#071B36",
          royalnavy: "#0B2345",
          darkblue: "#0D294C",
          gold: "#D4AF5A",
          champagne: "#E6C878",
          lightgold: "#F2DFA0",
          softwhite: "#E8E8E5",
          muted: "#9CA3AF",
          border: "rgba(212, 175, 90, 0.25)",
          borderStrong: "rgba(212, 175, 90, 0.6)",
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'Courier New', 'monospace'],
      },
      boxShadow: {
        gold: '0 0 25px rgba(212, 175, 90, 0.18)',
        goldStrong: '0 0 45px rgba(212, 175, 90, 0.35)',
      },
    },
  },
  plugins: [],
};
