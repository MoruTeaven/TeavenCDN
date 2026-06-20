import { Hono } from 'hono'
import { cors } from 'hono/cors'
import searchRoute from './routes/search'
import favoriteRoute from './routes/favorite'
import packagesRoute from './routes/packages'
import logsRoute from './routes/logs'
import statsRoute from './routes/stats'
import adminHtml from './pages/admin.html'

interface Env {
  DB: D1Database
  R2_BUCKET: R2Bucket
  CDN_DOMAIN: string
  GLOBAL_CDN_DOMAIN: string
  CORS_ORIGIN?: string
  ADMIN_TOKEN?: string
}

const app = new Hono<{ Bindings: Env }>()

function getAllowedOrigins(value?: string) {
  return (value || '')
    .split(',')
    .map(origin => origin.trim())
    .filter(Boolean)
}

app.use('/api/*', cors({
  origin: (origin, c) => {
    if (!origin) {
      return null
    }

    const allowedOrigins = getAllowedOrigins(c.env.CORS_ORIGIN)
    if (allowedOrigins.length === 0) {
      return origin
    }

    return allowedOrigins.includes(origin) ? origin : null
  },
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
  maxAge: 86400
}))

app.get('/', (c) => c.html(adminHtml))
app.get('/admin', (c) => c.html(adminHtml))
app.get('/search', (c) => c.redirect('/admin'))
app.get('/packages', (c) => c.redirect('/admin'))

app.route('/api/search', searchRoute)
app.route('/api/favorite', favoriteRoute)
app.route('/api/packages', packagesRoute)
app.route('/api/logs', logsRoute)
app.route('/api/stats', statsRoute)

app.get('/health', (c) => {
  return c.json({ status: 'ok' })
})

export default app
