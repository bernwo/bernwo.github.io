// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import remarkMath from "remark-math"; // pnpm install remark-math
import rehypeMathJaxCHtml from "rehype-mathjax/chtml"; // pnpm install rehype-mathjax

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [mdx()],
  markdown: {
    syntaxHighlight: "shiki",
    shikiConfig: {
      theme: "monokai",
      wrap: true,
    },
    remarkPlugins: [remarkMath],
    rehypePlugins: [
      [
        rehypeMathJaxCHtml,
        {
          chtml: {
            fontURL:
              "https://cdn.jsdelivr.net/npm/mathjax@3.2.2/es5/output/chtml/fonts/woff-v2",
            displayAlign: "left",
          },
          tex: {
            tags: "ams",
            inlineMath: [
              ["$", "$"],
              ["\\(", "\\)"],
            ],
            displayMath: [
              ["$$", "$$"],
              ["\\[", "\\]"],
            ],
            processEscapes: true,
          },
        },
      ],
    ],
  },
});
