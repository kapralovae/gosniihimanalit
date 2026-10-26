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
    slug TEXT,
    purpose TEXT,
    principle TEXT,
    features TEXT,
    delivery_set TEXT,
    warranty TEXT,
    certificates TEXT,
    tables TEXT,
    specs TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`)

// Миграция: добавляем slug для существующих БД
try { db.exec(`ALTER TABLE products ADD COLUMN slug TEXT`) } catch(e) {}

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
    experience TEXT,
    requirements TEXT,
    active INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`)

try { db.exec(`ALTER TABLE vacancies ADD COLUMN experience TEXT`) } catch (e) {}

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

// Карусель главной страницы
db.exec(`
  CREATE TABLE IF NOT EXISTS carousel (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    image TEXT NOT NULL,
    title TEXT,
    position INTEGER DEFAULT 0,
    active INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`)

// Добавляем поля в products, если их нет
try { db.exec(`ALTER TABLE products ADD COLUMN specs TEXT`) } catch (e) {}

// Миграции для products: purpose, principle, features, delivery_set, warranty, certificates, tables
try { db.exec(`ALTER TABLE products ADD COLUMN purpose TEXT`) } catch(e) {}
try { db.exec(`ALTER TABLE products ADD COLUMN principle TEXT`) } catch(e) {}
try { db.exec(`ALTER TABLE products ADD COLUMN features TEXT`) } catch(e) {}
try { db.exec(`ALTER TABLE products ADD COLUMN delivery_set TEXT`) } catch(e) {}
try { db.exec(`ALTER TABLE products ADD COLUMN warranty TEXT`) } catch(e) {}
try { db.exec(`ALTER TABLE products ADD COLUMN certificates TEXT`) } catch(e) {}
try { db.exec(`ALTER TABLE products ADD COLUMN tables TEXT`) } catch(e) {}


// Библиотека (книги, статьи, стандарты)
db.exec(`
  CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT,
    year INTEGER,
    type TEXT,
    category TEXT,
    annotation TEXT,
    file_url TEXT,
    availability TEXT DEFAULT 'Свободен',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`)


// Библиотека 3D-моделей
db.exec(`
  CREATE TABLE IF NOT EXISTS models_3d (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    format TEXT,
    category TEXT,
    size TEXT,
    file_url TEXT,
    downloads INTEGER DEFAULT 0,
    rating REAL DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`)

export default db