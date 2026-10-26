<template>
  <div class="kb-page">
    <div class="container">
      <!-- Хлебные крошки -->
      <nav class="breadcrumb">
        <NuxtLink to="/">Главная</NuxtLink>
        <span class="separator">/</span>
        <NuxtLink to="/konstruktorskoe-byuro">Конструкторское бюро</NuxtLink>
        <span class="separator">/</span>
        <span class="current">Электронная библиотека</span>
      </nav>
      
      <h1 class="page-title">Электронная библиотека</h1>
      
      <div class="kb-content">
        <p class="kb-intro">
          Техническая библиотека АО "ГосНИИхиманалит" содержит обширную коллекцию
          литературы по химическому анализу и контролю.
        </p>
        
        <!-- Поиск -->
        <div class="search-section">
          <div class="search-input-wrapper">
            <span class="search-icon">🔍</span>
            <input
              v-model="searchQuery"
              type="text"
              class="search-input"
              placeholder="Поиск по библиотеке..."
            />
          </div>
          
          <div class="filters">
            <select v-model="selectedType" class="filter-select">
              <option value="">Все типы</option>
              <option value="book">Книги</option>
              <option value="article">Статьи</option>
              <option value="standard">Стандарты</option>
              <option value="method">Методики</option>
            </select>
          </div>
        </div>
      
        
        <!-- Список документов -->
        <h2 class="section-subtitle">Документы</h2>
        <div class="documents-table">
          <div class="table-header">
            <span class="col-title">Название</span>
            <span class="col-author">Автор</span>
            <span class="col-year">Год</span>
            <span class="col-type">Тип</span>
            <span class="col-availability">Доступ</span>
            <span class="col-download-header">Скачать</span>
          </div>
          
          <div 
            v-for="doc in filteredDocuments" 
            :key="doc.title"
            class="table-row"
            @click="showDocument(doc)"
          >
            <span class="col-title">{{ doc.title }}</span>
            <span class="col-author">{{ doc.author }}</span>
            <span class="col-year">{{ doc.year }}</span>
            <span class="col-type">
              <span class="doc-type">{{ getTypeLabel(doc.type) }}</span>
            </span>
            <span class="col-availability">
              <span 
                class="availability"
                :class="{ 'available': doc.availability === 'Свободен' }"
              >
                {{ doc.availability }}
              </span>
            </span>
            <span class="col-download">
              <button 
                v-if="doc.file_url" 
                @click.stop="downloadDocument(doc)" 
                class="download-btn"
                title="Скачать PDF"
              >
                📥 Скачать
              </button>
            </span>

          </div>
        </div>
      </div>
      
      <!-- Модальное окно документа -->
      <div v-if="dialogVisible" class="modal-overlay" @click="dialogVisible = false">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h2>{{ selectedDocument?.title }}</h2>
            <button class="close-btn" @click="dialogVisible = false">✕</button>
          </div>
          
          <div v-if="selectedDocument" class="modal-body">
            <div class="detail-row">
              <span class="detail-label">Автор:</span>
              <span>{{ selectedDocument.author }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Год:</span>
              <span>{{ selectedDocument.year }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Тип:</span>
              <span>{{ getTypeLabel(selectedDocument.type) }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Аннотация:</span>
              <p>{{ selectedDocument.annotation }}</p>
            </div>
          </div>
          
          <div class="modal-footer">
            <button class="btn-secondary" @click="dialogVisible = false">Закрыть</button>
            <button 
              class="btn-primary" 
              @click="downloadDocument(selectedDocument)"
              :disabled="!selectedDocument.file_url"
            >
              Скачать PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const searchQuery = ref('')
const selectedType = ref('')
const dialogVisible = ref(false)
const selectedDocument = ref(null)
const documents = ref([])

const loading = ref(true)

onMounted(async () => {
  try {
    documents.value = await $fetch('/api/books') || []
  } catch (e) {
    console.error('Ошибка загрузки книг:', e)
    documents.value = []
  } finally {
    loading.value = false
  }
})

const filteredDocuments = computed(() => {
  return documents.value.filter(doc => {
    const matchesSearch = !searchQuery.value || 
      (doc.title || '').toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      (doc.author || '').toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesType = !selectedType.value || 
      doc.type === selectedType.value
    
    return matchesSearch && matchesType
  })
})

function getTypeLabel(type) {
  const types = {
    'book': 'Книга',
    'article': 'Статья',
    'standard': 'Стандарт',
    'method': 'Методика'
  }
  return types[type] || type
}

function showDocument(doc) {
  selectedDocument.value = doc
  dialogVisible.value = true
}

function downloadDocument(doc) {
  if (!doc.file_url) {
    alert('Файл не прикреплён')
    return
  }
  window.open(doc.file_url, '_blank')
}

useHead({
  title: 'Библиотека - ГосНИИхиманалит',
  meta: [
    { 
      name: 'description', 
      content: 'Техническая библиотека ГосНИИхиманалит: книги, статьи, стандарты по химическому анализу' 
    }
  ]
})
</script>

<style scoped>
.kb-page {
  min-height: 100vh;
  padding: 2rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Хлебные крошки */
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 2rem;
  font-size: 14px;
}

.breadcrumb a {
  color: #005700;
  text-decoration: none;
}

.breadcrumb a:hover {
  text-decoration: underline;
}

.separator {
  color: #9ca3af;
}

.current {
  color: #6b7280;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #005700;
  margin-bottom: 2rem;
  text-align: center;
}

.kb-intro {
  font-size: 1.125rem;
  color: #4b5563;
  line-height: 1.8;
  margin-bottom: 2rem;
}

.section-subtitle {
  font-size: 1.5rem;
  font-weight: 600;
  color: #005700;
  margin: 2rem 0 1rem;
}

/* Поиск */
.search-section {
  margin-bottom: 2rem;
}

.search-input-wrapper {
  position: relative;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 18px;
}

.search-input {
  width: 100%;
  padding: 12px 12px 12px 40px;
  border: 2px solid #e5e7eb;
  border-radius: 6px;
  font-size: 16px;
  transition: border-color 0.3s;
}

.search-input:focus {
  outline: none;
  border-color: #005700;
}

.filters {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.filter-select {
  padding: 10px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 6px;
  font-size: 14px;
  min-width: 200px;
  cursor: pointer;
}

.filter-select:focus {
  outline: none;
  border-color: #005700;
}

/* Таблица документов */
.documents-table {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
}

.table-header {
  display: grid;
  grid-template-columns: 2fr 1fr 0.5fr 1fr 0.8fr 1.2fr;
  gap: 10px;
  padding: 12px 16px;
  background: var(--bg-section);
  font-weight: 600;
  color: #333;
  border-bottom: 2px solid #e5e7eb;
  text-align: center;
}

.table-row {
  display: grid;
  grid-template-columns: 2fr 1fr 0.5fr 1fr 0.8fr 1.2fr;
  gap: 10px;
  padding: 12px 16px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: background 0.2s;
  align-items: center;
  text-align: center;
}

.table-row:hover {
  background: #f0f9f0;
}

.table-row:last-child {
  border-bottom: none;
}

.col-title {
  font-weight: 500;
  color: #333;
  text-align: left;
}

.col-author,
.col-year,
.col-type,
.col-availability {
  color: #6b7280;
  font-size: 14px;
}

.doc-type {
  padding: 4px 8px;
  background: #f0f9f0;
  color: #005700;
  border-radius: 4px;
  font-size: 12px;
}

.availability {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  background: #fef3c7;
  color: #d97706;
}

.availability.available {
  background: #f0f9f0;
  color: #005700;
}

/* Модальное окно */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
}

.modal-content {
  background: #fff;
  border-radius: 8px;
  max-width: 600px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem;
  border-bottom: 1px solid #e5e7eb;
}

.modal-header h2 {
  font-size: 1.25rem;
  color: #333;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6b7280;
}

.modal-body {
  padding: 1.25rem;
}

.detail-row {
  margin-bottom: 1rem;
}

.detail-label {
  font-weight: 600;
  color: #333;
  margin-right: 8px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 1.25rem;
  border-top: 1px solid #e5e7eb;
}

.btn-secondary {
  padding: 10px 24px;
  background: #fff;
  color: #333;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
}

.btn-primary {
  padding: 10px 24px;
  background: #005700;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
}

.btn-primary:hover {
  background: #003d00;
}

.col-download {
  display: flex;
  justify-content: center;
}

.download-btn {
  padding: 6px 12px;
  background: #005700;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.3s;
}

.download-btn:hover {
  background: #003d00;
}

.btn-primary:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}

.col-download-header {
  color: #6b7280;
  font-size: 14px;
}

@media (max-width: 1024px) {
  .table-header,
  .table-row {
    grid-template-columns: 2fr 1fr 0.5fr 1fr 1.2fr;
  }
  
  .col-availability {
    display: none;
  }
}

@media (max-width: 768px) {
  .filters {
    flex-direction: column;
  }
  
  .table-header,
  .table-row {
    grid-template-columns: 2fr 1fr;
    font-size: 12px;
  }
  
  .col-year,
  .col-type,
  .col-download-header {
    display: none;
  }
  
  .page-title {
    font-size: 2rem;
  }
}
</style>