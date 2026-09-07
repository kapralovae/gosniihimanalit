<template>
  <footer class="app-footer">
    <div class="container">
      <div class="footer-grid">
        <!-- О компании -->
        <div class="footer-col">
          <h4>О компании</h4>
          <p class="footer-text">
            АО «ГосНИИхиманалит»<br>
            Приборы. Средства химического контроля. Услуги
          </p>
        </div>
        
        <!-- Услуги -->
        <div class="footer-col">
          <NuxtLink to="/uslugi" class="footer-title-link">
            <h4>Услуги</h4>
          </NuxtLink>
          <ul class="footer-links">
            <li v-for="service in services" :key="service.path">
              <NuxtLink :to="service.path">{{ service.title }}</NuxtLink>
            </li>
          </ul>
        </div>
        
        <!-- Конструкторское бюро -->
        <div class="footer-col">
          <NuxtLink to="/konstruktorskoe-byuro/centr-razrabotki-crtshk" class="footer-title-link">
            <h4>Конструкторское бюро</h4>
          </NuxtLink>
          <ul class="footer-links">
            <li v-for="item in kbItems" :key="item.path">
              <NuxtLink :to="item.path">{{ item.title }}</NuxtLink>
            </li>
          </ul>
        </div>
        
        <!-- О организации + Контакты -->
        <div class="footer-col">
          <NuxtLink to="/about" class="footer-title-link">
            <h4>О организации</h4>
          </NuxtLink>
          <ul class="footer-links">
            <li><NuxtLink to="/about/kontakty">Контакты</NuxtLink></li>
            <li><NuxtLink to="/about/vakansii">Вакансии</NuxtLink></li>
            <li><NuxtLink to="/about/istoriya">История</NuxtLink></li>
          </ul>
          
          <div class="footer-contacts">
            <div class="footer-contact-item">
              <span>📞</span>
              <span>+7 (812) 252-22-45</span>
            </div>
            <div class="footer-contact-item">
              <span>📞</span>
              <span>+7 (812) 786-61-59</span>
            </div>
            <div class="footer-contact-item">
              <span>✉️</span>
              <span>mail@himanalit.ru</span>
            </div>
            <div class="footer-contact-item">
              <span>📍</span>
              <span>190020, Санкт-Петербург, ул. Бумажная, 17</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="footer-divider"></div>
      
      <div class="footer-bottom">
        <span>© {{ new Date().getFullYear() }} АО «ГосНИИхиманалит». Все права защищены.</span>
      </div>
    </div>
  </footer>
</template>

<script setup>
const services = [
  { title: 'Базовая испытательно-метрологическая лаборатория (БИМЛ)', path: '/uslugi/ispytatelnyj-centr' },
  { title: 'Метрология и поверка', path: '/uslugi/metrologiya-i-poverka' },
  { title: 'Аналитическая химия', path: '/uslugi/analiticheskaya-himiya' },
  { title: 'Конструкторское бюро', path: '/uslugi/konstruktorskoe-byuro-1' },
  { title: 'Стандартизация', path: '/uslugi/standartizaciya' },
  { title: 'Производство', path: '/uslugi/proizvodstvo' },
  { title: 'Аренда', path: '/uslugi/arenda' }
]

const kbItems = [
  { title: 'Центр разработки технических средств химического контроля', path: '/konstruktorskoe-byuro/centr-razrabotki-crtshk' },
  { title: 'Образование и обучение', path: '/konstruktorskoe-byuro/obrazovanie-i-obuchenie' },
  { title: 'Библиотека', path: '/konstruktorskoe-byuro/biblioteka' },
  { title: 'Полезное для инженера', path: '/konstruktorskoe-byuro/spravochnik-inzhenera' },
  { title: 'Библиотека 3D', path: '/konstruktorskoe-byuro/biblioteka-3d' }
]
</script>

<style scoped>
.app-footer {
  background: #1f2937;
  color: #d1d5db;
  padding: 3rem 0 1rem;
  margin-top: 4rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1fr 1.5fr 1.5fr 1.5fr;
  gap: 40px;
}

.footer-col {
  min-width: 0;
}

.footer-title-link {
  text-decoration: none;
}

h4 {
  color: #fff;
  margin-bottom: 1rem;
  font-size: 1.125rem;
  transition: color 0.3s;
}

.footer-title-link:hover h4 {
  color: #4cc94a;
}

.footer-text {
  line-height: 1.6;
  font-size: 0.875rem;
}

.footer-links {
  list-style: none;
  padding: 0;
}

.footer-links li {
  margin-bottom: 0.5rem;
}

.footer-links a {
  color: #d1d5db;
  text-decoration: none;
  transition: all 0.3s;
  font-size: 14px;
}

.footer-links a:hover {
  color: #4cc94a;
  padding-left: 5px;
}

.footer-contacts {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.footer-contact-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 13px;
  color: #d1d5db;
}

.footer-divider {
  border-top: 1px solid #374151;
  margin: 2rem 0 1rem;
}

.footer-bottom {
  text-align: center;
  font-size: 14px;
  color: #9ca3af;
}

@media (max-width: 1024px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: 30px;
  }
}

@media (max-width: 768px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}
</style>