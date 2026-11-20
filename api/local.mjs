import { createApp } from './index.mjs'
import { fixtureRepository } from './repository.mjs'

const fixture = process.argv.includes('--fixture')
const app = createApp(fixture ? fixtureRepository() : undefined)
const port = process.env.PORT || 3000
app.listen(port, '127.0.0.1', () => {
  console.log('Discora API on http://127.0.0.1:' + port + (fixture ? ' (fixture)' : ''))
})
