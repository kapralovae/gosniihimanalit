import db from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const b = await readBody(event)
  
  // Получаем максимальную позицию
  const maxPos = db.prepare('SELECT MAX(position) as max FROM carousel').get()
  const position = (maxPos.max ?? -1) + 1
  
  const r = db.prepare(`
    INSERT INTO carousel (image, title, position, active)
    VALUES (?, ?, ?, ?)
  `).run(b.image, b.title || '', position, b.active ? 1 : 0)
  
  return { success: true, id: r.lastInsertRowid }
})