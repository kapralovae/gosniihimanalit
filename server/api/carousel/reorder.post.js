import db from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const { items } = await readBody(event)
  
  if (!Array.isArray(items)) {
    return { success: false, error: 'items must be array' }
  }
  
  const update = db.prepare('UPDATE carousel SET position = ? WHERE id = ?')
  
  const transaction = db.transaction((list) => {
    list.forEach((item, index) => {
      update.run(index, item.id)
    })
  })
  
  transaction(items)
  
  return { success: true }
})