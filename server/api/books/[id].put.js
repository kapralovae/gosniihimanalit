import db from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const id = event.context.params.id
  const b = await readBody(event)

  db.prepare(`
    UPDATE books SET
      title = ?, author = ?, year = ?, type = ?, category = ?,
      annotation = ?, file_url = ?, availability = ?
    WHERE id = ?
  `).run(
    b.title || '',
    b.author || '',
    b.year || null,
    b.type || '',
    b.category || '',
    b.annotation || '',
    b.file_url || '',
    b.availability || 'Свободен',
    id
  )

  return { success: true }
})