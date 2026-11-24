import { useEffect, useId, useRef, useState } from 'react'
import { ArrowUpRight, BookOpen, Camera, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'

const slideInterval = 5500

function StoryEntry({ story }) {
  return <div className="story-entry">
    {story.kind && <span className="tag story-kind">{story.kind}</span>}
    {story.title && <h3>{story.title}</h3>}
    <p>{story.text}</p>
    <ul className="story-sources" aria-label="Sumber cerita">
      {story.sources.map(source => <li key={source.url}>
        <a href={source.url} target="_blank" rel="noreferrer">{source.label} <ArrowUpRight size={13} aria-hidden="true" /></a>
      </li>)}
    </ul>
  </div>
}

export function Story({ stories, album = false }) {
  const headingId = useId()
  if (!stories.length) return null

  return <section id={album ? 'cerita-album' : undefined} tabIndex={album ? -1 : undefined} className="panel story" aria-labelledby={headingId}>
    <h2 id={headingId}><BookOpen size={17} aria-hidden="true" /> {album ? 'Cerita di Balik Album' : 'Cerita di Balik Lagu'}</h2>
    {stories.map(story => <StoryEntry key={story.title ?? story.text} story={story} />)}
  </section>
}

export function PhotoGallery({ gallery, id }) {
  const { photos } = gallery
  const headingId = useId()
  const viewportId = useId()
  const viewport = useRef(null)
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [touching, setTouching] = useState(false)
  const [inView, setInView] = useState(false)
  const [foreground, setForeground] = useState(!document.hidden)
  const [reducedMotion, setReducedMotion] = useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches)
  const playing = !paused && !hovered && !touching && !reducedMotion && inView && foreground
  const photo = photos[active]

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setInView(entry.intersectionRatio >= 0.45), { threshold: 0.45 })
    observer.observe(viewport.current)
    const motion = matchMedia('(prefers-reduced-motion: reduce)')
    const onMotionChange = event => setReducedMotion(event.matches)
    const onVisibilityChange = () => setForeground(!document.hidden)
    motion.addEventListener('change', onMotionChange)
    document.addEventListener('visibilitychange', onVisibilityChange)
    return () => {
      observer.disconnect()
      motion.removeEventListener('change', onMotionChange)
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [])

  const showPhoto = (index) => {
    const strip = viewport.current
    strip.scrollTo({
      left: ((index + photos.length) % photos.length) * strip.clientWidth,
      behavior: reducedMotion ? 'instant' : 'smooth',
    })
  }

  useEffect(() => {
    if (!playing) return
    const next = (active + 1) % photos.length
    const timer = window.setTimeout(() => {
      const strip = viewport.current
      strip.scrollTo({ left: next * strip.clientWidth, behavior: 'smooth' })
    }, slideInterval)
    return () => window.clearTimeout(timer)
  }, [playing, active, photos.length])

  return <section
    id={id}
    tabIndex={id ? -1 : undefined}
    className="panel archive-gallery"
    aria-labelledby={headingId}
    aria-roledescription="galeri geser"
    onPointerEnter={event => {
      if (event.pointerType === 'mouse' && matchMedia('(any-hover: hover)').matches) setHovered(true)
    }}
    onPointerLeave={event => event.pointerType === 'mouse' && setHovered(false)}
    onTouchStart={() => setHovered(false)}
    onFocusCapture={event => {
      if (!event.currentTarget.contains(event.relatedTarget) && event.target.matches(':focus-visible')) setPaused(true)
    }}
  >
    <h2 id={headingId}><Camera size={17} aria-hidden="true" /> {gallery.title}</h2>
    <div className="gallery-controls">
      {!reducedMotion && <button type="button" className="icon-button gallery-play" onClick={() => setPaused(!paused)}
        aria-label={paused ? 'Mulai geser otomatis' : 'Jeda geser otomatis'} aria-controls={viewportId}>
        {paused ? <Play size={18} /> : <Pause size={18} />}
      </button>}
      <button type="button" className="icon-button" aria-label="Foto sebelumnya" aria-controls={viewportId} onClick={() => showPhoto(active - 1)}>
        <ChevronLeft size={18} />
      </button>
      <span className="meta" aria-hidden="true">{active + 1} / {photos.length}</span>
      <button type="button" className="icon-button" aria-label="Foto berikutnya" aria-controls={viewportId} onClick={() => showPhoto(active + 1)}>
        <ChevronRight size={18} />
      </button>
    </div>
    <div id={viewportId} className="gallery-viewport" ref={viewport}
      onScroll={event => {
        const strip = event.currentTarget
        const index = Math.round(strip.scrollLeft / strip.clientWidth)
        setActive(Math.max(0, Math.min(photos.length - 1, index)))
      }}
      onTouchStart={() => setTouching(true)}
      onTouchEnd={event => setTouching(event.touches.length > 0)}
      onTouchCancel={() => setTouching(false)}
    >
      {photos.map((item, i) => <img key={item.file} alt={item.alt} aria-hidden={i !== active}
        src={'/art/' + item.file + '.webp'} loading="lazy" decoding="async" />)}
    </div>
    <div className="gallery-caption" aria-live={playing ? 'off' : 'polite'}>
      <p><span className="visually-hidden">Foto {active + 1} dari {photos.length}. </span>{photo.caption}</p>
      <p className="gallery-credit">
        <a href={photo.source} target="_blank" rel="noreferrer">{photo.credit} <ArrowUpRight size={12} aria-hidden="true" /></a>
        <span aria-hidden="true">·</span>
        {photo.licenseUrl
          ? <a href={photo.licenseUrl} target="_blank" rel="noreferrer">{photo.license}</a>
          : photo.license}
        {photo.converted && <span>· Ukuran disesuaikan untuk web</span>}
      </p>
    </div>
  </section>
}
