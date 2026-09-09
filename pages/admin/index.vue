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
        
        <!-- Редактор товаров -->
        <div v-if="activeTab === 'products'" class="editor">
          <h2>Товары ({{ products.length }})</h2>
          <button @click="addProduct" class="btn-add">+ Добавить товар</button>
          
          <div v-for="(product, index) in products" :key="product.id" class="product-item">
            <div class="product-header">
              <h3>Товар #{{ index + 1 }}</h3>
              <button @click="removeProduct(index)" class="btn-remove">🗑 Удалить</button>
            </div>
            
            <div class="product-fields">
              <!-- Основные поля -->
              <div class="field-group">
                <label>Название товара *</label>
                <input v-model="product.name" placeholder="Например: Газоанализатор ГАНК-4" />
              </div>
              
              <div class="field-group">
                <label>Категория *</label>
                <input v-model="product.category" placeholder="Например: Газоанализаторы" />
              </div>
              
              <div class="field-row">
                <div class="field-group">
                  <label>Цена (₽) *</label>
                  <input v-model="product.price" type="number" placeholder="45000" />
                </div>
                <div class="field-group">
                  <label>Старая цена (₽)</label>
                  <input v-model="product.oldPrice" type="number" placeholder="52000" />
                </div>
              </div>
              
              <div class="field-group">
                <label>Краткое описание *</label>
                <textarea v-model="product.shortDescription" placeholder="Краткое описание для карточки" rows="2"></textarea>
              </div>
              
              <div class="field-group">
                <label>Полное описание *</label>
                <textarea v-model="product.fullDescription" placeholder="Подробное описание для модального окна" rows="4"></textarea>
              </div>
            </div>
            
            <!-- Технические характеристики -->
            <div class="spec-section">
              <label class="section-label">📋 Технические характеристики</label>
              <p class="section-hint">Заполните название, значение и единицу измерения</p>
              
              <div v-for="(spec, specIndex) in product.specs" :key="specIndex" class="spec-row">
                <input 
                  v-model="spec.name" 
                  placeholder="Название (напр. Вес)"
                  class="spec-input-name"
                />
                <input 
                  v-model="spec.value" 
                  placeholder="Значение (напр. 1.2)"
                  class="spec-input-value"
                />
                <input 
                  v-model="spec.unit" 
                  placeholder="Ед. изм. (напр. кг)"
                  class="spec-input-unit"
                />
                <button @click="removeSpec(index, specIndex)" class="btn-remove-spec">✕</button>
              </div>
              <button @click="addSpec(index)" class="btn-add-spec">+ Добавить характеристику</button>
            </div>
            
            <!-- Изображения -->
            <div class="spec-section">
              <label class="section-label">🖼️ Изображения</label>
              <p class="section-hint">Загрузите изображения или укажите путь вручную</p>
              
              <div v-for="(img, imgIndex) in product.images" :key="imgIndex" class="spec-row">
                <input 
                  v-model="product.images[imgIndex]" 
                  placeholder="/images/products/имя-файла.jpg"
                  class="spec-input-image"
                />
                <button @click="uploadImage(index, imgIndex)" class="btn-upload">📤 Загрузить</button>
                <button @click="removeImage(index, imgIndex)" class="btn-remove-spec">✕</button>
              </div>
              <button @click="addImage(index)" class="btn-add-spec">+ Добавить изображение</button>
            </div>
            
            <!-- Статусы -->
            <div class="status-row">
              <label>
                <input type="checkbox" v-model="product.inStock" />
                В наличии
              </label>
              <label>
                <input type="checkbox" v-model="product.isNew" />
                Новинка
              </label>
              <label>
                <input type="checkbox" v-model="product.isPopular" />
                Популярный
              </label>
            </div>
          </div>
          
          <button @click="saveData('products')" class="btn-save">💾 Сохранить все товары</button>
        </div>
        
        <!-- Редактор контактов -->
        <div v-if="activeTab === 'contacts'" class="editor">
          <h2>Контакты и тексты</h2>
          <div class="settings-form">
            <h3>📞 Отдел 1</h3>
            <label>Название</label>
            <input v-model="contacts.commercialLabel" placeholder="Коммерческий отдел" />
            <label>Телефон</label>
            <input v-model="contacts.commercialPhone" placeholder="+7 (812) 252-22-45" />
            <label>Email</label>
            <input v-model="contacts.commercialEmail" placeholder="marketing@himanalit.ru" />
            
            <h3>📞 Отдел 2</h3>
            <label>Название</label>
            <input v-model="contacts.secretaryLabel" placeholder="Секретарь" />
            <label>Телефон</label>
            <input v-model="contacts.phone" placeholder="+7 (812) 786-61-59" />
            <label>Email</label>
            <input v-model="contacts.email" placeholder="mail@himanalit.ru" />
            
            <h3>📍 Адрес</h3>
            <label>Название</label>
            <input v-model="contacts.addressLabel" placeholder="Адрес" />
            <label>Адрес</label>
            <input v-model="contacts.address" placeholder="190020, Санкт-Петербург, ул. Бумажная, 17" />
            
            <h3>📄 Тексты</h3>
            <label>Название сайта</label>
            <input v-model="contacts.siteTitle" placeholder="АО «ГосНИИхиманалит»" />
            <label>Заголовок на главной</label>
            <input v-model="contacts.heroTitle" placeholder="Производство, испытания, метрология" />
            <label>Текст о компании</label>
            <textarea v-model="contacts.aboutText" rows="4"></textarea>
          </div>
          <button @click="saveData('contacts')" class="btn-save">💾 Сохранить контакты</button>
        </div>

        <!-- Редактор аренды -->
        <div v-if="activeTab === 'arenda'" class="editor">
          <h2>Помещения в аренду ({{ arenda.items?.length || 0 }})</h2>
          <button @click="addArendaItem" class="btn-add">+ Добавить помещение</button>
          
          <div v-for="(item, index) in arenda.items" :key="item.id" class="product-item">
            <div class="product-header">
              <h3>Помещение #{{ index + 1 }}</h3>
              <button @click="removeArendaItem(index)" class="btn-remove">🗑 Удалить</button>
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
                  <input v-model="item.ceilingHeight" placeholder="6 м" />
                </div>
                <div class="field-group">
                  <label>Электроснабжение</label>
                  <input v-model="item.powerSupply" placeholder="380 В" />
                </div>
              </div>
              
              <div class="field-group">
                <label>Цена</label>
                <input v-model="item.price" placeholder="25 000 ₽/м² в год" />
              </div>
              
              <div class="field-group">
                <label>Особенности</label>
                <p class="section-hint">Каждая особенность на отдельной строке</p>
                <div v-for="(feature, fIndex) in item.features" :key="fIndex" class="spec-row">
                  <input v-model="item.features[fIndex]" placeholder="Грузовой лифт" />
                  <button @click="removeFeature(index, fIndex)" class="btn-remove-spec">✕</button>
                </div>
                <button @click="addFeature(index)" class="btn-add-spec">+ Добавить особенность</button>
              </div>
              
              <div class="field-group">
                <label>Изображение</label>
                <div class="spec-row">
                  <input v-model="item.image" placeholder="/images/arenda/имя-файла.jpg" />
                  <button @click="uploadArendaImage(index)" class="btn-upload">📤 Загрузить</button>
                </div>
              </div>
              
              <div class="field-group">
                <label>Статус</label>
                <select v-model="item.status" class="form-select">
                  <option value="available">Свободно</option>
                  <option value="rented">Сдано</option>
                </select>
              </div>
            </div>
          </div>
          
          <button @click="saveData('arenda')" class="btn-save">💾 Сохранить помещения</button>
        </div>

        <!-- Редактор вакансий -->
        <div v-if="activeTab === 'vacancies'" class="editor">
          <h2>Вакансии ({{ vacancies.items?.length || 0 }})</h2>
          
          <div class="field-group">
            <label>Заголовок страницы</label>
            <input v-model="vacancies.title" placeholder="Вакансии" />
          </div>
          
          <div class="field-group">
            <label>Вступление</label>
            <textarea v-model="vacancies.intro" rows="2"></textarea>
          </div>
          
          <button @click="addVacancy" class="btn-add">+ Добавить вакансию</button>
          
          <div v-for="(item, index) in vacancies.items" :key="item.id" class="product-item">
            <div class="product-header">
              <h3>Вакансия #{{ index + 1 }}</h3>
              <button @click="removeVacancy(index)" class="btn-remove">🗑 Удалить</button>
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
                  <select v-model="item.type" class="form-select">
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
              
              <div class="field-group">
                <label>Требования</label>
                <p class="section-hint">Каждое требование на отдельной строке</p>
                <div v-for="(req, reqIndex) in item.requirements" :key="reqIndex" class="spec-row">
                  <input v-model="item.requirements[reqIndex]" placeholder="Высшее образование" />
                  <button @click="removeRequirement(index, reqIndex)" class="btn-remove-spec">✕</button>
                </div>
                <button @click="addRequirement(index)" class="btn-add-spec">+ Добавить требование</button>
              </div>
              
              <div class="field-group checkbox-group">
                <label class="checkbox-label">
                  <input type="checkbox" v-model="item.active" />
                  <span>Вакансия активна (отображается на сайте)</span>
                </label>
              </div>
            </div>
          </div>
          
          <button @click="saveData('vacancies')" class="btn-save">💾 Сохранить вакансии</button>
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
const isLoading = ref(false)

const tabs = [
  { key: 'products', label: 'Товары' },
  { key: 'arenda', label: 'Аренда' },
  { key: 'vacancies', label: 'Вакансии' },
  { key: 'contacts', label: 'Контакты' }
]

const products = ref([])
const contacts = ref({})
const arenda = ref({ items: [], title: '', description: '', contacts: {} })
const vacancies = ref({ items: [], title: '', intro: '', benefits: [] })

const loadData = async () => {
  try {
    loginError.value = false
    const data = await $fetch(`/api/content?password=${password.value}`)
    
    if (data.error) {
      loginError.value = true
      return false
    }
    
    // Товары
    const rawProducts = data.products?.products || []
    products.value = rawProducts.map(product => ({
      ...product,
      specs: product.specs || [],
      images: product.images || ['/images/products/placeholder.svg']
    }))
    
    // Аренда
    arenda.value = data.arenda || { items: [], title: '', description: '', contacts: {} }
    
    // Вакансии
    vacancies.value = data.vacancies || { items: [], title: '', intro: '', benefits: [] }
    
    // Контакты
    contacts.value = data.contacts || {}
    
    return true
  } catch (error) {
    console.error('Ошибка загрузки:', error)
    loginError.value = true
    return false
  }
}

const login = async () => {
  loginError.value = false
  isLoading.value = true
  
  try {
    const success = await loadData()
    if (success) {
      authenticated.value = true
    } else {
      loginError.value = true
    }
  } catch (error) {
    loginError.value = true
  } finally {
    isLoading.value = false
  }
}

const saveData = async (file) => {
  try {
    let data
    if (file === 'products') {
      data = { products: products.value }
    } else if (file === 'arenda') {
      data = arenda.value
    } else if (file === 'vacancies') {
      data = vacancies.value
    } else {
      data = contacts.value
    }
    
    const response = await $fetch('/api/content/save', {
      method: 'POST',
      body: {
        file: file,
        data: data,
        password: password.value
      }
    })
    
    if (response.success) {
      alert('✅ Данные сохранены!')
    } else {
      alert('❌ Ошибка: ' + response.message)
    }
  } catch (error) {
    alert('❌ Ошибка сохранения: ' + error.message)
  }
}

// ===================== ТОВАРЫ =====================

const addProduct = () => {
  products.value.push({
    id: 'id-' + Date.now(),
    name: '',
    category: '',
    price: 0,
    oldPrice: null,
    shortDescription: '',
    fullDescription: '',
    specs: [],
    images: ['/images/products/placeholder.svg'],
    inStock: true,
    isNew: false,
    isPopular: false,
    createdAt: new Date().toISOString()
  })
}

const removeProduct = async (index) => {
  const product = products.value[index]
  if (!confirm(`Удалить товар "${product.name || 'без названия'}"?`)) return
  
  try {
    const response = await $fetch('/api/content/delete', {
      method: 'POST',
      body: {
        productId: product.id,
        password: password.value
      }
    })
    
    if (response.success) {
      products.value.splice(index, 1)
      alert('✅ Товар удалён!')
    } else {
      alert('❌ Ошибка: ' + response.message)
    }
  } catch (error) {
    alert('❌ Ошибка удаления: ' + error.message)
  }
}

const addSpec = (productIndex) => {
  if (!products.value[productIndex].specs) {
    products.value[productIndex].specs = []
  }
  products.value[productIndex].specs.push({ name: '', value: '', unit: '' })
}

const removeSpec = (productIndex, specIndex) => {
  if (!products.value[productIndex].specs) return
  products.value[productIndex].specs.splice(specIndex, 1)
}

const addImage = (productIndex) => {
  if (!products.value[productIndex].images) {
    products.value[productIndex].images = []
  }
  products.value[productIndex].images.push('')
}

const removeImage = (productIndex, imgIndex) => {
  if (!products.value[productIndex].images) return
  products.value[productIndex].images.splice(imgIndex, 1)
}

const uploadImage = async (productIndex, imgIndex) => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/*'
  
  input.onchange = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    
    const formData = new FormData()
    formData.append('image', file)
    
    try {
      const response = await $fetch('/api/upload', {
        method: 'POST',
        body: formData
      })
      
      if (response.success) {
        products.value[productIndex].images[imgIndex] = response.path
        alert('✅ Изображение загружено!')
      } else {
        alert('❌ Ошибка: ' + response.error)
      }
    } catch (error) {
      alert('❌ Ошибка загрузки: ' + error.message)
    }
  }
  
  input.click()
}

// ===================== АРЕНДА =====================

const addArendaItem = () => {
  if (!arenda.value.items) arenda.value.items = []
  arenda.value.items.push({
    id: 'arenda-' + Date.now(),
    name: '',
    area: '',
    floor: '',
    ceilingHeight: '',
    powerSupply: '',
    features: [],
    price: '',
    status: 'available',
    image: '/images/arenda/placeholder.jpg',
    description: ''
  })
}

const removeArendaItem = (index) => {
  arenda.value.items.splice(index, 1)
}

const addFeature = (itemIndex) => {
  if (!arenda.value.items[itemIndex].features) {
    arenda.value.items[itemIndex].features = []
  }
  arenda.value.items[itemIndex].features.push('')
}

const removeFeature = (itemIndex, featureIndex) => {
  arenda.value.items[itemIndex].features.splice(featureIndex, 1)
}

const uploadArendaImage = async (itemIndex) => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/*'
  
  input.onchange = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    
    const formData = new FormData()
    formData.append('image', file)
    
    try {
      const response = await $fetch('/api/upload', {
        method: 'POST',
        body: formData
      })
      
      if (response.success) {
        arenda.value.items[itemIndex].image = response.path
        alert('✅ Изображение загружено!')
      } else {
        alert('❌ Ошибка: ' + response.error)
      }
    } catch (error) {
      alert('❌ Ошибка загрузки: ' + error.message)
    }
  }
  
  input.click()
}

// ===================== ВАКАНСИИ =====================

const addVacancy = () => {
  if (!vacancies.value.items) vacancies.value.items = []
  vacancies.value.items.push({
    id: 'vac-' + Date.now(),
    title: '',
    department: '',
    type: 'Полная занятость',
    salary: '',
    location: '',
    requirements: [],
    active: true
  })
}

const removeVacancy = (index) => {
  vacancies.value.items.splice(index, 1)
}

const addRequirement = (itemIndex) => {
  if (!vacancies.value.items[itemIndex].requirements) {
    vacancies.value.items[itemIndex].requirements = []
  }
  vacancies.value.items[itemIndex].requirements.push('')
}

const removeRequirement = (itemIndex, reqIndex) => {
  vacancies.value.items[itemIndex].requirements.splice(reqIndex, 1)
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
  margin-bottom: 2rem;
  background: white;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
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

/* Товары */
.product-item {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
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
.field-group textarea {
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  width: 100%;
}

.field-group input:focus,
.field-group textarea:focus {
  outline: none;
  border-color: #005700;
}

/* Секция характеристик */
.spec-section {
  margin-top: 1.5rem;
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
}

.spec-row input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.spec-row input:focus {
  outline: none;
  border-color: #005700;
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

.spec-input-name:focus,
.spec-input-value:focus,
.spec-input-unit:focus {
  outline: none;
  border-color: #005700;
}

.btn-upload {
  padding: 4px 12px;
  background: #e3f2fd;
  color: #0d47a1;
  border: 1px solid #0d47a1;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  white-space: nowrap;
}

.btn-upload:hover {
  background: #0d47a1;
  color: #fff;
}

.spec-input-image {
  flex: 1;
  min-width: 150px;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.spec-input-image:focus {
  outline: none;
  border-color: #005700;
}

/* Статусы */
.status-row {
  display: flex;
  gap: 24px;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
  flex-wrap: wrap;
}

.status-row label {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  font-size: 14px;
}

.status-row input[type="checkbox"] {
  width: 18px;
  height: 18px;
  accent-color: #005700;
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

.btn-save {
  padding: 12px 32px;
  background: #005700;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 1rem;
  width: 100%;
}

.btn-save:hover {
  background: #003d00;
}

/* Контакты */
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

/* Стили для чекбокса */
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