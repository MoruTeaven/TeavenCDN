import { Hono } from 'hono'
import { requireAdmin } from '../middleware/auth'

interface Env {
  DB: D1Database
  ADMIN_TOKEN?: string
}

const app = new Hono<{ Bindings: Env }>()

app.use('*', requireAdmin)

app.get('/', async (c) => {
  const limit = parseInt(c.req.query('limit') || '20')
  const offset = parseInt(c.req.query('offset') || '0')

  const { results } = await c.env.DB.prepare(
    'SELECT * FROM logs ORDER BY created_at DESC LIMIT ? OFFSET ?'
  ).bind(limit, offset).all()

  const { total } = await c.env.DB.prepare(
    'SELECT COUNT(*) as total FROM logs'
  ).first<{ total: number }>() || { total: 0 }

  return c.json({ logs: results, total })
})

export default app
