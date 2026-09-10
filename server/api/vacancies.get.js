import db from '~/server/utils/db'

export default defineEventHandler(() => {
  const items = db.prepare('SELECT * FROM vacancies ORDER BY id DESC').all()
  return items.map(i => ({
    ...i,
    requirements: i.requirements ? JSON.parse(i.requirements) : [],
    active: !!i.active
  }))
})