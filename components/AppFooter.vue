<template>
  <footer class="app-footer">
    <div class="container">
      <div class="footer-grid">
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
        
        <!-- Контакты -->
        <div class="footer-col">
          <h4>Контакты</h4>
          <div class="footer-contacts">
            <div class="footer-contact-block">
              <span class="footer-contact-title">{{ contacts?.commercial_label || 'Коммерческий отдел' }}</span>
              <div v-if="contacts?.commercial_phone" class="footer-contact-item">
                <span>📞</span>
                <a :href="'tel:' + contacts.commercial_phone.replace(/[^0-9+]/g, '')" class="footer-contact-link">{{ contacts.commercial_phone }}</a>
              </div>
              <div v-if="contacts?.commercial_email" class="footer-contact-item">
                <span>✉️</span>
                <a :href="'mailto:' + contacts.commercial_email" class="footer-contact-link">{{ contacts.commercial_email }}</a>
              </div>
            </div>
            
            <div class="footer-contact-block">
              <span class="footer-contact-title">{{ contacts?.secretary_label || 'Секретарь' }}</span>
              <div v-if="contacts?.secretary_phone" class="footer-contact-item">
                <span>📞</span>
                <a :href="'tel:' + contacts.secretary_phone.replace(/[^0-9+]/g, '')" class="footer-contact-link">{{ contacts.secretary_phone }}</a>
              </div>
              <div v-if="contacts?.secretary_email" class="footer-contact-item">
                <span>✉️</span>
                <a :href="'mailto:' + contacts.secretary_email" class="footer-contact-link">{{ contacts.secretary_email }}</a>
              </div>
            </div>
            
            <div class="footer-contact-block">
              <span class="footer-contact-title">{{ contacts?.address_label || 'Адрес' }}</span>
              <div class="footer-contact-item">
                <span>📍</span>
                <span class="footer-contact-text" v-html="formatAddress(contacts?.address)"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="footer-divider"></div>
      
      <div class="footer-bottom">
        <span>© {{ new Date().getFullYear() }} {{ contacts?.site_title || 'АО «ГосНИИхиманалит»' }}. Все права защищены.</span>
      </div>
    </div>
  </footer>
</template>

<script setup>
const { data: contacts } = await useFetch('/api/contacts')

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

function formatAddress(address) {
  if (!address) {
    return '190020, Санкт-Петербург,<br>ул. Бумажная, 17'
  }
  const parts = address.split(',').map(s => s.trim())
  if (parts.length >= 3) {
    return parts[0] + ', ' + parts[1] + ',<br>' + parts.slice(2).join(', ')
  }
  if (parts.length === 2) {
    return parts[0] + ',<br>' + parts[1]
  }
  return address
}
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
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  align-items: start;
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
  gap: 15px;
}

.footer-contact-block {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.footer-contact-title {
  font-size: 12px;
  color: #9ca3af;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.footer-contact-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 14px;
  color: #d1d5db;
}

.footer-contact-link {
  color: #d1d5db;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-contact-link:hover {
  color: #4cc94a;
}

.footer-contact-text {
  color: #d1d5db;
  line-height: 1.4;
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