import db from '~/server/utils/db'

export default defineEventHandler(() => {
  const rows = db.prepare(`
    SELECT id, title, image_url, slug, carousel_position
    FROM products
    WHERE show_in_carousel = 1
    ORDER BY carousel_position ASC, id ASC
  `).all()
  return rows
})