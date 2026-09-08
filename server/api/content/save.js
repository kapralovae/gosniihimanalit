// server/api/content/save.js

import fs from 'fs'
import path from 'path'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { file, data, password } = body
    
    // Проверка пароля
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin'
    if (password !== adminPassword) {
      throw createError({ 
        statusCode: 403, 
        message: 'Неверный пароль' 
      })
    }
    
    const filePath = path.join(process.cwd(), 'content', `${file}.json`)
    
    // Создаем папку, если её нет
    const dir = path.dirname(filePath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    
    // Сохраняем с красивым форматированием
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8')
    
    return { 
      success: true, 
      message: '✅ Данные сохранены',
      file: file
    }
  } catch (error) {
    console.error('❌ Ошибка сохранения:', error.message)
    return { 
      success: false, 
      message: error.message 
    }
  }
})