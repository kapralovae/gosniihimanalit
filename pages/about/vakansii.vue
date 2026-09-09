<template>
  <div class="vacancies-page">
    <div class="container">
      <!-- Хлебные крошки -->
      <nav class="breadcrumb">
        <NuxtLink to="/">Главная</NuxtLink>
        <span class="separator">/</span>
        <NuxtLink to="/about">О организации</NuxtLink>
        <span class="separator">/</span>
        <span class="current">Вакансии</span>
      </nav>
      
      <h1 class="page-title">Вакансии</h1>
      
      <div class="vacancies-content">
        <p class="vacancies-intro">
          Присоединяйтесь к команде профессионалов АО "ГосНИИхиманалит"!
        </p>
        
        <!-- Фильтры -->
        <div class="filters">
          <select v-model="selectedDepartment" class="filter-select">
            <option value="">Все отделы</option>
            <option 
              v-for="department in departments" 
              :key="department"
              :value="department"
            >
              {{ department }}
            </option>
          </select>
          
          <select v-model="selectedType" class="filter-select">
            <option value="">Все типы занятости</option>
            <option value="full">Полная занятость</option>
            <option value="part">Частичная занятость</option>
            <option value="remote">Удаленная работа</option>
          </select>
        </div>
        
        <!-- Список вакансий -->
        <div class="vacancies-grid">
          <div 
            v-for="vacancy in filteredVacancies" 
            :key="vacancy.id"
            class="vacancy-card"
          >
            <div class="vacancy-header">
              <h2>{{ vacancy.title }}</h2>
              <span 
                class="vacancy-type"
                :class="{ 'full': vacancy.type === 'Полная занятость' }"
              >
                {{ vacancy.type }}
              </span>
            </div>
            
            <div class="vacancy-details">
              <div class="detail-item">
                <span>🏢</span>
                <span>{{ vacancy.department }}</span>
              </div>
              <div class="detail-item">
                <span>💰</span>
                <span>{{ vacancy.salary }}</span>
              </div>
              <div class="detail-item">
                <span>📍</span>
                <span>{{ vacancy.location }}</span>
              </div>
            </div>
            
            <div class="vacancy-requirements">
              <h4>Требования:</h4>
              <ul>
                <li v-for="requirement in vacancy.requirements" :key="requirement">
                  {{ requirement }}
                </li>
              </ul>
            </div>
            
            <button 
              type="button"
              class="apply-button"
              @click="applyVacancy(vacancy)"
            >
              Откликнуться
            </button>
          </div>
        </div>
        
        <!-- Преимущества работы -->
        <h2 class="section-title">Преимущества работы у нас</h2>
        <div class="benefits-grid">
          <div 
            v-for="benefit in benefits" 
            :key="benefit.title"
            class="benefit-item"
          >
            <span class="benefit-icon">{{ benefit.icon }}</span>
            <h4>{{ benefit.title }}</h4>
            <p>{{ benefit.description }}</p>
          </div>
        </div>
      </div>
      
      <!-- Модальное окно отклика -->
      <div v-if="dialogVisible" class="modal-overlay" @click="dialogVisible = false">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h2>Отклик на вакансию</h2>
            <button class="close-btn" @click="dialogVisible = false">✕</button>
          </div>
          
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label">Вакансия</label>
              <input v-model="applyForm.vacancy" type="text" class="form-input" disabled />
            </div>
            <div class="form-group">
              <label class="form-label">ФИО</label>
              <input v-model="applyForm.name" type="text" class="form-input" placeholder="Ваше полное имя" />
            </div>
            <div class="form-group">
              <label class="form-label">Email</label>
              <input v-model="applyForm.email" type="email" class="form-input" placeholder="email@example.com" />
            </div>
            <div class="form-group">
              <label class="form-label">Телефон</label>
              <input v-model="applyForm.phone" type="tel" class="form-input" placeholder="+7 (___) ___-__-__" />
            </div>
            <div class="form-group">
              <label class="form-label">Резюме</label>
              <input type="file" class="form-file" accept=".pdf,.doc,.docx" />
            </div>
          </div>
          
          <div class="modal-footer">
            <button class="btn-secondary" @click="dialogVisible = false">Отмена</button>
            <button class="btn-primary" @click="submitApply">Отправить</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedDepartment = ref('')
const selectedType = ref('')
const dialogVisible = ref(false)

// 🔥 Загружаем данные из админки
const { data } = await useAsyncData('vacancies', async () => {
  const response = await $fetch('/api/content')
  return response.vacancies || {}
})

const vacanciesData = computed(() => data.value || {})
const items = computed(() => vacanciesData.value.items || [])
const benefits = computed(() => vacanciesData.value.benefits || [])

// 🔥 Фильтруем только активные вакансии
const vacancies = computed(() => {
  return items.value.filter(v => v.active !== false)
})

// 🔥 Отделы для фильтра
const departments = computed(() => {
  const depts = new Set(vacancies.value.map(v => v.department).filter(Boolean))
  return [...depts]
})

const filteredVacancies = computed(() => {
  return vacancies.value.filter(vacancy => {
    const matchesDepartment = !selectedDepartment.value || 
      vacancy.department === selectedDepartment.value
    
    const matchesType = !selectedType.value || 
      vacancy.type === getTypeLabel(selectedType.value)
    
    return matchesDepartment && matchesType
  })
})

function getTypeLabel(type) {
  const types = {
    'full': 'Полная занятость',
    'part': 'Частичная занятость',
    'remote': 'Удаленная работа'
  }
  return types[type] || type
}

const applyForm = ref({
  vacancy: '',
  name: '',
  email: '',
  phone: ''
})

function applyVacancy(vacancy) {
  applyForm.value.vacancy = vacancy.title
  dialogVisible.value = true
}

function submitApply() {
  dialogVisible.value = false
  alert('Отклик отправлен! Мы рассмотрим вашу кандидатуру.')
  applyForm.value = {
    vacancy: '',
    name: '',
    email: '',
    phone: ''
  }
}

useHead({
  title: 'Вакансии - ГосНИИхиманалит',
  meta: [
    { 
      name: 'description', 
      content: 'Вакансии в ГосНИИхиманалит: инженеры, химики, программисты. Присоединяйтесь к нашей команде!' 
    }
  ]
})
</script>

<style scoped>
.vacancies-page {
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

.vacancies-intro {
  text-align: center;
  font-size: 1.25rem;
  color: #4b5563;
  margin-bottom: 2rem;
}

/* Фильтры */
.filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  justify-content: center;
}

.filter-select {
  padding: 10px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 6px;
  font-size: 14px;
  min-width: 200px;
  cursor: pointer;
  transition: border-color 0.3s;
}

.filter-select:focus {
  outline: none;
  border-color: #005700;
}

/* Сетка вакансий */
.vacancies-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-bottom: 3rem;
}

.vacancy-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  transition: all 0.3s;
}

.vacancy-card:hover {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transform: translateY(-5px);
  border-color: #005700;
}

.vacancy-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 1rem;
}

.vacancy-header h2 {
  font-size: 1.25rem;
  color: #333;
}

.vacancy-type {
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background: #f0f9f0;
  color: #005700;
  white-space: nowrap;
}

.vacancy-details {
  margin-bottom: 1rem;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 0.5rem;
  color: #6b7280;
  font-size: 0.875rem;
}

.vacancy-requirements {
  margin-bottom: 1rem;
  flex: 1;
}

.vacancy-requirements h4 {
  color: #333;
  margin-bottom: 0.5rem;
}

.vacancy-requirements ul {
  list-style: disc;
  padding-left: 1.5rem;
}

.vacancy-requirements li {
  color: #6b7280;
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
}

.apply-button {
  width: 100%;
  padding: 12px;
  background: #005700;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s;
}

.apply-button:hover {
  background: #003d00;
}

/* Преимущества */
.section-title {
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  color: #005700;
  margin: 3rem 0 2rem;
  position: relative;
}

.section-title::after {
  content: '';
  display: block;
  width: 60px;
  height: 3px;
  background: #005700;
  margin: 10px auto 0;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.benefit-item {
  text-align: center;
  padding: 1.5rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.benefit-icon {
  font-size: 40px;
  display: block;
  margin-bottom: 0.5rem;
}

.benefit-item h4 {
  color: #333;
  margin-bottom: 0.5rem;
}

.benefit-item p {
  color: #6b7280;
  font-size: 0.875rem;
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
.form-file {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 14px;
}

.form-input:focus {
  outline: none;
  border-color: #005700;
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
  background: #005700;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
}

.btn-primary:hover {
  background: #003d00;
}

@media (max-width: 1024px) {
  .vacancies-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .benefits-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .filters {
    flex-direction: column;
  }
  
  .vacancies-grid {
    grid-template-columns: 1fr;
  }
  
  .benefits-grid {
    grid-template-columns: 1fr;
  }
  
  .page-title {
    font-size: 2rem;
  }
}
</style>