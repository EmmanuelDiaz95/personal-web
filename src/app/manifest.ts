import type { MetadataRoute } from 'next';

// Home-screen icons for Android. Browser-tab and iOS icons are the
// icon.svg / favicon.ico / apple-icon.png file conventions in this folder.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Emmanuel Diaz',
    short_name: 'Emmanuel Diaz',
    start_url: '/',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}
