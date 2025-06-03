<div align="center">
  <img alt="Wo's logo" src="./public/icon.png" width="90" />
</div>
<h1 align="center">
  Wo's personal website
</h1>

## Building

| Command        | Action                                                         |
| :------------- | :------------------------------------------------------------- |
| `pnpm install` | Installs dependencies                                          |
| `pnpm run dev`     | Starts local dev server at `localhost:<port>` where `port` is specified in the `astro.config.ts` file                    |
| `pnpm run build`   | Build your production site to `./dist/`                        |
| `pnpm run preview` | Preview your build locally, before deploying                   |
| `pnpm run sync`    | Generate types based on your config in `src/content/config.ts` |

## Deploy

The script to deploy the website on Github is in `.github/workflows/deploy.yml`. See the [official Astro documentation](https://docs.astro.build/en/guides/deploy/github/) for more details.

## License

MIT
