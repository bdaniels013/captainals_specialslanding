import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./*.{ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
