import db from '~/server/utils/db'

const parseArray = (val) => {
  if (!val) return []
  try {
    const parsed = JSON.parse(val)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export default defineEventHandler(() => {
  const products = db.prepare('SELECT * FROM products ORDER BY position ASC, id DESC').all()
  return products.map(p => ({
    ...p,
    specs: parseArray(p.specs),
    features: parseArray(p.features),
    delivery_set: parseArray(p.delivery_set),
    tables: parseArray(p.tables)
  }))
})