import db from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const b = await readBody(event)
  const existing = db.prepare('SELECT id FROM contacts LIMIT 1').get()
  
  if (existing) {
    db.prepare(`
      UPDATE contacts SET commercial_label=?, commercial_phone=?, commercial_email=?,
        secretary_label=?, secretary_phone=?, secretary_email=?,
        address_label=?, address=?, site_title=?, hero_title=?, about_text=?,
        show_address=?
      WHERE id=?
    `).run(b.commercial_label, b.commercial_phone, b.commercial_email,
      b.secretary_label, b.secretary_phone, b.secretary_email,
      b.address_label, b.address, b.site_title, b.hero_title, b.about_text,
      b.show_address ?? 1,
      existing.id)
  } else {
    db.prepare(`
      INSERT INTO contacts (commercial_label, commercial_phone, commercial_email,
        secretary_label, secretary_phone, secretary_email,
        address_label, address, site_title, hero_title, about_text, show_address)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(b.commercial_label, b.commercial_phone, b.commercial_email,
      b.secretary_label, b.secretary_phone, b.secretary_email,
      b.address_label, b.address, b.site_title, b.hero_title, b.about_text,
      b.show_address ?? 1)
  }
  return { success: true }
})