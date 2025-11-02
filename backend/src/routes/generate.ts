import { Hono } from 'hono'
import { AIService } from '../services/ai-service'
import { StorageService } from '../services/storage-service'
import { validateGenerateRequest } from '../models/validation'

export const generateRoutes = new Hono<{
  Bindings: {
    AI: any
    DB: D1Database
    BUCKET: R2Bucket
  }
}>()

generateRoutes.post('/', async (c) => {
  const { prompt, options } = await c.req.json()

  // Validate request
  const validation = validateGenerateRequest(prompt, options)
  if (!validation.valid) {
    return c.json({ error: validation.error }, 400)
  }

  try {
    const aiService = new AIService(c.env.AI)
    const storageService = new StorageService(c.env.BUCKET, c.env.DB)

    // Generate image
    const result = await aiService.generateImage(prompt, options)
    
    if (!result.success) {
      return c.json({ error: 'Image generation failed' }, 500)
    }

    // Store image
    const userId = c.req.header('x-user-id') || 'anonymous'
    const imageId = await storageService.storeImage(
      result.image,
      {
        prompt,
        userId,
        width: options.width || 512,
        height: options.height || 512,
        model: 'stable-diffusion-xl'
      }
    )

    return c.json({
      success: true,
      imageId,
      image: result.image.toString('base64'),
      metadata: result.metadata
    })

  } catch (error) {
    console.error('Generation error:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})
