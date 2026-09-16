<template>
  <div class="service-page">
    <div class="container">
      <!-- Хлебные крошки -->
      <nav class="breadcrumb">
        <NuxtLink to="/">Главная</NuxtLink>
        <span class="separator">/</span>
        <NuxtLink to="/uslugi">Услуги</NuxtLink>
        <span class="separator">/</span>
        <span class="current">Метрология и поверка</span>
      </nav>
      
      <!-- Заголовок -->
      <div class="page-header">
        <h1 class="page-title">Метрологический центр</h1>
        <p class="page-subtitle">АО «ГосНИИхиманалит» предлагает услуги:</p>
      </div>
      
      <div class="services-content">
        <!-- Услуга 1: Аттестация испытательного оборудования -->
        <div class="service-block">
          <div class="service-header">
            
            <h2 class="service-title">Аттестация испытательного оборудования</h2>
          </div>
          <ul class="service-list">
            <li>Аттестация температурных измерений (сушильных шкафов, климатических камер, муфельных печей, холодильников)</li>
            <li>Аттестация измерений давления (климатические и барокамеры)</li>
            <li>Аттестация физико-химических измерений (газодинамические установки)</li>
            <li>Аттестация электрических измерений</li>
          </ul>
          <div class="service-note">
            Аттестация проводится на основании <strong>ГОСТ Р 8.568-2017</strong> 
            «Аттестация испытательного оборудования. Основные положения».
          </div>
        </div>
        
        <!-- Услуга 2: Поверка средств измерения -->
        <div class="service-block">
          <div class="service-header">
            
            <h2 class="service-title">Поверка средств измерения</h2>
          </div>
          <p class="service-intro">
            Поверка средств измерения в соответствии с областью аккредитации российского 
            и иностранного производства:
          </p>
          <ul class="service-list">
            <li>Газоанализаторов</li>
            <li>Датчиков и первичных преобразователей состава газов</li>
            <li>Средств измерений параметров состояния воздуха рабочей зоны</li>
            <li>Сигнализаторов газоаналитических отечественных</li>
            <li>Сигнализаторов газоаналитических импортных</li>
            <li>Анализаторов-течеискателей</li>
            <li>Установок газодинамических</li>
          </ul>
        </div>
        
        <!-- Услуга 3 -->
        <div class="service-block compact">
          <div class="service-header">
            
            <h2 class="service-title">Испытание средств измерения, утверждение их типа</h2>
          </div>
        </div>
        
        <!-- Услуга 4 -->
        <div class="service-block compact">
          <div class="service-header">
            
            <h2 class="service-title">Разработка документов метрологического обеспечения</h2>
          </div>
        </div>
      </div>
      
      <!-- Контактный блок -->
      <div class="contacts-block">
        <h2 class="contacts-title">По вопросам метрологии и поверки</h2>
        <div class="contacts-info">
          <a href="tel:+78127866159" class="contact-item">
            <span class="contact-icon">📞</span>
            <span>+7 (812) 786-61-59</span>
          </a>
          <a href="mailto:mail@himanalit.ru" class="contact-item">
            <span class="contact-icon">✉️</span>
            <span>mail@himanalit.ru</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Метрология и поверка - ГосНИИХиманалит',
  meta: [
    { 
      name: 'description', 
      content: 'Метрологический центр ГосНИИХиманалит: аттестация испытательного оборудования, поверка средств измерений, утверждение типа' 
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
  max-width: 1100px;
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
  flex-wrap: wrap;
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

/* Заголовок */
.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #005700;
  margin-bottom: 0.75rem;
}

.page-subtitle {
  font-size: 1.25rem;
  color: #4b5563;
  font-weight: 500;
}

/* Секции услуг */
.services-content {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.service-block {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1.75rem;
  transition: all 0.3s;
}

.service-block:hover {
  box-shadow: 0 8px 24px rgba(0, 87, 0, 0.08);
  border-color: #005700;
}

.service-block.compact {
  padding: 1.25rem 1.75rem;
}

.service-header {
  margin-bottom: 1rem;
}


.service-title {
  font-size: 1.35rem;
  font-weight: 700;
  color: #005700;
  line-height: 1.3;
}

.service-intro {
  color: #4b5563;
  margin-bottom: 1rem;
  line-height: 1.6;
}

/* Списки */
.service-list {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
}

.service-list li {
  position: relative;
  padding: 0.5rem 0 0.5rem 1.5rem;
  color: #4b5563;
  line-height: 1.6;
  border-bottom: 1px solid #f5f5f5;
}

.service-list li:last-child {
  border-bottom: none;
}

.service-list li::before {
  content: '▸';
  position: absolute;
  left: 0;
  color: #005700;
  font-weight: bold;
  font-size: 1rem;
}

/* Примечание */
.service-note {
  margin-top: 1rem;
  padding: 1rem 1.25rem;
  background: #f0f5f0;
  border-left: 4px solid #005700;
  border-radius: 6px;
  color: #333;
  line-height: 1.6;
  font-size: 0.95rem;
}

.service-note strong {
  color: #005700;
}

/* Контакты */
.contacts-block {
  margin-top: 3rem;
  background: linear-gradient(135deg, #005700, #003d00);
  color: #fff;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
}

.contacts-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.contacts-info {
  display: flex;
  justify-content: center;
  gap: 2.5rem;
  flex-wrap: wrap;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #fff;
  text-decoration: none;
  font-size: 1.05rem;
  font-weight: 500;
  transition: opacity 0.3s;
}

.contact-item:hover {
  opacity: 0.8;
}

.contact-icon {
  font-size: 1.25rem;
}

/* Адаптив */
@media (max-width: 768px) {
  .page-title {
    font-size: 1.75rem;
  }
  
  .page-subtitle {
    font-size: 1.05rem;
  }
  
  .service-block {
    padding: 1.25rem;
  }
  
  .service-title {
    font-size: 1.1rem;
  }
  
  .service-header {
    gap: 12px;
  }
  
  .service-number {
    width: 32px;
    height: 32px;
    font-size: 0.95rem;
  }
  
  .contacts-info {
    flex-direction: column;
    gap: 1rem;
  }
  
  .contacts-block {
    padding: 1.5rem;
  }
}
</style>