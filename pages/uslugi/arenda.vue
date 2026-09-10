<template>
  <div class="arenda-page">
    <div class="container">
      <h1 class="page-title">Аренда помещений</h1>
      
      <!-- Фильтры -->
      <div class="filters">
        <button 
          type="button"
          class="filter-btn"
          :class="{ active: activeStatus === 'all' }"
          @click="activeStatus = 'all'"
        >
          Все
        </button>
        <button 
          type="button"
          class="filter-btn"
          :class="{ active: activeStatus === 'available' }"
          @click="activeStatus = 'available'"
        >
          Свободно
        </button>
        <button 
          type="button"
          class="filter-btn"
          :class="{ active: activeStatus === 'rented' }"
          @click="activeStatus = 'rented'"
        >
          Сдано
        </button>
      </div>
      
      <div v-if="loading" class="loading">Загрузка...</div>
      <div v-else-if="items.length === 0" class="empty">Помещения не найдены</div>
      
      <!-- Список помещений -->
      <div v-else class="arenda-grid">
        <div 
          v-for="item in filteredItems" 
          :key="item.id"
          class="arenda-card"
          :class="{ rented: item.status === 'rented' }"
        >
          <div class="card-image">
            <img 
              :src="item.image || '/images/arenda/placeholder.jpg'" 
              :alt="item.name"
            />
            <span class="status-badge" :class="item.status">
              {{ item.status === 'available' ? 'Свободно' : 'Сдано' }}
            </span>
          </div>
          
          <div class="card-content">
            <h3 class="card-title">{{ item.name }}</h3>
            <p class="card-description">{{ item.description }}</p>
            
            <div class="card-specs">
              <div v-if="item.area" class="spec-item">
                <span>📐</span>
                <span>{{ item.area }}</span>
              </div>
              <div v-if="item.floor" class="spec-item">
                <span>🏗️</span>
                <span>{{ item.floor }}</span>
              </div>
              <div v-if="item.ceiling_height" class="spec-item">
                <span>📏</span>
                <span>{{ item.ceiling_height }}</span>
              </div>
              <div v-if="item.power_supply" class="spec-item">
                <span>⚡</span>
                <span>{{ item.power_supply }}</span>
              </div>
            </div>
            
            <div v-if="item.features && item.features.length" class="card-features">
              <span 
                v-for="(feature, i) in item.features" 
                :key="i"
                class="feature-tag"
              >
                {{ feature }}
              </span>
            </div>
            
            <div class="card-footer">
              <span class="card-price">{{ item.price }}</span>
              <button 
                type="button"
                class="btn-primary"
                :disabled="item.status === 'rented'"
                @click="showDetails(item)"
              >
                {{ item.status === 'available' ? 'Подробнее' : 'Занято' }}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Контакты -->
      <div class="contacts-section">
        <h2 class="section-title">По вопросам аренды</h2>
        <div class="contacts-info">
          <div class="contact-item">
            <span>📞</span>
            <a href="tel:+78122522245">+7 (812) 252-22-45</a>
          </div>
          <div class="contact-item">
            <span>✉️</span>
            <a href="mailto:marketing@himanalit.ru">marketing@himanalit.ru</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const activeStatus = ref('all')
const items = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    items.value = await $fetch('/api/arenda') || []
  } catch (e) {
    console.error('Ошибка загрузки аренды:', e)
    items.value = []
  } finally {
    loading.value = false
  }
})

const filteredItems = computed(() => {
  if (activeStatus.value === 'all') {
    return items.value
  }
  return items.value.filter(item => item.status === activeStatus.value)
})

function showDetails(item) {
  alert(`Помещение: ${item.name}\nПлощадь: ${item.area}\nЦена: ${item.price}\n\n${item.description}`)
}

useHead({
  title: 'Аренда помещений - ГосНИИхиманалит',
  meta: [
    { 
      name: 'description', 
      content: 'Аренда производственных, офисных и складских помещений от АО «ГосНИИхиманалит»' 
    }
  ]
})
</script>

<style scoped>
.arenda-page {
  min-height: 100vh;
  padding: 2rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #005700;
  margin-bottom: 1rem;
  text-align: center;
}

.page-description {
  text-align: center;
  font-size: 1.125rem;
  color: #6b7280;
  margin-bottom: 2rem;
}

/* Фильтры */
.filters {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-bottom: 2rem;
}

.filter-btn {
  padding: 10px 24px;
  background: #fff;
  color: #333;
  border: 2px solid #e5e7eb;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.filter-btn:hover {
  border-color: #005700;
  color: #005700;
}

.filter-btn.active {
  background: #005700;
  color: #fff;
  border-color: #005700;
}

/* Сетка */
.arenda-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-bottom: 3rem;
}

/* Карточка */
.arenda-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s;
}

.arenda-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.arenda-card.rented {
  opacity: 0.7;
}

.card-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.status-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 4px 14px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  color: #fff;
}

.status-badge.available {
  background: #22c55e;
}

.status-badge.rented {
  background: #6b7280;
}

.card-content {
  padding: 1.25rem;
}

.card-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
}

.card-description {
  color: #6b7280;
  font-size: 14px;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.card-specs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px 16px;
  margin-bottom: 1rem;
}

.spec-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #4b5563;
}

.card-features {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 1rem;
}

.feature-tag {
  padding: 2px 10px;
  background: #f0f9f0;
  color: #005700;
  border: 1px solid #005700;
  border-radius: 4px;
  font-size: 12px;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
}

.card-price {
  font-size: 1.1rem;
  font-weight: 700;
  color: #005700;
}

.btn-primary {
  padding: 8px 20px;
  background: #005700;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-primary:hover:not(:disabled) {
  background: #003d00;
}

.btn-primary:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}

/* Контакты */
.contacts-section {
  background: #f8fafc;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #005700;
  margin-bottom: 1rem;
}

.contacts-info {
  display: flex;
  justify-content: center;
  gap: 2rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.1rem;
}

.contact-item a {
  color: #005700;
  text-decoration: none;
}

.contact-item a:hover {
  text-decoration: underline;
}

@media (max-width: 1024px) {
  .arenda-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 768px) {
  .arenda-grid {
    grid-template-columns: 1fr;
  }
  
  .contacts-info {
    flex-direction: column;
    align-items: center;
  }
}
</style>