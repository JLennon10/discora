import { useLayoutEffect, useRef } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

const positions = new Map()

export function usePageScroll(ready = true) {
  const { key, pathname, hash } = useLocation()
  const navigationType = useNavigationType()
  const lastPage = useRef(null)

  useLayoutEffect(() => {
    if (!ready) {
      window.scrollTo(0, 0)
      return
    }

    const samePage = lastPage.current === pathname
    lastPage.current = pathname
    const saved = navigationType === 'POP' ? positions.get(key) : undefined
    const target = hash && document.getElementById(hash.slice(1))

    if (saved !== undefined) {
      window.scrollTo(0, saved)
    } else if (target) {
      const albumSection = hash === '#cerita-album' || hash === '#galeri-album'
      const smooth = albumSection && samePage && navigationType === 'PUSH'
        && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (albumSection) target.focus({ preventScroll: true })
      target.scrollIntoView({
        block: hash.startsWith('#trek-') ? 'center' : 'start',
        behavior: smooth ? 'smooth' : 'instant',
      })
    } else if (!samePage) {
      window.scrollTo(0, 0)
    }

    function remember() {
      positions.set(key, window.scrollY)
    }
    positions.delete(key)
    remember()
    if (positions.size > 100) positions.delete(positions.keys().next().value)
    window.addEventListener('scroll', remember, { passive: true })
    return () => window.removeEventListener('scroll', remember)
  }, [key, pathname, hash, navigationType, ready])
}
