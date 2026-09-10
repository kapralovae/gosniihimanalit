import Database from 'better-sqlite3'
import path from 'path'
import fs from 'fs'

const dbDir = path.join(process.cwd(), 'data')
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true })
}

const dbPath = path.join(dbDir, 'database.sqlite')
const db = new Database(dbPath)

// Товары
db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT,
    image_url TEXT,
    specs TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`)

// Аренда
db.exec(`
  CREATE TABLE IF NOT EXISTS arenda (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    area TEXT,
    floor TEXT,
    ceiling_height TEXT,
    power_supply TEXT,
    price TEXT,
    features TEXT,
    image TEXT,
    status TEXT DEFAULT 'available',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`)

// Вакансии
db.exec(`
  CREATE TABLE IF NOT EXISTS vacancies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    department TEXT,
    type TEXT,
    salary TEXT,
    location TEXT,
    requirements TEXT,
    active INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`)

// Контакты (одна строка)
db.exec(`
  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    commercial_label TEXT,
    commercial_phone TEXT,
    commercial_email TEXT,
    secretary_label TEXT,
    secretary_phone TEXT,
    secretary_email TEXT,
    address_label TEXT,
    address TEXT,
    site_title TEXT,
    hero_title TEXT,
    about_text TEXT
  )
`)

// Добавляем поля в products, если их нет
try { db.exec(`ALTER TABLE products ADD COLUMN specs TEXT`) } catch (e) {}

export default db