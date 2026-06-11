import type { MiddlewareHandler } from 'hono'

export const requireAdmin: MiddlewareHandler = async (c, next) => {
  const token = c.env.ADMIN_TOKEN as string | undefined

  if (!token) {
    return c.json({ error: 'ADMIN_TOKEN is not configured' }, 500)
  }

  if (c.req.header('Authorization') !== `Bearer ${token}`) {
    return c.json({ error: 'Unauthorized' }, 401)
  }

  await next()
}
