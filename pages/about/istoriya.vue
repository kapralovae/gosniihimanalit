<template>
  <div class="history-page">
    <div class="container">
      <!-- Хлебные крошки -->
      <nav class="breadcrumb">
        <NuxtLink to="/">Главная</NuxtLink>
        <span class="separator">/</span>
        <NuxtLink to="/about">О организации</NuxtLink>
        <span class="separator">/</span>
        <span class="current">История</span>
      </nav>
      
      <h1 class="page-title">История предприятия</h1>
      
      <div class="history-content">
        <p class="history-intro">
          АО "ГосНИИХиманалит" имеет богатую историю развития в области
          химического анализа и контроля.
        </p>
        
        <!-- Таймлайн -->
        <div class="timeline">
          <div 
            v-for="event in historyEvents" 
            :key="event.year"
            class="timeline-item"
          >
            <div class="timeline-year">{{ event.year }}</div>
            <div class="timeline-content">
              <h2>{{ event.title }}</h2>
              <p>{{ event.description }}</p>
              
              <div v-if="event.achievements" class="achievements">
                <h4>Достижения:</h4>
                <ul>
                  <li v-for="achievement in event.achievements" :key="achievement">
                    {{ achievement }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Ключевые фигуры -->
        <h2 class="section-title">Ключевые фигуры</h2>
        <div class="people-grid">
          <div 
            v-for="person in keyPeople" 
            :key="person.name"
            class="person-card"
          >
            <div class="person-avatar">{{ person.initials }}</div>
            <h3>{{ person.name }}</h3>
            <p class="person-position">{{ person.position }}</p>
            <p class="person-years">{{ person.years }}</p>
          </div>
        </div>
        
        <!-- Награды -->
        <h2 class="section-title">Награды и достижения</h2>
        <div class="awards-grid">
          <div 
            v-for="award in awards" 
            :key="award.title"
            class="award-item"
          >
            <span class="award-icon">🏆</span>
            <h4>{{ award.title }}</h4>
            <p>{{ award.year }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const historyEvents = [
  {
    year: '1970',
    title: 'Основание института',
    description: 'Создание научно-исследовательского института химического анализа.',
    achievements: [
      'Формирование первых лабораторий',
      'Набор научных сотрудников'
    ]
  },
  {
    year: '1980',
    title: 'Расширение деятельности',
    description: 'Развитие новых направлений исследований и производства.',
    achievements: [
      'Создание испытательного центра',
      'Запуск производства газоанализаторов'
    ]
  },
  {
    year: '1990',
    title: 'Акционирование',
    description: 'Преобразование в акционерное общество.',
    achievements: [
      'Выход на международный рынок',
      'Модернизация оборудования'
    ]
  },
  {
    year: '2000',
    title: 'Новое тысячелетие',
    description: 'Внедрение современных технологий и методов.',
    achievements: [
      'Создание конструкторского бюро',
      'Разработка новых продуктов'
    ]
  },
  {
    year: '2010',
    title: 'Инновационное развитие',
    description: 'Акцент на инновации и современные разработки.',
    achievements: [
      'Запуск серийного производства',
      'Получение международных сертификатов'
    ]
  },
  {
    year: '2020',
    title: 'Современный этап',
    description: 'Цифровизация и автоматизация производства.',
    achievements: [
      'Внедрение цифровых технологий',
      'Расширение ассортимента продукции'
    ]
  }
]

const keyPeople = [
  {
    name: 'Иванов Иван Иванович',
    position: 'Основатель института',
    years: '1970-1985',
    initials: 'ИИ'
  },
  {
    name: 'Петров Петр Петрович',
    position: 'Директор института',
    years: '1985-2000',
    initials: 'ПП'
  },
  {
    name: 'Сидоров Алексей Иванович',
    position: 'Генеральный директор',
    years: '2000-2015',
    initials: 'АС'
  },
  {
    name: 'Козлов Дмитрий Сергеевич',
    position: 'Генеральный директор',
    years: '2015-настоящее время',
    initials: 'ДК'
  }
]

const awards = [
  { title: 'Премия правительства РФ', year: '2010' },
  { title: 'Знак качества', year: '2015' },
  { title: 'Лучшее предприятие отрасли', year: '2020' },
  { title: 'Инновация года', year: '2023' }
]

useHead({
  title: 'История - ГосНИИХиманалит',
  meta: [
    { 
      name: 'description', 
      content: 'История ГосНИИХиманалит: от основания в 1970 году до современного инновационного предприятия' 
    }
  ]
})
</script>

<style scoped>
.history-page {
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

.history-intro {
  text-align: center;
  font-size: 1.25rem;
  color: #4b5563;
  line-height: 1.8;
  margin-bottom: 3rem;
}

/* Таймлайн */
.timeline {
  position: relative;
  padding-left: 40px;
  margin-bottom: 3rem;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 10px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #005700;
}

.timeline-item {
  position: relative;
  margin-bottom: 2rem;
}

.timeline-item::before {
  content: '';
  position: absolute;
  left: -35px;
  top: 10px;
  width: 12px;
  height: 12px;
  background: #005700;
  border-radius: 50%;
  border: 3px solid #fff;
  box-shadow: 0 0 0 2px #005700;
}

.timeline-year {
  font-size: 1.5rem;
  font-weight: 700;
  color: #005700;
  margin-bottom: 0.5rem;
}

.timeline-content {
  background: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.timeline-content h2 {
  color: #333;
  margin-bottom: 0.5rem;
}

.timeline-content p {
  color: #4b5563;
  line-height: 1.8;
  margin-bottom: 1rem;
}

.achievements {
  background: #f0f9f0;
  padding: 1rem;
  border-radius: 4px;
}

.achievements h4 {
  color: #333;
  margin-bottom: 0.5rem;
}

.achievements ul {
  list-style: disc;
  padding-left: 1.5rem;
}

.achievements li {
  color: #6b7280;
  margin-bottom: 0.25rem;
}

/* Ключевые фигуры */
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

.people-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 3rem;
}

.person-card {
  text-align: center;
  padding: 1.5rem;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  transition: all 0.3s;
}

.person-card:hover {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transform: translateY(-5px);
}

.person-avatar {
  width: 80px;
  height: 80px;
  margin: 0 auto 1rem;
  background: #005700;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 1.5rem;
  font-weight: 600;
}

.person-card h3 {
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 1rem;
}

.person-position {
  color: #005700;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
}

.person-years {
  color: #6b7280;
  font-size: 0.875rem;
}

/* Награды */
.awards-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.award-item {
  text-align: center;
  padding: 1.5rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.award-icon {
  font-size: 40px;
  display: block;
  margin-bottom: 1rem;
}

.award-item h4 {
  color: #333;
  margin-bottom: 0.5rem;
}

.award-item p {
  color: #6b7280;
}

@media (max-width: 1024px) {
  .people-grid,
  .awards-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .people-grid,
  .awards-grid {
    grid-template-columns: 1fr;
  }
  
  .timeline {
    padding-left: 30px;
  }
  
  .timeline-item::before {
    left: -25px;
  }
  
  .page-title {
    font-size: 2rem;
  }
}
</style>