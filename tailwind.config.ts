import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        merriweather: ["merriweather", "sans-serif"],
        robotomono: ["roboto-mono", "monospace"],
        title: ["dm-serif-display", "serif"],
        lato: ["lato", "sans-serif"],
        poppins: ["poppins", "sans-serif"],
      },
    },
  },
};
export default config;
