import { useLayoutEffect } from 'react'
import { Link, useLocation, useNavigate, useOutletContext, useParams } from 'react-router-dom'
import {
  ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, BadgeCheck, BookmarkCheck,
  BookmarkPlus, ChevronRight, Disc, Headphones, Library, ScrollText, ShieldCheck,
} from 'lucide-react'
import { AlbumArtwork, ArtistPortrait, Resource, Tracklist } from './components.jsx'
import { useCollection } from './collection.jsx'
import { albumGalleries, trackGalleries } from './archive-photos.js'
import { PhotoGallery, Story } from './trivia.jsx'
import { albumStories, trackStories } from './trivia-data.js'
import { extraAlbumStories, extraTrackStories } from './extra-trivia.js'

const memberRoles = {
  'john-lennon': 'Vokal, Gitar Ritem, Piano',
  'paul-mccartney': 'Vokal, Bass, Piano',
  'george-harrison': 'Gitar Utama, Sitar, Vokal',
  'ringo-starr': 'Drum, Perkusi, Vokal',
}

export function ArtistDetail() {
  const { slug } = useParams()
  return <Resource endpoint={'artists/' + encodeURIComponent(slug)}>{artist => <ArtistProfile artist={artist} />}</Resource>
}

function ArtistProfile({ artist }) {
  const group = artist.kind === 'group'
  return <article className="page artist-detail">
    <div className={'artist-hero' + (artist.image ? '' : ' solo-hero')}>
      {artist.image && <img src={artist.image} alt="" />}
      {group && <span className="tag hero-catalog"><BadgeCheck size={13} /> Catalog No. 001-UK</span>}
      <div className="hero-copy">
        <div className="eyebrow">{group ? 'Kenalan sama bandnya' : 'Karier solo'}</div>
        <h1>{artist.name}</h1>
        <div className="meta-line"><span>{artist.origin} &nbsp;•&nbsp; {artist.era}</span><span>•&nbsp; {artist.genre}</span></div>
      </div>
    </div>
    <section className="panel profile-note">
      <h2 className="eyebrow">Kenalan lebih dekat <ScrollText size={15} /></h2>
      <p>{artist.bio}</p>
      {group && <div className="meta-line"><span><Library size={14} /> 12 Album Studio</span></div>}
    </section>
    {artist.members.length > 0 && <section className="band">
      <div className="section-heading"><h2>Anggota Band</h2><span className="meta">Kuartet Inti</span></div>
      <div className="member-list">{artist.members.map(member => (
        <Link to={'/artis/' + member.slug} className="member-card" key={member.slug}>
          <ArtistPortrait artist={member} />
          <div><h3>{member.name}</h3><p>{memberRoles[member.slug] ?? member.roles}</p></div>
          <ChevronRight size={18} />
        </Link>
      ))}</div>
    </section>}
    <section className="selected">
      <div className="section-heading"><h2><Disc size={18} /> Album Pilihan</h2><span className="meta">Piringan Hitam</span></div>
      {artist.albums.map(album => <article className="panel selected-album" key={album.slug}>
        <div className="selected-copy">
          <Link to={'/album/' + album.slug}><AlbumArtwork album={album} variant="selection_art" /></Link>
          <div className="selected-info">
            <div className="meta-line"><span>{album.slug === 'revolver' ? 'Master Pilihan Utama' : album.slug === 'abbey-road' ? 'Koleksi Penutup' : 'Arsip Solo'}</span><span>{album.year}</span></div>
            <h3>{album.title}</h3>
            <p>{album.track_count} Trek · {album.label}</p>
            <div className="tags"><span className="tag">{album.catalog}</span><span className="tag">{album.edition}</span></div>
          </div>
        </div>
        <Link className={'button' + (album.slug === 'revolver' ? '' : ' subtle')} to={'/album/' + album.slug}>Lihat Detail Album {album.title} <ArrowRight size={16} /></Link>
      </article>)}
    </section>
    <aside className="provenance">
      <div className="meta"><ShieldCheck size={15} /> Kurasi Provenansi {group ? 'Abbey Road' : 'Arsip'}</div>
      <p>Mau cek edisinya? Label, kode katalog, dan link sumber bisa kamu lihat di detail album.</p>
    </aside>
  </article>
}

export function AlbumDetail() {
  const { slug } = useParams()
  return <Resource endpoint={'albums/' + encodeURIComponent(slug)}>{album => <AlbumProfile album={album} />}</Resource>
}

function AlbumProfile({ album }) {
  const { albums, toggle, storageError } = useCollection()
  const saved = albums.some(item => item.slug === album.slug)
  const mix = album.format === 'Solo' ? 'Stereo' : album.format
  const story = albumStories[album.slug]
  const gallery = albumGalleries[album.slug]

  return <article className="page album-detail">
    <div className="album-hero">
      <div className="record" aria-hidden="true" />
      <div className="sleeve">
        <AlbumArtwork album={album} variant="cover" />
        {album.slug !== 'revolver' && <span className="sleeve-label">{mix} · {album.catalog}</span>}
      </div>
    </div>
    <div className="album-info">
      <h1>{album.title}</h1>
      <Link className="album-artist" to={'/artis/' + album.artist_slug}>{album.artist_name}</Link>
      <p>{album.year} · {album.label} · 12″ Vinyl LP, 33⅓ RPM
        <span>{mix}</span>
      </p>
      {(album.sides.length > 0 || album.studio || album.producer) && <div className="tags">
        {album.sides[0] && <span className="tag">Matrix {album.sides[0]}</span>}
        {album.studio && <span className="tag">{album.studio}</span>}
        {album.producer && <span className="tag">Prod. {album.producer}</span>}
      </div>}
      <button className="button save-button" aria-pressed={saved} onClick={() => toggle(album)}>
        {saved ? <BookmarkCheck size={17} /> : <BookmarkPlus size={17} />}
        {saved ? 'Tersimpan di Koleksi' : 'Simpan ke Koleksi'}
      </button>
      {storageError && <p role="alert">Koleksinya belum bisa diperbarui. Cek penyimpanan browser, lalu coba lagi.</p>}
      {story && <Link className="story-jump" to="#cerita-album">Cerita di Balik Album <ArrowDown size={15} aria-hidden="true" /></Link>}
    </div>
    {album.tracks.length ? <Tracklist album={album} /> : <div className="panel solo-tracks">
      <h2><Headphones size={18} /> Daftar Lagu</h2><p>Daftar lagunya belum kebuka. Coba buka lagi saat online.</p>
    </div>}
    {album.summary && <aside className="panel solo-tracks">
      <h2><ScrollText size={18} /> Catatan Rilisan</h2>
      <p>{album.summary}</p>
      {album.source_url && <a href={album.source_url} target="_blank" rel="noreferrer">Lihat sumber rilisan <ArrowUpRight size={14} /></a>}
    </aside>}
    <Story story={story} extra={extraAlbumStories[album.slug]} album />
    {gallery && <PhotoGallery key={album.slug} gallery={gallery} />}
  </article>
}

export function TrackDetail() {
  const { id } = useParams()
  return <Resource endpoint={'tracks/' + encodeURIComponent(id)}>{track => <TrackProfile track={track} />}</Resource>
}

function CreditBlock({ track }) {
  return <div className="credit-block">
    <section aria-label="Kredit Resmi">
      <h2 className="meta">Kredit Resmi</h2>
      <p className="official-credit">{track.credit} <BadgeCheck size={17} /></p>
    </section>
    {track.writing_note && <section aria-label="Catatan Penulisan">
      <h2 className="meta">Catatan Penulisan</h2>
      <p>
        {track.writer && <>Penulis utama <strong>{track.writer}</strong>. </>}
        {track.writing_note}
        {track.writing_source_url && <> <a className="writing-source" href={track.writing_source_url} target="_blank" rel="noreferrer">Sumber tambahan</a>.</>}
      </p>
    </section>}
    {track.source_url && <a className="button subtle" href={track.source_url} target="_blank" rel="noreferrer">Lihat Sumber <ArrowUpRight size={16} /></a>}
  </div>
}

function TrackProfile({ track }) {
  const { pathname, state } = useLocation()
  const navigate = useNavigate()
  const setTrackReturn = useOutletContext()
  const returnRoute = '/album/' + track.album.slug + '#trek-' + track.id
  const fromAlbum = state?.fromAlbum === track.album.slug && window.history.state?.idx > 0
  const mix = track.album.format === 'Solo' ? 'Stereo' : track.album.format
  const recordingNote = track.description || track.annotation
  const gallery = trackGalleries[track.id]

  useLayoutEffect(() => {
    setTrackReturn({ pathname, to: returnRoute, back: fromAlbum })
    return () => setTrackReturn(null)
  }, [pathname, returnRoute, fromAlbum, setTrackReturn])

  return <article className="page track-detail">
    <div className="track-edition"><span className="tag"><i /> {mix} • {track.album.catalog}</span></div>
    <div className="panel track-panel">
      <div className="meta track-context">{track.album.title} <span>·</span> Trek {track.position} <span>·</span> {track.duration}</div>
      <h1>{track.title}</h1>
      {recordingNote && <p className="track-description">{recordingNote}</p>}
      <CreditBlock track={track} />
    </div>
    <Story story={trackStories[track.id]} extra={extraTrackStories[track.id]} />
    <Link className="button return-button" to={returnRoute} replace onClick={event => {
      if (fromAlbum && event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
        event.preventDefault()
        navigate(-1)
      }
    }}><ArrowLeft size={17} /> Kembali ke {track.album.title}</Link>
    {gallery && <PhotoGallery key={track.id} gallery={gallery} />}
  </article>
}
