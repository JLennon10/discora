import { useLayoutEffect } from 'react'
import { Link, useLocation, useOutletContext, useParams } from 'react-router-dom'
import {
  ArrowLeft, ArrowRight, ArrowUpRight, AudioLines, BadgeCheck, BookmarkCheck,
  BookmarkPlus, ChevronRight, Disc, Drum, Headphones, Library, Music2, ScrollText, ShieldCheck,
} from 'lucide-react'
import { AlbumArtwork, Resource, Tracklist } from './components.jsx'
import { useCollection } from './collection.jsx'

const memberInfo = [
  ['Vokal, Gitar Ritem, Piano', Music2],
  ['Vokal, Bass, Piano', AudioLines],
  ['Gitar Utama, Sitar, Vokal', Disc],
  ['Drum, Perkusi, Vokal', Drum],
]

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
        <div className="eyebrow">{group ? 'Arsip Diskografi Kanonik' : 'Arsip Diskografi Solo'}</div>
        <h1>{artist.name}</h1>
        <div className="meta-line"><span>{artist.origin} &nbsp;•&nbsp; {artist.era}</span><span>•&nbsp; {artist.genre}</span></div>
      </div>
    </div>
    <section className="panel profile-note">
      <h2 className="eyebrow">Catatan Kuratorial <ScrollText size={15} /></h2>
      <p>{artist.bio}</p>
      {group && <div className="meta-line"><span><Library size={14} /> 12 Album Studio</span></div>}
    </section>
    {artist.members.length > 0 && <section className="band">
      <div className="section-heading"><h2>Anggota Band</h2><span className="meta">Kuartet Inti</span></div>
      <div className="member-list">{artist.members.map((member, index) => {
        const [role, Icon] = memberInfo[index] ?? [member.roles, Music2]
        return <Link to={'/artis/' + member.slug} className="member-card" key={member.slug}>
          <span className={'feature-icon tone-' + member.rank}><Icon size={18} /></span>
          <div><h3>{member.name}</h3><p>{role}</p></div>
          <ChevronRight size={18} />
        </Link>
      })}</div>
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
      <p>Detail rilisan mencantumkan label, kode katalog, dan tautan rujukan yang tersedia.</p>
    </aside>
  </article>
}

export function AlbumDetail() {
  const { slug } = useParams()
  return <Resource endpoint={'albums/' + encodeURIComponent(slug)}>{album => <AlbumProfile album={album} />}</Resource>
}

function AlbumProfile({ album }) {
  const { albums, toggle, storageError } = useCollection()
  const { hash } = useLocation()
  const saved = albums.some(item => item.slug === album.slug)

  useLayoutEffect(() => {
    if (hash.startsWith('#trek-')) document.getElementById(hash.slice(1))?.scrollIntoView({ block: 'center' })
  }, [album.slug, hash])

  return <article className="page album-detail">
    <div className="album-hero">
      <div className="record" aria-hidden="true" />
      <div className="sleeve">
        <AlbumArtwork album={album} variant="cover" />
        {album.slug !== 'revolver' && <span className="sleeve-label">{album.format} · {album.catalog}</span>}
      </div>
    </div>
    <div className="album-info">
      <h1>{album.title}</h1>
      <Link className="album-artist" to={'/artis/' + album.artist_slug}>{album.artist_name}</Link>
      <p>{album.year} · {album.label} · 12″ Vinyl LP, 33⅓ RPM
        {album.format !== 'Solo' && <span>{album.format}</span>}
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
      {storageError && <p role="alert">Koleksi gagal diperbarui. Periksa penyimpanan browser.</p>}
    </div>
    {album.tracks.length ? <Tracklist album={album} /> : <div className="panel solo-tracks">
      <h2><Headphones size={18} /> Daftar Lagu</h2><p>{album.track_count} trek. Rincian lagu belum tersedia di arsip.</p>
      {album.source_url && <a href={album.source_url} target="_blank" rel="noreferrer">Lihat rilis resmi <ArrowUpRight size={14} /></a>}
    </div>}
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
        {track.writing_source_url && <> <a className="writing-source" href={track.writing_source_url} target="_blank" rel="noreferrer">Baca wawancara</a>.</>}
      </p>
    </section>}
    {track.source_url && <a className="button subtle" href={track.source_url} target="_blank" rel="noreferrer">Lihat Sumber <ArrowUpRight size={16} /></a>}
  </div>
}

function TrackProfile({ track }) {
  const { pathname } = useLocation()
  const setTrackReturn = useOutletContext()
  const returnRoute = '/album/' + track.album.slug + '#trek-' + track.id

  useLayoutEffect(() => {
    setTrackReturn({ pathname, to: returnRoute })
    return () => setTrackReturn(null)
  }, [pathname, returnRoute, setTrackReturn])

  return <article className="page track-detail">
    <div className="track-edition"><span className="tag"><i /> {track.album.format} • {track.album.catalog}</span></div>
    <div className="panel track-panel">
      <div className="meta track-context">{track.album.title} <span>·</span> Trek {track.position} <span>·</span> {track.duration}</div>
      <h1>{track.title}</h1>
      {track.description && <p className="track-description">{track.description}</p>}
      <CreditBlock track={track} />
    </div>
    <Link className="button return-button" to={returnRoute} replace><ArrowLeft size={17} /> Kembali ke {track.album.title}</Link>
  </article>
}
