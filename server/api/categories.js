// server/api/categories.js

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NUXT_PUBLIC_SANITY_PROJECT_ID || '7swl20he',
  dataset: process.env.NUXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
  token: process.env.SANITY_API_TOKEN
})

export default defineEventHandler(async () => {
  try {
    const query = `*[_type == "product"]{category}`
    const products = await client.fetch(query)
    const categories = [...new Set(products.map(p => p.category).filter(Boolean))]
    return categories.map(name => ({
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      name: name
    }))
  } catch (error) {
    console.error('❌ Ошибка загрузки категорий:', error.message)
    return []
  }
})