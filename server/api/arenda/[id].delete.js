import db from '~/server/utils/db'

export default defineEventHandler((event) => {
  db.prepare('DELETE FROM arenda WHERE id=?').run(event.context.params.id)
  return { success: true }
})