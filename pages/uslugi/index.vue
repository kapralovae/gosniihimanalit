<template>
  <div class="services-page">
    <div class="container">
      <h1 class="page-title">Услуги</h1>
      
      <p class="services-intro">
        АО «ГосНИИхиманалит» предоставляет широкий спектр услуг в области
        химического анализа, испытаний и метрологии.
      </p>
      
      <div class="services-list">
        <NuxtLink 
          v-for="service in services" 
          :key="service.path"
          :to="service.path"
          class="service-item"
        >
          <span class="service-icon">{{ service.icon }}</span>
          <div class="service-content">
            <h2 class="service-title">{{ service.title }}</h2>
            <p class="service-description">{{ service.description }}</p>
          </div>
          <span class="service-arrow">→</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const services = [
  {
    title: 'Базовая испытательно-метрологическая лаборатория (БИМЛ)',
    description: 'Комплексные испытания на воздействие климатических, механических и химических факторов',
    path: '/uslugi/ispytatelnaya-laboratory'
  },
  {
    title: 'Метрология и поверка',
    description: 'Внесение в Реестр средств измерения, первичная и периодическая поверка средств измерений, метрология',
    path: '/uslugi/metrologiya-i-poverka'
  },
  {
    title: 'Аналитическая химия',
    description: 'Химический анализ веществ и материалов',
    path: '/uslugi/analiticheskaya-himiya'
  },
  {
    title: 'Конструкторское бюро',
    description: 'Разработка и проектирование оборудования',
    path: 'konstruktorskoe-byuro/centr-razrabotki-crtshk'
  },
  {
    title: 'Стандартизация',
    description: 'Разработка стандартов и нормативных документов',
    path: '/uslugi/standartizaciya'
  },
  {
    title: 'Производство',
    description: 'Производство технических средств химического контроля',
    path: '/uslugi/proizvodstvo'
  },
  {
    title: 'Аренда',
    description: 'Аренда производственных и офисных помещений',
    path: '/uslugi/arenda'
  }
]

useHead({
  title: 'Услуги - ГосНИИХиманалит',
  meta: [
    { 
      name: 'description', 
      content: 'Услуги ГосНИИХиманалит: испытания, метрология, аналитическая химия, производство' 
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
  max-width: 900px;
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

.services-intro {
  text-align: center;
  font-size: 1.05rem;
  color: #6b7280;
  margin-bottom: 2.5rem;
}

.services-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.service-item {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 1.25rem 1.5rem;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-left: 4px solid #005700;
  border-radius: 8px;
  text-decoration: none;
  color: inherit;
  transition: all 0.25s;
}

.service-item:hover {
  border-left-color: #4cc94a;
  box-shadow: 0 4px 16px rgba(0, 87, 0, 0.1);
  transform: translateX(4px);
}

.service-icon {
  font-size: 32px;
  flex-shrink: 0;
  width: 48px;
  text-align: center;
}

.service-content {
  flex: 1;
  min-width: 0;
}

.service-title {
  font-size: 1.05rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.25rem;
}

.service-description {
  font-size: 0.9rem;
  color: #6b7280;
  line-height: 1.4;
}

.service-arrow {
  font-size: 1.25rem;
  color: #005700;
  flex-shrink: 0;
  transition: transform 0.25s;
}

.service-item:hover .service-arrow {
  transform: translateX(4px);
  color: #4cc94a;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }
  
  .service-item {
    padding: 1rem;
    gap: 12px;
  }
  
  .service-icon {
    font-size: 24px;
    width: 36px;
  }
  
  .service-title {
    font-size: 0.95rem;
  }
  
  .service-description {
    font-size: 0.85rem;
  }
}
</style>