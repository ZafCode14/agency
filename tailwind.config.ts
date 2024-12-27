import type { Config } from "tailwindcss";

const generateSizes = (maxSize: number) => {
  const sizes: { [key: string]: string } = {};
  for (let i = 1; i <= maxSize; i++) {
    sizes[`${i * 0.25}`] = `${i * 0.25}rem`;
  }
  return sizes;
};

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      width: generateSizes(800),  // 2000px / 4 = 500 rem units
      height: generateSizes(800),
      maxWidth: generateSizes(800),
    },
  },
  plugins: [],
};

export default config;