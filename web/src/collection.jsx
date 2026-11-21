import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { Archive, Check } from 'lucide-react'

const key = 'discora.collection.v1'
const CollectionContext = createContext(null)

function readCollection() {
  try {
    const saved = JSON.parse(localStorage.getItem(key))
    return Array.isArray(saved) ? saved.filter(album => album?.slug && album?.title) : []
  } catch {
    return []
  }
}

export function CollectionProvider({ children }) {
  const [albums, setAlbums] = useState(readCollection)
  const currentAlbums = useRef(albums)
  const [storageError, setStorageError] = useState(false)
  const [feedback, setFeedback] = useState(null)

  function save(next, notice) {
    try {
      localStorage.setItem(key, JSON.stringify(next))
      currentAlbums.current = next
      setAlbums(next)
      setStorageError(false)
      setFeedback(notice)
    } catch {
      setStorageError(true)
      setFeedback(null)
    }
  }

  function remove(slug) {
    const previous = currentAlbums.current
    const index = previous.findIndex(album => album.slug === slug)
    if (index === -1) return
    const album = previous[index]
    save(previous.filter(item => item.slug !== slug), { message: album.title + ' dihapus dari Koleksi', removed: album, index })
  }

  function toggle(album) {
    const previous = currentAlbums.current
    if (previous.some(item => item.slug === album.slug)) return remove(album.slug)
    const { tracks: _tracks, ...summary } = album
    save([summary, ...previous], { message: album.title + ' disimpan ke Koleksi' })
  }

  function undoRemoval() {
    if (!feedback?.removed) return
    const { removed, index } = feedback
    const next = [...currentAlbums.current]
    if (next.some(album => album.slug === removed.slug)) return
    next.splice(index, 0, removed)
    save(next, { message: removed.title + ' dikembalikan ke Koleksi' })
  }

  return <CollectionContext.Provider value={{
    albums, toggle, remove, storageError, feedback, setFeedback, undoRemoval,
  }}>{children}</CollectionContext.Provider>
}

export function useCollection() {
  return useContext(CollectionContext)
}

export function CollectionFeedback() {
  const { feedback, setFeedback, undoRemoval } = useCollection()
  const [focusedNotice, setFocusedNotice] = useState(null)

  useEffect(() => {
    if (!feedback || focusedNotice === feedback) return
    const timer = window.setTimeout(() => setFeedback(null), feedback.removed ? 8500 : 3200)
    return () => window.clearTimeout(timer)
  }, [feedback, focusedNotice, setFeedback])

  return <div className={feedback ? 'collection-feedback is-visible' : 'collection-feedback'}
    onFocus={() => setFocusedNotice(feedback)}
    onBlur={() => setFocusedNotice(null)}
  >
    <div className="collection-feedback-message" role="status">
      {feedback && <>{feedback.removed ? <Archive size={16} aria-hidden="true" /> : <Check size={16} aria-hidden="true" />}
        <span>{feedback.message}</span></>}
    </div>
    {feedback?.removed && <button type="button" onClick={() => {
      setFocusedNotice(null)
      undoRemoval()
    }}>Urungkan</button>}
  </div>
}
