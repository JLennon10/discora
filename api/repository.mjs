import { createClient } from '@supabase/supabase-js'
import { artists, albums, tracks } from './catalog.mjs'

export function fixtureRepository() {
  return {
    artists: () => artists.map(artist => ({
      ...artist,
      albums: albums.filter(album => album.artist_slug === artist.slug).map(({ title }) => ({ title })),
    })),
    albums: () => albums,
    artist: slug => {
      const artist = artists.find(item => item.slug === slug)
      if (!artist) return null
      return {
        ...artist,
        members: artist.kind === 'group' ? artists.filter(item => item.kind === 'solo') : [],
        albums: albums.filter(album => album.artist_slug === slug),
      }
    },
    album: slug => {
      const album = albums.find(item => item.slug === slug)
      return album && { ...album, tracks: tracks.filter(track => track.album_slug === slug) }
    },
    track: id => {
      const track = tracks.find(item => item.id === id)
      return track && { ...track, album: albums.find(album => album.slug === track.album_slug) }
    },
  }
}

let repository

export function supabaseRepository() {
  if (repository) return repository
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_PUBLISHABLE_KEY
  if (!url || !key) throw new Error('Configure SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY')
  const db = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } })

  async function unwrap(query) {
    const { data, error } = await query
    if (error) throw error
    return data
  }

  const list = table => db.from(table).select('*').order('rank')
  const find = (table, column, value) => unwrap(db.from(table).select('*').eq(column, value).maybeSingle())

  repository = {
    artists: () => unwrap(db.from('artists').select('*, albums(title)').order('rank')),
    albums: () => unwrap(list('albums')),
    async artist(slug) {
      const artist = await find('artists', 'slug', slug)
      if (!artist) return null
      const [members, albums] = await Promise.all([
        artist.kind === 'group' ? unwrap(list('artists').eq('kind', 'solo')) : [],
        unwrap(list('albums').eq('artist_slug', slug)),
      ])
      return { ...artist, members, albums }
    },
    async album(slug) {
      const album = await find('albums', 'slug', slug)
      if (!album) return null
      const tracks = await unwrap(db.from('tracks').select('*').eq('album_slug', slug).order('position'))
      return { ...album, tracks }
    },
    async track(id) {
      const track = await find('tracks', 'id', id)
      if (!track) return null
      return { ...track, album: await find('albums', 'slug', track.album_slug) }
    },
  }
  return repository
}
