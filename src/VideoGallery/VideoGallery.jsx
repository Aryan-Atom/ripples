import { useCallback, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import VideoCard from './VideoCard.jsx'
import { FEATURED_VIDEO_PROJECTS } from '../data/videoGallery.js'
import './styles.css'

const GRID_GAP = 18
const cardLayouts = {
  'span-a': { gridColumn: 'span 3', gridRow: 'span 2' },
  'span-b': { gridColumn: 'span 2', gridRow: 'span 2' },
  'span-c': { gridColumn: 'span 2', gridRow: 'span 1' },
  'span-d': { gridColumn: 'span 3', gridRow: 'span 1' },
  'span-e': { gridColumn: 'span 1', gridRow: 'span 2' },
  'span-f': { gridColumn: 'span 1', gridRow: 'span 1' },
  'span-g': { gridColumn: 'span 2', gridRow: 'span 1' },
  'span-h': { gridColumn: 'span 1', gridRow: 'span 1' },
}

export default function VideoGallery() {
  const [activeId, setActiveId] = useState(null)

  const containerStyles = useMemo(
    () => ({
      willChange: 'transform, opacity',
      transformStyle: 'preserve-3d',
    }),
    [],
  )

  const handleHoverStart = useCallback((id) => {
    setActiveId(id)
  }, [])

  const handleHoverEnd = useCallback((id) => {
    setActiveId((current) => (current === id ? null : current))
  }, [])

  const items = useMemo(() => FEATURED_VIDEO_PROJECTS, [])

  return (
    <section className="video-gallery" aria-labelledby="video-gallery-title">
      <div className="video-gallery__head r-container">
        <motion.span className="r-label" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: 'easeOut' }}>
          Featured projects
        </motion.span>
        <motion.h2 className="video-gallery__title" id="video-gallery-title" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: 'easeOut', delay: 0.05 }}>
          Select works with <em>live motion</em> previews
        </motion.h2>
        <motion.p className="r-body video-gallery__copy" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}>
          An immersive layout built for premium storytelling — subtle motion, polished lighting, and efficient video performance.
        </motion.p>
      </div>

      <div className="video-gallery__grid-wrapper">
        <div className="video-gallery__grid" style={{ gap: `${GRID_GAP}px` }}>
          {items.map((item) => (
            <VideoCard
              key={item.id}
              item={item}
              isActive={activeId === item.id}
              onHoverStart={handleHoverStart}
              onHoverEnd={handleHoverEnd}
              containerStyles={cardLayouts[item.layout]}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
