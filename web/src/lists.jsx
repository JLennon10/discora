import { Link, useSearchParams } from 'react-router-dom'
import {
  Archive, ArrowRight, BookOpen, Disc, Grid2X2, Library, Music2, ScrollText,
  Trash2, UserRound, UsersRound, BadgeCheck,
} from 'lucide-react'
import {
  AlbumArtwork, AlbumCard, ArtistPortrait, CuratorNote, FilterBar, Intro, Notice, Resource, SearchBox,
} from './components.jsx'
import { useCollection } from './collection.jsx'
import { artistPhotos } from './artist-photos.js'
import { usePageScroll } from './page-scroll.js'

export function ArtistList() {
  return <Resource endpoint="artists">{artists => <Artists artists={artists} />}</Resource>
}

function useCatalogFilters(filterKey) {
  const [params, setParams] = useSearchParams()

  function update(key, value) {
    const next = new URLSearchParams(window.location.search)
    if (value) next.set(key, value)
    else next.delete(key)
    setParams(next, { replace: true, preventScrollReset: true })
  }

  return {
    query: params.get('q') ?? '',
    chosenFilter: params.get(filterKey),
    focusSearch: params.has('cari'),
    setQuery: value => update('q', value),
    setFilter: value => update(filterKey, value === 'all' ? '' : value),
  }
}

function Artists({ artists }) {
  const { query, chosenFilter, focusSearch, setQuery, setFilter } = useCatalogFilters('jenis')
  const types = [
    { id: 'all', label: 'Semua (' + artists.length + ')', Icon: Grid2X2 },
    { id: 'group', label: 'Grup (' + artists.filter(artist => artist.kind === 'group').length + ')', Icon: UsersRound },
    { id: 'solo', label: 'Karier Solo (' + artists.filter(artist => artist.kind === 'solo').length + ')', Icon: UserRound },
  ]
  const filter = types.some(type => type.id === chosenFilter) ? chosenFilter : 'all'
  const term = query.trim().toLocaleLowerCase('id')
  const result = artists.filter(artist => (filter === 'all' || filter === artist.kind)
    && [artist.name, artist.era, artist.summary, artist.highlights,
      ...artist.tags, ...(artist.albums ?? []).map(album => album.title)]
      .join(' ').toLocaleLowerCase('id').includes(term))

  return <div className="page artist-list">
    <Intro Icon={ScrollText} eyebrow="Arsip The Beatles" title="Katalog Artis & Personel"
      image={artists.find(artist => artist.slug === 'the-beatles')?.image}>
      Kenalan sama The Beatles dan empat personelnya. Pilih artis buat ngulik rilisan band sampai album solo mereka.
    </Intro>
    <div className="catalog-controls">
      <SearchBox value={query} onChange={setQuery} placeholder="Cari artis, tahun, atau album…" autoFocus={focusSearch} />
      <FilterBar options={types} value={filter} choose={setFilter} label="Jenis artis" />
    </div>
    <div className="meta-line list-meta" aria-live="polite"><span>{result.length} artis</span><span>Parlophone / Apple Corps</span></div>
    {result.length ? <div className="artist-cards">
      {result.map(artist => <Link className={'artist-card' + (artist.kind === 'group' ? ' band-card' : '')} to={'/artis/' + artist.slug} key={artist.slug}>
        <ArtistPortrait artist={artist} />
        <div className="artist-card-copy">
          <h2>{artist.name}</h2>
          <div className="artist-era">{artist.era} · {artist.roles}</div>
          <p>{artist.kind === 'group'
            ? 'Empat anak Liverpool yang bikin dunia ikut nyanyi.'
            : <><b>Coba mulai dari</b> {artist.highlights}</>}</p>
          <div className="tags">{artist.tags.map(tag => <span className="tag" key={tag}>{tag}</span>)}</div>
        </div>
        <ArrowRight className="card-arrow" size={18} />
      </Link>)}
    </div> : <Notice title="Belum ketemu artisnya">Coba nama, judul album, atau filter lain.</Notice>}
    <CuratorNote title="Biar nggak salah edisi">
      Lagi ngincer rilisan tertentu? Cek kode katalog dan nomor matriks buat bedain cetakan piringannya.
    </CuratorNote>
  </div>
}

export function AlbumList() {
  return <Resource endpoint="albums">{albums => <Albums albums={albums} />}</Resource>
}

function Albums({ albums }) {
  const { query, chosenFilter, focusSearch, setQuery, setFilter } = useCatalogFilters('artis')
  const artistOptions = [...new Map(albums.map(album => [album.artist_slug, album.artist_name]))]
    .map(([id, label]) => ({ id, label }))
  const filter = artistOptions.some(option => option.id === chosenFilter) ? chosenFilter : 'all'
  const term = query.trim().toLocaleLowerCase('id')
  const result = albums.filter(album => (filter === 'all' || album.artist_slug === filter)
    && album.title.toLocaleLowerCase('id').includes(term))

  return <div className="page album-list">
    <Intro Icon={Library} eyebrow="Arsip Master Rekaman 1962–1975" title="Katalog Album Piringan Hitam">
      Dari rilisan mono dan stereo sampai album solo. Pilih album, cek daftar lagu, dan cari tahu siapa yang nulis.
    </Intro>
    <div className="catalog-controls">
      <SearchBox value={query} onChange={setQuery} placeholder="Cari judul album…" autoFocus={focusSearch} />
      <FilterBar options={[{ id: 'all', label: 'Semua' }, ...artistOptions]} value={filter} choose={setFilter} label="Filter album menurut artis" />
    </div>
    <div className="meta-line list-meta" aria-live="polite"><span>{result.length} album</span><span className="speed"><i /> Format 33⅓ RPM</span></div>
    {result.length ? <div className="album-grid">{result.map(album => <AlbumCard key={album.slug} album={album} />)}</div>
      : <Notice title="Belum ketemu albumnya">Coba judul lain atau ganti filter artisnya.</Notice>}
  </div>
}

export function Collection() {
  usePageScroll()
  const { albums, remove, storageError } = useCollection()
  return <div className="page collection-page">
    <div className="collection-intro">
      <Intro eyebrow="Album pilihanmu" title="Koleksi Piringan Hitam" />
      <span className="feature-icon" aria-hidden="true"><Archive size={19} /></span>
    </div>
    {storageError && <p role="alert">Koleksinya belum bisa diperbarui. Cek penyimpanan browser, lalu coba lagi.</p>}
    {albums.length ? <div className="collection-cards">
      {albums.map((album, index) => <article className="collection-card" key={album.slug}>
        <Link className="collection-link" to={'/album/' + album.slug}>
          <AlbumArtwork album={album} fallback="collection_art" />
          <div>
            <div className="meta-line"><span>{index === 0 ? 'Baru disimpan' : album.label}</span><span>{album.catalog}</span></div>
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
    </div> : <Notice title="Koleksimu masih kosong" action={<Link to="/album" className="button">Cari Album</Link>}>
      Udah nemu album yang kamu suka? Simpan dari halaman albumnya biar gampang ketemu lagi.
    </Notice>}
    <CuratorNote title="Buat dibuka lagi nanti" Icon={ScrollText}>
      Koleksi tersimpan di browser ini. Pas mampir ke toko piringan hitam, kamu bisa buka lagi buat bandingin edisi dan kode katalog.
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
  usePageScroll()
  return <div className="page about-page">
    <Intro Icon={BookOpen} eyebrow="Di balik katalog" title="Tentang Discora">
      Kenapa Discora dibuat, siapa yang ngerjain, dan dari mana data albumnya.
    </Intro>
    <section className="mission panel">
      <div className="mission-heading"><span className="feature-icon"><Disc size={21} /></span>
        <div><h2>Berawal dari rasa penasaran</h2></div>
      </div>
      <p className="mission-copy">Siapa yang nulis lagu favoritmu? Apa bedanya rilisan mono dan stereo? Discora jadi tempat buat ngulik pertanyaan itu, mulai dari album The Beatles sampai rilisan solo keempat personelnya.</p>
      <div className="tags"><span className="tag">Versi mono & stereo</span><span className="tag">Penulis lagu</span><span className="tag">Rilisan solo</span></div>
    </section>
    <section className="curator-panel panel" id="kurator">
      <div className="eyebrow"><span>Yang bikin Discora</span><BadgeCheck size={19} /></div>
      <div className="curator-bio">
        <img src="/art/curator.webp" alt="" />
        <div><h2>Dienis Septian Abrar</h2><p>Desain web dan nyusun katalog album</p></div>
      </div>
      <blockquote>“Kalau satu album bisa bikin kamu buka lima tab buat bandingin rilisannya, selamat datang di Discora.”</blockquote>
    </section>
    <section className="bibliography">
      <div className="section-heading"><h2><ScrollText size={17} /> Referensi</h2><span className="tag">4 sumber</span></div>
      <ol>{bibliography.map(([title, author, details, url], index) => <li key={title}>
        <span className="tag">{String(index + 1).padStart(2, '0')}</span><div>
          {url ? <h3><a href={url} target="_blank" rel="noreferrer">{title}</a></h3> : <h3>{title}</h3>}
          <p>{author}</p><small>{details}</small></div>
      </li>)}</ol>
      <details className="photo-credits">
        <summary>Kredit foto katalog</summary>
        <ul>{Object.entries(artistPhotos).map(([slug, photo]) => <li key={slug}>
          <a href={photo.source} target="_blank" rel="noreferrer">{photo.name}</a>
          <span>{photo.credit}</span>
        </li>)}</ul>
      </details>
    </section>
    <aside className="panel about-footer">
      <span className="feature-icon"><Music2 size={18} /></span>
      <h2>Selamat ngulik!</h2>
      <p>Mulai dari album favoritmu atau cari rilisan yang baru kamu kenal.</p>
      <div className="meta">© Discora</div>
    </aside>
  </div>
}
