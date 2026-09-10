import db from '~/server/utils/db'

export default defineEventHandler((event) => {
  const id = event.context.params.id
  db.prepare('DELETE FROM products WHERE id=?').run(id)
  return { success: true }
})