import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
        'dark':{
          50:'#A6A6A6',
          100:'#737373',
          200:'#404040',
          300: '#262626',
          400: '#0D0D0D',
        },
        'green':{
          50:'#dcf8ea',
          100: '#04ae56'
        },
        TextGrey: "#737C8B",
        textGreyLight: "#9b999961",
      },
    },
  },
  plugins: [],
};
export default config;
