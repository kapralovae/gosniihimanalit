<template>
  <div class="service-page">
    <div class="container">
      <!-- Хлебные крошки -->
      <nav class="breadcrumb">
        <NuxtLink to="/">Главная</NuxtLink>
        <span class="separator">/</span>
        <NuxtLink to="/uslugi">Услуги</NuxtLink>
        <span class="separator">/</span>
        <span class="current">Метрология и поверка</span>
      </nav>
      
      <h1 class="page-title">Метрология и поверка</h1>
      
      <div class="service-content">
        <p class="service-intro">
          Служба метрологии АО "ГосНИИХиманалит" выполняет поверку и калибровку
          средств измерений в соответствии с требованиями законодательства РФ.
        </p>
        
        <h2 class="section-subtitle">Виды поверки</h2>
        <div class="types-grid">
          <div 
            v-for="type in verificationTypes" 
            :key="type.title"
            class="type-card"
          >
            <span class="type-icon">{{ type.icon }}</span>
            <h3>{{ type.title }}</h3>
            <p>{{ type.description }}</p>
          </div>
        </div>
        
        <h2 class="section-subtitle">Наши услуги</h2>
        <div class="services-table">
          <div class="table-header">
            <span class="col-name">Услуга</span>
            <span class="col-duration">Срок выполнения</span>
            <span class="col-price">Стоимость</span>
            <span class="col-action">Действия</span>
          </div>
          
          <div 
            v-for="service in services" 
            :key="service.name"
            class="table-row"
          >
            <span class="col-name">{{ service.name }}</span>
            <span class="col-duration">{{ service.duration }}</span>
            <span class="col-price">{{ service.price }}</span>
            <span class="col-action">
              <button 
                type="button"
                class="order-btn"
                @click="orderService(service)"
              >
                Заказать
              </button>
            </span>
          </div>
        </div>
        
        <h2 class="section-subtitle">Документация</h2>
        <div class="documents">
          <div 
            v-for="doc in documents" 
            :key="doc.title"
            class="document-item"
          >
            <div class="document-header" @click="toggleDocument(doc.title)">
              <h3>{{ doc.title }}</h3>
              <span class="toggle">{{ openDocs.includes(doc.title) ? '−' : '+' }}</span>
            </div>
            <div v-if="openDocs.includes(doc.title)" class="document-content">
              <p>{{ doc.content }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const openDocs = ref([])

const verificationTypes = [
  {
    icon: '📏',
    title: 'Первичная поверка',
    description: 'Проводится при выпуске средств измерений'
  },
  {
    icon: '🔄',
    title: 'Периодическая поверка',
    description: 'Проводится в процессе эксплуатации'
  },
  {
    icon: '🔧',
    title: 'Внеочередная поверка',
    description: 'После ремонта или повреждения'
  },
  {
    icon: '📄',
    title: 'Калибровка',
    description: 'Определение метрологических характеристик'
  }
]

const services = [
  { name: 'Поверка газоанализаторов', duration: '5 дней', price: 'от 5 000 ₽' },
  { name: 'Поверка хроматографов', duration: '10 дней', price: 'от 15 000 ₽' },
  { name: 'Калибровка датчиков', duration: '3 дня', price: 'от 3 000 ₽' },
  { name: 'Поверка средств измерений давления', duration: '7 дней', price: 'от 8 000 ₽' },
  { name: 'Калибровка термометров', duration: '2 дня', price: 'от 2 000 ₽' }
]

const documents = [
  {
    title: 'Свидетельство об аккредитации',
    content: 'Метрологическая служба аккредитована в соответствии с требованиями...'
  },
  {
    title: 'Область аккредитации',
    content: 'Перечень средств измерений, подлежащих поверке и калибровке...'
  },
  {
    title: 'Положение о метрологической службе',
    content: 'Основные положения и регламент работы метрологической службы...'
  }
]

function toggleDocument(title) {
  if (openDocs.value.includes(title)) {
    openDocs.value = openDocs.value.filter(d => d !== title)
  } else {
    openDocs.value.push(title)
  }
}

function orderService(service) {
  alert(`Заявка на "${service.name}" принята!`)
}

useHead({
  title: 'Метрология и поверка - ГосНИИХиманалит',
  meta: [
    { 
      name: 'description', 
      content: 'Метрология и поверка в ГосНИИХиманалит: поверка газоанализаторов, калибровка средств измерений' 
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

.service-intro {
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

/* Виды поверки */
.types-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 2rem;
}

.type-card {
  text-align: center;
  padding: 1.5rem;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  transition: all 0.3s;
}

.type-card:hover {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transform: translateY(-5px);
  border-color: #005700;
}

.type-icon {
  font-size: 40px;
  display: block;
  margin-bottom: 1rem;
}

.type-card h3 {
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 16px;
}

.type-card p {
  color: #6b7280;
  font-size: 14px;
}

/* Таблица услуг */
.services-table {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 2rem;
}

.table-header {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 0.8fr;
  gap: 10px;
  padding: 12px 16px;
  background: #f8fafc;
  font-weight: 600;
  color: #333;
  border-bottom: 2px solid #e5e7eb;
}

.table-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 0.8fr;
  gap: 10px;
  padding: 12px 16px;
  border-bottom: 1px solid #f0f0f0;
  align-items: center;
}

.table-row:last-child {
  border-bottom: none;
}

.table-row:nth-child(even) {
  background: #fafafa;
}

.col-name {
  font-weight: 500;
  color: #333;
}

.col-duration,
.col-price {
  color: #6b7280;
  font-size: 14px;
}

.order-btn {
  padding: 8px 16px;
  background: #005700;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.3s;
}

.order-btn:hover {
  background: #003d00;
}

/* Документация */
.documents {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.document-item {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
}

.document-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  cursor: pointer;
  transition: background 0.3s;
}

.document-header:hover {
  background: #f0f9f0;
}

.document-header h3 {
  color: #333;
  font-size: 16px;
}

.toggle {
  font-size: 24px;
  color: #005700;
  font-weight: 700;
}

.document-content {
  padding: 1rem 1.5rem;
  border-top: 1px solid #e5e7eb;
}

.document-content p {
  color: #6b7280;
}

@media (max-width: 1024px) {
  .types-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .types-grid {
    grid-template-columns: 1fr;
  }
  
  .table-header,
  .table-row {
    grid-template-columns: 2fr 1fr;
    font-size: 12px;
  }
  
  .col-price,
  .col-action {
    display: none;
  }
  
  .page-title {
    font-size: 2rem;
  }
}
</style>