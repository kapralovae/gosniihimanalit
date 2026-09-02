<template>
  <div class="service-page">
    <div class="container">
      <!-- Хлебные крошки -->
      <nav class="breadcrumb">
        <NuxtLink to="/">Главная</NuxtLink>
        <span class="separator">/</span>
        <NuxtLink to="/uslugi">Услуги</NuxtLink>
        <span class="separator">/</span>
        <span class="current">Конструкторское бюро</span>
      </nav>
      
      <h1 class="page-title">Конструкторское бюро</h1>
      
      <div class="service-content">
        <p class="service-intro">
          Конструкторское бюро АО "ГосНИИХиманалит" выполняет полный цикл
          проектирования и разработки технических средств химического контроля.
        </p>
        
        <h2 class="section-subtitle">Направления деятельности</h2>
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
        
        <h2 class="section-subtitle">Этапы разработки</h2>
        <div class="stages-timeline">
          <div 
            v-for="(stage, index) in stages" 
            :key="stage.title"
            class="stage-item"
          >
            <div class="stage-marker">{{ index + 1 }}</div>
            <div class="stage-content">
              <h3>{{ stage.title }}</h3>
              <p>{{ stage.description }}</p>
            </div>
          </div>
        </div>
        
        <h2 class="section-subtitle">Наши проекты</h2>
        <div class="projects-grid">
          <div 
            v-for="project in projects" 
            :key="project.title"
            class="project-card"
          >
            <div class="project-image-wrapper">
              <img 
                :src="project.image" 
                :alt="project.title"
                class="project-image"
              />
            </div>
            <div class="project-info">
              <h4>{{ project.title }}</h4>
              <p>{{ project.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const directions = [
  {
    icon: '📐',
    title: 'Проектирование',
    description: 'Разработка конструкторской документации на оборудование'
  },
  {
    icon: '💻',
    title: '3D моделирование',
    description: 'Создание трехмерных моделей и прототипов'
  },
  {
    icon: '🔧',
    title: 'Прототипирование',
    description: 'Изготовление опытных образцов'
  },
  {
    icon: '📊',
    title: 'Расчеты',
    description: 'Прочностные и гидравлические расчеты'
  },
  {
    icon: '📋',
    title: 'Документация',
    description: 'Разработка технической документации'
  },
  {
    icon: '🛠️',
    title: 'Сопровождение',
    description: 'Техническое сопровождение производства'
  }
]

const stages = [
  {
    title: 'Техническое задание',
    description: 'Анализ требований заказчика и разработка ТЗ'
  },
  {
    title: 'Эскизный проект',
    description: 'Разработка концепции и эскизного проекта'
  },
  {
    title: 'Технический проект',
    description: 'Разработка полной конструкторской документации'
  },
  {
    title: 'Изготовление образца',
    description: 'Производство опытного образца'
  },
  {
    title: 'Испытания',
    description: 'Проведение испытаний и корректировка'
  },
  {
    title: 'Запуск в производство',
    description: 'Подготовка к серийному производству'
  }
]

const projects = [
  {
    title: 'Газоанализатор ГАН-2',
    description: 'Новое поколение газоанализаторов',
    image: '/images/projects/gas-analyzer-2.jpg'
  },
  {
    title: 'Система мониторинга',
    description: 'Комплексная система контроля',
    image: '/images/projects/monitoring.jpg'
  },
  {
    title: 'Портативный анализатор',
    description: 'Мобильное устройство анализа',
    image: '/images/projects/portable.jpg'
  },
  {
    title: 'Лабораторный комплекс',
    description: 'Автоматизированная лаборатория',
    image: '/images/projects/lab.jpg'
  }
]

useHead({
  title: 'Конструкторское бюро - ГосНИИХиманалит',
  meta: [
    { 
      name: 'description', 
      content: 'Конструкторское бюро ГосНИИХиманалит: проектирование, 3D моделирование, разработка оборудования' 
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

/* Направления */
.directions-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
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
  font-size: 50px;
  display: block;
  margin-bottom: 1rem;
}

.direction-card h3 {
  color: #333;
  margin-bottom: 0.5rem;
}

.direction-card p {
  color: #6b7280;
  font-size: 14px;
}

/* Этапы */
.stages-timeline {
  position: relative;
  padding-left: 40px;
  margin-bottom: 2rem;
}

.stages-timeline::before {
  content: '';
  position: absolute;
  left: 15px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #29b026;
}

.stage-item {
  position: relative;
  margin-bottom: 1.5rem;
}

.stage-marker {
  position: absolute;
  left: -32px;
  top: 10px;
  width: 30px;
  height: 30px;
  background: #29b026;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
  border: 3px solid #fff;
  box-shadow: 0 0 0 2px #29b026;
}

.stage-content {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1rem 1.5rem;
}

.stage-content h3 {
  color: #333;
  margin-bottom: 0.5rem;
}

.stage-content p {
  color: #6b7280;
  font-size: 14px;
}

/* Проекты */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.project-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s;
}

.project-card:hover {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transform: translateY(-5px);
}

.project-image-wrapper {
  width: 100%;
  height: 150px;
  background: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.project-info {
  padding: 1rem;
  text-align: center;
}

.project-info h4 {
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 14px;
}

.project-info p {
  color: #6b7280;
  font-size: 12px;
}

@media (max-width: 1024px) {
  .directions-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .directions-grid {
    grid-template-columns: 1fr;
  }
  
  .projects-grid {
    grid-template-columns: 1fr;
  }
  
  .page-title {
    font-size: 2rem;
  }
}
</style>