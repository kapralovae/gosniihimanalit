import db from '~/server/utils/db'

export default defineEventHandler(() => {
  return db.prepare('SELECT * FROM books ORDER BY id DESC').all()
})