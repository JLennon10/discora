import express from 'express'
import { supabaseRepository } from './repository.mjs'

export function createApp(repository) {
  const app = express()
  app.disable('x-powered-by')

  const catalog = express.Router()

  function read(method) {
    return async (req, res) => {
      const data = await (repository ?? supabaseRepository())[method](req.params.key)
      if (!data) return res.status(404).json({ error: 'Entri katalog tidak ditemukan.' })
      res.set('Cache-Control', 'public, max-age=60').json(data)
    }
  }

  catalog.get('/artists', read('artists'))
  catalog.get('/artists/:key', read('artist'))
  catalog.get('/albums', read('albums'))
  catalog.get('/albums/:key', read('album'))
  catalog.get('/tracks/:key', read('track'))
  app.use('/api', catalog)
  app.use((_req, res) => res.status(404).json({ error: 'Endpoint tidak ditemukan.' }))
  app.use((error, _req, res, _next) => {
    const status = error.status === 400 ? 400 : 503
    if (status === 503) console.error('Catalog request failed:', error.code ?? error.name)
    res.status(status).json({ error: status === 400 ? 'Permintaan tidak valid.' : 'Katalog sedang tidak tersedia.' })
  })
  return app
}

export default createApp()
