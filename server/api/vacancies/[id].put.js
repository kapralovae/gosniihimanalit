import db from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const id = event.context.params.id
  const b = await readBody(event)
  db.prepare(`
    UPDATE vacancies SET title=?, department=?, type=?, salary=?, location=?,
      requirements=?, active=?
    WHERE id=?
  `).run(b.title, b.department, b.type, b.salary, b.location,
    JSON.stringify(b.requirements || []), b.active ? 1 : 0, id)
  return { success: true }
})