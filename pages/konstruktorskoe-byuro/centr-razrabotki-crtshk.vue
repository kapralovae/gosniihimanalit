<template>
  <div class="kb-page">
    <div class="container">
      <!-- Хлебные крошки -->
      <nav class="breadcrumb">
        <NuxtLink to="/">Главная</NuxtLink>
        <span class="separator">/</span>
        <NuxtLink to="/konstruktorskoe-byuro">Конструкторское бюро</NuxtLink>
        <span class="separator">/</span>
        <span class="current">ЦРТСХК</span>
      </nav>
      
      <h1 class="page-title">Центр разработки технических средств химического контроля</h1>
      
      <div class="kb-content">
        <p class="kb-intro">
          Центр разработки технических средств химического контроля (ЦРТСХК) занимается
          созданием современных технических средств химического контроля для различных
          отраслей промышленности.
        </p>
        
        <h2 class="section-subtitle">Направления разработок</h2>
        <div class="directions-grid">
          <div 
            v-for="direction in directions" 
            :key="direction.title"
            class="direction-card"
          >
            <span class="direction-icon">{{ direction.icon }}</span>
            <h3>{{ direction.title }}</h3>
            <p>{{ direction.description }}</p>
          </div>
        </div>
        
        <h2 class="section-subtitle">Разработанные изделия</h2>
        <div class="products-table">
          <div class="table-header">
            <span class="col-name">Наименование</span>
            <span class="col-type">Тип</span>
            <span class="col-status">Статус</span>
            <span class="col-year">Год</span>
          </div>
          
          <div 
            v-for="product in products" 
            :key="product.name"
            class="table-row"
          >
            <span class="col-name">{{ product.name }}</span>
            <span class="col-type">{{ product.type }}</span>
            <span class="col-status">
              <span 
                class="status"
                :class="{ 'in-production': product.status === 'В производстве' }"
              >
                {{ product.status }}
              </span>
            </span>
            <span class="col-year">{{ product.year }}</span>
          </div>
        </div>
        
        <h2 class="section-subtitle">Процесс разработки</h2>
        <div class="steps">
          <div 
            v-for="(step, index) in steps" 
            :key="step.title"
            class="step-item"
            :class="{ 'completed': index < activeStep, 'active': index === activeStep }"
          >
            <div class="step-number">{{ index + 1 }}</div>
            <div class="step-info">
              <h4>{{ step.title }}</h4>
              <p>{{ step.description }}</p>
            </div>
          </div>
        </div>
        
        <h2 class="section-subtitle">Патенты и разработки</h2>
        <div class="patents">
          <div class="patent-group">
            <h3 class="patent-title">Патенты на изобретения</h3>
            <ul class="patent-list">
              <li>Патент № 123456 "Газоанализатор"</li>
              <li>Патент № 123457 "Способ определения концентрации"</li>
              <li>Патент № 123458 "Устройство для отбора проб"</li>
            </ul>
          </div>
          
          <div class="patent-group">
            <h3 class="patent-title">Свидетельства о регистрации</h3>
            <ul class="patent-list">
              <li>Свидетельство № 2020123456 на программу ЭВМ</li>
              <li>Свидетельство № 2020123457 на базу данных</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeStep = ref(2)

const directions = [
  {
    icon: '🔬',
    title: 'Газоанализ',
    description: 'Разработка газоанализаторов и сигнализаторов'
  },
  {
    icon: '⚗️',
    title: 'Хроматография',
    description: 'Создание хроматографического оборудования'
  },
  {
    icon: '📡',
    title: 'Сенсоры',
    description: 'Разработка датчиков и сенсоров'
  },
  {
    icon: '💻',
    title: 'Системы',
    description: 'Комплексные системы мониторинга'
  }
]

const products = [
  { name: 'Газоанализатор ГАН-1', type: 'Стационарный', status: 'В производстве', year: 2020 },
  { name: 'Газосигнализатор ГС-3', type: 'Портативный', status: 'В производстве', year: 2021 },
  { name: 'Хроматограф ХРОМ-2', type: 'Лабораторный', status: 'В производстве', year: 2022 },
  { name: 'Датчик кислорода ДК-1', type: 'Датчик', status: 'В производстве', year: 2023 },
  { name: 'Система мониторинга СМ-1', type: 'Система', status: 'Разрабатывается', year: 2024 },
  { name: 'Анализатор жидкости АЖ-1', type: 'Лабораторный', status: 'Разрабатывается', year: 2024 }
]

const steps = [
  { title: 'Исследование', description: 'Анализ требований' },
  { title: 'Проектирование', description: 'Разработка КД' },
  { title: 'Изготовление', description: 'Опытный образец' },
  { title: 'Испытания', description: 'Проверка характеристик' },
  { title: 'Производство', description: 'Серийный выпуск' }
]

useHead({
  title: 'Центр разработки ТСХК - ГосНИИХиманалит',
  meta: [
    { 
      name: 'description', 
      content: 'Центр разработки технических средств химического контроля ГосНИИХиманалит' 
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

.kb-intro {
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

/* Направления */
.directions-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 2rem;
}

.direction-card {
  text-align: center;
  padding: 1.5rem;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  transition: all 0.3s;
}

.direction-card:hover {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transform: translateY(-5px);
  border-color: #29b026;
}

.direction-icon {
  font-size: 40px;
  display: block;
  margin-bottom: 1rem;
}

.direction-card h3 {
  color: #333;
  margin-bottom: 0.5rem;
}

.direction-card p {
  color: #6b7280;
  font-size: 0.875rem;
}

/* Таблица изделий */
.products-table {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 2rem;
}

.table-header {
  display: grid;
  grid-template-columns: 2fr 1fr 1.2fr 0.5fr;
  gap: 10px;
  padding: 12px 16px;
  background: #f8fafc;
  font-weight: 600;
  color: #333;
  border-bottom: 2px solid #e5e7eb;
}

.table-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1.2fr 0.5fr;
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

.col-type,
.col-year {
  color: #6b7280;
  font-size: 14px;
}

.status {
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
  background: #fef3c7;
  color: #d97706;
}

.status.in-production {
  background: #f0f9f0;
  color: #29b026;
}

/* Процесс разработки */
.steps {
  display: flex;
  gap: 0;
  margin-bottom: 2rem;
  position: relative;
}

.step-item {
  flex: 1;
  text-align: center;
  position: relative;
  padding: 0 10px;
}

.step-number {
  width: 40px;
  height: 40px;
  background: #e5e7eb;
  color: #6b7280;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  margin: 0 auto 0.5rem;
  transition: all 0.3s;
}

.step-item.completed .step-number {
  background: #29b026;
  color: #fff;
}

.step-item.active .step-number {
  background: #1a7a1a;
  color: #fff;
  box-shadow: 0 0 0 4px rgba(41, 176, 38, 0.2);
}

.step-info h4 {
  color: #333;
  margin-bottom: 0.25rem;
  font-size: 14px;
}

.step-info p {
  color: #6b7280;
  font-size: 12px;
}

/* Патенты */
.patents {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.patent-group {
  padding: 1.5rem;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

.patent-title {
  color: #29b026;
  margin-bottom: 1rem;
  font-size: 1.125rem;
}

.patent-list {
  list-style: disc;
  padding-left: 1.5rem;
}

.patent-list li {
  margin-bottom: 0.5rem;
  color: #4b5563;
}

@media (max-width: 1024px) {
  .directions-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .patents {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .directions-grid {
    grid-template-columns: 1fr;
  }
  
  .table-header,
  .table-row {
    grid-template-columns: 2fr 1fr;
    font-size: 12px;
  }
  
  .col-status,
  .col-year {
    display: none;
  }
  
  .steps {
    flex-direction: column;
    gap: 15px;
  }
  
  .step-item {
    display: flex;
    align-items: center;
    gap: 15px;
    text-align: left;
  }
  
  .step-number {
    margin: 0;
    flex-shrink: 0;
  }
  
  .page-title {
    font-size: 1.75rem;
  }
}
</style>