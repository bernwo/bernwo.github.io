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

// https://astro.build/config
export default defineConfig({
	site: "https://bernwo.github.io/",
	markdown: {
		syntaxHighlight: "shiki",
		shikiConfig: {
			theme: "monokai",
		},
		remarkPlugins: [[remarkBibtex, { bibtexFile: "./src/assets/bibfile.bib" }], footnotes],
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
});
