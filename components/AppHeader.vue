<template>
  <div class="header-wrapper">
    <!-- Навигация (закреплена вверху) -->
    <div class="nav-wrapper">
      <div class="container">
        <nav class="main-nav">
          <!-- Бургер для мобильных -->
          <button class="burger-menu" @click="mobileMenuOpen = !mobileMenuOpen">
            <span :class="{ 'burger-line': true, 'open': mobileMenuOpen }"></span>
            <span :class="{ 'burger-line': true, 'open': mobileMenuOpen }"></span>
            <span :class="{ 'burger-line': true, 'open': mobileMenuOpen }"></span>
          </button>
          
          <!-- Десктопная навигация -->
          <div class="desktop-nav">
            <NuxtLink to="/" class="nav-link" :class="{ 'active': $route.path === '/' }">
              Главная
            </NuxtLink>
            
            <NuxtLink to="/produkciya" class="nav-link" :class="{ 'active': $route.path === '/produkciya' }">
              Продукция
            </NuxtLink>
            
            <!-- Услуги -->
            <div class="nav-item has-dropdown">
              <NuxtLink 
                to="/uslugi" 
                class="nav-link"
                :class="{ 'active': $route.path.startsWith('/uslugi') }"
              >
                Услуги <span class="arrow">▼</span>
              </NuxtLink>
              <div class="dropdown-menu">
                <NuxtLink v-for="service in services" :key="service.path" :to="service.path" class="dropdown-item">
                  {{ service.title }}
                </NuxtLink>
              </div>
            </div>
            
            <!-- Конструкторское бюро -->
            <div class="nav-item has-dropdown">
              <NuxtLink 
                to="/konstruktorskoe-byuro/centr-razrabotki-crtshk" 
                class="nav-link"
                :class="{ 'active': $route.path.startsWith('/konstruktorskoe-byuro') }"
              >
                Конструкторское бюро <span class="arrow">▼</span>
              </NuxtLink>
              <div class="dropdown-menu">
                <NuxtLink to="/konstruktorskoe-byuro/centr-razrabotki-crtshk" class="dropdown-item">
                  Центр разработки технических средств химического контроля
                </NuxtLink>
                
                <!-- Полезное для инженера с подменю -->
                <div class="dropdown-submenu">
                  <NuxtLink to="/konstruktorskoe-byuro/spravochnik-inzhenera" class="dropdown-item">
                    Полезное для инженера <span class="arrow-right">›</span>
                  </NuxtLink>
                  <div class="submenu">
                    <NuxtLink 
                      :to="{ path: '/konstruktorskoe-byuro/spravochnik-inzhenera', query: { tab: 'calculators' } }" 
                      class="dropdown-item"
                    >
                      Калькуляторы
                    </NuxtLink>
                    <NuxtLink 
                      :to="{ path: '/konstruktorskoe-byuro/spravochnik-inzhenera', query: { tab: 'tables' } }" 
                      class="dropdown-item"
                    >
                      Справочные таблицы
                    </NuxtLink>
                    <NuxtLink 
                      :to="{ path: '/konstruktorskoe-byuro/spravochnik-inzhenera', query: { tab: 'formulas' } }" 
                      class="dropdown-item"
                    >
                      Формулы
                    </NuxtLink>
                  </div>
                </div>
                
                <NuxtLink to="/konstruktorskoe-byuro/biblioteka" class="dropdown-item">
                  Электронная библиотека
                </NuxtLink>
                <NuxtLink to="/konstruktorskoe-byuro/biblioteka-3d" class="dropdown-item">
                  Библиотека 3D моделей
                </NuxtLink>
              </div>
            </div>
            
            <!-- Об организации -->
            <div class="nav-item has-dropdown">
              <NuxtLink 
                to="/about/kontakty"  
                class="nav-link"
                :class="{ 'active': $route.path.startsWith('/about') }"
              >
                Об организации <span class="arrow">▼</span>
              </NuxtLink>
              <div class="dropdown-menu">
                <NuxtLink to="/about/kontakty" class="dropdown-item">Контакты</NuxtLink>
                <NuxtLink to="/about/vakansii" class="dropdown-item">Вакансии</NuxtLink>
                <NuxtLink to="/about/istoriya" class="dropdown-item">История</NuxtLink>
              </div>
            </div>
          </div>
        </nav>
      </div>
      
      <!-- Мобильное меню -->
      <div v-if="mobileMenuOpen" class="mobile-menu">
        <NuxtLink to="/" class="mobile-link" @click="mobileMenuOpen = false">
          Главная
        </NuxtLink>
        <NuxtLink to="/produkciya" class="mobile-link" @click="mobileMenuOpen = false">
          Продукция
        </NuxtLink>
        
        <div class="mobile-group">
          <NuxtLink to="/uslugi" class="mobile-link mobile-group-title" @click="mobileMenuOpen = false">
            Услуги
          </NuxtLink>
          <NuxtLink 
            v-for="service in services" 
            :key="service.path"
            :to="service.path" 
            class="mobile-link sub"
            @click="mobileMenuOpen = false"
          >
            {{ service.title }}
          </NuxtLink>
        </div>
        
        <div class="mobile-group">
          <NuxtLink to="/konstruktorskoe-byuro/centr-razrabotki-crtshk" class="mobile-link mobile-group-title" @click="mobileMenuOpen = false">
            Конструкторское бюро
          </NuxtLink>
          
          <NuxtLink to="/konstruktorskoe-byuro/centr-razrabotki-crtshk" class="mobile-link sub" @click="mobileMenuOpen = false">
            Центр разработки технических средств химического контроля
          </NuxtLink>
          
          <NuxtLink to="/konstruktorskoe-byuro/spravochnik-inzhenera" class="mobile-link sub" @click="mobileMenuOpen = false">
            Полезное для инженера
          </NuxtLink>
          
          <NuxtLink to="/konstruktorskoe-byuro/spravochnik-inzhenera?tab=calculators" class="mobile-link sub2" @click="mobileMenuOpen = false">
            Калькуляторы
          </NuxtLink>
          <NuxtLink to="/konstruktorskoe-byuro/spravochnik-inzhenera?tab=tables" class="mobile-link sub2" @click="mobileMenuOpen = false">
            Справочные таблицы
          </NuxtLink>
          <NuxtLink to="/konstruktorskoe-byuro/spravochnik-inzhenera?tab=formulas" class="mobile-link sub2" @click="mobileMenuOpen = false">
            Формулы
          </NuxtLink>
          
          <NuxtLink to="/konstruktorskoe-byuro/biblioteka" class="mobile-link sub" @click="mobileMenuOpen = false">
            Библиотека
          </NuxtLink>
          <NuxtLink to="/konstruktorskoe-byuro/biblioteka-3d" class="mobile-link sub" @click="mobileMenuOpen = false">
            Библиотека 3D моделей
          </NuxtLink>
        </div>
        
        <div class="mobile-group">
          <NuxtLink to="/about/kontakty"  class="mobile-link mobile-group-title" @click="mobileMenuOpen = false">
            Об организации
          </NuxtLink>
          <NuxtLink to="/about/kontakty" class="mobile-link sub" @click="mobileMenuOpen = false">
            Контакты
          </NuxtLink>
          <NuxtLink to="/about/vakansii" class="mobile-link sub" @click="mobileMenuOpen = false">
            Вакансии
          </NuxtLink>
          <NuxtLink to="/about/istoriya" class="mobile-link sub" @click="mobileMenuOpen = false">
            История
          </NuxtLink>
        </div>
      </div>
    </div>
    
    <!-- Логотип и контакты (прокручиваются) -->
    
    <div class="header-main">
      <div class="container">
        <div class="header-main-inner">
          <div class="logo">
            <NuxtLink to="/" class="logo-image">
              <img src="/images/himanalit_gerb.webp" alt="Герб">
              <span class="sparkle sparkle-1"></span>
              <span class="sparkle sparkle-2"></span>
              <span class="sparkle sparkle-3"></span>
              <span class="sparkle sparkle-4"></span>
              <span class="sparkle sparkle-5"></span>
            </NuxtLink>
            <div class="logo-text">
              <span class="company-parent">ГК «Ростех»</span>
              <span class="company-name">{{ contacts?.site_title || 'АО «Государственный научно-исследовательский химико-аналитический институт»' }}</span>
              <span class="company-subtitle">{{ contacts?.hero_title || 'Приборы. Химический контроль. Услуги' }}</span>
            </div>
          </div>
          
          <div class="header-contacts">
            <div class="contacts-row">
              <!-- Коммерческий отдел -->
              <div class="contact-block">
                <span class="contact-icon">📞</span>
                <div class="contact-text">
                  <span class="contact-label">{{ contacts?.commercial_label || 'Коммерческий отдел' }}:</span>
                  <a v-if="contacts?.commercial_phone" :href="'tel:' + contacts.commercial_phone.replace(/[^0-9+]/g, '')" class="contact-value">
                    {{ contacts.commercial_phone }}
                  </a>
                  <a v-if="contacts?.commercial_email" :href="'mailto:' + contacts.commercial_email" class="contact-value contact-email">
                    {{ contacts.commercial_email }}
                  </a>
                </div>
              </div>
              
              <!-- Секретарь -->
              <div class="contact-block">
                <span class="contact-icon">📞</span>
                <div class="contact-text">
                  <span class="contact-label">{{ contacts?.secretary_label || 'Секретарь' }}:</span>
                  <a v-if="contacts?.secretary_phone" :href="'tel:' + contacts.secretary_phone.replace(/[^0-9+]/g, '')" class="contact-value">
                    {{ contacts.secretary_phone }}
                  </a>
                  <a v-if="contacts?.secretary_email" :href="'mailto:' + contacts.secretary_email" class="contact-value contact-email">
                    {{ contacts.secretary_email }}
                  </a>
                </div>
              </div>
            </div>
            
            <!-- Адрес -->
            <div v-if="contacts?.show_address != 0" class="contact-block contact-address">
              <span class="contact-icon">📍</span>
              <div class="contact-text">
                <span class="contact-label">{{ contacts?.address_label || 'Адрес' }}:</span>
                <span class="contact-value" v-html="formatAddress(contacts?.address, isMobile)"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const isMobile = ref(false)

function checkMobile() {
  isMobile.value = window.innerWidth <= 768
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkMobile)
})

const mobileMenuOpen = ref(false)

const { data: contacts } = await useFetch('/api/contacts')

const services = [
  { title: 'Испытательная лаборатория', path: '/uslugi/ispytatelnaya-laboratory' },
  { title: 'Метрология и поверка средств измерений', path: '/uslugi/metrologiya-i-poverka' },
  { title: 'Аналитическая химия', path: '/uslugi/analiticheskaya-himiya' },
  { title: 'Разработка приборов и систем', path: '/konstruktorskoe-byuro' },
  { title: 'Разработка стандартов', path: '/uslugi/standartizaciya' },
  { title: 'Производство', path: '/uslugi/proizvodstvo' },
  { title: 'Аренда', path: '/uslugi/arenda' }
]

const kbItems = [
  { title: 'Центр разработки технических средств химического контроля', path: '/konstruktorskoe-byuro/centr-razrabotki-crtshk' },
  { title: 'Электронная библиотека', path: '/konstruktorskoe-byuro/biblioteka' },
  { title: 'Полезное для инженера', path: '/konstruktorskoe-byuro/spravochnik-inzhenera' },
  { title: 'Библиотека 3D моделей', path: '/konstruktorskoe-byuro/biblioteka-3d' }
]

function formatAddress(address, isMobile = false) {
  const br = isMobile ? ' ' : '<br>'
  
  if (!address) {
    return `190020, Санкт-Петербург,${br}ул. Бумажная, 17`
  }
  
  // Разбиваем по запятым
  const parts = address.split(',').map(s => s.trim())
  
  // Если 3+ части: "индекс, город, улица" → переносим после города
  if (parts.length >= 3) {
    return parts[0] + ', ' + parts[1] + ',' + br + parts.slice(2).join(', ')
  }
  
  // Если 2 части: "индекс, всё остальное" → переносим после индекса
  if (parts.length === 2) {
    return parts[0] + ',' + br + parts[1]
  }
  
  return address
}

</script>

<style scoped>
/* ============================================
   1. БАЗОВЫЕ СТИЛИ
   ============================================ */
.header-wrapper {
  background: #fff;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* ============================================
   2. НАВИГАЦИЯ
   ============================================ */
.nav-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: #005700;
  border-bottom: 3px solid #003d00;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.main-nav {
  display: flex;
  align-items: stretch;
}

.burger-menu {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 15px;
}

.burger-line {
  width: 25px;
  height: 3px;
  background: #fff;
  border-radius: 2px;
  transition: all 0.3s;
}

.burger-line.open:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}

.burger-line.open:nth-child(2) {
  opacity: 0;
}

.burger-line.open:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}

.desktop-nav {
  display: flex;
  align-items: stretch;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 14px 20px;
  color: #fff;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s;
  white-space: nowrap;
}

.nav-link:hover {
  background: #003d00;
}

.nav-link.active {
  background: #003d00;
  box-shadow: inset 0 -3px 0 #fff;
}

.arrow {
  font-size: 12px;
}

.nav-item {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 250px;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0 0 8px 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  padding: 8px 0;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s;
  z-index: 1001;
}

.nav-item:hover .dropdown-menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-item {
  display: block;
  padding: 12px 24px;
  color: #333;
  text-decoration: none;
  transition: all 0.2s;
  white-space: nowrap;
}

.dropdown-item:hover {
  background: #f0f9f0;
  color: #005700;
  padding-left: 32px;
}

.dropdown-submenu {
  position: relative;
}

.submenu {
  position: absolute;
  top: 0;
  left: 100%;
  min-width: 200px;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  padding: 8px 0;
  opacity: 0;
  visibility: hidden;
  transform: translateX(-10px);
  transition: all 0.3s;
  z-index: 1002;
}

.dropdown-submenu:hover .submenu {
  opacity: 1;
  visibility: visible;
  transform: translateX(0);
}

.arrow-right {
  margin-left: auto;
  font-size: 14px;
}

/* ============================================
   3. МОБИЛЬНОЕ МЕНЮ
   ============================================ */
.mobile-menu {
  display: none;
  background: #fff;
  border-top: 1px solid #e5e7eb;
  padding: 10px 0;
  max-height: calc(100vh - 50px);
  overflow-y: auto;
}

.mobile-link {
  display: block;
  padding: 12px 20px;
  color: #333;
  text-decoration: none;
  font-size: 16px;
  transition: all 0.2s;
}

.mobile-link:hover {
  background: #f0f9f0;
  color: #005700;
}

.mobile-link.sub {
  padding-left: 35px;
  font-size: 14px;
  color: #6b7280;
}

.mobile-link.sub2 {
  padding-left: 50px;
  font-size: 13px;
  color: #9ca3af;
}

.mobile-group {
  border-bottom: 1px solid #f0f0f0;
  padding: 5px 0;
}

.mobile-group-title {
  display: block;
  padding: 10px 20px;
  font-weight: 600;
  color: #005700;
  font-size: 16px;
}

/* ============================================
   4. ЛОГОТИП И КОНТАКТЫ (DESKTOP)
   ============================================ */
.header-main {
  padding: 15px 0;
  background: #e5e4e2;
  border-bottom: 1px solid #e5e7eb;
}

.header-main-inner {
  margin-top: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  flex-shrink: 0;
}

.logo-image {
  width: 160px;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  position: relative;
  overflow: hidden;
}

/* ============================================
   ЭФФЕКТ 1: БЛИК (shine)
   ============================================ */
/* .logo-image::before {
  content: '';
  position: absolute;
  top: 0;
  left: -150%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    120deg,
    transparent 30%,
    rgba(255, 255, 255, 0.7) 50%,
    transparent 70%
  );
  animation: shine 15s ease-in-out infinite;
  pointer-events: none;
  z-index: 5;
}

@keyframes shine {
  0% {
    left: -150%;
  }
  50%, 100% {
    left: 150%;
  }
} */

/* ============================================
   ЭФФЕКТ 2: ЗВЁЗДОЧКИ (sparkle)
   ============================================ */
.sparkle {
  position: absolute;
  width: 4px;
  height: 4px;
  opacity: 0;
  pointer-events: none;
  animation: sparkle 6s ease-in-out infinite;
  z-index: 10;
}

.sparkle::before,
.sparkle::after {
  content: '';
  position: absolute;
  background: #f3db02;
  box-shadow: 0 0 6px 2px rgba(255, 255, 255, 0.9);
}

/* Вертикальная линия */
.sparkle::before {
  top: 0;
  left: 50%;
  width: 1px;
  height: 100%;
  transform: translateX(-50%);
}

/* Горизонтальная линия */
.sparkle::after {
  top: 50%;
  left: 0;
  width: 100%;
  height: 1px;
  transform: translateY(-50%);
}

/* Позиции звёздочек */
.sparkle-1 { top: 30%; left: 41%; animation-delay: 0s; }
.sparkle-2 { top: 30%; right: 41%; animation-delay: 0s; }
.sparkle-3 { top: 73%; left: 42%; animation-delay: 3s; }
.sparkle-4 { top: 73%; right: 42%; animation-delay: 5s; }
.sparkle-5 { top: 73%; left: 48%; animation-delay: 4s; }

@keyframes sparkle {
  0%, 100% {
    opacity: 0;
    transform: scale(0) rotate(0deg);
  }
  50% {
    opacity: 1;
    transform: scale(1.5) rotate(90deg);
  }
}

.logo-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}


.logo-text {
  display: flex;
  flex-direction: column;
  max-width: 550px;
}

.company-parent {
  font-size: 16px;
  color: #6b7280;
  font-weight: 600;
  line-height: 1.2;
  margin-bottom: 2px;
  text-transform: none;
}

.company-name {
  font-size: 22px;
  font-weight: 700;
  line-height: 1.2;
  white-space: normal;

  /* Градиент по тексту */
  background: linear-gradient(
    90deg,
    #005700 0%,
    #00a300 25%,
    #0fdf0f 50%,
    #00a300 75%,
    #005700 100%
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;  /* для Safari */

  /* Анимация бегущего градиента */
  animation: gradientShift 8s linear infinite reverse;
}

@keyframes gradientShift {
  to { background-position: 200% center; }
}

.company-subtitle {
  font-size: 14px;
  color: #6b7280;
}

/* Контакты — в ряд на десктопе */
.header-contacts {
  display: flex;
  gap: 25px;
  align-items: flex-start;
}

.contacts-row {
  display: flex;
  gap: 25px;
}

.contact-block {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.contact-icon {
  font-size: 22px;
  flex-shrink: 0;
  margin-top: 2px;
}

.contact-text {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.contact-label {
  font-size: 13px;
  color: #6b7280;
  font-weight: 600;
}

.contact-value {
  font-size: 15px;
  font-weight: 500;
  color: #333;
  text-decoration: none;
  line-height: 1.4;
}

a.contact-value:hover {
  color: #005700;
}

/* ============================================
   5. АДАПТИВ
   ============================================ */
@media (max-width: 768px) {
  .container {
    padding: 0 15px;
  }
  
  .burger-menu {
    display: flex;
  }
  
  .desktop-nav {
    display: none;
  }
  
  .mobile-menu {
    display: block;
  }
  
  /* Логотип по центру */
  .header-main-inner {
    margin-top: 50px;
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }
  
  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
  }
  
  .logo-image {
    width: 50px;
    height: 50px;
    flex-shrink: 0;
  }
  
  .logo-text {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  
  .company-name {
    font-size: 15px;
  }
  
  .company-subtitle {
    font-size: 10px;
  }
  
  /* Контакты — flex-вертикально */
  .header-contacts {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    align-items: stretch;
  }
  
  /* Ряд из 2 блоков (коммерческий + секретарь) */
  .contacts-row {
    display: flex;
    flex-direction: row;
    gap: 12px;
    width: 100%;
  }
  
  .contacts-row .contact-block {
    flex: 1;
    min-width: 0;
  }
  
  .contact-block {
    display: flex;
    align-items: flex-start;
    gap: 5px;
    padding: 0;
  }
  
  /* Адрес — на всю ширину */
  .contact-block.contact-address {
    width: 100%;
    padding-top: 8px;
    border-top: 1px solid #f0f0f0;
    margin-top: 4px;
  }
  
  .contact-icon {
    font-size: 13px;
    width: 16px;
    flex-shrink: 0;
    text-align: center;
    margin-top: 2px;
    line-height: 1;
  }
  
  .contact-text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
    flex: 1;
    min-width: 0;
  }
  
  .contact-label {
    font-size: 11px;
    color: #005700;
    font-weight: 600;
    line-height: 1.3;
  }
  
  .contact-value {
    font-size: 12px;
    line-height: 1.4;
    color: #333;
    text-decoration: none;
    word-break: break-word;
  }
  
  a.contact-value:hover {
    color: #005700;
  }

  .contact-address .contact-value br {
    display: none;
  }
}

@media (max-width: 480px) {
  .company-name {
    font-size: 16px;
  }
  
  .company-subtitle {
    font-size: 10px;
  }
  
  .logo-image {
    width: 40px;
    height: 40px;
  }
}
</style>