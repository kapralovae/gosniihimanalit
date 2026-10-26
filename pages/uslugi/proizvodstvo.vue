<template>
  <div class="service-page">
    <div class="container">
      <!-- Хлебные крошки -->
      <nav class="breadcrumb">
        <NuxtLink to="/">Главная</NuxtLink>
        <span class="separator">/</span>
        <NuxtLink to="/uslugi">Услуги</NuxtLink>
        <span class="separator">/</span>
        <span class="current">Производство</span>
      </nav>
      
      <h1 class="page-title">Производство</h1>
      
      <div class="service-content">
        <p class="service-intro">
          Производственные мощности АО "ГосНИИхиманалит" позволяют выпускать
          широкий спектр приборов и узлов химического контроля.
        </p>
        
        <h2 class="section-subtitle">Производственные возможности</h2>
        <div class="capabilities-grid">
          <div 
            v-for="capability in capabilities" 
            :key="capability.title"
            class="capability-card"
          >
            <h3>{{ capability.title }}</h3>
            <p>{{ capability.description }}</p>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('mechanical')

const capabilities = [
  {
    title: 'Механообработка',
    description: 'Изготовление деталей на станках с ЧПУ'
  },
  {
    title: 'Сборка',
    description: 'Узловая и общая сборка изделий'
  },
  {
    title: 'Монтаж',
    description: 'Монтаж электронных компонентов'
  },
  {
    title: 'Настройка',
    description: 'Настройка и калибровка приборов'
  }
]


useHead({
  title: 'Производство - ГосНИИхиманалит',
  meta: [
    { 
      name: 'description', 
      content: 'Производство в ГосНИИхиманалит: механообработка, сборка, монтаж, настройка оборудования' 
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

/* Возможности */
.capabilities-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 2rem;
}

.capability-card {
  text-align: center;
  padding: 1.5rem;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  transition: all 0.3s;
}

.capability-card:hover {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transform: translateY(-5px);
  border-color: #005700;
}

.capability-card h3 {
  color: #333;
  margin-bottom: 0.5rem;
}

.capability-card p {
  color: #6b7280;
  font-size: 14px;
}

/* Табы */
.tabs {
  margin-bottom: 2rem;
}

.tab-buttons {
  display: flex;
  gap: 10px;
  border-bottom: 2px solid #e5e7eb;
  flex-wrap: wrap;
}

.tab-btn {
  padding: 10px 20px;
  background: transparent;
  color: #6b7280;
  border: none;
  border-bottom: 3px solid transparent;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.tab-btn:hover {
  color: #005700;
}

.tab-btn.active {
  color: #005700;
  border-bottom-color: #005700;
}

.tab-content {
  padding: 1.5rem 0;
}

.details-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.5rem;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.detail-label {
  font-weight: 600;
  color: #333;
  font-size: 14px;
}


@media (max-width: 1024px) {
  .capabilities-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .capabilities-grid {
    grid-template-columns: 1fr;
  }
  
  .details-grid {
    grid-template-columns: 1fr;
  }
  
  .table-header,
  .table-row {
    grid-template-columns: 2fr 1fr;
    font-size: 12px;
  }
  
  .col-volume,
  .col-availability {
    display: none;
  }
  
  .tab-buttons {
    flex-direction: column;
    gap: 0;
  }
  
  .tab-btn {
    text-align: left;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .tab-btn.active {
    border-left: 3px solid #005700;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .page-title {
    font-size: 2rem;
  }
}
</style>