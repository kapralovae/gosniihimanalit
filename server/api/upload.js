// server/api/upload.js

import fs from 'fs'
import path from 'path'

export default defineEventHandler(async (event) => {
  try {
    const body = await readMultipartFormData(event)
    
    if (!body || body.length === 0) {
      throw createError({ statusCode: 400, message: 'Нет файла' })
    }
    
    const file = body[0]
    const filename = file.filename || 'image.jpg'
    const ext = path.extname(filename)
    const name = path.basename(filename, ext)
    const timestamp = Date.now()
    const newFilename = `${name}-${timestamp}${ext}`
    
    const uploadDir = path.join(process.cwd(), 'public', 'images', 'products')
    
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }
    
    const filePath = path.join(uploadDir, newFilename)
    fs.writeFileSync(filePath, file.data)
    
    return {
      success: true,
      path: `/images/products/${newFilename}`
    }
  } catch (error) {
    console.error('❌ Ошибка загрузки:', error.message)
    return { success: false, error: error.message }
  }
})