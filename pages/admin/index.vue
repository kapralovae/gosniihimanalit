<template>
  <div class="admin-page">
    <div class="container">
      <h1>Админ-панель</h1>
      
      <!-- Вход -->
      <div v-if="!authenticated" class="login-form">
        <h2>Вход в админку</h2>
        <input 
          v-model="password" 
          type="password" 
          placeholder="Введите пароль"
          @keydown.enter="login"
        />
        <button @click="login">Войти</button>
        <p v-if="loginError" class="error">Неверный пароль</p>
      </div>
      
      <!-- Админка -->
      <div v-else>
        <!-- Вкладки -->
        <div class="admin-nav">
          <button 
            v-for="tab in tabs" 
            :key="tab.key"
            :class="{ active: activeTab === tab.key }"
            @click="activeTab = tab.key"
          >
            {{ tab.label }}
          </button>
        </div>

        <!-- ТОВАРЫ -->
        <div v-if="activeTab === 'products'" class="editor">
          <h2>Товары ({{ products.length }})</h2>
          <button @click="addProduct" class="btn-add">+ Добавить товар</button>
          
          <div v-for="(product, index) in products" :key="product.id || 'new-' + index" class="product-item">
            <div class="product-header">
              <h3>Товар #{{ index + 1 }}</h3>
              <button v-if="product.id" @click="removeProduct(product)" class="btn-remove">🗑 Удалить</button>
            </div>
            
            <div class="product-fields">
              <div class="field-group">
                <label>Название товара *</label>
                <input v-model="product.title" placeholder="Например: Газоанализатор ГАНК-4" />
              </div>
              
              <div class="field-group">
                <label>Категория *</label>
                <input v-model="product.category" placeholder="Например: Газоанализаторы" />
              </div>
              
              <div class="field-group">
                <label>Описание *</label>
                <textarea v-model="product.description" placeholder="Описание товара" rows="4"></textarea>
              </div>
              
              <div class="field-group">
                <label>Изображение товара</label>
                <div class="image-upload-row">
                  <input v-model="product.image_url" placeholder="/uploads/имя-файла.webp или URL" />
                  <button type="button" @click="uploadImage(product)" class="btn-upload">📤 Загрузить</button>
                </div>
                <img v-if="product.image_url" :src="product.image_url" class="image-preview" alt="Превью" />
              </div>

              <div class="spec-section">
                <label class="section-label">📋 Технические характеристики</label>
                <p class="section-hint">Заполните название, значение и единицу измерения</p>
                
                <div v-for="(spec, specIndex) in (product.specs || [])" :key="specIndex" class="spec-row">
                  <input v-model="spec.name" placeholder="Название" class="spec-input-name" />
                  <input v-model="spec.value" placeholder="Значение" class="spec-input-value" />
                  <input v-model="spec.unit" placeholder="Ед. изм." class="spec-input-unit" />
                  <button @click="removeSpec(product, specIndex)" class="btn-remove-spec">✕</button>
                </div>
                <button @click="addSpec(product)" class="btn-add-spec">+ Добавить характеристику</button>
              </div>
            </div>
            
            <button @click="saveProduct(product)" class="btn-save-product">💾 Сохранить товар</button>
          </div>
        </div>

        <!-- АРЕНДА -->
        <div v-if="activeTab === 'arenda'" class="editor">
          <h2>Помещения в аренду ({{ arenda.length }})</h2>
          <button @click="addArenda" class="btn-add">+ Добавить помещение</button>
          
          <div v-for="(item, index) in arenda" :key="item.id || 'new-arenda-' + index" class="product-item">
            <div class="product-header">
              <h3>Помещение #{{ index + 1 }}</h3>
              <button v-if="item.id" @click="removeArenda(item)" class="btn-remove">🗑 Удалить</button>
            </div>
            
            <div class="product-fields">
              <div class="field-group">
                <label>Название</label>
                <input v-model="item.name" placeholder="Производственное помещение №1" />
              </div>
              
              <div class="field-group">
                <label>Описание</label>
                <textarea v-model="item.description" rows="2"></textarea>
              </div>
              
              <div class="field-row">
                <div class="field-group">
                  <label>Площадь</label>
                  <input v-model="item.area" placeholder="245 м²" />
                </div>
                <div class="field-group">
                  <label>Этаж</label>
                  <input v-model="item.floor" placeholder="1-й этаж" />
                </div>
              </div>
              
              <div class="field-row">
                <div class="field-group">
                  <label>Высота потолков</label>
                  <input v-model="item.ceiling_height" placeholder="6 м" />
                </div>
                <div class="field-group">
                  <label>Электроснабжение</label>
                  <input v-model="item.power_supply" placeholder="380 В" />
                </div>
              </div>
              
              <div class="field-group">
                <label>Цена</label>
                <input v-model="item.price" placeholder="25 000 ₽/м² в год" />
              </div>

              <div class="field-group">
                <label>Статус</label>
                <select v-model="item.status">
                  <option value="available">Свободно</option>
                  <option value="rented">Сдано</option>
                </select>
              </div>
              
              <div class="spec-section">
                <label class="section-label">🔧 Особенности</label>
                <div v-for="(feature, fIndex) in (item.features || [])" :key="fIndex" class="spec-row">
                  <input v-model="item.features[fIndex]" placeholder="Грузовой лифт" class="spec-input-name" />
                  <button @click="removeFeature(item, fIndex)" class="btn-remove-spec">✕</button>
                </div>
                <button @click="addFeature(item)" class="btn-add-spec">+ Добавить особенность</button>
              </div>

              <div class="field-group">
                <label>Изображение</label>
                <div class="image-upload-row">
                  <input v-model="item.image" placeholder="/uploads/имя-файла.webp или URL" />
                  <button type="button" @click="uploadArendaImage(item)" class="btn-upload">📤 Загрузить</button>
                </div>
                <img v-if="item.image" :src="item.image" class="image-preview" alt="Превью" />
              </div>
            </div>
            
            <button @click="saveArenda(item)" class="btn-save-product">💾 Сохранить помещение</button>
          </div>
        </div>

        <!-- ВАКАНСИИ -->
        <div v-if="activeTab === 'vacancies'" class="editor">
          <h2>Вакансии ({{ vacancies.length }})</h2>
          <button @click="addVacancy" class="btn-add">+ Добавить вакансию</button>
          
          <div v-for="(item, index) in vacancies" :key="item.id || 'new-vac-' + index" class="product-item">
            <div class="product-header">
              <h3>Вакансия #{{ index + 1 }}</h3>
              <button v-if="item.id" @click="removeVacancy(item)" class="btn-remove">🗑 Удалить</button>
            </div>
            
            <div class="product-fields">
              <div class="field-group">
                <label>Название должности</label>
                <input v-model="item.title" placeholder="Инженер-конструктор" />
              </div>
              
              <div class="field-row">
                <div class="field-group">
                  <label>Отдел</label>
                  <input v-model="item.department" placeholder="Конструкторское бюро" />
                </div>
                <div class="field-group">
                  <label>Тип занятости</label>
                  <select v-model="item.type">
                    <option value="Полная занятость">Полная занятость</option>
                    <option value="Частичная занятость">Частичная занятость</option>
                    <option value="Удаленная работа">Удаленная работа</option>
                  </select>
                </div>
              </div>
              
              <div class="field-row">
                <div class="field-group">
                  <label>Зарплата</label>
                  <input v-model="item.salary" placeholder="80 000 - 120 000 ₽" />
                </div>
                <div class="field-group">
                  <label>Местоположение</label>
                  <input v-model="item.location" placeholder="Санкт-Петербург" />
                </div>
              </div>
              
              <div class="spec-section">
                <label class="section-label">📋 Требования</label>
                <div v-for="(req, rIndex) in (item.requirements || [])" :key="rIndex" class="spec-row">
                  <input v-model="item.requirements[rIndex]" placeholder="Высшее образование" class="spec-input-name" />
                  <button @click="removeRequirement(item, rIndex)" class="btn-remove-spec">✕</button>
                </div>
                <button @click="addRequirement(item)" class="btn-add-spec">+ Добавить требование</button>
              </div>

              <div class="field-group checkbox-group">
                <label class="checkbox-label">
                  <input type="checkbox" v-model="item.active" />
                  <span>Вакансия активна (отображается на сайте)</span>
                </label>
              </div>
            </div>
            
            <button @click="saveVacancy(item)" class="btn-save-product">💾 Сохранить вакансию</button>
          </div>
        </div>

        <!-- КОНТАКТЫ -->
        <div v-if="activeTab === 'contacts'" class="editor">
          <h2>Контакты и тексты</h2>
          
          <div class="settings-form">
            <h3>📞 Коммерческий отдел</h3>
            <label>Название</label>
            <input v-model="contacts.commercial_label" placeholder="Коммерческий отдел" />
            <label>Телефон</label>
            <input v-model="contacts.commercial_phone" placeholder="+7 (812) 252-22-45" />
            <label>Email</label>
            <input v-model="contacts.commercial_email" placeholder="marketing@himanalit.ru" />
            
            <h3>📞 Секретарь</h3>
            <label>Название</label>
            <input v-model="contacts.secretary_label" placeholder="Секретарь" />
            <label>Телефон</label>
            <input v-model="contacts.secretary_phone" placeholder="+7 (812) 786-61-59" />
            <label>Email</label>
            <input v-model="contacts.secretary_email" placeholder="mail@himanalit.ru" />
            
            <h3>📍 Адрес</h3>
            <label>Название</label>
            <input v-model="contacts.address_label" placeholder="Адрес" />
            <label>Адрес</label>
            <input v-model="contacts.address" placeholder="190020, Санкт-Петербург, ул. Бумажная, 17" />
            
            <h3>📄 Тексты</h3>
            <label>Название сайта</label>
            <input v-model="contacts.site_title" placeholder="АО «ГосНИИхиманалит»" />
            <label>Заголовок на главной</label>
            <input v-model="contacts.hero_title" placeholder="Производство, испытания, метрология" />
            <label>Текст о компании</label>
            <textarea v-model="contacts.about_text" rows="4"></textarea>
          </div>
          
          <button @click="saveContacts" class="btn-save-product">💾 Сохранить контакты</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const password = ref('')
const authenticated = ref(false)
const loginError = ref(false)
const activeTab = ref('products')

const tabs = [
  { key: 'products', label: 'Товары' },
  { key: 'arenda', label: 'Аренда' },
  { key: 'vacancies', label: 'Вакансии' },
  { key: 'contacts', label: 'Контакты' }
]

const ADMIN_PASSWORD = 'admin'

const products = ref([])
const arenda = ref([])
const vacancies = ref([])
const contacts = ref({})

function login() {
  if (password.value === ADMIN_PASSWORD) {
    authenticated.value = true
    loginError.value = false
    loadAll()
  } else {
    loginError.value = true
  }
}

async function loadAll() {
  try { products.value = await $fetch('/api/products') || [] } catch(e) { products.value = [] }
  try { arenda.value = await $fetch('/api/arenda') || [] } catch(e) { arenda.value = [] }
  try { vacancies.value = await $fetch('/api/vacancies') || [] } catch(e) { vacancies.value = [] }
  try { contacts.value = await $fetch('/api/contacts') || {} } catch(e) { contacts.value = {} }
}

// ТОВАРЫ
function addProduct() {
  products.value.unshift({ id: null, title: '', description: '', category: '', image_url: '', specs: [] })
}

async function saveProduct(product) {
  if (!product.title?.trim()) { alert('Введите название!'); return }
  try {
    if (product.id) {
      await $fetch(`/api/products/${product.id}`, { method: 'PUT', body: product })
    } else {
      await $fetch('/api/products', { method: 'POST', body: product })
    }
    alert('✅ Сохранено!')
    loadAll()
  } catch (e) { alert('❌ ' + e.message) }
}

async function removeProduct(product) {
  if (!confirm(`Удалить "${product.title}"?`)) return
  try {
    await $fetch(`/api/products/${product.id}`, { method: 'DELETE' })
    loadAll()
  } catch (e) { alert('❌ ' + e.message) }
}

function addSpec(product) {
  if (!product.specs) product.specs = []
  product.specs.push({ name: '', value: '', unit: '' })
}

function removeSpec(product, i) {
  product.specs.splice(i, 1)
}

async function uploadImage(product) {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/*'
  input.onchange = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    const fd = new FormData()
    fd.append('image', file)
    try {
      const r = await $fetch('/api/upload', { method: 'POST', body: fd })
      if (r.success) { product.image_url = r.url; alert('✅ Загружено!') }
      else alert('❌ ' + r.error)
    } catch (err) { alert('❌ ' + err.message) }
  }
  input.click()
}

// АРЕНДА
function addArenda() {
  arenda.value.unshift({ id: null, name: '', description: '', area: '', floor: '', ceiling_height: '', power_supply: '', price: '', features: [], image: '', status: 'available' })
}

async function saveArenda(item) {
  if (!item.name?.trim()) { alert('Введите название!'); return }
  try {
    if (item.id) await $fetch(`/api/arenda/${item.id}`, { method: 'PUT', body: item })
    else await $fetch('/api/arenda', { method: 'POST', body: item })
    alert('✅ Сохранено!')
    loadAll()
  } catch (e) { alert('❌ ' + e.message) }
}

async function removeArenda(item) {
  if (!confirm(`Удалить "${item.name}"?`)) return
  await $fetch(`/api/arenda/${item.id}`, { method: 'DELETE' })
  loadAll()
}

function addFeature(item) {
  if (!item.features) item.features = []
  item.features.push('')
}

function removeFeature(item, i) { item.features.splice(i, 1) }

async function uploadArendaImage(item) {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/*'
  input.onchange = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    const fd = new FormData()
    fd.append('image', file)
    try {
      const r = await $fetch('/api/upload', { method: 'POST', body: fd })
      if (r.success) {
        item.image = r.url
        alert('✅ Изображение загружено!')
      } else {
        alert('❌ ' + r.error)
      }
    } catch (err) {
      alert('❌ ' + err.message)
    }
  }
  input.click()
}

// ВАКАНСИИ
function addVacancy() {
  vacancies.value.unshift({ id: null, title: '', department: '', type: 'Полная занятость', salary: '', location: '', requirements: [], active: true })
}

async function saveVacancy(item) {
  if (!item.title?.trim()) { alert('Введите название!'); return }
  try {
    if (item.id) await $fetch(`/api/vacancies/${item.id}`, { method: 'PUT', body: item })
    else await $fetch('/api/vacancies', { method: 'POST', body: item })
    alert('✅ Сохранено!')
    loadAll()
  } catch (e) { alert('❌ ' + e.message) }
}

async function removeVacancy(item) {
  if (!confirm(`Удалить "${item.title}"?`)) return
  await $fetch(`/api/vacancies/${item.id}`, { method: 'DELETE' })
  loadAll()
}

function addRequirement(item) {
  if (!item.requirements) item.requirements = []
  item.requirements.push('')
}

function removeRequirement(item, i) { item.requirements.splice(i, 1) }

// КОНТАКТЫ
async function saveContacts() {
  try {
    await $fetch('/api/contacts', { method: 'PUT', body: contacts.value })
    alert('✅ Сохранено!')
  } catch (e) { alert('❌ ' + e.message) }
}
</script>

<style scoped>
.admin-page {
  padding: 2rem 0;
  background: #f5f7fa;
  min-height: 100vh;
}

.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 20px;
}

h1 {
  font-size: 2rem;
  color: #005700;
  margin-bottom: 2rem;
}

.login-form {
  max-width: 400px;
  margin: 100px auto;
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}

.login-form h2 {
  margin-bottom: 1.5rem;
  text-align: center;
}

.login-form input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  margin-bottom: 1rem;
}

.login-form button {
  width: 100%;
  padding: 12px;
  background: #005700;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
}

.login-form .error {
  color: #dc2626;
  margin-top: 0.5rem;
  text-align: center;
}

.admin-nav {
  display: flex;
  gap: 10px;
  margin-bottom: 1.5rem;
  background: white;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  flex-wrap: wrap;
}

.admin-nav button {
  padding: 10px 24px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  background: transparent;
  transition: all 0.3s;
}

.admin-nav button:hover {
  background: #f0f9f0;
}

.admin-nav button.active {
  background: #005700;
  color: white;
}

.editor {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.editor h2 {
  margin-bottom: 1.5rem;
}

.product-item {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  background: #fafbfc;
}

.product-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e5e7eb;
}

.product-header h3 {
  color: #005700;
  font-size: 1.1rem;
}

.product-fields {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.field-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.field-group label {
  font-weight: 600;
  font-size: 14px;
  color: #333;
}

.field-group input,
.field-group textarea,
.field-group select {
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  width: 100%;
}

.field-group input:focus,
.field-group textarea:focus,
.field-group select:focus {
  outline: none;
  border-color: #005700;
}

.btn-add {
  padding: 8px 16px;
  background: #2196F3;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-bottom: 1rem;
}

.btn-add:hover {
  background: #1976D2;
}

.btn-remove {
  padding: 6px 14px;
  background: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
}

.btn-remove:hover {
  background: #d32f2f;
}

.btn-save-product {
  margin-top: 1rem;
  padding: 10px 24px;
  background: #005700;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}

.btn-save-product:hover {
  background: #003d00;
}

.image-upload-row {
  display: flex;
  gap: 10px;
  align-items: center;
}

.image-upload-row input {
  flex: 1;
}

.btn-upload {
  padding: 10px 16px;
  background: #005700;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  white-space: nowrap;
  transition: background 0.3s;
}

.btn-upload:hover {
  background: #003d00;
}

.image-preview {
  margin-top: 10px;
  max-width: 200px;
  max-height: 150px;
  object-fit: contain;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.spec-section {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
}

.section-label {
  font-weight: 700;
  color: #005700;
  font-size: 15px;
  display: block;
  margin-bottom: 4px;
}

.section-hint {
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 8px;
}

.spec-row {
  display: flex;
  gap: 8px;
  margin-bottom: 6px;
  align-items: center;
  flex-wrap: wrap;
}

.spec-input-name {
  flex: 2;
  min-width: 120px;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.spec-input-value {
  flex: 1;
  min-width: 80px;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.spec-input-unit {
  flex: 1;
  min-width: 70px;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.btn-add-spec {
  padding: 4px 14px;
  background: #e8f5e9;
  color: #2e7d32;
  border: 1px solid #2e7d32;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  margin-top: 4px;
}

.btn-add-spec:hover {
  background: #2e7d32;
  color: #fff;
}

.btn-remove-spec {
  padding: 4px 10px;
  background: #ffebee;
  color: #c62828;
  border: 1px solid #c62828;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
}

.btn-remove-spec:hover {
  background: #c62828;
  color: #fff;
}

.settings-form label {
  display: block;
  font-weight: 600;
  margin-top: 1rem;
  margin-bottom: 0.25rem;
  font-size: 14px;
}

.settings-form input,
.settings-form textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
}

.settings-form h3 {
  font-size: 1.1rem;
  color: #005700;
  margin-top: 1.5rem;
  border-top: 2px solid #e5e7eb;
  padding-top: 1rem;
}

.checkbox-group {
  margin-top: 8px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  color: #333;
}

.checkbox-label input[type="checkbox"] {
  width: 18px;
  height: 18px;
  accent-color: #005700;
  cursor: pointer;
  flex-shrink: 0;
}

@media (max-width: 600px) {
  .field-row {
    grid-template-columns: 1fr;
  }
  
  .product-header {
    flex-direction: column;
    gap: 8px;
    align-items: flex-start;
  }
}
</style>