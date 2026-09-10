import db from '~/server/utils/db'

export default defineEventHandler(() => {
  const contacts = db.prepare('SELECT * FROM contacts LIMIT 1').get()
  return contacts || {}
})