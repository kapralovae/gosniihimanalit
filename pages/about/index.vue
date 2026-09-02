<template>
  <div class="about-page">
    <div class="container">
      <h1 class="page-title">О организации</h1>
      
      <div class="about-content">
        <p class="about-intro">
          АО "ГосНИИХиманалит" - одно из ведущих научно-производственных предприятий
          России в области разработки и производства технических средств химического контроля.
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
            <span class="section-link-text">
              Подробнее →
            </span>
          </NuxtLink>
        </div>
        
        <!-- Ключевые показатели -->
        <h2 class="section-title">Ключевые показатели</h2>
        <div class="stats-grid">
          <div 
            v-for="stat in stats" 
            :key="stat.label"
            class="stat-card"
          >
            <div class="stat-value">{{ stat.value }}</div>
            <div class="stat-label">{{ stat.label }}</div>
          </div>
        </div>
        
        <!-- Сертификаты -->
        <h2 class="section-title">Сертификаты и лицензии</h2>
        <div class="certificates-grid">
          <div 
            v-for="certificate in certificates" 
            :key="certificate.title"
            class="certificate-card"
          >
            <span class="certificate-icon">📄</span>
            <h4>{{ certificate.title }}</h4>
            <p>{{ certificate.number }}</p>
            <span class="certificate-status">{{ certificate.status }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const sections = [
  {
    icon: '📍',
    title: 'Контакты',
    description: 'Контактная информация и схема проезда',
    path: '/about/kontakty'
  },
  {
    icon: '👤',
    title: 'Вакансии',
    description: 'Присоединяйтесь к нашей команде',
    path: '/about/vakansii'
  },
  {
    icon: '🕐',
    title: 'История',
    description: 'История развития предприятия',
    path: '/about/istoriya'
  }
]

const stats = [
  { value: '50+', label: 'Лет опыта' },
  { value: '500+', label: 'Сотрудников' },
  { value: '1000+', label: 'Разработок' },
  { value: '100+', label: 'Патенты' }
]

const certificates = [
  {
    title: 'Аттестат аккредитации',
    number: 'RA.RU.123456',
    status: 'Действует'
  },
  {
    title: 'Лицензия на производство',
    number: 'ЛО-78-1234',
    status: 'Действует'
  },
  {
    title: 'Сертификат ISO 9001',
    number: 'ISO-2023-5678',
    status: 'Действует'
  },
  {
    title: 'Свидетельство об аттестации',
    number: 'СА-78-9012',
    status: 'Действует'
  }
]

useHead({
  title: 'О организации - ГосНИИХиманалит',
  meta: [
    { 
      name: 'description', 
      content: 'О компании ГосНИИХиманалит: история, контакты, вакансии, сертификаты' 
    }
  ]
})
</script>

<style scoped>
.about-page {
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
  color: #29b026;
  margin-bottom: 2rem;
  text-align: center;
}

.about-intro {
  text-align: center;
  font-size: 1.25rem;
  color: #4b5563;
  line-height: 1.8;
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
  border-color: #29b026;
}

.section-icon {
  font-size: 50px;
  display: block;
  margin-bottom: 1rem;
}

.section-card h2 {
  color: #333;
  margin-bottom: 0.5rem;
}

.section-card p {
  color: #6b7280;
  margin-bottom: 1rem;
}

.section-link-text {
  color: #29b026;
  font-weight: 500;
}

/* Ключевые показатели */
.section-title {
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  color: #29b026;
  margin: 3rem 0 2rem;
  position: relative;
}

.section-title::after {
  content: '';
  display: block;
  width: 60px;
  height: 3px;
  background: #29b026;
  margin: 10px auto 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 3rem;
}

.stat-card {
  text-align: center;
  padding: 2rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.stat-value {
  font-size: 2.5rem;
  font-weight: 700;
  color: #29b026;
  margin-bottom: 0.5rem;
}

.stat-label {
  color: #6b7280;
}

/* Сертификаты */
.certificates-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.certificate-card {
  text-align: center;
  padding: 1.5rem;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  transition: all 0.3s;
}

.certificate-card:hover {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transform: translateY(-5px);
}

.certificate-icon {
  font-size: 40px;
  display: block;
  margin-bottom: 1rem;
}

.certificate-card h4 {
  color: #333;
  margin-bottom: 0.5rem;
}

.certificate-card p {
  color: #6b7280;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
}

.certificate-status {
  display: inline-block;
  padding: 4px 12px;
  background: #f0f9f0;
  color: #29b026;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
}

@media (max-width: 1024px) {
  .sections-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .certificates-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .sections-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
  
  .certificates-grid {
    grid-template-columns: 1fr;
  }
  
  .stat-value {
    font-size: 1.75rem;
  }
}
</style>