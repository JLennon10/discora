import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

const proxy = { '/api': 'http://127.0.0.1:3000' }

export default defineConfig({
  server: { proxy },
  preview: { proxy },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['art/*', 'icons/*'],
      manifest: {
        id: '/',
        name: 'Discora — Arsip Piringan Hitam',
        short_name: 'Discora',
        lang: 'id',
        description: 'Katalog piringan hitam The Beatles dan diskografi solo.',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        background_color: '#fff8f5',
        theme_color: '#fff8f5',
        icons: [
          { src: '/icons/discora-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: '/icons/discora-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: '/icons/discora-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,woff2}'],
        navigateFallbackDenylist: [/^\/api(?:\/|$)/],
        cleanupOutdatedCaches: true,
        runtimeCaching: [
          {
            urlPattern: ({ url, sameOrigin }) => sameOrigin && url.pathname.startsWith('/api/'),
            handler: 'NetworkFirst',
            options: {
              cacheName: 'discora-catalog-v1',
              networkTimeoutSeconds: 4,
              cacheableResponse: { statuses: [200] },
              expiration: { maxEntries: 80, maxAgeSeconds: 30 * 24 * 60 * 60 },
              plugins: [{
                handlerDidError: async () => new Response(null, {
                  status: 503,
                  headers: { 'X-Discora-Cache': 'miss' },
                }),
              }],
            },
          },
        ],
      },
    }),
  ],
})
