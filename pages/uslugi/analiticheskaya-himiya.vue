<template>
  <div class="service-page">
    <div class="container">
      <!-- Хлебные крошки -->
      <nav class="breadcrumb">
        <NuxtLink to="/">Главная</NuxtLink>
        <span class="separator">/</span>
        <NuxtLink to="/uslugi">Услуги</NuxtLink>
        <span class="separator">/</span>
        <span class="current">Аналитическая химия</span>
      </nav>
      
      <h1 class="page-title">Аналитическая химия</h1>
      
      <div class="service-content">
        <p class="service-intro">
          Лаборатория аналитической химии выполняет широкий спектр исследований
          химического состава веществ и материалов.
        </p>
        
        <h2 class="section-subtitle">Методы анализа</h2>
        <div class="methods-grid">
          <div 
            v-for="method in methods" 
            :key="method.title"
            class="method-card"
          >
            <div class="method-header">
              <span class="method-icon">{{ method.icon }}</span>
              <h3>{{ method.title }}</h3>
            </div>
            <p>{{ method.description }}</p>
          </div>
        </div>
        
        <h2 class="section-subtitle">Объекты анализа</h2>
        <div class="tabs">
          <div class="tab-buttons">
            <button 
              type="button"
              class="tab-btn"
              :class="{ 'active': activeTab === 'water' }"
              @click="activeTab = 'water'"
            >
              Вода
            </button>
            <button 
              type="button"
              class="tab-btn"
              :class="{ 'active': activeTab === 'air' }"
              @click="activeTab = 'air'"
            >
              Воздух
            </button>
            <button 
              type="button"
              class="tab-btn"
              :class="{ 'active': activeTab === 'soil' }"
              @click="activeTab = 'soil'"
            >
              Почва
            </button>
            <button 
              type="button"
              class="tab-btn"
              :class="{ 'active': activeTab === 'materials' }"
              @click="activeTab = 'materials'"
            >
              Материалы
            </button>
          </div>
          
          <div class="tab-content">
            <ul v-if="activeTab === 'water'" class="analysis-list">
              <li>Питьевая вода</li>
              <li>Сточные воды</li>
              <li>Природные воды</li>
              <li>Технологические воды</li>
            </ul>
            
            <ul v-if="activeTab === 'air'" class="analysis-list">
              <li>Атмосферный воздух</li>
              <li>Воздух рабочей зоны</li>
              <li>Промышленные выбросы</li>
            </ul>
            
            <ul v-if="activeTab === 'soil'" class="analysis-list">
              <li>Почвы и грунты</li>
              <li>Донные отложения</li>
              <li>Отходы производства</li>
            </ul>
            
            <ul v-if="activeTab === 'materials'" class="analysis-list">
              <li>Металлы и сплавы</li>
              <li>Полимеры</li>
              <li>Химические реактивы</li>
            </ul>
          </div>
        </div>
        
        <h2 class="section-subtitle">Оборудование</h2>
        <div class="equipment-list">
          <div 
            v-for="equipment in equipmentList" 
            :key="equipment"
            class="equipment-item"
          >
            <span class="equipment-icon">🔬</span>
            <h3>{{ equipment }}</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('water')

const methods = [
  {
    icon: '🔬',
    title: 'Хроматография',
    description: 'Газовая и жидкостная хроматография для анализа сложных смесей'
  },
  {
    icon: '⚗️',
    title: 'Спектрометрия',
    description: 'Атомно-абсорбционная и ИК-спектрометрия для определения элементного состава'
  },
  {
    icon: '🧪',
    title: 'Титриметрия',
    description: 'Классические методы количественного анализа'
  },
  {
    icon: '⚖️',
    title: 'Гравиметрия',
    description: 'Весовой анализ для определения содержания веществ'
  },
  {
    icon: '📊',
    title: 'Электрохимия',
    description: 'Потенциометрия, кондуктометрия, вольтамперометрия'
  },
  {
    icon: '🔍',
    title: 'Микроскопия',
    description: 'Оптическая и электронная микроскопия материалов'
  }
]

const equipmentList = [
  'Газовый хроматограф',
  'Жидкостный хроматограф',
  'Атомно-абсорбционный спектрометр',
  'ИК-Фурье спектрометр',
  'Масс-спектрометр'
]

useHead({
  title: 'Аналитическая химия - ГосНИИХиманалит',
  meta: [
    { 
      name: 'description', 
      content: 'Аналитическая химия в ГосНИИХиманалит: хроматография, спектрометрия, анализ воды, воздуха, почвы' 
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

/* Методы */
.methods-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 2rem;
}

.method-card {
  padding: 1.5rem;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  transition: all 0.3s;
}

.method-card:hover {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transform: translateY(-5px);
  border-color: #29b026;
}

.method-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 1rem;
}

.method-icon {
  font-size: 30px;
}

.method-header h3 {
  color: #333;
  font-size: 1.125rem;
}

.method-card p {
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
  color: #29b026;
}

.tab-btn.active {
  color: #29b026;
  border-bottom-color: #29b026;
}

.tab-content {
  padding: 1rem 0;
}

.analysis-list {
  list-style: disc;
  padding-left: 1.5rem;
}

.analysis-list li {
  margin-bottom: 0.5rem;
  color: #4b5563;
}

/* Оборудование */
.equipment-list {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 15px;
}

.equipment-item {
  text-align: center;
  padding: 1.5rem;
  background: #f0f9f0;
  border-radius: 8px;
}

.equipment-icon {
  font-size: 40px;
  display: block;
  margin-bottom: 0.5rem;
}

.equipment-item h3 {
  color: #333;
  font-size: 14px;
}

@media (max-width: 1024px) {
  .methods-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .equipment-list {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .methods-grid {
    grid-template-columns: 1fr;
  }
  
  .equipment-list {
    grid-template-columns: repeat(2, 1fr);
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
    border-left: 3px solid #29b026;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .page-title {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .equipment-list {
    grid-template-columns: 1fr;
  }
}
</style>