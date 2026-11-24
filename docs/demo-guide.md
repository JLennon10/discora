# Discora Demo Guide

Use the [live app](https://discora-web.vercel.app) for the walkthrough. The [README](../README.md) covers the catalog, project layout, and local setup.

## Install and explore

| Step | Expected result |
| --- | --- |
| Open Discora in Chrome on Android. From the browser menu, install the app, then launch it from the device’s app icon. | Discora opens as an installed PWA. |
| Open the artist list, select The Beatles, and open *Revolver*. Select “For No One” and “Tomorrow Never Knows” from the tracklist. | Both tracks show the Lennon–McCartney credit. The songwriting notes explain the contributions behind each recording and link to their sources. |
| Open the album catalog, choose The Beatles as the artist filter, and search for *Revolver*. Open it, save it to the collection, then open the collection and reload. | The search and filter work together. The saved album survives a reload and can be removed from the collection. |
| Open the [Abbey Road album page](https://discora-web.vercel.app/album/abbey-road). Jump to the archive gallery and switch photos. | Each slide shows a caption, a source, and license information. The album notes include a labeled account of the “Paul Is Dead” rumor. |
| Open [Revolver](https://discora-web.vercel.app/album/revolver) and [Tomorrow Never Knows](https://discora-web.vercel.app/lagu/tomorrow-never-knows) directly, then reload each page. | Both detail routes work on direct navigation and reload. |

## Check offline behavior

1. While online, open *Revolver*, “For No One,” and “Tomorrow Never Knows” in the installed app so the service worker can cache the catalog responses.
2. Enable airplane mode and turn off Wi-Fi. Reopen both tracks from the *Revolver* tracklist.
3. Verify that the cached details load. If a response is missing from the cache, Discora shows an offline notice. Reconnect and select the retry button to load the page.
