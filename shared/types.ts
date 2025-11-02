export interface GenerationOptions {
  width?: number
  height?: number
  steps?: number
  cfg_scale?: number
  seed?: number
}

export interface GenerationResponse {
  success: boolean
  image?: ArrayBuffer
  error?: string
  metadata?: {
    prompt: string
    width: number
    height: number
    steps: number
    cfg_scale: number
    seed?: number
    timestamp: string
  }
}

export interface StoredImage {
  id: string
  prompt: string
  userId: string
  width: number
  height: number
  model: string
  createdAt: string
}
