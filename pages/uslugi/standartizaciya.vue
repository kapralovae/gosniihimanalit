<template>
  <div class="service-page">
    <div class="container">
      <!-- Хлебные крошки -->
      <nav class="breadcrumb">
        <NuxtLink to="/">Главная</NuxtLink>
        <span class="separator">/</span>
        <NuxtLink to="/uslugi">Услуги</NuxtLink>
        <span class="separator">/</span>
        <span class="current">Стандартизация</span>
      </nav>
      
      <h1 class="page-title">Стандартизация</h1>
      
      <div class="service-content">
        <p class="service-intro">
          АО "ГосНИИхиманалит" разрабатывает стандарты
          и нормативные документы в области химической промышленности.
        </p>
        
        <h2 class="section-subtitle">Услуги в области стандартизации</h2>
        <div class="services-grid">
          <div 
            v-for="service in services" 
            :key="service.title"
            class="service-card"
          >
            <span class="service-icon">{{ service.icon }}</span>
            <h3>{{ service.title }}</h3>
            <p>{{ service.description }}</p>
          </div>
        </div>
               
        <h2 class="section-subtitle">Нормативная документация</h2>
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

const services = [
  {
    icon: '📄',
    title: 'Разработка стандартов',
    description: 'Создание новых стандартов и нормативных документов'
  },
  {
    icon: '📝',
    title: 'Актуализация',
    description: 'Обновление существующих стандартов'
  },
  {
    icon: '🔍',
    title: 'Экспертиза',
    description: 'Экспертиза нормативной документации'
  },
  {
    icon: '⚙️',
    title: 'Методики',
    description: 'Разработка методик измерений'
  },
  {
    icon: '📁',
    title: 'Документация',
    description: 'Разработка технической документации'
  }
]

const documents = [
  {
    title: 'ГОСТы',
    content: 'Разработка и актуализация государственных стандартов'
  },
  {
    title: 'ТУ',
    content: 'Разработка технических условий на продукцию'
  },
  {
    title: 'Методики',
    content: 'Разработка методик выполнения измерений'
  }
]

function toggleDocument(title) {
  if (openDocs.value.includes(title)) {
    openDocs.value = openDocs.value.filter(d => d !== title)
  } else {
    openDocs.value.push(title)
  }
}

useHead({
  title: 'Стандартизация - ГосНИИХиманалит',
  meta: [
    { 
      name: 'description', 
      content: 'Стандартизация в ГосНИИХиманалит: разработка стандартов, технических условий, методик измерений' 
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

/* Услуги */
.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 2rem;
}

.service-card {
  text-align: center;
  padding: 1.5rem;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  transition: all 0.3s;
}

.service-card:hover {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transform: translateY(-5px);
  border-color: #005700;
}

.service-icon {
  font-size: 50px;
  display: block;
  margin-bottom: 1rem;
}

.service-card h3 {
  color: #333;
  margin-bottom: 0.5rem;
}

.service-card p {
  color: #6b7280;
  font-size: 14px;
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
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .services-grid {
    grid-template-columns: 1fr;
  }
  
  .table-header,
  .table-row {
    grid-template-columns: 1fr 1fr;
    font-size: 12px;
  }
  
  .col-year,
  .col-status {
    display: none;
  }
  
  .page-title {
    font-size: 2rem;
  }
}
</style>