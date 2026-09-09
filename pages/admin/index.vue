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
        <!-- Товары -->
        <div class="editor">
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
                <label>URL изображения</label>
                <input v-model="product.image_url" placeholder="/images/products/имя-файла.webp" />
              </div>
            </div>
            
            <button @click="saveProduct(product)" class="btn-save-product">💾 Сохранить товар</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://swevsunpqubbqusceoon.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3ZXZzdW5wcXViYnF1c2Nlb29uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg5NTk1NjksImV4cCI6MjEwNDUzNTU2OX0.NdUnhdiIpu-OBL67CBK-2Wt31PsizdSZa85knIjKF1Q'

const supabase = createClient(supabaseUrl, supabaseKey)

const password = ref('')
const authenticated = ref(false)
const loginError = ref(false)
const products = ref([])

const ADMIN_PASSWORD = 'admin'

// Вход
function login() {
  if (password.value === ADMIN_PASSWORD) {
    authenticated.value = true
    loginError.value = false
    loadProducts()
  } else {
    loginError.value = true
  }
}

// Загрузка товаров из Supabase
async function loadProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('id', { ascending: false })
  
  if (error) {
    console.error('Ошибка загрузки:', error)
    return
  }
  
  products.value = data || []
}

// Добавление нового товара
function addProduct() {
  products.value.unshift({
    id: null,
    title: '',
    category: '',
    description: '',
    image_url: ''
  })
}

// Сохранение товара
async function saveProduct(product) {
  if (!product.title || !product.title.trim()) {
    alert('Введите название товара!')
    return
  }
  
  try {
    if (product.id) {
      // Обновление существующего
      const { error } = await supabase
        .from('products')
        .update({
          title: product.title,
          category: product.category,
          description: product.description,
          image_url: product.image_url
        })
        .eq('id', product.id)
      
      if (error) throw error
      alert('✅ Товар обновлён!')
    } else {
      // Создание нового
      const { error } = await supabase
        .from('products')
        .insert([{
          title: product.title,
          category: product.category,
          description: product.description,
          image_url: product.image_url
        }])
      
      if (error) throw error
      alert('✅ Товар добавлен!')
    }
    
    loadProducts()
  } catch (error) {
    alert('❌ Ошибка: ' + error.message)
  }
}

// Удаление товара
async function removeProduct(product) {
  if (!confirm(`Удалить "${product.title}"?`)) return
  
  try {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', product.id)
    
    if (error) throw error
    alert('✅ Товар удалён!')
    loadProducts()
  } catch (error) {
    alert('❌ Ошибка: ' + error.message)
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

.login-form .error {
  color: #dc2626;
  margin-top: 0.5rem;
  text-align: center;
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
</style>