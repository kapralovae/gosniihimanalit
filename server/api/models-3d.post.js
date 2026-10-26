import db from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const b = await readBody(event)
  const stmt = db.prepare(`
    INSERT INTO models_3d (name, description, format, category, size, file_url, downloads, rating)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `)
  const result = stmt.run(
    b.name || '',
    b.description || '',
    b.format || '',
    b.category || '',
    b.size || '',
    b.file_url || '',
    b.downloads || 0,
    b.rating || 0
  )
  return { success: true, id: result.lastInsertRowid }
})