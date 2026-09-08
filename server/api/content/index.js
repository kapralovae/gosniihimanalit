// server/api/content/index.js

import fs from 'fs'
import path from 'path'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const password = query.password
    
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin'
    if (password !== adminPassword) {
      throw createError({ 
        statusCode: 403, 
        message: 'Неверный пароль' 
      })
    }
    
    const contentPath = path.join(process.cwd(), 'content')
    console.log('📁 Путь к контенту:', contentPath)
    
    if (!fs.existsSync(contentPath)) {
      console.log('⚠️ Папка content не существует')
      return {}
    }
    
    const files = fs.readdirSync(contentPath).filter(f => f.endsWith('.json'))
    console.log('📁 Найдены файлы:', files)
    
    const data = {}
    files.forEach(file => {
      const key = file.replace('.json', '')
      const filePath = path.join(contentPath, file)
      
      try {
        const content = fs.readFileSync(filePath, 'utf-8')
        // Если файл пустой — пропускаем
        if (!content.trim()) {
          console.log(`⚠️ Файл ${file} пустой, пропускаем`)
          data[key] = {}
          return
        }
        data[key] = JSON.parse(content)
      } catch (err) {
        console.error(`❌ Ошибка чтения ${file}:`, err.message)
        data[key] = {}
      }
    })
    
    console.log('📦 Загружено:', Object.keys(data))
    return data
  } catch (error) {
    console.error('❌ Ошибка:', error.message)
    return { error: error.message }
  }
})