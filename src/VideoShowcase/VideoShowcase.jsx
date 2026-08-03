import { useMemo } from 'react'
import { motion } from 'framer-motion'
import VideoCard from './VideoCard.jsx'
import useHoverVideo from './useHoverVideo.js'
import { sectionVariants } from './animations.js'
import './VideoShowcase.css'

const videoItems = [
  {
    id: 'hero-video',
    title: 'Cinematic Flow',
    category: 'Large Scale Installation',
    poster: '/assets/home_1.jpg',
    video: '/assets/web-videos/video 1.mp4',
    className: 'video-card__span-hero',
  },
  {
    id: 'portrait-video',
    title: 'Portrait Motion',
    category: 'Interactive Fountain',
    poster: '/assets/home_2.jpg',
    video: '/assets/web-videos/video 2.mp4',
    className: 'video-card__span-portrait',
  },
  {
    id: 'square-video',
    title: 'Reflective Grid',
    category: 'Public Space',
    poster: '/assets/home_3.jpg',
    video: '/assets/web-videos/video 3.mp4',
    className: 'video-card__span-square',
  },
  {
    id: 'landscape-video-1',
    title: 'Lumen Tides',
    category: 'Projection Design',
    poster: '/assets/home_4.jpg',
    video: '/assets/web-videos/video 4.mp4',
    className: 'video-card__span-landscape-1',
  },
  {
    id: 'landscape-video-2',
    title: 'Echo Motion',
    category: 'Architectural Lighting',
    poster: '/assets/home_1.jpg',
    video: '/assets/web-videos/video 5.mp4',
    className: 'video-card__span-landscape-2',
  },
]

export default function VideoShowcase() {
  const { activeId, setActive, clearActive } = useHoverVideo()
  const items = useMemo(() => videoItems, [])

  return (
    <section className="video-showcase" aria-labelledby="video-showcase-title">
      <div className="video-showcase__inner">
        <div className="video-showcase__header">
          <p className="r-label">Featured showcase</p>
          <motion.h2 className="video-showcase__title" id="video-showcase-title" variants={sectionVariants} initial="hidden" animate="visible" transition={{ duration: 0.75, ease: 'easeOut' }}>
            Editorial video storytelling with premium motion.
          </motion.h2>
          <motion.p className="video-showcase__intro" variants={sectionVariants} initial="hidden" animate="visible" transition={{ duration: 0.75, ease: 'easeOut', delay: 0.08 }}>
            A refined visual grid with thoughtful spacing, cinematic hover motion, and performant poster-to-video transitions.
          </motion.p>
        </div>

        <div className="video-showcase__grid">
          {items.map((item) => (
            <VideoCard
              key={item.id}
              id={item.id}
              poster={item.poster}
              video={item.video}
              title={item.title}
              category={item.category}
              className={item.className}
              isActive={activeId === item.id}
              isDimmed={activeId !== null && activeId !== item.id}
              onHoverStart={setActive}
              onHoverEnd={clearActive}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
