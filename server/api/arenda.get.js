import db from '~/server/utils/db'

export default defineEventHandler(() => {
  const items = db.prepare('SELECT * FROM arenda ORDER BY id DESC').all()
  return items.map(i => ({
    ...i,
    features: i.features ? JSON.parse(i.features) : []
  }))
})