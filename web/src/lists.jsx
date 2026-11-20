import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  Archive, ArrowRight, BookOpen, Disc, Grid2X2, Library, Music2, ScrollText,
  Trash2, UserRound, UsersRound, BadgeCheck,
} from 'lucide-react'
import {
  AlbumArtwork, AlbumCard, CuratorNote, FilterBar, Intro, Notice, Resource, SearchBox,
} from './components.jsx'
import { useCollection } from './collection.jsx'

export function ArtistList() {
  return <Resource endpoint="artists">{artists => <Artists artists={artists} />}</Resource>
}

function Artists({ artists }) {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const types = [
    { id: 'all', label: 'Semua (' + artists.length + ')', Icon: Grid2X2 },
    { id: 'group', label: 'Grup (' + artists.filter(artist => artist.kind === 'group').length + ')', Icon: UsersRound },
    { id: 'solo', label: 'Karier Solo (' + artists.filter(artist => artist.kind === 'solo').length + ')', Icon: UserRound },
  ]
  const term = query.trim().toLocaleLowerCase('id')
  const result = artists.filter(artist => (filter === 'all' || filter === artist.kind)
    && [artist.name, artist.era, artist.summary, artist.highlights, ...artist.tags]
      .join(' ').toLocaleLowerCase('id').includes(term))

  return <div className="page artist-list">
    <Intro Icon={ScrollText} eyebrow="Katalog Master Abbey Road" title="Katalog Artis & Personel">
      Eksplorasi master matrix, kurasi rekaman mono/stereo, serta diskografi piringan hitam kolektif Fab Four dan rekaman solo resmi masing-masing anggota.
    </Intro>
    <SearchBox value={query} onChange={setQuery} placeholder="Cari artis, tahun, atau album…" />
    <FilterBar options={types} value={filter} choose={setFilter} label="Jenis artis" />
    <div className="meta-line list-meta" aria-live="polite"><span>Menampilkan {result.length} entri arsip</span><span>Parlophone / Apple Corps</span></div>
    {result.length ? <div className="artist-cards">
      {result.map(artist => <Link className="artist-card" to={'/artis/' + artist.slug} key={artist.slug}>
        <span className={'artist-monogram tone-' + artist.rank}><span>{artist.initials}</span></span>
        <div className="artist-card-copy">
          <div className="artist-card-title"><h2>{artist.name}</h2>
            {artist.kind === 'group' && <span className="tag popular">Paling Populer</span>}
          </div>
          <div className="artist-era">{artist.era} · {artist.roles}</div>
          <p>{artist.kind === 'solo' && <b>Album Ikonik:</b>} {artist.summary || artist.highlights}</p>
          <div className="tags">{artist.tags.map(tag => <span className="tag" key={tag}>{tag}</span>)}</div>
        </div>
        <ArrowRight className="card-arrow" size={18} />
      </Link>)}
    </div> : <Notice title="Artis tidak ditemukan">Coba kata kunci atau filter lain.</Notice>}
    <CuratorNote title="Catatan Kurator Arsip">
      Kode katalog dan nomor matriks dicantumkan pada edisi yang datanya tersedia. Keduanya membantu mengenali rilisan mono dan stereo dari katalog Parlophone dan Apple Records.
    </CuratorNote>
  </div>
}

export function AlbumList() {
  return <Resource endpoint="albums">{albums => <Albums albums={albums} />}</Resource>
}

function Albums({ albums }) {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const [params] = useSearchParams()
  const artistOptions = [...new Map(albums.map(album => [album.artist_slug, album.artist_name]))]
    .map(([id, label]) => ({ id, label }))
  const term = query.trim().toLocaleLowerCase('id')
  const result = albums.filter(album => (filter === 'all' || album.artist_slug === filter)
    && album.title.toLocaleLowerCase('id').includes(term))

  return <div className="page album-list">
    <Intro Icon={Library} eyebrow="Arsip Master Rekaman 1962–1975" title="Katalog Album Piringan Hitam">
      Presisi kuratorial edisi mono & stereo serta rekaman solo keempat personel.
    </Intro>
    <SearchBox value={query} onChange={setQuery} placeholder="Cari judul album…" autoFocus={params.has('cari')} />
    <FilterBar options={[{ id: 'all', label: 'Semua' }, ...artistOptions]} value={filter} choose={setFilter} label="Filter album menurut artis" />
    <div className="meta-line list-meta" aria-live="polite"><span>Menampilkan {result.length} master rekaman</span><span className="speed"><i /> Format 33⅓ RPM</span></div>
    {result.length ? <div className="album-grid">{result.map(album => <AlbumCard key={album.slug} album={album} />)}</div>
      : <Notice title="Album tidak ditemukan">Coba judul atau filter artis lain.</Notice>}
  </div>
}

export function Collection() {
  const { albums, remove, storageError } = useCollection()
  return <div className="page collection-page">
    <div className="collection-intro">
      <Intro eyebrow="Kurasi Arsip Pribadi" title="Koleksi Piringan Hitam" />
      <span className="feature-icon" aria-hidden="true"><Archive size={19} /></span>
    </div>
    {storageError && <p role="alert">Koleksi gagal diperbarui. Periksa penyimpanan browser.</p>}
    {albums.length ? <div className="collection-cards">
      {albums.map((album, index) => <article className="collection-card" key={album.slug}>
        <Link className="collection-link" to={'/album/' + album.slug}>
          <AlbumArtwork album={album} variant="collection_art" />
          <div>
            <div className="meta-line"><span>{index === 0 ? 'Baru Ditambahkan' : album.label}</span><span>{album.catalog}</span></div>
            <h2>{album.title}</h2>
            <p>{album.artist_name} • {album.year}</p>
            <span className="tag">{album.edition}</span> <span className="meta">• {album.track_count} Trek</span>
          </div>
        </Link>
        <div className="collection-actions">
          <span className="meta">{album.studio || album.label}</span>
          <button className="button subtle" onClick={() => remove(album.slug)} aria-label={'Hapus ' + album.title + ' dari Koleksi'}><Trash2 size={15} /> Hapus dari Koleksi</button>
        </div>
      </article>)}
    </div> : <Notice title="Koleksi Anda masih kosong" action={<Link to="/album" className="button">Jelajahi Album</Link>}>
      Buka detail album untuk menyimpan rilisan ke koleksi pribadi.
    </Notice>}
    <CuratorNote title="Catatan Kurator Discora" Icon={ScrollText}>
      Koleksi tersimpan di browser ini agar album pilihan mudah ditemukan saat bertandang ke record store.
    </CuratorNote>
  </div>
}

const bibliography = [
  ['The Complete Beatles Recording Sessions', 'Mark Lewisohn (Hamlyn / EMI, 1988)', 'Kronologi sesi rekaman The Beatles di Abbey Road.'],
  ['Katalog dan arsip The Beatles', 'Apple Corps', 'Diskografi, urutan trek, dan kredit penulis lagu.', 'https://www.thebeatles.com/albums'],
  ['Paul McCartney: Many Years from Now', 'Barry Miles (Secker & Warburg, 1997)', 'Kesaksian Paul McCartney tentang penulisan lagu.'],
  ['All We Are Saying: The Last Major Interview', 'David Sheff (St. Martin’s Griffin, 2000)', 'Wawancara John Lennon dan Yoko Ono dari tahun 1980.'],
]

export function About() {
  return <div className="page about-page">
    <Intro Icon={BookOpen} eyebrow="Monograf Arsip" title="Tentang Discora">
      Dokumentasi visi editorial, metodologi kurasi, dan spesifikasi antarmuka piringan hitam.
    </Intro>
    <section className="mission panel">
      <div className="mission-heading"><span className="feature-icon"><Disc size={21} /></span>
        <div><div className="meta">Pernyataan Misi</div><h2>Preservasi Suara & Presisi Rekaman</h2></div>
      </div>
      <blockquote>“Discora adalah Progressive Web App (PWA) katalog piringan hitam mobile-first yang didedikasikan untuk mendokumentasikan warisan musik The Beatles, diskografi solo keempat anggotanya, serta presisi catatan kredit penulis lagu asli.”</blockquote>
      <div className="tags"><span className="tag">Mono & Stereo Matriks</span><span className="tag">Kredit Lennon–McCartney</span><span className="tag">Solo Pressings</span></div>
    </section>
    <section className="curator-panel panel" id="kurator">
      <div className="eyebrow"><span>Kurator & Pengembang</span><BadgeCheck size={19} /></div>
      <div className="curator-bio">
        <img src="/art/curator.webp" alt="" />
        <div><h2>Dienis Septian Abrar</h2><p>Desainer Antarmuka & Kurator Digital Discora</p>
          <span className="meta">Arsiparis Piringan Hitam & Desain Interaksi</span></div>
      </div>
      <blockquote>“Dibuat dengan dedikasi terhadap estetika analog dan tipografi editorial piringan hitam.”</blockquote>
    </section>
    <section className="bibliography">
      <div className="section-heading"><h2><ScrollText size={17} /> Sumber Data & Bibliografi</h2><span className="tag">4 Rujukan</span></div>
      <ol>{bibliography.map(([title, author, details, url], index) => <li key={title}>
        <span className="tag">{String(index + 1).padStart(2, '0')}</span><div>
          {url ? <h3><a href={url} target="_blank" rel="noreferrer">{title}</a></h3> : <h3>{title}</h3>}
          <p>{author}</p><small>{details}</small></div>
      </li>)}</ol>
    </section>
    <aside className="panel about-footer">
      <span className="feature-icon"><Music2 size={18} /></span>
      <h2>Edisi Cetak Digital Bebas Distorsi</h2>
      <p>Dirancang untuk para penggali peti piringan hitam, peneliti katalog, dan penikmat suara autentik.</p>
      <div className="meta">© Discora</div>
    </aside>
  </div>
}
