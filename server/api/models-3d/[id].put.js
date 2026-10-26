import db from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const id = event.context.params.id
  const b = await readBody(event)
  db.prepare(`
    UPDATE models_3d SET
      name = ?, description = ?, format = ?, category = ?,
      size = ?, file_url = ?, downloads = ?, rating = ?
    WHERE id = ?
  `).run(
    b.name || '',
    b.description || '',
    b.format || '',
    b.category || '',
    b.size || '',
    b.file_url || '',
    b.downloads || 0,
    b.rating || 0,
    id
  )
  return { success: true }
})