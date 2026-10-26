import db from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const b = await readBody(event)

  const stmt = db.prepare(`
    INSERT INTO books (title, author, year, type, category, annotation, file_url, availability)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `)

  const result = stmt.run(
    b.title || '',
    b.author || '',
    b.year || null,
    b.type || '',
    b.category || '',
    b.annotation || '',
    b.file_url || '',
    b.availability || 'Свободен'
  )

  return { success: true, id: result.lastInsertRowid }
})