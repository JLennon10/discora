import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate, useNavigationType } from 'react-router-dom'
import {
  Archive, ArrowLeft, AudioLines, BookOpen, Check, ChevronRight, Disc, LoaderCircle, Search,
  Share2, Sparkles, UserRound, UsersRound, X,
} from 'lucide-react'
import { artistPhotos } from './artist-photos.js'
import { CollectionFeedback } from './collection.jsx'
import { usePageScroll } from './page-scroll.js'

const tabs = [
  { label: 'Artis', to: '/artis', Icon: UsersRound },
  { label: 'Album', to: '/album', Icon: Disc },
  { label: 'Koleksi', to: '/koleksi', Icon: Archive },
  { label: 'Tentang', to: '/tentang', Icon: Sparkles },
]

function Header({ returnRoute }) {
  const { pathname, search: currentSearch } = useLocation()
  const navigate = useNavigate()
  const [, section, slug] = pathname.split('/')
  const detail = Boolean(slug)
  const track = detail && section === 'lagu'
  const [copied, setCopied] = useState(false)

  useEffect(() => setCopied(false), [pathname])

  async function share() {
    try {
      if (navigator.share) await navigator.share({ title: 'Discora', url: location.href })
      else {
        await navigator.clipboard.writeText(location.href)
        setCopied(true)
      }
    } catch (error) {
      if (error.name !== 'AbortError') setCopied('error')
    }
  }

  function search() {
    const input = document.getElementById('catalog-search')
    if (input) {
      input.focus()
      return
    }
    const onCatalog = section === 'artis' || section === 'album'
    const params = new URLSearchParams(onCatalog ? currentSearch : '')
    params.set('cari', '1')
    navigate((onCatalog ? pathname : '/album') + '?' + params, { replace: onCatalog })
  }

  const title = tabs.find(tab => tab.to === '/' + section)?.label ?? 'Artis'
  return (
    <header className={'topbar ' + (detail ? 'detail-topbar' : '')}>
      {detail ? <>
        <button className="icon-button" aria-label="Kembali" onClick={() => {
          if (returnRoute?.back) navigate(-1)
          else if (returnRoute) navigate(returnRoute.to, { replace: true })
          else if (window.history.state?.idx > 0) navigate(-1)
          else navigate(section === 'artis' ? '/artis' : '/album')
        }}><ArrowLeft /></button>
        <div className="detail-heading">
          {track ? <strong>Detail Lagu</strong> : section === 'artis'
            ? <><strong>Detail Artis</strong><small>Detail Master Matrix</small></>
            : <Link to="/album" className="wordmark"><Disc size={15} />Discora</Link>}
        </div>
      </> : <Link className="brand" to="/artis">
        <img className="brand-icon" src="/icons/discora-192.png" alt="" width="32" height="32" />
        <span className="brand-copy">
          <span className="wordmark">Discora <span className="tag">Arsip</span></span>
          <small>{title}</small>
        </span>
      </Link>}
      <div className="header-actions">
        {detail ? <button className="icon-button" aria-label={copied === true ? 'Tautan disalin' : 'Bagikan halaman'} onClick={share}>
          {copied === true ? <Check /> : <Share2 />}
        </button> : <button className="icon-button" aria-label="Cari di katalog" onClick={search}><Search /></button>}
        {!track && <Link className="icon-button curator" to="/tentang#kurator" aria-label="Tentang kurator"><UserRound size={16} /></Link>}
      </div>
      {copied && <span role="status" className="share-notice">{copied === true ? 'Link sudah disalin' : 'Link belum bisa dibagikan'}</span>}
    </header>
  )
}

export function Shell() {
  const { pathname } = useLocation()
  const [trackReturn, setTrackReturn] = useState(null)
  const returnRoute = trackReturn?.pathname === pathname ? trackReturn : null
  return <div className="app">
    <a className="skip" href="#konten">Langsung ke konten</a>
    <Header returnRoute={returnRoute} />
    <main id="konten"><Outlet context={setTrackReturn} /></main>
    <CollectionFeedback />
    <nav className="bottom-nav" aria-label="Navigasi utama">
      {tabs.map(({ label, to, Icon }) => {
        const icon = <><Icon size={22} strokeWidth={2.3} /><span>{label}</span></>
        if (to === '/album' && pathname.startsWith('/lagu/')) {
          return <Link key={to} to={to} className="active" aria-current="location">{icon}</Link>
        }
        return <NavLink key={to} to={to} className={({ isActive }) => isActive ? 'active' : undefined}>
          {icon}
        </NavLink>
      })}
    </nav>
  </div>
}

export function Intro({ Icon, eyebrow, title, children }) {
  return <div className="intro">
    <div className="eyebrow">{Icon && <Icon size={14} />} {eyebrow}</div>
    <h1>{title}</h1>
    {children && <p>{children}</p>}
  </div>
}

export function SearchBox({ value, onChange, placeholder, autoFocus }) {
  const input = useRef(null)
  const navigationType = useNavigationType()
  return <div className="search-box">
    <label className="search-icon" htmlFor="catalog-search" aria-hidden="true"><Search size={18} /></label>
    <input type="search" id="catalog-search" ref={input} value={value} onChange={event => onChange(event.target.value)}
      placeholder={placeholder} aria-label={placeholder} autoFocus={autoFocus && navigationType !== 'POP'} />
    {value && <button type="button" className="icon-button clear-search" aria-label="Hapus pencarian" onClick={() => {
      onChange('')
      input.current.focus({ preventScroll: true })
    }}><X size={16} aria-hidden="true" /></button>}
  </div>
}

export function FilterBar({ options, value, choose, label }) {
  const bar = useRef(null)

  useLayoutEffect(() => {
    const strip = bar.current
    const selected = strip.querySelector('[aria-pressed="true"]')
    if (!selected) return
    const bounds = strip.getBoundingClientRect()
    const chip = selected.getBoundingClientRect()
    if (chip.right > bounds.right) strip.scrollLeft += chip.right - bounds.right + 3
    else if (chip.left < bounds.left) strip.scrollLeft += chip.left - bounds.left - 3
  }, [value])

  return <div className="filter-bar" ref={bar} role="group" aria-label={label}>
    {options.map(({ id, label, Icon }) => <button type="button" key={id} aria-pressed={value === id} onClick={() => choose(id)}>
      {Icon && <Icon size={14} />}{label}
    </button>)}
  </div>
}

export function Notice({ title, children, action, busy = false }) {
  return <div className="notice" role="status" aria-busy={busy}>
    <h2>{busy && <LoaderCircle className="loading-disc" size={19} aria-hidden="true" />}{title}</h2>
    {children && <p>{children}</p>}
    {action}
  </div>
}

export function Missing() {
  return <Notice title="Halaman ini belum ketemu" action={<Link className="button" to="/artis">Kembali ke katalog</Link>}>
    Cek lagi link-nya, atau cari langsung dari katalog.
  </Notice>
}

export function Resource({ endpoint, children }) {
  const [attempt, setAttempt] = useState(0)
  const [result, setResult] = useState(null)
  useEffect(() => {
    const controller = new AbortController()
    async function load() {
      try {
        const res = await fetch('/api/' + endpoint, { signal: controller.signal })
        if (res.status === 404) {
          setResult({ endpoint, attempt, missing: true })
          return
        }
        if (res.headers.get('X-Discora-Cache') === 'miss') {
          setResult({ endpoint, attempt, offline: true, failed: true })
          return
        }
        if (!res.ok) throw new Error('Catalog request failed')
        const data = await res.json()
        setResult({ endpoint, attempt, data })
      } catch (error) {
        if (error.name === 'AbortError') return
        setResult({ endpoint, attempt, offline: !navigator.onLine, failed: true })
      }
    }
    load()
    return () => controller.abort()
  }, [endpoint, attempt])

  const ready = result?.endpoint === endpoint && result.attempt === attempt
  usePageScroll(ready)
  if (!ready) return <Notice title="Lagi buka katalog…" busy />
  if (result.missing) return <Missing />
  if (result.failed) return <Notice
    title={result.offline ? 'Halaman belum tersimpan untuk offline' : 'Katalognya belum kebuka'}
    action={<button className="button" onClick={() => setAttempt(attempt + 1)}>Coba lagi</button>}>
    {result.offline ? 'Sambung lagi ke internet buat buka halaman ini.' : 'Cek koneksimu, lalu coba lagi.'}
  </Notice>
  return children(result.data)
}

export function CuratorNote({ title, children, Icon = BookOpen }) {
  return <aside className="curator-note">
    <Icon size={18} />
    <div><h2>{title}</h2><p>{children}</p></div>
  </aside>
}

export function AlbumArtwork({ album, variant = 'artwork', className = '' }) {
  const source = album[variant] || album.cover || album.artwork
  return <img className={'album-artwork ' + className} src={source} alt={'Sampul ' + album.title} />
}

export function ArtistPortrait({ artist }) {
  if (!artistPhotos[artist.slug]) {
    return <span className="artist-photo artist-initials" aria-hidden="true">{artist.initials}</span>
  }
  return <img className="artist-photo" src={'/art/portrait-' + artist.slug + '.webp'} width="68" height="68" alt="" />
}

export function AlbumCard({ album }) {
  return <Link to={'/album/' + album.slug} className="album-card" aria-label={album.title + ' — ' + album.artist_name}>
    <AlbumArtwork album={album} />
    <h2>{album.title}</h2>
    <p>{album.artist_name}</p>
    <div className="meta-line"><span>{album.year} · {album.format}</span><span>{album.catalog}</span></div>
  </Link>
}

export function Tracklist({ album }) {
  const seconds = album.tracks.reduce((total, track) => {
    const [minutes, seconds] = track.duration.split(':').map(Number)
    return total + minutes * 60 + seconds
  }, 0)
  const runtime = Math.floor(seconds / 60) + ':' + String(seconds % 60).padStart(2, '0')
  return <section className="tracklist" aria-labelledby="tracklist-title">
    <div className="section-bar">
      <h2 id="tracklist-title"><AudioLines size={17} /> Daftar Lagu Master</h2>
      <span className="meta">{album.tracks.length} trek · {runtime}</span>
    </div>
    {[1, 2].map(side => <div key={side} className="track-side">
      <div className="meta-line">
        <span>Sisi {side} (Side {side === 1 ? 'One' : 'Two'})</span>
        {album.sides[side - 1] && <span>Matrix {album.sides[side - 1]}</span>}
      </div>
      <ol start={album.tracks.find(track => track.side === side)?.position}>
        {album.tracks.filter(track => track.side === side).map(track => <li key={track.id}>
          <Link className="track-row" id={'trek-' + track.id} to={'/lagu/' + track.id} state={{ fromAlbum: album.slug }}>
            <span className="track-number">{String(track.position).padStart(2, '0')}</span>
            <span className="track-text">
              <strong>{track.title}</strong>
              <span className="tag">{track.credit}</span>
              {track.annotation && <small>{track.annotation}</small>}
            </span>
            <span className="track-time">{track.duration} <ChevronRight size={14} /></span>
          </Link>
        </li>)}
      </ol>
    </div>)}
  </section>
}
