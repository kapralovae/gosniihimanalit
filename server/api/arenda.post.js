import db from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const b = await readBody(event)
  const r = db.prepare(`
    INSERT INTO arenda (name, description, area, floor, ceiling_height, power_supply, price, features, image, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(b.name, b.description, b.area, b.floor, b.ceiling_height,
    b.power_supply, b.price, JSON.stringify(b.features || []), b.image, b.status || 'available')
  return { success: true, id: r.lastInsertRowid }
})