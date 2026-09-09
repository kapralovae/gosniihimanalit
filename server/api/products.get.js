import fs from 'fs'
import path from 'path'

export default defineEventHandler(async () => {
  const filePath = path.join(process.cwd(), 'data', 'products.json')
  
  if (!fs.existsSync(filePath)) {
    return { products: [] }
  }
  
  const content = fs.readFileSync(filePath, 'utf-8')
  const data = JSON.parse(content)
  
  // Возвращаем массив товаров
  return data.products || data || []
})