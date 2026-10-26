import db from '~/server/utils/db'

const stringify = (val) => {
  if (Array.isArray(val)) return JSON.stringify(val)
  if (typeof val === 'string') {
    try { const parsed = JSON.parse(val); return JSON.stringify(parsed) }
    catch { return JSON.stringify([]) }
  }
  return JSON.stringify([])
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const stmt = db.prepare(`
    INSERT INTO products (
      title, description, category, image_url, slug,
      purpose, principle, features, delivery_set, warranty, certificates, tables, specs,
      show_in_carousel, carousel_position, verification_interval
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)

  const result = stmt.run(
    body.title,
    body.description,
    body.category,
    body.image_url,
    body.slug || null,
    body.purpose || null,
    body.principle || null,
    stringify(body.features),
    stringify(body.delivery_set),
    body.warranty || null,
    body.certificates || null,
    stringify(body.tables),
    stringify(body.specs),
    body.show_in_carousel ? 1 : 0,
    body.carousel_position || 0,
    body.verification_interval || null
  )

  return { success: true, id: result.lastInsertRowid }
})