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
  
  // Сохраняем в public/uploads
  const uploadDir = path.join(process.cwd(), 'public', 'uploads')
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true })
  }
  
  const filePath = path.join(uploadDir, fileName)
  fs.writeFileSync(filePath, file.data)
  
  // Копируем в .output/public/uploads если есть
  const outputDir = path.join(process.cwd(), '.output', 'public', 'uploads')
  if (fs.existsSync(path.join(process.cwd(), '.output'))) {
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }
    fs.copyFileSync(filePath, path.join(outputDir, fileName))
  }
  
  return {
    success: true,
    url: `/uploads/${fileName}`
  }
})