import { withUt } from "uploadthing/tw";

export default withUt({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        accent: '#0989ff',
        topHeadingPrimary: '#010f1c',
        topHeadingSecondary: '#021d35',
        pink: '#fd4b6b'
      },
      container: {
        center: true,
        padding: '15px'
      }
    },
  },
  plugins: [],
});