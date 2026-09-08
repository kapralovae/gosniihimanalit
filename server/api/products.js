// server/api/products.js

import { createClient } from '@sanity/client'

// Клиент создается на сервере — токен НЕ виден в браузере
const client = createClient({
  projectId: process.env.NUXT_PUBLIC_SANITY_PROJECT_ID || '7swl20he',
  dataset: process.env.NUXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
  token: process.env.SANITY_API_TOKEN // ← Токен ТОЛЬКО на сервере
})

// Адаптер для преобразования данных
const adaptProduct = (product) => ({
  id: product.id || product._id,
  name: product.name,
  category: product.category,
  shortDescription: product.shortDescription,
  fullDescription: product.fullDescription,
  price: product.price,
  oldPrice: product.oldPrice,
  images: product.images?.map(img => img.asset?.url || img.url) || [],
  specifications: product.specifications || {},
  inStock: product.inStock ?? true,
  isNew: product.isNew ?? false,
  isPopular: product.isPopular ?? false,
  createdAt: product.createdAt
})

export default defineEventHandler(async (event) => {
  try {
    // Получаем параметры запроса
    const query = getQuery(event)
    const { category, limit, search, id } = query

    // Строим GROQ-запрос в зависимости от параметров
    let groqQuery = `*[_type == "product"`

    if (id) {
      groqQuery += ` && id == "${id}"`
    } else if (category) {
      groqQuery += ` && category == "${category}"`
    } else if (search) {
      groqQuery += ` && (name match "${search}*" || shortDescription match "${search}*")`
    }

    groqQuery += `]`

    if (!id) {
      groqQuery += ` | order(createdAt desc)`
    }

    if (limit && !id) {
      groqQuery += `[0...${limit}]`
    }

    groqQuery += ` {
      ...,
      images[] {
        asset->{url}
      }
    }`

    const products = await client.fetch(groqQuery)

    if (id) {
      const product = products[0]
      return product ? adaptProduct(product) : null
    }

    return products.map(adaptProduct)
  } catch (error) {
    console.error('❌ Ошибка API:', error.message)
    return []
  }
})