import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

// @ts-ignore
import remarkGfm from 'remark-gfm'
// @ts-ignore
import remarkBibtex from "@supremum/remark-bibtex";
import remarkMath from "remark-math";
import rehypeMathJaxCHtml from "rehype-mathjax/chtml";

// https://astro.build/config
export default defineConfig({
	outDir: "./dist",
	site: "https://bernwo.github.io/",
	markdown: {
		syntaxHighlight: "shiki",
		shikiConfig: {
			theme: "monokai",
			wrap: true,
		},
		remarkPlugins: [
			[remarkBibtex, { bibtexFile: "./src/assets/bibfile.bib" }],
			remarkGfm,
			remarkMath,
		],
		rehypePlugins: [
			[
				rehypeMathJaxCHtml,
				{
					chtml: {
						fontURL: "https://cdn.jsdelivr.net/npm/mathjax@3.2.2/es5/output/chtml/fonts/woff-v2",
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
	prefetch: true,
	integrations: [
		mdx({}),
		tailwind({
			applyBaseStyles: false,
		}),
		sitemap(),
	],
	image: {
		service: {
		   entrypoint: 'astro/assets/services/sharp',
		 },
	},
	vite: {
		optimizeDeps: {
			exclude: ["@resvg/resvg-js"],
		},
	},
	// Used only by `npm run dev` and `npm run preview`. Not used in production.
	server: { port: 5500, host: true },
});
