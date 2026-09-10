<template>
  <div class="contacts-page">
    <div class="container">
      <!-- Хлебные крошки -->
      <nav class="breadcrumb">
        <NuxtLink to="/">Главная</NuxtLink>
        <span class="separator">/</span>
        <NuxtLink to="/about">О организации</NuxtLink>
        <span class="separator">/</span>
        <span class="current">Контакты</span>
      </nav>
      
      <h1 class="page-title">Контакты</h1>
      
      <div class="contacts-content">
        <div class="contacts-grid">
          <!-- Левая колонка -->
          <div class="contacts-left">
            <h2 class="section-subtitle">Контактная информация</h2>
            
            <div class="info-card">
              <div class="contact-item">
                <span class="contact-icon">📍</span>
                <div>
                  <h4>{{ contacts?.address_label || 'Адрес' }}</h4>
                  <p v-html="formatAddress(contacts?.address)"></p>
                </div>
              </div>
              
              <div class="divider"></div>
              
              <div class="contact-item">
                <span class="contact-icon">📞</span>
                <div>
                  <h4>{{ contacts?.commercial_label || 'Коммерческий отдел' }}</h4>
                  <p v-if="contacts?.commercial_phone">
                    <a :href="'tel:' + contacts.commercial_phone.replace(/[^0-9+]/g, '')">{{ contacts.commercial_phone }}</a>
                  </p>
                  <p v-if="contacts?.commercial_email">
                    <a :href="'mailto:' + contacts.commercial_email">{{ contacts.commercial_email }}</a>
                  </p>
                </div>
              </div>
              
              <div class="divider"></div>
              
              <div class="contact-item">
                <span class="contact-icon">📞</span>
                <div>
                  <h4>{{ contacts?.secretary_label || 'Секретарь' }}</h4>
                  <p v-if="contacts?.secretary_phone">
                    <a :href="'tel:' + contacts.secretary_phone.replace(/[^0-9+]/g, '')">{{ contacts.secretary_phone }}</a>
                  </p>
                  <p v-if="contacts?.secretary_email">
                    <a :href="'mailto:' + contacts.secretary_email">{{ contacts.secretary_email }}</a>
                  </p>
                </div>
              </div>
              
              <div class="divider"></div>
              
              <div class="contact-item">
                <span class="contact-icon">🕐</span>
                <div>
                  <h4>Режим работы</h4>
                  <p>Пн-Пт: 9:00 - 18:00</p>
                  <p>Сб-Вс: выходной</p>
                </div>
              </div>
            </div>
            
            <h2 class="section-subtitle">Реквизиты</h2>
            <div class="info-card">
              <div class="requisites-list">
                <div class="requisite-item">
                  <span class="requisite-label">Полное наименование:</span>
                  <span>Акционерное общество "ГосНИИХиманалит"</span>
                </div>
                <div class="requisite-item">
                  <span class="requisite-label">Сокращенное наименование:</span>
                  <span>АО "ГосНИИХиманалит"</span>
                </div>
                <div class="requisite-item">
                  <span class="requisite-label">ИНН:</span>
                  <span>7812345678</span>
                </div>
                <div class="requisite-item">
                  <span class="requisite-label">КПП:</span>
                  <span>781201001</span>
                </div>
                <div class="requisite-item">
                  <span class="requisite-label">ОГРН:</span>
                  <span>1027812345678</span>
                </div>
                <div class="requisite-item">
                  <span class="requisite-label">Расчетный счет:</span>
                  <span>40702810900000012345</span>
                </div>
                <div class="requisite-item">
                  <span class="requisite-label">Банк:</span>
                  <span>ПАО "Банк Санкт-Петербург"</span>
                </div>
                <div class="requisite-item">
                  <span class="requisite-label">БИК:</span>
                  <span>044030790</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Правая колонка -->
          <div class="contacts-right">
            <h2 class="section-subtitle">Форма обратной связи</h2>
            <div class="info-card">
              <form class="feedback-form" @submit.prevent="submitFeedback">
                <div class="form-group">
                  <label class="form-label">Ваше имя</label>
                  <input v-model="feedbackForm.name" type="text" class="form-input" placeholder="Введите ваше имя" />
                </div>
                
                <div class="form-group">
                  <label class="form-label">Email</label>
                  <input v-model="feedbackForm.email" type="email" class="form-input" placeholder="email@example.com" />
                </div>
                
                <div class="form-group">
                  <label class="form-label">Телефон</label>
                  <input v-model="feedbackForm.phone" type="tel" class="form-input" placeholder="+7 (___) ___-__-__" />
                </div>
                
                <div class="form-group">
                  <label class="form-label">Тема</label>
                  <select v-model="feedbackForm.subject" class="form-select">
                    <option value="" disabled>Выберите тему</option>
                    <option value="general">Общий вопрос</option>
                    <option value="products">Продукция</option>
                    <option value="services">Услуги</option>
                    <option value="cooperation">Сотрудничество</option>
                    <option value="other">Другое</option>
                  </select>
                </div>
                
                <div class="form-group">
                  <label class="form-label">Сообщение</label>
                  <textarea v-model="feedbackForm.message" class="form-textarea" rows="6" placeholder="Введите ваше сообщение"></textarea>
                </div>
                
                <div class="form-actions">
                  <button type="submit" class="btn-primary">Отправить сообщение</button>
                  <button type="button" class="btn-secondary" @click="resetForm">Очистить</button>
                </div>
              </form>
            </div>
            
            <h2 class="section-subtitle">Схема проезда</h2>
            <div class="info-card">
              <div class="map-placeholder">
                <span class="map-icon">🗺️</span>
                <p>Карта проезда</p>
                <button type="button" class="map-btn" @click="openMap">
                  Открыть в Яндекс.Картах
                </button>
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

const { data: contacts } = await useFetch('/api/contacts')

const feedbackForm = ref({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
})

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

function submitFeedback() {
  alert('Сообщение отправлено!')
  resetForm()
}

function resetForm() {
  feedbackForm.value = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  }
}

function openMap() {
  window.open('https://yandex.ru/maps/', '_blank')
}

useHead({
  title: 'Контакты - ГосНИИХиманалит',
  meta: [
    { 
      name: 'description', 
      content: 'Контакты ГосНИИХиманалит: адрес, телефон, email, реквизиты' 
    }
  ]
})
</script>

<style scoped>
.contacts-page {
  min-height: 100vh;
  padding: 2rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

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

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #005700;
  margin-bottom: 2rem;
  text-align: center;
}

.contacts-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
}

.section-subtitle {
  font-size: 1.5rem;
  font-weight: 600;
  color: #005700;
  margin: 2rem 0 1rem;
}

.section-subtitle:first-child {
  margin-top: 0;
}

.info-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-left: 4px solid #005700;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.contact-item {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.contact-icon {
  font-size: 1.5rem;
}

.contact-item h4 {
  color: #333;
  margin-bottom: 0.5rem;
}

.contact-item p {
  color: #6b7280;
  margin-bottom: 0.25rem;
}

.contact-item a {
  color: #005700;
  text-decoration: none;
}

.contact-item a:hover {
  text-decoration: underline;
}

.divider {
  border-top: 1px solid #e5e7eb;
  margin: 1rem 0;
}

.requisites-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.requisite-item {
  display: flex;
  gap: 8px;
  font-size: 14px;
}

.requisite-label {
  font-weight: 600;
  color: #333;
  min-width: 200px;
}

.form-group {
  margin-bottom: 1rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
}

.form-input,
.form-select,
.form-textarea {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 14px;
  font-family: inherit;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  outline: none;
  border-color: #005700;
}

.form-textarea {
  resize: vertical;
}

.form-actions {
  display: flex;
  gap: 10px;
}

.btn-primary {
  padding: 10px 24px;
  background: #005700;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-primary:hover {
  background: #003d00;
}

.btn-secondary {
  padding: 10px 24px;
  background: #fff;
  color: #333;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
}

.btn-secondary:hover {
  border-color: #005700;
  color: #005700;
}

.map-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
  background: #f0f5f0;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
}

.map-icon {
  font-size: 80px;
  margin-bottom: 1rem;
}

.map-btn {
  margin-top: 1rem;
  padding: 10px 20px;
  background: transparent;
  color: #005700;
  border: 2px solid #005700;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.map-btn:hover {
  background: #005700;
  color: #fff;
}

@media (max-width: 768px) {
  .contacts-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .contact-item {
    flex-direction: column;
  }
  
  .requisite-item {
    flex-direction: column;
    gap: 4px;
  }
  
  .requisite-label {
    min-width: auto;
  }
  
  .page-title {
    font-size: 2rem;
  }
}
</style>