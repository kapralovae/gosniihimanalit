import db from '~/server/utils/db'

export default defineEventHandler(() => {
  const products = db.prepare('SELECT * FROM products ORDER BY id DESC').all()
  return products.map(p => ({
    ...p,
    specs: p.specs ? JSON.parse(p.specs) : []
  }))
})