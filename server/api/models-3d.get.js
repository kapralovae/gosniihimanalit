import db from '~/server/utils/db'

export default defineEventHandler(() => {
  return db.prepare('SELECT * FROM models_3d ORDER BY id DESC').all()
})