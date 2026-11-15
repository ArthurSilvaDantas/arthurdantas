import type { NextConfig } from 'next';

const LEGACY_ROUTES = [
  { path: 'career', section: 'experiencia' },
  { path: 'projects', section: 'projetos' },
  { path: 'skills', section: 'skills' },
];

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 448, 512],
    qualities: [75, 90],
  },
  async redirects() {
    return [
      ...LEGACY_ROUTES.flatMap(({ path, section }) => [
        { source: `/:prefix(pt)?/${path}`, destination: `/#${section}`, permanent: true },
        { source: `/en/${path}`, destination: `/en#${section}`, permanent: true },
      ]),
      { source: '/pt', destination: '/', permanent: true },
    ];
  },
};

export default nextConfig;
