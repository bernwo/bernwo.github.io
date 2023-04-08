<div align="center">
  <img alt="Astro Theme Cactus logo" src="./public/192x192.png" width="70" />
</div>
<h1 align="center">
  Wo's personal website
</h1>

## Building

| Command        | Action                                                         |
| :------------- | :------------------------------------------------------------- |
| `npm install` | Installs dependencies                                          |
| `npm run dev`     | Starts local dev server at `localhost:<port>` where `port` is specified in the `astro.config.ts` file                    |
| `npm run build`   | Build your production site to `./dist/`                        |
| `npm run preview` | Preview your build locally, before deploying                   |
| `npm run sync`    | Generate types based on your config in `src/content/config.ts` |

## Deploy

The script to deploy the website on Github is in `.github/workflows/deploy.yml`. See the [official Astro documentation](https://docs.astro.build/en/guides/deploy/github/) for more details.

## Acknowledgment

This website is built on top of [chrismwilliams](https://github.com/chrismwilliams/)'s [astro template](https://github.com/chrismwilliams/astro-theme-cactus/) and thus inherits all the key features of that template such as:

- Astro Fast 🚀
- TailwindCSS Utility classes
- Accessible, semantic HTML markup
- Responsive & SEO-friendly
- Dark / Light mode, using Tailwind and CSS variables
- [Astro Image Integration](https://docs.astro.build/en/guides/integrations-guide/image/) for optimised images
- MD & [MDX](https://docs.astro.build/en/guides/markdown-content/#mdx-only-features) posts
- [Satori](https://github.com/vercel/satori) for creating open graph png images.
- Pagination
- [Automatic RSS feed](https://docs.astro.build/en/guides/rss)
- Shiki code syntax styling
- Auto-generated [sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/)

## License

MIT
