<template>
  <div class="kb-page">
    <div class="container">
      <!-- Хлебные крошки -->
      <nav class="breadcrumb">
        <NuxtLink to="/">Главная</NuxtLink>
        <span class="separator">/</span>
        <NuxtLink to="/konstruktorskoe-byuro">Конструкторское бюро</NuxtLink>
        <span class="separator">/</span>
        <span class="current">Образование и обучение</span>
      </nav>
      
      <h1 class="page-title">Образование и обучение</h1>
      
      <div class="kb-content">
        <p class="kb-intro">
          Учебный центр АО "ГосНИИХиманалит" проводит обучение и повышение
          квалификации специалистов в области химического анализа.
        </p>
        
        <h2 class="section-subtitle">Программы обучения</h2>
        <div class="programs-grid">
          <div 
            v-for="program in programs" 
            :key="program.title"
            class="program-card"
          >
            <div class="program-header">
              <span class="program-icon">{{ program.icon }}</span>
              <span class="program-duration">{{ program.duration }}</span>
            </div>
            <h3>{{ program.title }}</h3>
            <p>{{ program.description }}</p>
            
            <div class="program-details">
              <div class="detail-item">
                <span class="detail-label">Формат:</span>
                <span>{{ program.format }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Стоимость:</span>
                <span class="price">{{ program.price }}</span>
              </div>
            </div>
            
            <button 
              type="button"
              class="enroll-button"
              @click="enrollProgram(program)"
            >
              Записаться
            </button>
          </div>
        </div>
        
        <h2 class="section-subtitle">Преподаватели</h2>
        <div class="teachers-grid">
          <div 
            v-for="teacher in teachers" 
            :key="teacher.name"
            class="teacher-card"
          >
            <div class="teacher-avatar">{{ teacher.initials }}</div>
            <h4>{{ teacher.name }}</h4>
            <p>{{ teacher.position }}</p>
            <span class="teacher-experience">{{ teacher.experience }}</span>
          </div>
        </div>
      </div>
      
      <!-- Модальное окно записи -->
      <div v-if="dialogVisible" class="modal-overlay" @click="dialogVisible = false">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h2>Запись на обучение</h2>
            <button class="close-btn" @click="dialogVisible = false">✕</button>
          </div>
          
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label">Программа</label>
              <input v-model="enrollForm.program" type="text" class="form-input" disabled />
            </div>
            <div class="form-group">
              <label class="form-label">ФИО</label>
              <input v-model="enrollForm.name" type="text" class="form-input" placeholder="Ваше полное имя" />
            </div>
            <div class="form-group">
              <label class="form-label">Email</label>
              <input v-model="enrollForm.email" type="email" class="form-input" placeholder="email@example.com" />
            </div>
            <div class="form-group">
              <label class="form-label">Телефон</label>
              <input v-model="enrollForm.phone" type="tel" class="form-input" placeholder="+7 (___) ___-__-__" />
            </div>
            <div class="form-group">
              <label class="form-label">Образование</label>
              <select v-model="enrollForm.education" class="form-select">
                <option value="" disabled>Выберите</option>
                <option value="secondary">Среднее</option>
                <option value="vocational">Среднее специальное</option>
                <option value="higher">Высшее</option>
                <option value="academic">Ученая степень</option>
              </select>
            </div>
          </div>
          
          <div class="modal-footer">
            <button class="btn-secondary" @click="dialogVisible = false">Отмена</button>
            <button class="btn-primary" @click="submitEnroll">Отправить заявку</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const dialogVisible = ref(false)

const programs = [
  {
    icon: '📖',
    title: 'Основы газового анализа',
    description: 'Базовый курс по газоанализу для начинающих специалистов',
    duration: '72 часа',
    format: 'Очно/онлайн',
    price: '45 000 ₽'
  },
  {
    icon: '🔬',
    title: 'Повышение квалификации',
    description: 'Курс для специалистов с опытом работы',
    duration: '40 часов',
    format: 'Очно',
    price: '35 000 ₽'
  },
  {
    icon: '⚙️',
    title: 'Метрологическое обеспечение',
    description: 'Обучение метрологов и специалистов по поверке',
    duration: '104 часа',
    format: 'Очно/онлайн',
    price: '60 000 ₽'
  },
  {
    icon: '⚗️',
    title: 'Аналитическая химия',
    description: 'Углубленный курс по методам аналитической химии',
    duration: '80 часов',
    format: 'Очно',
    price: '50 000 ₽'
  },
  {
    icon: '📊',
    title: 'Современные методы анализа',
    description: 'Курс по современным инструментальным методам',
    duration: '60 часов',
    format: 'Онлайн',
    price: '40 000 ₽'
  },
  {
    icon: '📋',
    title: 'Стандартизация',
    description: 'Обучение по стандартизации и сертификации',
    duration: '36 часов',
    format: 'Очно',
    price: '30 000 ₽'
  }
]

const teachers = [
  {
    name: 'Иванов Иван Иванович',
    position: 'Доктор технических наук, профессор',
    experience: 'Опыт 25 лет',
    initials: 'ИИ'
  },
  {
    name: 'Петрова Мария Сергеевна',
    position: 'Кандидат химических наук',
    experience: 'Опыт 15 лет',
    initials: 'МП'
  },
  {
    name: 'Сидоров Алексей Петрович',
    position: 'Ведущий инженер',
    experience: 'Опыт 20 лет',
    initials: 'АС'
  },
  {
    name: 'Козлова Елена Владимировна',
    position: 'Старший преподаватель',
    experience: 'Опыт 12 лет',
    initials: 'ЕК'
  }
]

const enrollForm = ref({
  program: '',
  name: '',
  email: '',
  phone: '',
  education: ''
})

function enrollProgram(program) {
  enrollForm.value.program = program.title
  dialogVisible.value = true
}

function submitEnroll() {
  dialogVisible.value = false
  alert('Заявка на обучение отправлена! Мы свяжемся с вами.')
  enrollForm.value = {
    program: '',
    name: '',
    email: '',
    phone: '',
    education: ''
  }
}

useHead({
  title: 'Образование и обучение - ГосНИИХиманалит',
  meta: [
    { 
      name: 'description', 
      content: 'Образование и обучение в ГосНИИХиманалит: курсы повышения квалификации, обучение специалистов' 
    }
  ]
})
</script>

<style scoped>
.kb-page {
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

.kb-intro {
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

/* Программы */
.programs-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-bottom: 3rem;
}

.program-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  transition: all 0.3s;
}

.program-card:hover {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transform: translateY(-5px);
  border-color: #29b026;
}

.program-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.program-icon {
  font-size: 40px;
}

.program-duration {
  padding: 4px 10px;
  background: #f0f9f0;
  color: #29b026;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.program-card h3 {
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 1.125rem;
}

.program-card p {
  color: #6b7280;
  font-size: 0.875rem;
  margin-bottom: 1rem;
  flex: 1;
}

.program-details {
  margin: 1rem 0;
  padding: 0.75rem;
  background: #f8fafc;
  border-radius: 4px;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.25rem;
  font-size: 14px;
}

.detail-label {
  color: #6b7280;
}

.price {
  font-weight: 600;
  color: #29b026;
}

.enroll-button {
  width: 100%;
  padding: 12px;
  background: #29b026;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s;
}

.enroll-button:hover {
  background: #1a7a1a;
}

/* Преподаватели */
.teachers-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.teacher-card {
  text-align: center;
  padding: 1.5rem;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  transition: all 0.3s;
}

.teacher-card:hover {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transform: translateY(-5px);
}

.teacher-avatar {
  width: 80px;
  height: 80px;
  margin: 0 auto 1rem;
  background: #29b026;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 1.5rem;
  font-weight: 600;
}

.teacher-card h4 {
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 14px;
}

.teacher-card p {
  color: #6b7280;
  font-size: 12px;
  margin-bottom: 0.5rem;
}

.teacher-experience {
  display: inline-block;
  padding: 4px 10px;
  background: #f0f9f0;
  color: #29b026;
  border-radius: 4px;
  font-size: 12px;
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
.form-select {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 14px;
}

.form-input:focus,
.form-select:focus {
  outline: none;
  border-color: #29b026;
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
  .programs-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .teachers-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .programs-grid {
    grid-template-columns: 1fr;
  }
  
  .teachers-grid {
    grid-template-columns: 1fr;
  }
  
  .page-title {
    font-size: 2rem;
  }
}
</style>