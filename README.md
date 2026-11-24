# Discora

Discora is a progressive web app for exploring vinyl releases by The Beatles and all four members. The catalog covers five artists, ten albums, and 128 tracks. The interface and editorial content are in Indonesian.

[Live app](https://discora-web.vercel.app) · [API sample](https://discora-api.vercel.app/api/albums) · [Demo walkthrough](docs/demo-guide.md)

## Features

- Browse artist profiles and search or filter the album catalog.
- View tracklists by record side, songwriter credits, recording notes, and linked sources.
- Explore archival galleries with captions, attribution, and license information.
- Save albums to a collection stored in the browser.
- Install the PWA and reopen previously visited catalog pages while their data is cached.

## Quick start

**Requirements** · Node.js 22 or later and npm.

Run these commands from the repository root.

```sh
npm ci
npm run build
npm run preview:local
```

Open the [local preview](http://127.0.0.1:4173). This mode starts Vite on port 4173 and Express on port 3000 using the bundled catalog. It requires no Supabase credentials.

## Development with Supabase

1. Run `npm ci` from the repository root.
2. Copy [`api/.env.example`](api/.env.example) to `api/.env` and set `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY`.
3. In the Supabase SQL Editor, run [`schema.sql`](api/supabase/schema.sql), then [`seed.sql`](api/supabase/seed.sql).
4. Run `npm run dev` and open the [Vite dev server](http://127.0.0.1:5173). It proxies `/api` requests to Express on port 3000.

### Update the catalog

Edit [`api/catalog.mjs`](api/catalog.mjs), then regenerate the SQL seed.

```sh
npm run seed:generate -w api
```

Apply the regenerated seed in Supabase. The seed uses upserts so it can be applied again when the bundled records change. The catalog grants read access to the `anon` and `authenticated` roles.

## API reference

| Method and path | Example response |
| --- | --- |
| `GET /api/artists` | [Artist list](https://discora-api.vercel.app/api/artists) |
| `GET /api/artists/:slug` | [The Beatles](https://discora-api.vercel.app/api/artists/the-beatles) |
| `GET /api/albums` | [Album list](https://discora-api.vercel.app/api/albums) |
| `GET /api/albums/:slug` | [Revolver with tracklist](https://discora-api.vercel.app/api/albums/revolver) |
| `GET /api/tracks/:id` | [For No One](https://discora-api.vercel.app/api/tracks/for-no-one) · [Tomorrow Never Knows](https://discora-api.vercel.app/api/tracks/tomorrow-never-knows) |

List endpoints return JSON arrays. Detail endpoints return JSON objects. Unknown slugs and track IDs return HTTP `404`, and upstream database errors return HTTP `503`.

## Deployment

Discora uses two Vercel projects connected to the same repository.

| Project | Root directory | Framework preset | Configuration |
| --- | --- | --- | --- |
| API | `api` | Express | Set `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY`. |
| Web | `web` | Vite | Point the `/api/:path*` rewrite in [`web/vercel.json`](web/vercel.json) to your API deployment. |

Enable access to files outside each project’s root directory so both builds can use the workspace lockfile. The web rewrite also supports direct links to React Router pages. The deployed API reads from Supabase, so apply changes to the seed separately when publishing catalog updates.

## Repository layout

| Path | Contents |
| --- | --- |
| [`web/src/`](web/src) | React UI, routes, collection storage, and editorial content |
| [`web/public/art/`](web/public/art) | Album artwork, portraits, and archival images |
| [`web/vite.config.js`](web/vite.config.js) | API proxy, PWA manifest, and service worker caching |
| [`api/`](api) | Express API and catalog repositories |
| [`api/supabase/`](api/supabase) | PostgreSQL schema and generated seed |
| [`docs/`](docs) | Demo walkthrough and editorial research |

## Catalog sources

The catalog follows the original album track order. Durations can vary by pressing or remaster. Track pages link to credit sources, and galleries list each image’s attribution and license.

- [Help!](https://www.thebeatles.com/help-0) · [Rubber Soul](https://www.thebeatles.com/rubber-soul) · [Sgt. Pepper’s Lonely Hearts Club Band](https://www.thebeatles.com/sgt-peppers-lonely-hearts-club-band-0) · [Let It Be](https://www.thebeatles.com/let-it-be-0)
- [Revolver LP](https://usastore.thebeatles.com/products/revolver-lp-remastered) · [Revolver session notes](https://www.thebeatles.com/announcing-revolver-special-editions) · [Abbey Road anniversary edition](https://www.thebeatles.com/abbey-road-special-anniversary-editions-2019)
- [Imagine album and sleeve notes](https://www.johnlennon.com/music/albums/imagine/) · [McCartney album credits](https://www.paulmccartney.com/discography/albums/mccartney) · [McCartney 2011 remaster durations](https://music.apple.com/us/album/mccartney-2011-remaster/1443150811)
- [Living in the Material World](https://www.georgeharrison.com/releases/living-in-the-material-world/) · [Apple PAS 10006 sleeve archive](https://beatlesvinyl.com.ua/uk/george/lp/PAS_10006.html) · [UK pressing notes](https://jpgr.co.uk/pas10006.html)
- [Ringo](https://store.ringostarr.com/products/ringo-cd) · [Apple PCTC 252 pressing notes](https://www.jpgr.co.uk/pctc252.html)

See the [editorial research notes](docs/catalog-research.md) for recording sources, oral histories, fan discussions, and image provenance.
