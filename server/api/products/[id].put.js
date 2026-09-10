import db from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const id = event.context.params.id
  const body = await readBody(event)
  db.prepare(`
    UPDATE products SET title=?, description=?, category=?, image_url=?, specs=?
    WHERE id=?
  `).run(body.title, body.description, body.category, body.image_url,
    JSON.stringify(body.specs || []), id)
  return { success: true }
})