import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useLayoutEffect } from 'react'
import '@fontsource-variable/inter/wght.css'
import '@fontsource-variable/newsreader/opsz.css'
import '@fontsource-variable/newsreader/opsz-italic.css'
import { CollectionProvider } from './collection.jsx'
import { Shell, Missing } from './components.jsx'
import { AlbumList, ArtistList, Collection, About } from './lists.jsx'
import { AlbumDetail, ArtistDetail, TrackDetail } from './details.jsx'
import './style.css'

function App() {
  const { pathname, hash } = useLocation()
  useLayoutEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView()
    else window.scrollTo(0, 0)
  }, [pathname, hash])

  return (
    <CollectionProvider>
      <Routes>
        <Route element={<Shell />}>
          <Route index element={<Navigate to="/artis" replace />} />
          <Route path="artis" element={<ArtistList />} />
          <Route path="artis/:slug" element={<ArtistDetail />} />
          <Route path="album" element={<AlbumList />} />
          <Route path="album/:slug" element={<AlbumDetail />} />
          <Route path="lagu/:id" element={<TrackDetail />} />
          <Route path="koleksi" element={<Collection />} />
          <Route path="tentang" element={<About />} />
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </CollectionProvider>
  )
}
createRoot(document.getElementById('root')).render(<BrowserRouter><App /></BrowserRouter>)
