<template>
  <div class="arenda-page">
    <div class="container">
      <h1 class="page-title">Аренда помещений</h1>
      
      <div v-if="loading" class="loading">Загрузка...</div>
      <div v-else-if="items.length === 0" class="empty">Помещения не найдены</div>
      
      <!-- Список помещений -->
      <div v-else class="arenda-grid">
        <div 
          v-for="item in items" 
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
                <span class="spec-label">Площадь:</span>
                <span class="spec-value">{{ item.area }}</span>
              </div>
              <div v-if="item.floor" class="spec-item">
                <span class="spec-label">Этаж:</span>
                <span class="spec-value">{{ item.floor }}</span>
              </div>
              <div v-if="item.ceiling_height" class="spec-item">
                <span class="spec-label">Потолки:</span>
                <span class="spec-value">{{ item.ceiling_height }}</span>
              </div>
              <div v-if="item.power_supply" class="spec-item">
                <span class="spec-label">Электрика:</span>
                <span class="spec-value">{{ item.power_supply }}</span>
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
                @click="showDetails(item)"
              >
                Подробнее
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
      
      <!-- Модальное окно -->
      <div v-if="dialogVisible" class="modal-overlay" @click="dialogVisible = false">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h2>{{ selectedItem?.name }}</h2>
            <button class="close-btn" @click="dialogVisible = false">✕</button>
          </div>
          
          <div v-if="selectedItem" class="modal-body">
            <!-- Картинка -->
            <div v-if="selectedItem.image" class="modal-image">
              <img :src="selectedItem.image" :alt="selectedItem.name" />
            </div>
            
            <!-- Статус -->
            <div class="modal-status">
              <span class="status-badge" :class="selectedItem.status">
                {{ selectedItem.status === 'available' ? 'Свободно' : 'Сдано' }}
              </span>
            </div>
            
            <!-- Описание -->
            <div v-if="selectedItem.description" class="modal-section">
              <h3>Описание</h3>
              <p>{{ selectedItem.description }}</p>
            </div>
            
            <!-- Характеристики -->
            <div class="modal-section">
              <h3>Характеристики</h3>
              <div class="modal-specs">
                <div v-if="selectedItem.area" class="modal-spec-item">
                  <span class="spec-label">Площадь:</span>
                  <span class="spec-value">{{ selectedItem.area }}</span>
                </div>
                <div v-if="selectedItem.floor" class="modal-spec-item">
                  <span class="spec-label">Этаж:</span>
                  <span class="spec-value">{{ selectedItem.floor }}</span>
                </div>
                <div v-if="selectedItem.ceiling_height" class="modal-spec-item">
                  <span class="spec-label">Высота потолков:</span>
                  <span class="spec-value">{{ selectedItem.ceiling_height }}</span>
                </div>
                <div v-if="selectedItem.power_supply" class="modal-spec-item">
                  <span class="spec-label">Электроснабжение:</span>
                  <span class="spec-value">{{ selectedItem.power_supply }}</span>
                </div>
              </div>
            </div>
            
            <!-- Особенности -->
            <div v-if="selectedItem.features && selectedItem.features.length" class="modal-section">
              <h3>Особенности</h3>
              <div class="modal-features">
                <span 
                  v-for="(feature, i) in selectedItem.features" 
                  :key="i"
                  class="feature-tag"
                >
                  {{ feature }}
                </span>
              </div>
            </div>
            
            <!-- Цена -->
            <div v-if="selectedItem.price" class="modal-price">
              <span class="price-label">Стоимость аренды:</span>
              <span class="price-value">{{ selectedItem.price }}</span>
            </div>
          </div>
          
          <div class="modal-footer">
            <a href="tel:+78122522245" class="btn-secondary">
              📞 Позвонить
            </a>
            <a href="mailto:marketing@himanalit.ru" class="btn-primary">
              ✉️ Запросить
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const items = ref([])
const loading = ref(true)
const dialogVisible = ref(false)
const selectedItem = ref(null)

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

function showDetails(item) {
  selectedItem.value = item
  dialogVisible.value = true
}

useHead({
  title: 'Аренда помещений - ГосНИИХиманалит',
  meta: [
    { 
      name: 'description', 
      content: 'Аренда производственных, офисных и складских помещений от АО «ГосНИИХиманалит»' 
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
  margin-bottom: 2rem;
  text-align: center;
}

.loading,
.empty {
  text-align: center;
  padding: 3rem;
  font-size: 1.25rem;
  color: #6b7280;
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
  display: flex;
  flex-direction: column;
}

.arenda-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border-color: #005700;
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
  flex: 1;
  display: flex;
  flex-direction: column;
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
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 1rem;
  padding: 12px;
  background: var(--bg-section);
  border-radius: 6px;
}

.spec-item {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
  font-size: 14px;
  padding: 4px 0;
  border-bottom: 1px dashed #e5e7eb;
}

.spec-item:last-child {
  border-bottom: none;
}

.spec-label {
  color: #6b7280;
  flex-shrink: 0;
}

.spec-value {
  color: #333;
  font-weight: 600;
  text-align: right;
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
  margin-top: auto;
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
  text-decoration: none;
  display: inline-block;
}

.btn-primary:hover {
  background: #003d00;
}

/* Контакты */
.contacts-section {
  background: var(--bg-section);
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

/* Модальное окно */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
  overflow-y: auto;
}

.modal-content {
  background: #fff;
  border-radius: 12px;
  max-width: 700px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 10;
}

.modal-header h2 {
  font-size: 1.35rem;
  color: #333;
  margin: 0;
  padding-right: 1rem;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6b7280;
  flex-shrink: 0;
  line-height: 1;
}

.close-btn:hover {
  color: #333;
}

.modal-body {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.modal-image {
  width: 100%;
  height: 300px;
  border-radius: 8px;
  overflow: hidden;
}

.modal-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.modal-status {
  display: flex;
  justify-content: flex-start;
}

.modal-status .status-badge {
  position: static;
}

.modal-section h3 {
  font-size: 1.05rem;
  font-weight: 700;
  color: #005700;
  margin-bottom: 0.5rem;
}

.modal-section p {
  color: #4b5563;
  line-height: 1.7;
  margin: 0;
}

.modal-specs {
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: var(--bg-section);
  padding: 1rem;
  border-radius: 8px;
}

.modal-spec-item {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
  font-size: 14px;
  padding-bottom: 6px;
  border-bottom: 1px dashed #e5e7eb;
}

.modal-spec-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.modal-features {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.modal-price {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.25rem;
  background: #f0f9f0;
  border-radius: 8px;
  border-left: 4px solid #005700;
}

.price-label {
  color: #6b7280;
  font-size: 14px;
}

.price-value {
  font-size: 1.25rem;
  font-weight: 700;
  color: #005700;
}

.modal-footer {
  display: flex;
  gap: 10px;
  padding: 1.25rem 1.5rem;
  border-top: 1px solid #e5e7eb;
  position: sticky;
  bottom: 0;
  background: #fff;
}

.modal-footer .btn-primary,
.modal-footer .btn-secondary {
  flex: 1;
  text-align: center;
  padding: 12px;
  border-radius: 6px;
  font-size: 15px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s;
  cursor: pointer;
}

.btn-secondary {
  background: #fff;
  color: #333;
  border: 1px solid #e5e7eb;
}

.btn-secondary:hover {
  border-color: #005700;
  color: #005700;
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
  
  .modal-image {
    height: 200px;
  }
  
  .modal-content {
    max-height: 95vh;
  }
}
</style>