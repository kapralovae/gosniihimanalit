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
                <NuxtLink v-for="item in kbItems" :key="item.path" :to="item.path" class="dropdown-item">
                  {{ item.title }}
                </NuxtLink>
              </div>
            </div>
            
            <!-- О организации -->
            <div class="nav-item has-dropdown">
              <NuxtLink 
                to="/about" 
                class="nav-link"
                :class="{ 'active': $route.path.startsWith('/about') }"
              >
                О организации <span class="arrow">▼</span>
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
          <NuxtLink 
            v-for="item in kbItems" 
            :key="item.path"
            :to="item.path" 
            class="mobile-link sub"
            @click="mobileMenuOpen = false"
          >
            {{ item.title }}
          </NuxtLink>
        </div>
        
        <div class="mobile-group">
          <NuxtLink to="/about" class="mobile-link mobile-group-title" @click="mobileMenuOpen = false">
            О организации
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
          <NuxtLink to="/" class="logo">
            <div class="logo-image">
              <img src="/images/himanalit_gerb.webp" alt="Герб">
            </div>
            <div class="logo-text">
              <span class="company-name">АО «ГосНИИхиманалит»</span>
              <span class="company-subtitle">Приборы. Средства химического контроля. Услуги</span>
            </div>
          </NuxtLink>
          
          <div class="header-contacts">
            <!-- Коммерческий отдел -->
            <div class="contact-block">
              <span class="contact-icon">📞</span>
              <div class="contact-text">
                <span class="contact-label">Коммерческий отдел:</span>
                <a href="tel:+78122522245" class="contact-value">+7 (812) 252-22-45</a>
                <a href="mailto:sales@gosniihimanalit.ru" class="contact-value">sales@gosniihimanalit.ru</a>
              </div>
            </div>
            
            <!-- Секретарь -->
            <div class="contact-block">
              <span class="contact-icon">📞</span>
              <div class="contact-text">
                <span class="contact-label">Секретарь:</span>
                <a href="tel:+78127866159" class="contact-value">+7 (812) 786-61-59</a>
                <a href="mailto:info@gosniihimanalit.ru" class="contact-value">mail@himanalit.ru</a>
              </div>
            </div>
            
            <!-- Адрес -->
            <div class="contact-block">
              <span class="contact-icon">📍</span>
              <div class="contact-text">
                <span class="contact-label">Адрес:</span>
                <span class="contact-value">190020, Санкт-Петербург,<br>ул. Бумажная, 17</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const mobileMenuOpen = ref(false)

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
  { title: 'Библиотека 3D моделей', path: '/konstruktorskoe-byuro/biblioteka-3d' }
]
</script>

<style scoped>
.header-wrapper {
  background: #fff;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Навигация - всегда закреплена вверху */
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

/* Бургер-меню */
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

/* Десктопная навигация */
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

/* Мобильное меню */
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

/* Логотип и контакты - прокручиваются */
.header-main {
  padding: 15px 0;
  background: #fff;
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
  width: 150px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
}

.logo-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.logo-text {
  display: flex;
  flex-direction: column;
}

.company-name {
  font-size: 20px;
  font-weight: 700;
  color: #005700;
  line-height: 1.2;
}

.company-subtitle {
  font-size: 14px;
  color: #6b7280;
}

.header-contacts {
  display: flex;
  gap: 20px;
  align-items: center;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.contact-icon {
  font-size: 18px;
}

.contact-text {
  display: flex;
  flex-direction: column;
}

.contact-label {
  font-size: 11px;
  color: #6b7280;
}

.contact-value {
  font-size: 13px;
  font-weight: 500;
  color: #333;
}

/* Мобильная версия */
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
  
  .header-main-inner {
    margin-top: 50px;
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
  
  .logo {
    gap: 10px;
  }
  
  .logo-image {
    width: 50px;
    height: 50px;
  }
  
  .company-name {
    font-size: 18px;
  }
  
  .company-subtitle {
    font-size: 11px;
  }
  
  .header-contacts {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    width: 100%;
  }
  
  .contact-item {
    gap: 8px;
  }
  
  .contact-icon {
    font-size: 16px;
  }
  
  .contact-label {
    font-size: 10px;
  }
  
  .contact-value {
    font-size: 12px;
  }
}

/* Очень маленькие экраны */
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