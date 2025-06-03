// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math"; // pnpm install remark-math
import rehypeMathJaxCHtml from "rehype-mathjax/chtml"; // pnpm install rehype-mathjax
import rehypeCitation from "rehype-citation"; // pnpm install rehype-citation

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  outDir: "./dist",
  site: "https://bernwo.github.io/",
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
    remarkPlugins: [remarkGfm, remarkMath],
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
      [
        rehypeCitation,
        {
          bibliography: "./src/assets/citation/bibfile.bib",
          linkCitations: true,
          csl: "https://raw.githubusercontent.com/citation-style-language/styles/master/cambridge-university-press-note.csl",
          suppressBibliography: true,
        },
      ],
    ],
  },
});
