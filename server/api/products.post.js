import db from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  const stmt = db.prepare(`
    INSERT INTO products (title, description, category, image_url, specs)
    VALUES (?, ?, ?, ?, ?)
  `)
  
  const result = stmt.run(
    body.title,
    body.description,
    body.category,
    body.image_url,
    JSON.stringify(body.specs || [])
  )
  
  return { success: true, id: result.lastInsertRowid }
})