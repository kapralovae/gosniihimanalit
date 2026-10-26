import fs from 'fs'
import path from 'path'

export default defineEventHandler(async (event) => {
  const form = await readMultipartFormData(event)
  if (!form || !form.length) {
    return { success: false, error: 'Файл не получен' }
  }

  const file = form.find(f => f.name === 'file')
  if (!file) {
    return { success: false, error: 'Поле file не найдено' }
  }

  const allowedExt = ['.step', '.stp', '.iges', '.igs', '.stl', '.dwg']
  const ext = path.extname(file.filename || '').toLowerCase()
  if (!allowedExt.includes(ext)) {
    return { success: false, error: 'Разрешены: STEP, IGES, STL, DWG' }
  }

  const uploadsDir = path.join(process.cwd(), 'public', 'models')
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true })
  }

  const safeName = (file.filename || 'model.step')
    .replace(/\s+/g, '_')
    .replace(/[^a-zA-Z0-9._\-а-яА-Я]/g, '')
  const fileName = Date.now() + '-' + safeName
  const filePath = path.join(uploadsDir, fileName)

  fs.writeFileSync(filePath, file.data)

  const sizeBytes = file.data.length
  const sizeStr = sizeBytes > 1024 * 1024
    ? (sizeBytes / 1024 / 1024).toFixed(1) + ' MB'
    : Math.round(sizeBytes / 1024) + ' KB'

  return {
    success: true,
    url: '/models/' + fileName,
    name: fileName,
    size: sizeStr,
    format: ext.replace('.', '').toUpperCase()
  }
})