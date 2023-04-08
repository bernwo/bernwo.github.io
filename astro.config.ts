import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import image from "@astrojs/image";
import sitemap from "@astrojs/sitemap";
import prefetch from "@astrojs/prefetch";
// @ts-ignore
import footnotes from "remark-footnotes";
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
			footnotes,
			remarkMath,
		],
		rehypePlugins: [
			[
				rehypeMathJaxCHtml,
				{
					chtml: {
						fontURL: "https://cdn.jsdelivr.net/npm/mathjax@3.2.2/es5/output/chtml/fonts/woff-v2/",
						displayIndent: "0",
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
	integrations: [
		mdx({}),
		tailwind({
			config: {
				applyBaseStyles: false,
			},
		}),
		image({
			serviceEntryPoint: "@astrojs/image/sharp",
		}),
		sitemap(),
		prefetch(),
	],
	vite: {
		optimizeDeps: {
			exclude: ["@resvg/resvg-js"],
		},
	},
	// Used only by `npm run dev` and `npm run preview`. Not used in production.
	server: { port: 5500, host: true },
});
