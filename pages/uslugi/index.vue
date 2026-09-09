<template>
  <div class="services-page">
    <div class="container">
      <h1 class="page-title">Услуги</h1>
      
      <p class="services-intro">
        АО "ГосНИИхиманалит" предоставляет широкий спектр услуг в области
        химического анализа, испытаний и метрологии.
      </p>
      
      <div class="services-grid">
        <NuxtLink 
          v-for="service in services" 
          :key="service.path"
          :to="service.path"
          class="service-card"
        >
          <div class="service-content">
            <span class="service-icon">{{ service.icon }}</span>
            <h2 class="service-title">{{ service.title }}</h2>
            <p class="service-description">{{ service.description }}</p>
            
            <div class="service-features">
              <span 
                v-for="feature in service.features" 
                :key="feature"
                class="feature-tag"
              >
                {{ feature }}
              </span>
            </div>
            
            <span class="service-button">
              Подробнее →
            </span>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const services = [
  {
    icon: '🔬',
    title: 'Базовая испытательно-метрологическая лаборатория (БИМЛ)',
    description: 'Комплексные испытания технических средств химического контроля',
    path: '/uslugi/ispytatelnyj-centr',
    features: ['Испытания', 'Сертификация', 'Аккредитация']
  },
  {
    icon: '📏',
    title: 'Метрология и поверка',
    description: 'Поверка и калибровка средств измерений',
    path: '/uslugi/metrologiya-i-poverka',
    features: ['Поверка', 'Калибровка', 'Метрология']
  },
  {
    icon: '⚗️',
    title: 'Аналитическая химия',
    description: 'Химический анализ веществ и материалов',
    path: '/uslugi/analiticheskaya-himiya',
    features: ['Анализ', 'Исследования', 'Экспертиза']
  },
  {
    icon: '📐',
    title: 'Конструкторское бюро',
    description: 'Разработка и проектирование оборудования',
    path: '/uslugi/konstruktorskoe-byuro-1',
    features: ['Проектирование', 'Разработка', '3D моделирование']
  },
  {
    icon: '📋',
    title: 'Стандартизация',
    description: 'Разработка стандартов и нормативных документов',
    path: '/uslugi/standartizaciya',
    features: ['Стандарты', 'Нормативы', 'Документация']
  },
  {
    icon: '🏭',
    title: 'Производство',
    description: 'Производство технических средств',
    path: '/uslugi/proizvodstvo',
    features: ['Производство', 'Сборка', 'Тестирование']
  },
  {
    icon: '🔑',
    title: 'Аренда',
    description: 'Аренда оборудования для химического анализа',
    path: '/uslugi/arenda',
    features: ['Аренда', 'Прокат', 'Обслуживание']
  }
]

useHead({
  title: 'Услуги - ГосНИИхиманалит',
  meta: [
    { 
      name: 'description', 
      content: 'Услуги ГосНИИхиманалит: испытания, метрология, аналитическая химия, производство' 
    }
  ]
})
</script>

<style scoped>
.services-page {
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

.services-intro {
  text-align: center;
  font-size: 1.125rem;
  color: #6b7280;
  margin-bottom: 3rem;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.service-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s;
}

.service-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 35px rgba(41, 176, 38, 0.15);
  border-color: #005700;
}

.service-content {
  text-align: center;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
}

.service-icon {
  font-size: 60px;
  margin-bottom: 1.5rem;
}

.service-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1rem;
}

.service-description {
  color: #6b7280;
  margin-bottom: 1.5rem;
  flex: 1;
}

.service-features {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.feature-tag {
  padding: 4px 10px;
  background: #f0f9f0;
  color: #005700;
  border: 1px solid #005700;
  border-radius: 4px;
  font-size: 12px;
}

.service-button {
  margin-top: auto;
  color: #005700;
  font-weight: 500;
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
  
  .service-content {
    min-height: 250px;
  }
  
  .page-title {
    font-size: 2rem;
  }
}
</style>