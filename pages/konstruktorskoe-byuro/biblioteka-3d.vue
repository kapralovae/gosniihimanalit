<template>
  <div class="kb-page">
    <div class="container">
      <!-- Хлебные крошки -->
      <nav class="breadcrumb">
        <NuxtLink to="/">Главная</NuxtLink>
        <span class="separator">/</span>
        <NuxtLink to="/konstruktorskoe-byuro">Конструкторское бюро</NuxtLink>
        <span class="separator">/</span>
        <span class="current">Библиотека 3D моделей</span>
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
              <option value="__none__">Без категории</option>
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
                  📥 Скачать
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Информация о форматах -->
        <!-- <h2 class="section-subtitle">Поддерживаемые форматы</h2>
        <div class="formats-grid">
          <div 
            v-for="format in formats" 
            :key="format.name"
            class="format-card"
          >
            <h4>{{ format.name }}</h4>
            <p>{{ format.description }}</p>
          </div>
        </div> -->
      </div>
      
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const searchQuery = ref('')
const selectedFormat = ref('')
const selectedCategory = ref('')
const models = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    models.value = await $fetch('/api/models-3d') || []
  } catch (e) {
    console.error('Ошибка загрузки 3D-моделей:', e)
    models.value = []
  } finally {
    loading.value = false
  }
})

// Динамический список категорий (уникальные значения из моделей)
const categories = computed(() => {
  const set = new Set()
  models.value.forEach(m => {
    if (m.category && m.category.trim()) set.add(m.category)
  })
  return Array.from(set).sort()
})

const formats = [
  { name: 'STEP', description: 'Стандарт обмена данными 3D моделей' },
  { name: 'IGES', description: 'Формат обмена CAD данными' },
  { name: 'STL', description: 'Формат для 3D печати' },
  { name: 'DWG', description: 'Формат AutoCAD' }
]

const filteredModels = computed(() => {
  return models.value.filter(model => {
    const matchesSearch = !searchQuery.value ||
      (model.name || '').toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      (model.description || '').toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesFormat = !selectedFormat.value ||
      (model.format || '').toLowerCase() === selectedFormat.value.toLowerCase()

    let matchesCategory = true
    if (selectedCategory.value === '__none__') {
      matchesCategory = !model.category || !model.category.trim()
    } else if (selectedCategory.value) {
      matchesCategory = model.category === selectedCategory.value
    }

    return matchesSearch && matchesFormat && matchesCategory
  })
})

async function downloadModel(model) {
  if (!model.file_url) {
    alert('Файл не прикреплён')
    return
  }

  // Открываем файл
  window.open(model.file_url, '_blank')

  // Увеличиваем счётчик в БД
  if (model.id) {
    try {
      await $fetch(`/api/models-3d/${model.id}/download`, { method: 'POST' })
      // Локально тоже увеличиваем, чтобы UI сразу обновился
      model.downloads = (model.downloads || 0) + 1
    } catch (e) {
      console.error('Ошибка счётчика:', e)
    }
  }
}

useHead({
  title: 'Библиотека 3D моделей - ГосНИИхиманалит',
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

@media (max-width: 1024px) {
  .models-grid {
    grid-template-columns: repeat(2, 1fr);
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