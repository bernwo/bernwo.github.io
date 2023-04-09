const { fontFamily } = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{astro,html,js,jsx,md,svelte,ts,tsx,vue}"],
	darkMode: "class",
	corePlugins: {
		// disable aspect ratio as per docs -> @tailwindcss/aspect-ratio
		aspectRatio: false,
		// disable some core plugins as they are included in the css, even when unused
		touchAction: false,
		ringOffsetWidth: false,
		ringOffsetColor: false,
		scrollSnapType: false,
		borderOpacity: false,
		textOpacity: false,
		fontVariantNumeric: false,
	},
	theme: {
		extend: {
			colors: {
				bgColor: "var(--theme-bg)",
				textColor: "var(--theme-text)",
				link: "var(--theme-link)",
				accent: "var(--theme-accent)",
				"accent-2": "var(--theme-accent-2)",
				hrefcolor: "var(--theme-href)",
			},
			fontFamily: {
				// Add any custom fonts here
				sans: ["system-ui", "sans"],
				serif: ["IBM Plex Serif"].concat([...fontFamily.serif]),
				mono: ["Source Code Pro"].concat([...fontFamily.mono]),
			},
			transitionProperty: {
				height: "height",
			},
			typography: (theme) => ({
				cactus: {
					css: {
						"--tw-prose-body": "var(--theme-text)",
						"--tw-prose-headings": "var(--theme-accent-2)",
						"--tw-prose-links": "var(--theme-text)",
						"--tw-prose-bold": "var(--theme-text)",
						"--tw-prose-bullets": "var(--theme-text)",
						"--tw-prose-quotes": "var(--theme-quote)",
						"--tw-prose-code": "var(--theme-text)",
						"--tw-prose-hr": "0.5px dashed #666",
						"--tw-prose-th-borders": "#666",
					},
				},
				DEFAULT: {
					css: {
						a: {
							"@apply cactus-link no-underline": "",
						},
						strong: {
							fontWeight: "700",
						},
						code: {
							border: "1px dotted #666",
							borderRadius: "2px",
						},
						blockquote: {
							fontWeight: "700",
							borderLeftWidth: "none",
						},
						hr: {
							borderTopStyle: "dashed",
						},
						thead: {
							borderBottomWidth: "none",
						},
						"thead th": {
							fontWeight: "700",
							borderBottom: "1px dashed #666",
						},
						"tbody tr": {
							borderBottomWidth: "none",
						},
						tfoot: {
							borderTop: "1px dashed #666",
						},
						h1: {
							fontFamily: "IBM Plex Serif",
						},
						h2: {
							fontFamily: "IBM Plex Serif",
						},
						h3: {
							fontFamily: "IBM Plex Serif",
						},
						h4: {
							fontFamily: "IBM Plex Serif",
						},
						h5: {
							fontFamily: "IBM Plex Serif",
						},
						h6: {
							fontFamily: "IBM Plex Serif",
						},
					},
				},
				sm: {
					css: {
						code: {
							fontSize: theme("fontSize.sm")[0],
							fontWeight: "400",
						},
					},
				},
			}),
			boxShadow: {
				wo: "0 1px 1px rgba(0, 0, 0, 0.08), 0 2px 2px rgba(0, 0, 0, 0.12), 0 4px 4px rgba(0, 0, 0, 0.16), 0 8px 8px rgba(0, 0, 0, 0.2)",
			},
		},
	},
	plugins: [
		require("@tailwindcss/typography"),
		require("@tailwindcss/line-clamp"),
		require("@tailwindcss/aspect-ratio"),
		plugin(function ({ addComponents }) {
			addComponents({
				".cactus-link": {
					"@apply text-hrefcolor bg-[size:100%_6px] bg-bottom bg-repeat-x": {},
					backgroundImage:
						"linear-gradient(transparent,transparent 5px,var(--theme-text) 5px,var(--theme-text))",
					"&:hover": {
						backgroundImage:
							"linear-gradient(transparent,transparent 4px,var(--theme-link) 4px,var(--theme-link))",
					},
				},
				".title": {
					"@apply text-2xl font-bold text-accent-2 font-serif": {},
				},
			});
		}),
	],
};
