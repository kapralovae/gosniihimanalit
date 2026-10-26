import { writeFile, mkdir } from 'fs/promises'
import { join, extname } from 'path'
import { existsSync } from 'fs'

const ALLOWED_EXT = [
  '.pdf',
  '.djvu',
  '.epub',
  '.fb2',
  '.doc',
  '.docx',
  '.txt'
]

export default defineEventHandler(async (event) => {
  const form = await readMultipartFormData(event)
  if (!form || !form.length) {
    return { success: false, error: 'Файл не получен' }
  }

  const file = form.find(f => f.name === 'file')
  if (!file) {
    return { success: false, error: 'Поле "file" не найдено' }
  }

  // Проверяем расширение
  const ext = extname(file.filename || '').toLowerCase()
  if (!ALLOWED_EXT.includes(ext)) {
    return {
      success: false,
      error: 'Разрешены файлы: PDF, DJVU, EPUB, FB2, DOC, DOCX, TXT'
    }
  }

  // Папка для книг
  const uploadsDir = join(process.cwd(), 'public', 'books')
  if (!existsSync(uploadsDir)) {
    await mkdir(uploadsDir, { recursive: true })
  }

  // Имя файла: timestamp + оригинальное имя (без пробелов)
  const safeName = (file.filename || 'book.pdf')
    .replace(/\s+/g, '_')
    .replace(/[^a-zA-Z0-9._\-а-яА-Я]/g, '')
  const fileName = `${Date.now()}-${safeName}`
  const filePath = join(uploadsDir, fileName)

  await writeFile(filePath, file.data)

  return {
    success: true,
    url: `/books/${fileName}`,
    name: fileName,
    ext: ext.replace('.', '')   // возвращаем ещё и расширение
  }
})