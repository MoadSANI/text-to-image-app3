import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { generateRoutes } from './routes/generate'
import { galleryRoutes } from './routes/gallery'
import { healthRoutes } from './routes/health'
import { rateLimit } from './middleware/rate-limit'
import { errorHandler } from './middleware/error-handler'

const app = new Hono<{
  Bindings: {
    AI: any
    DB: D1Database
    BUCKET: R2Bucket
    ENVIRONMENT: string
  }
}>()

// Middleware
app.use('*', logger())
app.use('*', cors())
app.use('*', errorHandler)

// Routes
app.route('/health', healthRoutes)
app.route('/generate', rateLimit(), generateRoutes)
app.route('/gallery', galleryRoutes)

export default app
