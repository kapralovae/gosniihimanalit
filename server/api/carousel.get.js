import db from '~/server/utils/db'

export default defineEventHandler(() => {
  const items = db.prepare('SELECT * FROM carousel ORDER BY position ASC, id ASC').all()
  return items.map(i => ({ ...i, active: !!i.active }))
})