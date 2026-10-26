<template>
  <div class="vacancies-page">
    <div class="container">
      <!-- Хлебные крошки -->
      <nav class="breadcrumb">
        <NuxtLink to="/">Главная</NuxtLink>
        <span class="separator">/</span>
        <NuxtLink to="/about/kontakty" >Об организации</NuxtLink>
        <span class="separator">/</span>
        <span class="current">Вакансии</span>
      </nav>
      
      <h1 class="page-title">Вакансии</h1>
      
      <div class="vacancies-content">
        <p class="vacancies-intro">
          Присоединяйтесь к команде профессионалов АО "ГосНИИхиманалит"!
        </p>
        
        <!-- Список вакансий -->
        <div class="vacancies-grid">
          <div 
            v-for="vacancy in vacancies" 
            :key="vacancy.id"
            class="vacancy-card"
          >
            <div class="vacancy-header">
              <h2>{{ vacancy.title }}</h2>
            </div>
            
            <div class="vacancy-details">
              <div v-if="vacancy.type" class="vacancy-type-badge">
                {{ vacancy.type }}
              </div>
              <div class="detail-item">
                <span class="detail-label">Отдел:</span>
                <span class="detail-value">{{ vacancy.department }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Зарплата:</span>
                <span class="detail-value detail-salary">{{ vacancy.salary }}</span>
              </div>
              <div v-if="vacancy.experience" class="detail-item">
                <span class="detail-label">Опыт:</span>
                <span class="detail-value">{{ vacancy.experience }}</span>
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
        <div class="benefits-list">
          <div 
            v-for="benefit in benefits" 
            :key="benefit.title" 
            class="benefit-item"
          >
            <h4 class="benefit-title">{{ benefit.title }}</h4>
            <p class="benefit-description">{{ benefit.description }}</p>
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
            <button 
              class="btn-primary" 
              :disabled="!isApplyFormValid"
              @click="submitApply"
            >
              Отправить
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const vacancies = ref([])
const loading = ref(true)
const dialogVisible = ref(false)

const benefits = [
  {
    title: 'Порядочность и культура',
    description: 'Порядочность и человеко-ориентированную культуру взаимоотношений гарантируем.'
  },
  {
    title: 'САПР и PLM',
    description: 'Аскон Компас3D v.24, Аскон Лоцман PLM.'
  },
  {
    title: 'Рабочее место',
    description: 'Офисы класса А3-B. Комфортная кабинетная планировка, просторно и светло, 3-4 человека в помещениях 25-35 м², потолки 4 м, кондиционирование, ПК, мониторы 27"–32" (по желанию), механическая клавиатура, терминал макрос-команд, трекбол, любые инструменты и гаджеты. Современная периферия и оргтехника (цветной плоттер-сканер, цветной принтер А3, 3D-принтеры, документ-камера).'
  },
  {
    title: 'Финансы',
    description: 'Есть возможности дополнительного заработка при желании, умении и подтверждённой репутации. Переработки нечастны, оплачиваются.'
  },
  {
    title: 'Внешний контур',
    description: 'Корпоративные мероприятия Ростех. Молодёжные программы, обучение и конкурсы Ростех. Конкурсы и программы при администрации Санкт-Петербурга. Участие в семинарах и выставках.'
  },
  {
    title: 'Личное портфолио',
    description: 'Грамоты и благодарности (предприятия, заказчиков, корпоративные). Отраслевые награды. Госнаграды. Патенты (авторство, соавторство).'
  },
  {
    title: 'Наука',
    description: 'Возможность публикаций в изданиях РИНЦ. Выпуск научных статей в авторстве и соавторстве. Приветствуется научная и диссертационная работа.'
  },
  {
    title: 'Технический отдел',
    description: 'Есть полноценный профессиональный нормоконтроль.'
  },
  {
    title: 'Оформление',
    description: 'По ТК РФ, ЗП + премия. Постановление 1725 — да.'
  },
  {
    title: 'Дорога',
    description: '8-10 минут пешком от метро Нарвская, по приятной, тихой дороге. Рядом красивый и большой парк Екатерингоф — можно погулять на обеде.'
  },
  {
    title: 'Паркинг',
    description: 'Просторный внутренний охраняемый двор на любое количество авто и времени. Ещё одна парковочная охраняемая зона снаружи.'
  },
  {
    title: 'Обед',
    description: 'Своя уютная обеденная зона, кухня, холодильник, СВЧ-печь, кофемашина. Диван и подушки. Вокруг — много заведений питания на любой вкус. Обед — столько и тогда, когда комфортно вам и вашим биоритмам.'
  },
  {
    title: 'График работы',
    description: 'Полный рабочий день, время стандартно, ± обсуждаем. Учёт времени чёткий, внятный, прозрачный для всех. Ключевое — сделанное дело, а не высиживание с секундомером. Добросовестная репутация позволяет удалённую работу, когда необходимо.'
  },
  {
    title: 'Командировки',
    description: 'Крайне редко и только по желанию.'
  },
  {
    title: 'Медицина',
    description: 'Профилактическая медицина, поликлиника при ФГБУЗ «Клиническая больница № 122 имени Л. Г. Соколова» (122 медсанчасть). Бесплатное стационарное лечение любой сложности.'
  },
  {
    title: 'Обучение и наставничество',
    description: 'Научим, поможем, подбодрим. Очень приветствуем, если кроме основной сферы захотите вникнуть в смежные. Приветствуем курсы повышения квалификации.'
  },
]

onMounted(async () => {
  try {
    const data = await $fetch('/api/vacancies') || []
    // Показываем только активные
    vacancies.value = data.filter(v => v.active)
  } catch (e) {
    console.error('Ошибка загрузки вакансий:', e)
    vacancies.value = []
  } finally {
    loading.value = false
  }
})

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

async function submitApply() {
  if (!isApplyFormValid.value) {
    alert('Заполните все обязательные поля')
    return
  }
  
  try {
    const response = await $fetch('/api/apply', {
      method: 'POST',
      body: applyForm.value
    })
    
    if (response.success) {
      dialogVisible.value = false
      alert('✅ Отклик отправлен! Мы рассмотрим вашу кандидатуру.')
      applyForm.value = { vacancy: '', name: '', email: '', phone: '' }
    } else {
      alert('❌ Ошибка: ' + response.error)
    }
  } catch (error) {
    alert('❌ Ошибка отправки: ' + error.message)
  }
}

const isApplyFormValid = computed(() => {
  return (
    applyForm.value.name?.trim() &&
    applyForm.value.email?.trim() &&
    applyForm.value.phone?.trim()
  )
})

useHead({
  title: 'Вакансии - ГосНИИХиманалит',
  meta: [
    { 
      name: 'description', 
      content: 'Вакансии в ГосНИИхиманалит: инженеры, химики, программисты' 
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

.vacancy-details {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.vacancy-type-badge {
  display: inline-block;
  align-self: flex-start;
  padding: 4px 12px;
  background: #f0f5f0;
  color: #005700;
  border: 1px solid #005700;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 4px;
}

.detail-item {
  display: flex;
  gap: 8px;
  font-size: 14px;
  line-height: 1.5;
}

.detail-label {
  color: #6b7280;
  flex-shrink: 0;
  min-width: 80px;
}

.detail-value {
  color: #333;
  font-weight: 500;
}

.detail-salary {
  color: #005700;
  font-weight: 600;
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

.benefits-list {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0 40px;
}

.benefit-item {
  padding: 1rem 0;
  border-bottom: 1px solid #e5e7eb;
}

.benefit-item:last-child {
  border-bottom: none;
}

.benefit-title {
  font-size: 1rem;
  font-weight: 700;
  color: #005700;
  margin-bottom: 0.35rem;
}

.benefit-description {
  color: #4b5563;
  font-size: 0.9rem;
  line-height: 1.6;
  margin: 0;
}

@media (max-width: 768px) {
  .benefits-list {
    grid-template-columns: 1fr;
    gap: 0;
  }
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
  
}

@media (max-width: 768px) {
  
  .vacancies-grid {
    grid-template-columns: 1fr;
  }
  
  .page-title {
    font-size: 2rem;
  }
}
</style>