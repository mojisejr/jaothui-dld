import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.tsx"],
  daisyui: {
    themes: ["bumblebee"],
  },
  plugins: [require("daisyui")],
} satisfies Config;
