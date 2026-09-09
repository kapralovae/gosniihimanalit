// server/api/content/index.js

import fs from 'fs'
import path from 'path'

export default defineEventHandler(async (event) => {
  try {
        
    const contentPath = path.join(process.cwd(), 'content')
    
    if (!fs.existsSync(contentPath)) {
      return {}
    }
    
    const files = fs.readdirSync(contentPath).filter(f => f.endsWith('.json'))
    
    const data = {}
    files.forEach(file => {
      const key = file.replace('.json', '')
      const filePath = path.join(contentPath, file)
      const content = fs.readFileSync(filePath, 'utf-8')
      data[key] = JSON.parse(content)
    })
    
    return data
  } catch (error) {
    console.error('❌ Ошибка:', error.message)
    return { error: error.message }
  }
})