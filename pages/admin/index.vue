<!-- pages/admin/index.vue -->

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
            <input v-model="product.name" placeholder="Название" />
            <input v-model="product.category" placeholder="Категория" />
            <input v-model="product.price" type="number" placeholder="Цена" />
            <textarea v-model="product.shortDescription" placeholder="Краткое описание"></textarea>
            <textarea v-model="product.fullDescription" placeholder="Полное описание"></textarea>
            <button @click="removeProduct(index)" class="btn-remove">🗑 Удалить</button>
          </div>
          
          <button @click="saveData('products')" class="btn-save">💾 Сохранить товары</button>
        </div>
        
        <!-- Редактор контактов -->
        <div v-if="activeTab === 'contacts'" class="editor">
          <h2>Контакты и тексты</h2>
          <div class="settings-form">
            
            <!-- 📞 Отдел 1 -->
            <h3 style="margin-top: 0; border-top: none; padding-top: 0;">📞 Отдел 1</h3>
            
            <label>Название отдела</label>
            <input v-model="contacts.commercialLabel" placeholder="Коммерческий отдел" />
            
            <label>Телефон</label>
            <input v-model="contacts.commercialPhone" placeholder="+7 (812) 252-22-45" />
            
            <label>Email</label>
            <input v-model="contacts.commercialEmail" placeholder="marketing@himanalit.ru" />
            
            <!-- 📞 Отдел 2 -->
            <h3 style="margin-top: 1.5rem; border-top: 2px solid #e5e7eb; padding-top: 1rem;">📞 Отдел 2</h3>
            
            <label>Название отдела</label>
            <input v-model="contacts.secretaryLabel" placeholder="Секретарь" />
            
            <label>Телефон</label>
            <input v-model="contacts.phone" placeholder="+7 (812) 786-61-59" />
            
            <label>Email</label>
            <input v-model="contacts.email" placeholder="mail@himanalit.ru" />
            
            <!-- 📍 Адрес -->
            <h3 style="margin-top: 1.5rem; border-top: 2px solid #e5e7eb; padding-top: 1rem;">📍 Адрес</h3>
            
            <label>Название раздела</label>
            <input v-model="contacts.addressLabel" placeholder="Адрес" />
            
            <label>Адрес (полный)</label>
            <input v-model="contacts.address" placeholder="190020, Санкт-Петербург, ул. Бумажная, 17" />
            
            <!-- 📄 Тексты -->
            <h3 style="margin-top: 1.5rem; border-top: 2px solid #e5e7eb; padding-top: 1rem;">📄 Тексты сайта</h3>
            
            <label>Название сайта</label>
            <input v-model="contacts.siteTitle" placeholder="АО «ГосНИИхиманалит»" />
            
            <label>Заголовок на главной</label>
            <input v-model="contacts.heroTitle" placeholder="Производство, испытания, метрология" />
            
            <label>Текст о компании</label>
            <textarea v-model="contacts.aboutText" rows="4"></textarea>
          </div>
          
          <button @click="saveData('contacts')" class="btn-save">💾 Сохранить контакты</button>
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
  { key: 'contacts', label: 'Контакты' }  // ← теперь Contacts
]

const products = ref([])
const contacts = ref({})  // ← теперь contacts

const loadData = async () => {
  try {
    const data = await $fetch(`/api/content?password=${password.value}`)
    products.value = data.products?.products || []
    contacts.value = data.contacts || {}  // ← contacts
  } catch (error) {
    console.error('Ошибка загрузки:', error)
  }
}

const login = async () => {
  loginError.value = false
  isLoading.value = true
  try {
    await loadData()
    authenticated.value = true
  } catch (error) {
    loginError.value = true
  } finally {
    isLoading.value = false
  }
}

const saveData = async (file) => {
  try {
    const data = file === 'products' 
      ? { products: products.value }
      : contacts.value  // ← contacts
    
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

const addProduct = () => {
  products.value.push({
    id: 'id-' + Date.now(),
    name: '',
    category: '',
    price: 0,
    shortDescription: '',
    fullDescription: '',
    images: ['/images/products/placeholder.svg'],
    specifications: {},
    inStock: true,
    isNew: false,
    isPopular: false,
    createdAt: new Date().toISOString()
  })
}

const removeProduct = async (index) => {
  const product = products.value[index]
  if (!confirm(`Удалить товар "${product.name}"?`)) return
  
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

.login-form button:disabled {
  background: #999;
  cursor: not-allowed;
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

.product-item {
  border: 1px solid #e5e7eb;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.product-item input,
.product-item textarea {
  display: block;
  width: 100%;
  padding: 8px 12px;
  margin-bottom: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.product-item textarea {
  min-height: 60px;
  resize: vertical;
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
  padding: 6px 12px;
  background: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 4px;
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

.settings-form label {
  display: block;
  font-weight: 600;
  margin-top: 1rem;
  margin-bottom: 0.25rem;
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
  margin-bottom: 0.5rem;
}
</style>