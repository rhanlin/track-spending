import path from 'path'
import { UserConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
const alias = {
  '/~/': path.resolve(__dirname, 'src'),
}
const config: UserConfig = {
  alias,
  plugins: [
    VitePWA({
      manifest: {
        name: '記帳',
        short_name: '記帳',
        display: 'standalone',
        icons: [
          {
            src: './android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: './android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: './android-chrome-maskable-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: './android-chrome-maskable-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: './apple-touch-icon-60x60.png',
            sizes: '60x60',
            type: 'image/png',
          },
          {
            src: './apple-touch-icon-76x76.png',
            sizes: '76x76',
            type: 'image/png',
          },
          {
            src: './apple-touch-icon-120x120.png',
            sizes: '120x120',
            type: 'image/png',
          },
          {
            src: './apple-touch-icon-152x152.png',
            sizes: '152x152',
            type: 'image/png',
          },
          {
            src: './apple-touch-icon-180x180.png',
            sizes: '180x180',
            type: 'image/png',
          },
          {
            src: './favicon-16x16.png',
            sizes: '16x16',
            type: 'image/png',
          },
          {
            src: './favicon-32x32.png',
            sizes: '32x32',
            type: 'image/png',
          },
          {
            src: './msapplication-icon-144x144.png',
            sizes: '144x144',
            type: 'image/png',
          },
          {
            src: './mstile-150x150.png',
            sizes: '150x150',
            type: 'image/png',
          },
          {
            src: '/apple-touch-icon.png',
            sizes: '180x180',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            // urlPattern: new RegExp('script'),
            urlPattern: ({ url }) => /script/.test(url),
            handler: 'CacheFirst',
            options: {
              cacheName: 'api-cache',
              // cacheableResponse: {
              //   statuses: [0, 200],
              // },
            },
          },
        ],
      },
    }),
  ],
}
export default config