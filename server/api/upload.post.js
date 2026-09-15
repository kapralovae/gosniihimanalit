import fs from 'fs'
import path from 'path'

export default defineEventHandler(async (event) => {
  const formData = await readMultipartFormData(event)
  
  if (!formData || formData.length === 0) {
    return { success: false, error: 'Нет файла' }
  }
  
  const file = formData[0]
  const ext = path.extname(file.filename)
  const name = path.basename(file.filename, ext)
    .replace(/[^a-zA-Z0-9а-яА-Я]/g, '-')
  const fileName = `${name}-${Date.now()}${ext}`
  
  const uploadDir = path.join(process.cwd(), 'public', 'uploads')
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true })
  }
  
  const filePath = path.join(uploadDir, fileName)
  fs.writeFileSync(filePath, file.data)
  
  return {
    success: true,
    url: `/uploads/${fileName}`
  }
})
