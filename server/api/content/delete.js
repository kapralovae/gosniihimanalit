// server/api/content/delete.js

import fs from 'fs'
import path from 'path'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { productId, password } = body
    
    // Проверка пароля
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin'
    if (password !== adminPassword) {
      throw createError({ 
        statusCode: 403, 
        message: 'Неверный пароль' 
      })
    }
    
    if (!productId) {
      throw createError({ 
        statusCode: 400, 
        message: 'Не указан ID товара' 
      })
    }
    
    // Читаем текущие товары
    const filePath = path.join(process.cwd(), 'data', 'products.json')
    const content = fs.readFileSync(filePath, 'utf-8')
    const data = JSON.parse(content)
    
    // Фильтруем — удаляем товар с указанным ID
    const originalLength = data.products.length
    data.products = data.products.filter(p => p.id !== productId)
    
    if (data.products.length === originalLength) {
      throw createError({ 
        statusCode: 404, 
        message: 'Товар не найден' 
      })
    }
    
    // Сохраняем обратно в файл
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8')
    
    return { 
      success: true, 
      message: '✅ Товар удалён',
      productId: productId
    }
  } catch (error) {
    console.error('❌ Ошибка удаления:', error.message)
    return { 
      success: false, 
      message: error.message 
    }
  }
})