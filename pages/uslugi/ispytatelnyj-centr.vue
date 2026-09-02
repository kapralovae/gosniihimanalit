<template>
  <div class="service-page">
    <div class="container">
      <!-- Хлебные крошки -->
      <nav class="breadcrumb">
        <NuxtLink to="/">Главная</NuxtLink>
        <span class="separator">/</span>
        <NuxtLink to="/uslugi">Услуги</NuxtLink>
        <span class="separator">/</span>
        <span class="current">Испытательный центр</span>
      </nav>
      
      <h1 class="page-title">Испытательный центр</h1>
      
      <div class="service-content">
        <div class="service-layout">
          <!-- Основная часть -->
          <div class="service-main">
            <p class="service-intro">
              Испытательный центр АО "ГосНИИХиманалит" проводит комплексные испытания
              технических средств химического контроля и аналитического оборудования.
            </p>
            
            <h2 class="section-subtitle">Наши возможности</h2>
            <div class="info-card">
              <ul class="capabilities-list">
                <li v-for="capability in capabilities" :key="capability">
                  <span class="list-icon">✓</span>
                  {{ capability }}
                </li>
              </ul>
            </div>
            
            <h2 class="section-subtitle">Аккредитация</h2>
            <div class="info-card">
              <p>
                Испытательный центр аккредитован в соответствии с требованиями
                ГОСТ ISO/IEC 17025-2019 «Общие требования к компетентности
                испытательных и калибровочных лабораторий».
              </p>
              <div class="accreditation-alert">
                ⚡ Аттестат аккредитации № RA.RU.123456
              </div>
            </div>
            
            <h2 class="section-subtitle">Порядок проведения испытаний</h2>
            <div class="steps">
              <div 
                v-for="(step, index) in steps" 
                :key="step.title"
                class="step-item"
                :class="{ 'completed': index < activeStep, 'active': index === activeStep }"
              >
                <div class="step-number">{{ index + 1 }}</div>
                <div class="step-info">
                  <h4>{{ step.title }}</h4>
                  <p>{{ step.description }}</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Сайдбар -->
          <div class="sidebar">
            <div class="sidebar-card">
              <h3 class="sidebar-title">Контакты центра</h3>
              <div class="contact-info">
                <span>📞</span>
                <span>+7 (812) 345-67-89</span>
              </div>
              <div class="contact-info">
                <span>✉️</span>
                <span>test@gosniihimanalit.ru</span>
              </div>
              <button 
                type="button"
                class="sidebar-button"
                @click="showRequestDialog"
              >
                Оставить заявку
              </button>
            </div>
            
            <div class="sidebar-card">
              <h3 class="sidebar-title">Документы</h3>
              <ul class="documents-list">
                <li v-for="doc in documents" :key="doc">
                  <span>📄</span>
                  <span>{{ doc }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Модальное окно заявки -->
      <div v-if="dialogVisible" class="modal-overlay" @click="dialogVisible = false">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h2>Заявка на испытания</h2>
            <button class="close-btn" @click="dialogVisible = false">✕</button>
          </div>
          
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label">Организация</label>
              <input v-model="requestForm.company" type="text" class="form-input" placeholder="Название организации" />
            </div>
            <div class="form-group">
              <label class="form-label">Контактное лицо</label>
              <input v-model="requestForm.contact" type="text" class="form-input" placeholder="ФИО" />
            </div>
            <div class="form-group">
              <label class="form-label">Телефон</label>
              <input v-model="requestForm.phone" type="tel" class="form-input" placeholder="+7 (___) ___-__-__" />
            </div>
            <div class="form-group">
              <label class="form-label">Email</label>
              <input v-model="requestForm.email" type="email" class="form-input" placeholder="email@example.com" />
            </div>
            <div class="form-group">
              <label class="form-label">Описание</label>
              <textarea 
                v-model="requestForm.description" 
                class="form-textarea"
                rows="4"
                placeholder="Опишите, что необходимо испытать"
              ></textarea>
            </div>
          </div>
          
          <div class="modal-footer">
            <button class="btn-secondary" @click="dialogVisible = false">Отмена</button>
            <button class="btn-primary" @click="submitRequest">Отправить</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeStep = ref(0)
const dialogVisible = ref(false)

const capabilities = [
  'Испытания газоанализаторов и сигнализаторов',
  'Климатические испытания (температура, влажность)',
  'Механические испытания (вибрация, удары)',
  'Испытания на электромагнитную совместимость',
  'Испытания на взрывозащиту',
  'Испытания на пылевлагозащиту',
  'Ресурсные испытания',
  'Функциональные испытания'
]

const documents = [
  'Аттестат аккредитации',
  'Область аккредитации',
  'Положение об испытательном центре',
  'Форма заявки на испытания'
]

const steps = [
  { title: 'Заявка', description: 'Подача заявки на испытания' },
  { title: 'Договор', description: 'Заключение договора' },
  { title: 'Испытания', description: 'Проведение испытаний' },
  { title: 'Протокол', description: 'Выдача протокола' }
]

const requestForm = ref({
  company: '',
  contact: '',
  phone: '',
  email: '',
  description: ''
})

function showRequestDialog() {
  dialogVisible.value = true
}

function submitRequest() {
  dialogVisible.value = false
  alert('Заявка отправлена! Мы свяжемся с вами в ближайшее время.')
  requestForm.value = {
    company: '',
    contact: '',
    phone: '',
    email: '',
    description: ''
  }
}

useHead({
  title: 'Испытательный центр - ГосНИИХиманалит',
  meta: [
    { 
      name: 'description', 
      content: 'Испытательный центр ГосНИИХиманалит: испытания газоанализаторов, климатические испытания, аккредитация ГОСТ ISO/IEC 17025' 
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

.service-layout {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 40px;
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

.info-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-left: 4px solid #29b026;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.capabilities-list {
  list-style: none;
  padding: 0;
}

.capabilities-list li {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f0f0f0;
  color: #4b5563;
}

.capabilities-list li:last-child {
  border-bottom: none;
}

.list-icon {
  color: #29b026;
  font-weight: 700;
  font-size: 1.25rem;
}

.accreditation-alert {
  margin-top: 1rem;
  padding: 1rem;
  background: #f0f9f0;
  color: #29b026;
  border-radius: 4px;
  font-weight: 500;
}

/* Шаги */
.steps {
  display: flex;
  gap: 0;
  margin-top: 2rem;
}

.step-item {
  flex: 1;
  text-align: center;
  position: relative;
  padding: 0 10px;
}

.step-number {
  width: 40px;
  height: 40px;
  background: #e5e7eb;
  color: #6b7280;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  margin: 0 auto 0.5rem;
}

.step-item.completed .step-number {
  background: #29b026;
  color: #fff;
}

.step-item.active .step-number {
  background: #1a7a1a;
  color: #fff;
  box-shadow: 0 0 0 4px rgba(41, 176, 38, 0.2);
}

.step-info h4 {
  color: #333;
  margin-bottom: 0.25rem;
  font-size: 14px;
}

.step-info p {
  color: #6b7280;
  font-size: 12px;
}

/* Сайдбар */
.sidebar {
  position: sticky;
  top: 70px;
}

.sidebar-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.sidebar-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1rem;
}

.contact-info {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 0.75rem;
  color: #4b5563;
}

.sidebar-button {
  width: 100%;
  padding: 12px;
  background: #29b026;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 1rem;
  transition: background 0.3s;
}

.sidebar-button:hover {
  background: #1a7a1a;
}

.documents-list {
  list-style: none;
  padding: 0;
}

.documents-list li {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0.5rem 0;
  color: #4b5563;
  cursor: pointer;
  transition: color 0.3s;
}

.documents-list li:hover {
  color: #29b026;
}

/* Модальное окно */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
}

.modal-content {
  background: #fff;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem;
  border-bottom: 1px solid #e5e7eb;
}

.modal-header h2 {
  font-size: 1.25rem;
  color: #333;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6b7280;
}

.modal-body {
  padding: 1.25rem;
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
.form-textarea {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 14px;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #29b026;
}

.form-textarea {
  resize: vertical;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 1.25rem;
  border-top: 1px solid #e5e7eb;
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

.btn-primary {
  padding: 10px 24px;
  background: #29b026;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
}

.btn-primary:hover {
  background: #1a7a1a;
}

@media (max-width: 1024px) {
  .service-layout {
    grid-template-columns: 1fr;
  }
  
  .sidebar {
    position: static;
  }
}

@media (max-width: 768px) {
  .steps {
    flex-direction: column;
    gap: 15px;
  }
  
  .step-item {
    display: flex;
    align-items: center;
    gap: 15px;
    text-align: left;
  }
  
  .step-number {
    margin: 0;
    flex-shrink: 0;
  }
  
  .page-title {
    font-size: 2rem;
  }
}
</style>