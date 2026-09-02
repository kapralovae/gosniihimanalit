<template>
  <footer class="app-footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-col">
          <h4>О компании</h4>
          <p class="footer-text">
            АО "ГосНИИХиманалит" - ведущее научно-производственное предприятие
            в области химического анализа и контроля.
          </p>
        </div>
        
        <div class="footer-col">
          <h4>Услуги</h4>
          <ul class="footer-links">
            <li v-for="service in services" :key="service.path">
              <NuxtLink :to="service.path">{{ service.title }}</NuxtLink>
            </li>
          </ul>
        </div>
        
        <div class="footer-col">
          <h4>Конструкторское бюро</h4>
          <ul class="footer-links">
            <li v-for="item in kbItems" :key="item.path">
              <NuxtLink :to="item.path">{{ item.title }}</NuxtLink>
            </li>
          </ul>
        </div>
        
        <div class="footer-col">
          <h4>Контакты</h4>
          <div class="footer-contact">
            <span>📍</span>
            <span>190000, Санкт-Петербург, ул. Примерная, д. 1</span>
          </div>
          <div class="footer-contact">
            <span>📞</span>
            <span>+7 (812) 345-67-89</span>
          </div>
          <div class="footer-contact">
            <span>✉️</span>
            <span>info@gosniihimanalit.ru</span>
          </div>
        </div>
      </div>
      
      <div class="footer-divider"></div>
      
      <div class="footer-bottom">
        <span>© {{ new Date().getFullYear() }} АО "ГосНИИХиманалит". Все права защищены.</span>
        <div class="footer-social">
          <a href="#" class="social-link" aria-label="Поделиться">🔗</a>
          <a href="#" class="social-link" aria-label="Чат">💬</a>
          <a href="#" class="social-link" aria-label="Видео">▶️</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const services = [
  { title: 'Испытательный центр', path: '/uslugi/ispytatelnyj-centr' },
  { title: 'Метрология и поверка', path: '/uslugi/metrologiya-i-poverka' },
  { title: 'Аналитическая химия', path: '/uslugi/analiticheskaya-himiya' },
  { title: 'Конструкторское бюро', path: '/uslugi/konstruktorskoe-byuro-1' },
  { title: 'Стандартизация', path: '/uslugi/standartizaciya' },
  { title: 'Производство', path: '/uslugi/proizvodstvo' },
  { title: 'Аренда', path: '/uslugi/arenda' }
]

const kbItems = [
  { title: 'Центр разработки ТСХК', path: '/konstruktorskoe-byuro/centr-razrabotki-crtshk' },
  { title: 'Образование и обучение', path: '/konstruktorskoe-byuro/obrazovanie-i-obuchenie' },
  { title: 'Библиотека', path: '/konstruktorskoe-byuro/biblioteka' },
  { title: 'Справочник инженера', path: '/konstruktorskoe-byuro/spravochnik-inzhenera' },
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
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
}

h4 {
  color: #fff;
  margin-bottom: 1rem;
  font-size: 1.125rem;
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
  transition: color 0.3s;
}

.footer-links a:hover {
  color: #60a5fa;
}

.footer-contact {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  font-size: 0.875rem;
}

.footer-divider {
  border-top: 1px solid #374151;
  margin: 2rem 0 1rem;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.footer-social {
  display: flex;
  gap: 0.5rem;
}

.social-link {
  color: #d1d5db;
  text-decoration: none;
  font-size: 1.25rem;
  transition: color 0.3s;
}

.social-link:hover {
  color: #60a5fa;
}

@media (max-width: 768px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .footer-bottom {
    flex-direction: column;
    text-align: center;
  }
}
</style>