import db from '~/server/utils/db'

export default defineEventHandler((event) => {
  db.prepare('DELETE FROM vacancies WHERE id=?').run(event.context.params.id)
  return { success: true }
})