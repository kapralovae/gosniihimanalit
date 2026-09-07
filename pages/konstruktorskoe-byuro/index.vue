<template>
  <div class="kb-page">
    <div class="container">
      <h1 class="page-title">Конструкторское бюро</h1>
      
      <p class="kb-intro">
        Конструкторское бюро АО "ГосНИИХиманалит" - центр разработки и
        проектирования технических средств химического контроля.
      </p>
      
      <!-- Разделы -->
      <div class="sections-grid">
        <NuxtLink 
          v-for="section in sections" 
          :key="section.path"
          :to="section.path"
          class="section-card"
        >
          <span class="section-icon">{{ section.icon }}</span>
          <h2>{{ section.title }}</h2>
          <p>{{ section.description }}</p>
          <span class="section-link-text">Перейти →</span>
        </NuxtLink>
      </div>
      
      <!-- Последние разработки -->
      <h2 class="section-title">Последние разработки</h2>
      <div class="developments-list">
        <div 
          v-for="development in developments" 
          :key="development.title"
          class="development-card"
        >
          <span class="development-icon">🔬</span>
          <h3>{{ development.title }}</h3>
          <p>{{ development.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const currentSlide = ref(0)
let timer = null

const sections = [
  {
    icon: '🔬',
    title: 'Центр разработки технических средств химического контроля',
    description: 'Разработка технических средств химического контроля',
    path: '/konstruktorskoe-byuro/centr-razrabotki-crtshk'
  },
  {
    icon: '📚',
    title: 'Образование и обучение',
    description: 'Обучение и повышение квалификации специалистов',
    path: '/konstruktorskoe-byuro/obrazovanie-i-obuchenie'
  },
  {
    icon: '📖',
    title: 'Библиотека',
    description: 'Техническая литература и документация',
    path: '/konstruktorskoe-byuro/biblioteka'
  },
  {
    icon: '📝',
    title: 'Полезное для инженера',
    description: 'Справочные материалы для инженеров',
    path: '/konstruktorskoe-byuro/spravochnik-inzhenera'
  },
  {
    icon: '📦',
    title: 'Библиотека 3D',
    description: '3D модели оборудования и компонентов',
    path: '/konstruktorskoe-byuro/biblioteka-3d'
  }
]

const developments = [
  {
    title: 'Новый газоанализатор',
    description: 'Разработка газоанализатора нового поколения',
    image: '/images/developments/gas-analyzer.jpg'
  },
  {
    title: 'Система мониторинга',
    description: 'Комплексная система экологического мониторинга',
    image: '/images/developments/monitoring.jpg'
  },
  {
    title: 'Портативный анализатор',
    description: 'Мобильное устройство для анализа',
    image: '/images/developments/portable.jpg'
  }
]

function nextSlide() {
  currentSlide.value = (currentSlide.value + 1) % developments.length
}

function prevSlide() {
  currentSlide.value = (currentSlide.value - 1 + developments.length) % developments.length
}

onMounted(() => {
  timer = setInterval(nextSlide, 4000)
})

onBeforeUnmount(() => {
  clearInterval(timer)
})

useHead({
  title: 'Конструкторское бюро - ГосНИИХиманалит',
  meta: [
    { 
      name: 'description', 
      content: 'Конструкторское бюро ГосНИИХиманалит: разработка, обучение, библиотека, справочники' 
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

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #005700;
  margin-bottom: 2rem;
  text-align: center;
}

.kb-intro {
  text-align: center;
  font-size: 1.125rem;
  color: #6b7280;
  margin-bottom: 3rem;
}

/* Разделы */
.sections-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-bottom: 3rem;
}

.section-card {
  text-align: center;
  padding: 2rem 1.5rem;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s;
}

.section-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 35px rgba(41, 176, 38, 0.15);
  border-color: #005700;
}

.section-icon {
  font-size: 60px;
  display: block;
  margin-bottom: 1rem;
}

.section-card h2 {
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
}

.section-card p {
  color: #6b7280;
  margin-bottom: 1rem;
  font-size: 0.875rem;
}

.section-link-text {
  color: #005700;
  font-weight: 500;
}

/* Карусель разработок */
.section-title {
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  color: #005700;
  margin: 3rem 0 2rem;
  position: relative;
}

.section-title::after {
  content: '';
  display: block;
  width: 60px;
  height: 3px;
  background: #005700;
  margin: 10px auto 0;
}

.developments-carousel {
  position: relative;
  height: 400px;
  border-radius: 8px;
  overflow: hidden;
}

.development-slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  visibility: hidden;
  transition: all 0.5s;
}

.development-slide.active {
  opacity: 1;
  visibility: visible;
}

.development-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.development-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  color: white;
  padding: 2rem;
}

.development-info h3 {
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
}

.development-info p {
  opacity: 0.9;
}

.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  background: rgba(41, 176, 38, 0.7);
  color: #fff;
  border: none;
  border-radius: 50%;
  font-size: 24px;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s;
}

.carousel-btn:hover {
  background: rgba(41, 176, 38, 1);
}

.carousel-btn.prev {
  left: 15px;
}

.carousel-btn.next {
  right: 15px;
}

.carousel-indicators {
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 10;
}

.indicator {
  width: 10px;
  height: 10px;
  background: rgba(255, 255, 255, 0.5);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s;
}

.indicator.active {
  background: #005700;
  transform: scale(1.3);
}

@media (max-width: 1024px) {
  .sections-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .sections-grid {
    grid-template-columns: 1fr;
  }
  
  .developments-carousel {
    height: 300px;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .development-info h3 {
    font-size: 1.25rem;
  }
}
</style>