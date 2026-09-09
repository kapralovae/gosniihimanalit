// server/api/content/[file].js

import fs from 'fs'
import path from 'path'

export default defineEventHandler(async (event) => {
  const file = event.context.params.file
  const filePath = path.join(process.cwd(), 'data', `${file}.json`)
  
  if (!fs.existsSync(filePath)) {
    throw createError({ statusCode: 404, message: 'File not found' })
  }
  
  const content = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(content)
})