<template>
  <div class="service-page">
    <div class="container">
      <!-- Хлебные крошки -->
      <nav class="breadcrumb">
        <NuxtLink to="/">Главная</NuxtLink>
        <span class="separator">/</span>
        <NuxtLink to="/uslugi">Услуги</NuxtLink>
        <span class="separator">/</span>
        <span class="current">Аренда</span>
      </nav>
      
      <h1 class="page-title">Аренда оборудования</h1>
      
      <div class="service-content">
        <p class="service-intro">
          АО "ГосНИИХиманалит" предоставляет в аренду оборудование для
          химического анализа и контроля.
        </p>
        
        <h2 class="section-subtitle">Доступное оборудование</h2>
        <div class="equipment-grid">
          <div 
            v-for="equipment in equipmentList" 
            :key="equipment.id"
            class="equipment-card"
          >
            <div class="equipment-image-wrapper">
              <img 
                :src="equipment.image" 
                :alt="equipment.name"
                class="equipment-image"
              />
            </div>
            
            <div class="equipment-info">
              <h3>{{ equipment.name }}</h3>
              <p>{{ equipment.description }}</p>
              
              <div class="equipment-details">
                <div class="detail-item">
                  <span class="detail-label">Цена:</span>
                  <span class="detail-value">{{ equipment.price }}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Срок:</span>
                  <span class="detail-value">{{ equipment.period }}</span>
                </div>
              </div>
              
              <button 
                type="button"
                class="rent-button"
                @click="rentEquipment(equipment)"
              >
                Арендовать
              </button>
            </div>
          </div>
        </div>
        
        <h2 class="section-subtitle">Условия аренды</h2>
        <div class="conditions-grid">
          <div 
            v-for="condition in conditions" 
            :key="condition.title"
            class="condition-item"
          >
            <span class="condition-icon">{{ condition.icon }}</span>
            <h4>{{ condition.title }}</h4>
            <p>{{ condition.description }}</p>
          </div>
        </div>
        
        <h2 class="section-subtitle">Преимущества аренды</h2>
        <div class="advantages-grid">
          <div 
            v-for="advantage in advantages" 
            :key="advantage"
            class="advantage-item"
          >
            <span class="advantage-icon">✓</span>
            <span>{{ advantage }}</span>
          </div>
        </div>
      </div>
      
      <!-- Модальное окно аренды -->
      <div v-if="dialogVisible" class="modal-overlay" @click="dialogVisible = false">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h2>Заявка на аренду</h2>
            <button class="close-btn" @click="dialogVisible = false">✕</button>
          </div>
          
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label">Оборудование</label>
              <input v-model="rentForm.equipment" type="text" class="form-input" disabled />
            </div>
            <div class="form-group">
              <label class="form-label">Организация</label>
              <input v-model="rentForm.company" type="text" class="form-input" placeholder="Название организации" />
            </div>
            <div class="form-group">
              <label class="form-label">Контактное лицо</label>
              <input v-model="rentForm.contact" type="text" class="form-input" placeholder="ФИО" />
            </div>
            <div class="form-group">
              <label class="form-label">Телефон</label>
              <input v-model="rentForm.phone" type="tel" class="form-input" placeholder="+7 (___) ___-__-__" />
            </div>
            <div class="form-group">
              <label class="form-label">Срок аренды</label>
              <div class="date-range">
                <input v-model="rentForm.startDate" type="date" class="form-input" />
                <span class="date-separator">—</span>
                <input v-model="rentForm.endDate" type="date" class="form-input" />
              </div>
            </div>
          </div>
          
          <div class="modal-footer">
            <button class="btn-secondary" @click="dialogVisible = false">Отмена</button>
            <button class="btn-primary" @click="submitRent">Отправить заявку</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const dialogVisible = ref(false)

const equipmentList = [
  {
    id: 1,
    name: 'Газоанализатор ГАН-1',
    description: 'Портативный газоанализатор для контроля воздуха',
    price: '5 000 ₽/день',
    period: 'от 1 дня',
    image: '/images/equipment/gas-analyzer.jpg'
  },
  {
    id: 2,
    name: 'Хроматограф ХРОМ-2',
    description: 'Лабораторный хроматограф для анализа смесей',
    price: '15 000 ₽/день',
    period: 'от 7 дней',
    image: '/images/equipment/chromatograph.jpg'
  },
  {
    id: 3,
    name: 'Спектрометр СП-1',
    description: 'Атомно-абсорбционный спектрометр',
    price: '12 000 ₽/день',
    period: 'от 5 дней',
    image: '/images/equipment/spectrometer.jpg'
  },
  {
    id: 4,
    name: 'Датчики кислорода',
    description: 'Комплект датчиков для измерения кислорода',
    price: '1 000 ₽/день',
    period: 'от 1 дня',
    image: '/images/equipment/sensors.jpg'
  },
  {
    id: 5,
    name: 'Система мониторинга',
    description: 'Комплексная система экологического контроля',
    price: '20 000 ₽/день',
    period: 'от 30 дней',
    image: '/images/equipment/monitoring.jpg'
  },
  {
    id: 6,
    name: 'Термокамера',
    description: 'Климатическая камера для испытаний',
    price: '8 000 ₽/день',
    period: 'от 3 дней',
    image: '/images/equipment/thermal-chamber.jpg'
  }
]

const conditions = [
  { icon: '📄', title: 'Договор', description: 'Заключение договора аренды' },
  { icon: '💰', title: 'Оплата', description: 'Предоплата 100% или поэтапная' },
  { icon: '🚚', title: 'Доставка', description: 'Самовывоз или доставка' },
  { icon: '🛠️', title: 'Обслуживание', description: 'Техническая поддержка' }
]

const advantages = [
  'Экономия на покупке оборудования',
  'Возможность тестирования перед покупкой',
  'Гибкие условия аренды',
  'Техническая поддержка',
  'Обучение персонала',
  'Замена оборудования при необходимости',
  'Актуальные модели',
  'Быстрое оформление'
]

const rentForm = ref({
  equipment: '',
  company: '',
  contact: '',
  phone: '',
  startDate: '',
  endDate: ''
})

function rentEquipment(equipment) {
  rentForm.value.equipment = equipment.name
  dialogVisible.value = true
}

function submitRent() {
  dialogVisible.value = false
  alert('Заявка на аренду отправлена! Мы свяжемся с вами.')
  rentForm.value = {
    equipment: '',
    company: '',
    contact: '',
    phone: '',
    startDate: '',
    endDate: ''
  }
}

useHead({
  title: 'Аренда оборудования - ГосНИИХиманалит',
  meta: [
    { 
      name: 'description', 
      content: 'Аренда оборудования в ГосНИИХиманалит: газоанализаторы, хроматографы, спектрометры' 
    }
  ]
})
</script>

<style scoped>
.service-page {
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
  color: #29b026;
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
  color: #29b026;
  margin-bottom: 2rem;
  text-align: center;
}

.service-intro {
  font-size: 1.125rem;
  color: #4b5563;
  line-height: 1.8;
  margin-bottom: 2rem;
}

.section-subtitle {
  font-size: 1.5rem;
  font-weight: 600;
  color: #29b026;
  margin: 2rem 0 1rem;
}

/* Оборудование */
.equipment-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-bottom: 2rem;
}

.equipment-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s;
}

.equipment-card:hover {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transform: translateY(-5px);
  border-color: #29b026;
}

.equipment-image-wrapper {
  width: 100%;
  height: 180px;
  background: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.equipment-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.equipment-info {
  padding: 1.25rem;
}

.equipment-info h3 {
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 1.125rem;
}

.equipment-info p {
  color: #6b7280;
  font-size: 14px;
  margin-bottom: 1rem;
}

.equipment-details {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: #f8fafc;
  border-radius: 4px;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.detail-label {
  font-size: 12px;
  color: #6b7280;
}

.detail-value {
  font-weight: 600;
  color: #29b026;
}

.rent-button {
  width: 100%;
  padding: 12px;
  background: #29b026;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s;
}

.rent-button:hover {
  background: #1a7a1a;
}

/* Условия */
.conditions-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 2rem;
}

.condition-item {
  text-align: center;
  padding: 1.5rem;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-left: 4px solid #29b026;
  border-radius: 8px;
}

.condition-icon {
  font-size: 30px;
  display: block;
  margin-bottom: 0.5rem;
}

.condition-item h4 {
  color: #333;
  margin-bottom: 0.5rem;
}

.condition-item p {
  color: #6b7280;
  font-size: 14px;
}

/* Преимущества */
.advantages-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.advantage-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0.75rem 1rem;
  background: #f8fafc;
  border-radius: 4px;
}

.advantage-icon {
  color: #29b026;
  font-weight: 700;
  font-size: 18px;
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

.form-group {
  margin-bottom: 1rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
}

.form-input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 14px;
}

.form-input:focus {
  outline: none;
  border-color: #29b026;
}

.date-range {
  display: flex;
  align-items: center;
  gap: 10px;
}

.date-separator {
  color: #6b7280;
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
  background: #29b026;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
}

.btn-primary:hover {
  background: #1a7a1a;
}

@media (max-width: 1024px) {
  .equipment-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .conditions-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .equipment-grid {
    grid-template-columns: 1fr;
  }
  
  .conditions-grid {
    grid-template-columns: 1fr;
  }
  
  .advantages-grid {
    grid-template-columns: 1fr;
  }
  
  .date-range {
    flex-direction: column;
    gap: 5px;
  }
  
  .page-title {
    font-size: 2rem;
  }
}
</style>