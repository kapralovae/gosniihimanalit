import db from '~/server/utils/db'

export default defineEventHandler((event) => {
  const param = event.context.params.id
  
  const product = db.prepare(
    'SELECT * FROM products WHERE id = ? OR slug = ?'
  ).get(param, param)
  
  if (!product) {
    throw createError({ statusCode: 404, message: 'Товар не найден' })
  }
  
  const parseArray = (val) => {
    if (!val) return []
    try {
      const parsed = JSON.parse(val)
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }
  
  return {
    ...product,
    specs: parseArray(product.specs),
    features: parseArray(product.features),
    delivery_set: parseArray(product.delivery_set),
    tables: parseArray(product.tables)
  }
})