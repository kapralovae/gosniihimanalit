import db from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const b = await readBody(event)
  const r = db.prepare(`
    INSERT INTO vacancies (title, department, type, salary, location, requirements, active)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(b.title, b.department, b.type, b.salary, b.location,
    JSON.stringify(b.requirements || []), b.active ? 1 : 0)
  return { success: true, id: r.lastInsertRowid }
})