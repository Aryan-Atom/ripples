import { withRemoteAssets } from './assets.js'

export const FEATURED_VIDEO_PROJECTS = withRemoteAssets([
  {
    id: 'logo-motion',
    title: 'Signature Motion',
    location: 'Studio',
    category: 'Brand Experience',
    poster: '/assets/home_2.webp',
    video: '/assets/Logo_construction_animation.mp4',
    layout: 'span-f',
  },
  {
    id: 'web-vessel',
    title: 'Web Vessel',
    location: 'Online Launch',
    category: 'Digital Story',
    poster: '/assets/home_3.webp',
    video: '/assets/web-videos/video 1.mp4',
    layout: 'span-g',
  },
  {
    id: 'lake-engineering',
    title: 'Lake Engineering',
    location: 'Engineering Lab',
    category: 'Technical Design',
    poster: '/assets/home_4.webp',
    video: '/assets/video_engineering.mp4',
    layout: 'span-h',
  },
])
