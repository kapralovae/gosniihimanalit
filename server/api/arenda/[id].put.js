import db from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const id = event.context.params.id
  const b = await readBody(event)
  db.prepare(`
    UPDATE arenda SET name=?, description=?, area=?, floor=?, ceiling_height=?,
      power_supply=?, price=?, features=?, image=?, status=?
    WHERE id=?
  `).run(b.name, b.description, b.area, b.floor, b.ceiling_height,
    b.power_supply, b.price, JSON.stringify(b.features || []), b.image,
    b.status || 'available', id)
  return { success: true }
})