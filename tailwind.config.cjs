const { fontFamily } = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        serif: ["IBM Plex Serif"].concat([...fontFamily.serif]),
        mono: ["Cascadia Code"].concat([...fontFamily.mono]),
      },
      colors: {
        bgColor: "var(--theme-bg)",
        textColor: "var(--theme-text)",
        link: "var(--theme-link)",
        "accent-primary": "var(--theme-accent)",
        "accent-2": "var(--theme-accent-2)",
        hrefcolor: "var(--theme-href)",
      },
      typography: () => ({
        bern: {
          css: {
            // Reference: https://github.com/tailwindlabs/tailwindcss-typography/blob/main/README.md
            "--tw-prose-body": "var(--theme-text)",
            "--tw-prose-headings": "var(--theme-accent-2)",
            "--tw-prose-links": "var(--theme-accent-primary)",
            "--tw-prose-bold": "var(--theme-text)",
            "--tw-prose-bullets": "var(--theme-text)",
            "--tw-prose-quotes": "var(--theme-quote)",
            "--tw-prose-code": "var(--theme-text)",
            "--tw-prose-hr": "var(--theme-accent-primary)",
            "--tw-prose-th-borders": "#666",
            "--tw-prose-quote-borders": "var(--theme-accent-2)",
            strong: {
              fontWeight: "700",
            },
            blockquote: {
              fontWeight: "700",
              borderLeftWidth: "none",
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
            thead: {
              borderBottomWidth: "none",
            },
            "thead th": {
              fontWeight: "700",
              borderBottom: "1px dashed #666",
            },
          },
        },
      }),
    },
  },
};
