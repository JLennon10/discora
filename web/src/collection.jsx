import { createContext, useContext, useState } from 'react'

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
  const [storageError, setStorageError] = useState(false)

  function save(next) {
    try {
      localStorage.setItem(key, JSON.stringify(next))
      setAlbums(next)
      setStorageError(false)
    } catch {
      setStorageError(true)
    }
  }

  function remove(slug) {
    save(albums.filter(album => album.slug !== slug))
  }

  function toggle(album) {
    if (albums.some(item => item.slug === album.slug)) return remove(album.slug)
    const { tracks: _tracks, ...summary } = album
    save([summary, ...albums])
  }

  return <CollectionContext.Provider value={{ albums, toggle, remove, storageError }}>{children}</CollectionContext.Provider>
}

export function useCollection() {
  return useContext(CollectionContext)
}
