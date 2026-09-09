<template>
  <div class="kb-page">
    <div class="container">
      <!-- Хлебные крошки -->
      <nav class="breadcrumb">
        <NuxtLink to="/">Главная</NuxtLink>
        <span class="separator">/</span>
        <NuxtLink to="/konstruktorskoe-byuro">Конструкторское бюро</NuxtLink>
        <span class="separator">/</span>
        <span class="current">Библиотека 3D</span>
      </nav>
      
      <h1 class="page-title">Библиотека 3D моделей</h1>
      
      <div class="kb-content">
        <p class="kb-intro">
          Библиотека 3D моделей оборудования и компонентов для проектирования.
        </p>
        
        <!-- Поиск и фильтры -->
        <div class="search-section">
          <div class="search-input-wrapper">
            <span class="search-icon">🔍</span>
            <input
              v-model="searchQuery"
              type="text"
              class="search-input"
              placeholder="Поиск 3D моделей..."
            />
          </div>
          
          <div class="filters">
            <select v-model="selectedFormat" class="filter-select">
              <option value="">Все форматы</option>
              <option value="step">STEP</option>
              <option value="iges">IGES</option>
              <option value="stl">STL</option>
              <option value="dwg">DWG</option>
            </select>
            
            <select v-model="selectedCategory" class="filter-select">
              <option value="">Все категории</option>
              <option 
                v-for="category in categories" 
                :key="category"
                :value="category"
              >
                {{ category }}
              </option>
            </select>
          </div>
        </div>
        
        <!-- Сетка моделей -->
        <h2 class="section-subtitle">Доступные модели</h2>
        <div class="models-grid">
          <div 
            v-for="model in filteredModels" 
            :key="model.id"
            class="model-card"
          >
            <div class="model-preview">
              <span class="model-icon">📦</span>
              <span class="model-format">{{ model.format }}</span>
            </div>
            
            <div class="model-info">
              <h3>{{ model.name }}</h3>
              <p>{{ model.description }}</p>
              
              <div class="model-meta">
                <span class="meta-item">📄 {{ model.size }}</span>
                <span class="meta-item">⬇️ {{ model.downloads }}</span>
              </div>
              
              <div class="model-actions">
                <button 
                  type="button"
                  class="download-btn"
                  @click="downloadModel(model)"
                >
                  Скачать
                </button>
                <button 
                  type="button"
                  class="preview-btn"
                  @click="previewModel(model)"
                >
                  Просмотр
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Популярные модели -->
        <h2 class="section-subtitle">Популярные модели</h2>
        <div class="popular-list">
          <div 
            v-for="popular in popularModels" 
            :key="popular.id"
            class="popular-card"
          >
            <div class="popular-preview">
              <span class="popular-icon">📦</span>
            </div>
            <div class="popular-info">
              <h3>{{ popular.name }}</h3>
              <p>{{ popular.description }}</p>
              <div class="popular-stats">
                <span class="stat">⬇️ Скачиваний: {{ popular.downloads }}</span>
                <span class="stat rating">⭐ Рейтинг: {{ popular.rating }}/5</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Информация о форматах -->
        <h2 class="section-subtitle">Поддерживаемые форматы</h2>
        <div class="formats-grid">
          <div 
            v-for="format in formats" 
            :key="format.name"
            class="format-card"
          >
            <h4>{{ format.name }}</h4>
            <p>{{ format.description }}</p>
          </div>
        </div>
      </div>
      
      <!-- Модальное окно предпросмотра -->
      <div v-if="dialogVisible" class="modal-overlay" @click="dialogVisible = false">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h2>{{ selectedModel?.name }}</h2>
            <button class="close-btn" @click="dialogVisible = false">✕</button>
          </div>
          
          <div v-if="selectedModel" class="modal-body">
            <div class="preview-placeholder">
              <span class="preview-icon">📦</span>
              <p>3D просмотр в разработке</p>
            </div>
            
            <div class="preview-details">
              <div class="detail-row">
                <span class="detail-label">Формат:</span>
                <span>{{ selectedModel.format }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Размер:</span>
                <span>{{ selectedModel.size }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Категория:</span>
                <span>{{ selectedModel.category }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Скачиваний:</span>
                <span>{{ selectedModel.downloads }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')
const selectedFormat = ref('')
const selectedCategory = ref('')
const dialogVisible = ref(false)
const selectedModel = ref(null)

const categories = [
  'Корпуса',
  'Датчики',
  'Клапаны',
  'Соединения',
  'Электроника',
  'Механика'
]

const formats = [
  { name: 'STEP', description: 'Стандарт обмена данными 3D моделей' },
  { name: 'IGES', description: 'Формат обмена CAD данными' },
  { name: 'STL', description: 'Формат для 3D печати' },
  { name: 'DWG', description: 'Формат AutoCAD' }
]

const models = ref([
  {
    id: 1,
    name: 'Корпус газоанализатора',
    description: 'Промышленный корпус для газоанализатора',
    format: 'STEP',
    size: '2.5 MB',
    downloads: 156,
    category: 'Корпуса',
    rating: 4.8
  },
  {
    id: 2,
    name: 'Датчик кислорода',
    description: '3D модель электрохимического датчика',
    format: 'IGES',
    size: '1.2 MB',
    downloads: 98,
    category: 'Датчики',
    rating: 4.5
  },
  {
    id: 3,
    name: 'Клапан регулировочный',
    description: 'Регулировочный клапан для газовых систем',
    format: 'STEP',
    size: '3.1 MB',
    downloads: 87,
    category: 'Клапаны',
    rating: 4.6
  },
  {
    id: 4,
    name: 'Фланец соединительный',
    description: 'Соединительный фланец DN50',
    format: 'DWG',
    size: '0.8 MB',
    downloads: 234,
    category: 'Соединения',
    rating: 4.9
  },
  {
    id: 5,
    name: 'Плата контроллера',
    description: 'Печатная плата контроллера',
    format: 'STEP',
    size: '1.5 MB',
    downloads: 67,
    category: 'Электроника',
    rating: 4.3
  },
  {
    id: 6,
    name: 'Вал привода',
    description: 'Вал привода насоса',
    format: 'IGES',
    size: '0.9 MB',
    downloads: 145,
    category: 'Механика',
    rating: 4.7
  },
  {
    id: 7,
    name: 'Крышка корпуса',
    description: 'Защитная крышка для корпуса',
    format: 'STL',
    size: '0.5 MB',
    downloads: 189,
    category: 'Корпуса',
    rating: 4.4
  },
  {
    id: 8,
    name: 'Датчик температуры',
    description: 'Термопара с защитным чехлом',
    format: 'STEP',
    size: '1.1 MB',
    downloads: 112,
    category: 'Датчики',
    rating: 4.6
  }
])

const filteredModels = computed(() => {
  return models.value.filter(model => {
    const matchesSearch = !searchQuery.value || 
      model.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesFormat = !selectedFormat.value || 
      model.format.toLowerCase() === selectedFormat.value
    
    const matchesCategory = !selectedCategory.value || 
      model.category === selectedCategory.value
    
    return matchesSearch && matchesFormat && matchesCategory
  })
})

const popularModels = computed(() => {
  return [...models.value]
    .sort((a, b) => b.downloads - a.downloads)
    .slice(0, 3)
})

function downloadModel(model) {
  alert(`Модель "${model.name}" скачивается...`)
}

function previewModel(model) {
  selectedModel.value = model
  dialogVisible.value = true
}

useHead({
  title: 'Библиотека 3D - ГосНИИхиманалит',
  meta: [
    { 
      name: 'description', 
      content: 'Библиотека 3D моделей ГосНИИхиманалит: модели оборудования, датчиков, компонентов' 
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

/* Сетка моделей */
.models-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 2rem;
}

.model-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s;
}

.model-card:hover {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transform: translateY(-5px);
  border-color: #005700;
}

.model-preview {
  position: relative;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f9f0;
}

.model-icon {
  font-size: 60px;
}

.model-format {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #005700;
  color: #fff;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.model-info {
  padding: 1rem;
}

.model-info h3 {
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 14px;
}

.model-info p {
  color: #6b7280;
  font-size: 12px;
  margin-bottom: 0.75rem;
}

.model-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 12px;
  color: #6b7280;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 4px;
}

.model-actions {
  display: flex;
  gap: 8px;
}

.download-btn {
  flex: 1;
  padding: 8px;
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

.preview-btn {
  flex: 1;
  padding: 8px;
  background: #fff;
  color: #333;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.3s;
}

.preview-btn:hover {
  border-color: #005700;
  color: #005700;
}

/* Популярные модели */
.popular-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.popular-card {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 8px;
}

.popular-preview {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f9f0;
  border-radius: 8px;
  flex-shrink: 0;
}

.popular-icon {
  font-size: 40px;
}

.popular-info {
  flex: 1;
}

.popular-info h3 {
  color: #333;
  margin-bottom: 0.25rem;
  font-size: 14px;
}

.popular-info p {
  color: #6b7280;
  font-size: 12px;
  margin-bottom: 0.5rem;
}

.popular-stats {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.stat {
  font-size: 12px;
  color: #6b7280;
}

.stat.rating {
  color: #f59e0b;
}

/* Форматы */
.formats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
}

.format-card {
  text-align: center;
  padding: 1rem;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

.format-card h4 {
  color: #005700;
  margin-bottom: 0.5rem;
}

.format-card p {
  color: #6b7280;
  font-size: 12px;
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
  max-width: 500px;
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

.preview-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
  background: #f0f9f0;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.preview-icon {
  font-size: 100px;
  margin-bottom: 1rem;
}

.preview-details {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.detail-row {
  display: flex;
  gap: 8px;
}

.detail-label {
  font-weight: 600;
  color: #333;
  min-width: 120px;
}

@media (max-width: 1024px) {
  .models-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .popular-list {
    grid-template-columns: 1fr;
  }
  
  .formats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .filters {
    flex-direction: column;
  }
  
  .models-grid {
    grid-template-columns: 1fr;
  }
  
  .formats-grid {
    grid-template-columns: 1fr;
  }
  
  .page-title {
    font-size: 2rem;
  }
}
</style>