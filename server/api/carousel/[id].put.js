import db from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const id = event.context.params.id
  const b = await readBody(event)
  
  db.prepare(`
    UPDATE carousel SET image = ?, title = ?, position = ?, active = ?
    WHERE id = ?
  `).run(b.image, b.title || '', b.position || 0, b.active ? 1 : 0, id)
  
  return { success: true }
})