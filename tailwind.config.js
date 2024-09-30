/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        r: "Pretendard-Regular",
        sb: "Pretendard-SemiBold",
      },
    },
  },
  plugins: [],
};
