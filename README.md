# Text-to-Image Web App

A professional text-to-image generation web application built with Cloudflare Workers, AI, R2, D1, and React.

## Features

- 🎨 Text-to-image generation using Stable Diffusion XL
- 💾 Image storage and gallery with Cloudflare R2 & D1
- ⚡ Fast edge computing with Cloudflare Workers
- 🎯 Professional React frontend
- 🔒 Rate limiting and error handling
- 📱 Responsive design

## Architecture
┌─────────────────┐ ┌──────────────────┐ ┌─────────────────┐
│ React Frontend│───▶│ Cloudflare Worker│───▶│ Cloudflare AI │
│ (Pages) │ │ (Backend API) │ │ │
└─────────────────┘ └──────────────────┘ └─────────────────┘
│
▼
┌──────────────────┐
│ Cloudflare R2 & │
│ D1 (Storage/DB) │
└──────────────────┘

## Quick Start

### Prerequisites

- Node.js 18+
- Cloudflare account
- GitHub account

### Local Development

1. **Clone repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/text-to-image-app.git
   cd text-to-image-app
