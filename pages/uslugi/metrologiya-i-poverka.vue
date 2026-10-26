<template>
  <div class="service-page">
    <div class="container">
      <!-- Хлебные крошки -->
      <nav class="breadcrumb">
        <NuxtLink to="/">Главная</NuxtLink>
        <span class="separator">/</span>
        <NuxtLink to="/uslugi">Услуги</NuxtLink>
        <span class="separator">/</span>
        <span class="current">Метрология и поверка</span>
      </nav>
      
      <!-- Заголовок -->
      <div class="page-header">
        <h1 class="page-title">Метрологический центр</h1>
        <!-- <p class="page-subtitle">АО «ГосНИИхиманалит» предлагает услуги:</p> -->
      </div>
      
      <div class="services-content">
        <!-- Услуга 1: Аттестация испытательного оборудования -->
        <div class="service-block">
          <div class="service-header">
            
            <h2 class="service-title">Аттестация испытательного оборудования</h2>
          </div>
          <ul class="service-list">
            <li>Аттестация температурных измерений (сушильных шкафов, климатических камер, муфельных печей, холодильников)</li>
            <li>Аттестация измерений давления (климатические и барокамеры)</li>
            <li>Аттестация физико-химических измерений (газодинамические установки)</li>
            <li>Аттестация электрических измерений</li>
          </ul>
          <div class="service-note">
            Аттестация проводится на основании <strong>ГОСТ Р 8.568-2017</strong> 
            «Аттестация испытательного оборудования. Основные положения».
          </div>
        </div>
        
        <!-- Услуга 2: Поверка средств измерения -->
        <div class="service-block">
          <div class="service-header">
            <h2 class="service-title">Поверка средств измерения</h2>
          </div>

          <!-- Аккредитация -->
          <div class="accreditation-info">
            <p><strong>Уникальный номер записи об аккредитации:</strong> RA.RU.312924</p>
            <p>
              <a 
                href="https://pub.fsa.gov.ru/ral/view/33974/accreditation" 
                target="_blank" 
                rel="noopener"
                class="accreditation-link"
              >
                Информация в реестре аккредитованных лиц ФСА →
              </a>
            </p>
          </div>

          <!-- Аттестат -->
          <div class="certificates-grid">
            <div 
              v-for="certificate in certificates" 
              :key="certificate.id"
              class="certificate-card"
            >
              <div class="certificate-thumbnail" @click="selectedCertificate = certificate">
                <img 
                  :src="certificate.image" 
                  :alt="certificate.title"
                  class="certificate-thumbnail-img"
                />
              </div>
            </div>
          </div>

          <!-- Модальное окно -->
          <div v-if="selectedCertificate" class="modal-overlay" @click="selectedCertificate = null">
            <div class="modal-image-wrapper" @click.stop>
              <img 
                :src="selectedCertificate.image" 
                :alt="selectedCertificate.title"
                class="modal-full-image"
                @click="selectedCertificate = null"
              />
            </div>
          </div>

          <p class="service-intro">
            Поверка средств измерения в соответствии с областью аккредитации
            российского и иностранного производства:
          </p>

          <h3 class="subsection-title">Поверяемые средства измерений</h3>
          <div class="specs-table-wrapper">
            <table class="specs-table">
              <thead>
                <tr>
                  <th>Средства измерений</th>
                  <th>Диапазон измерений</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Дозаторы механические</td>
                  <td>(20…10 000) мкл</td>
                </tr>
                <tr>
                  <td>Газодинамические установки</td>
                  <td>(5,0·10⁻⁶…0,1) мг/м³</td>
                </tr>
                <tr>
                  <td>
                    Анализаторы рентгенофлуоресцентные;<br>
                    Анализаторы-спектрометры эмиссионные;<br>
                    спектрометры электронные;<br>
                    аппараты рентгеновские (спектрометры) рентгенофлуоресцентные
                  </td>
                  <td>
                    (0,0001…10,00) %;<br>
                    (0,1…100 000) мг/кг;<br>
                    скорость импульсов (5…30 000) с⁻¹
                  </td>
                </tr>
                <tr>
                  <td>
                    Анализаторы содержания серы;<br>
                    Анализаторы содержания хлора (хлорорганических соединений);<br>
                    Анализаторы содержания хлористых солей;<br>
                    Анализаторы содержания азота;<br>
                    Анализаторы элементные
                  </td>
                  <td>
                    (0,0003…10,00) %;<br>
                    (0,1…100 000) мг/кг;<br>
                    (0,03…20 000) млн⁻¹;<br>
                    (0,03…20 000) мг/м³
                  </td>
                </tr>
                <tr>
                  <td>
                    Газоанализаторы;<br>
                    Газосигнализаторы;<br>
                    Анализаторы-течеискатели;<br>
                    Датчики и преобразователи газоаналитические
                  </td>
                  <td>
                    (0…100) % об. д.;<br>
                    (0…13 000) мг/м³ м. д.;<br>
                    (0…100) % НКПР
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 class="subsection-title">Эталоны, применяемые при поверке</h3>
          <div class="specs-table-wrapper">
            <table class="specs-table">
              <thead>
                <tr>
                  <th>Эталон</th>
                  <th>Диапазон</th>
                  <th>Основание</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Комплекты поверочные УП — рабочие эталоны 2-го разряда</td>
                  <td>
                    изобутилен (25–1000) мг/м³;<br>
                    гексан (25–1000) мг/м³;<br>
                    сероводород (0,05–15) мг/м³
                  </td>
                  <td>Приказ № Ра-369 от 22.07.2026 Федеральной службы по аккредитации</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <!-- Услуга 3: Испытание СИ, утверждение типа -->
        <div class="service-block">
          <div class="service-header">
            <h2 class="service-title">Испытание средств измерения, утверждение их типа</h2>
          </div>

          <!-- Аккредитация -->
          <div class="accreditation-info">
            <p><strong>Уникальный номер записи об аккредитации:</strong> RA.RU.312907</p>
            <p>
              <a 
                href="https://pub.fsa.gov.ru/ral/view/33919/applicant" 
                target="_blank" 
                rel="noopener"
                class="accreditation-link"
              >
                Информация в реестре аккредитованных лиц ФСА →
              </a>
            </p>
          </div>

          <!-- Аттестат -->
          <div class="certificates-grid">
            <div 
              v-for="certificate in certificates2" 
              :key="certificate.id"
              class="certificate-card"
            >
              <div class="certificate-thumbnail" @click="selectedCertificate2 = certificate">
                <img 
                  :src="certificate.image" 
                  :alt="certificate.title"
                  class="certificate-thumbnail-img"
                />
              </div>
            </div>
          </div>

          <!-- Модальное окно -->
          <div v-if="selectedCertificate2" class="modal-overlay" @click="selectedCertificate2 = null">
            <div class="modal-image-wrapper" @click.stop>
              <img 
                :src="selectedCertificate2.image" 
                :alt="selectedCertificate2.title"
                class="modal-full-image"
                @click="selectedCertificate2 = null"
              />
            </div>
          </div>

          <p class="service-intro">
            Испытания средств измерений в целях утверждения типа
            (измерения физико-химического состава и свойств веществ):
          </p>

          <h3 class="subsection-title">Перечень СИ в области аккредитации</h3>
          <div class="specs-table-wrapper">
            <table class="specs-table">
              <thead>
                <tr>
                  <th>Средства измерений</th>
                  <th>Диапазон измерений</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    Газоанализаторы, газосигнализаторы, анализаторы-течеискатели,
                    датчики и преобразователи газоаналитические, в том числе газов
                    отравляющего, нервно-паралитического, раздражающего, кожно-нарывного,
                    психохимического и удушающего действия
                  </td>
                  <td>
                    (0–100) % м. д.;<br>
                    (0–100) % об. д.;<br>
                    (0–13 000) мг/м³;<br>
                    (0–100) % НКПР
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <!-- Услуга 4 -->
        <div class="service-block compact">
          <div class="service-header">
            
            <h2 class="service-title">Разработка документов метрологического обеспечения</h2>
          </div>
        </div>
      </div>
      
      <!-- Контактный блок -->
      <div class="contacts-block">
        <h2 class="contacts-title">По вопросам метрологии и поверки</h2>
        <div class="contacts-info">
          <a href="tel:+78127866159" class="contact-item">
            <span class="contact-icon">📞</span>
            <span>+7 (812) 786-61-59</span>
          </a>
          <a href="mailto:mail@himanalit.ru" class="contact-item">
            <span class="contact-icon">✉️</span>
            <span>mail@himanalit.ru</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedCertificate = ref(null)
const selectedCertificate2 = ref(null)

const certificates = [
  {
    id: 1,
    title: 'Аттестат аккредитации RA.RU.312924',
    image: '/images/certificates/attestat-RA-RU-312924.webp'
  }
]

const certificates2 = [
  {
    id: 1,
    title: 'Аттестат аккредитации RA.RU.312907',
    image: '/images/certificates/attestat-RA-RU-312907.webp'
  }
]

useHead({
  title: 'Метрология и поверка - ГосНИИХиманалит',
  meta: [
    { 
      name: 'description', 
      content: 'Метрологический центр ГосНИИХиманалит: аттестация испытательного оборудования, поверка средств измерений, утверждение типа' 
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
  max-width: 1100px;
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

/* Заголовок */
.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #005700;
  margin-bottom: 0.75rem;
}

.page-subtitle {
  font-size: 1.25rem;
  color: #4b5563;
  font-weight: 500;
}

/* Секции услуг */
.services-content {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.service-block {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1.75rem;
  transition: all 0.3s;
}

.service-block:hover {
  box-shadow: 0 8px 24px rgba(0, 87, 0, 0.08);
  border-color: #005700;
}

.service-block.compact {
  padding: 1.25rem 1.75rem;
}

.service-header {
  margin-bottom: 1rem;
}


.service-title {
  font-size: 1.35rem;
  font-weight: 700;
  color: #005700;
  line-height: 1.3;
}

.service-intro {
  color: #4b5563;
  margin-bottom: 1rem;
  line-height: 1.6;
}

/* Сертификаты / аттестаты */
.certificates-grid {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.certificate-card {
  text-align: center;
  padding: 1rem;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  max-width: 600px;
  width: 100%;
}

.certificate-thumbnail {
  cursor: pointer;
  overflow: hidden;
  border-radius: 4px;
  max-height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-section);
  transition: opacity 0.3s;
}

.certificate-thumbnail:hover {
  opacity: 0.8;
}

.certificate-thumbnail-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* Модальное окно */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
  cursor: pointer;
}

.modal-image-wrapper {
  max-width: 95vw;
  max-height: 95vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-full-image {
  max-width: 95vw;
  max-height: 95vh;
  object-fit: contain;
  cursor: pointer;
}

@media (max-width: 768px) {
  .certificates-grid {
    grid-template-columns: 1fr;
  }
  
  .certificate-thumbnail {
    max-height: 300px;
  }
}

/* Списки */
.service-list {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
}

.service-list li {
  position: relative;
  padding: 0.5rem 0 0.5rem 1.5rem;
  color: #4b5563;
  line-height: 1.6;
  border-bottom: 1px solid #f5f5f5;
}

.service-list li:last-child {
  border-bottom: none;
}

.service-list li::before {
  content: '▸';
  position: absolute;
  left: 0;
  color: #005700;
  font-weight: bold;
  font-size: 1rem;
}

/* Примечание */
.service-note {
  margin-top: 1rem;
  padding: 1rem 1.25rem;
  background: #f0f5f0;
  border-left: 4px solid #005700;
  border-radius: 6px;
  color: #333;
  line-height: 1.6;
  font-size: 0.95rem;
}

.service-note strong {
  color: #005700;
}

/* Контакты */
.contacts-block {
  margin-top: 3rem;
  background: linear-gradient(135deg, #005700, #003d00);
  color: #fff;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
}

.contacts-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.contacts-info {
  display: flex;
  justify-content: center;
  gap: 2.5rem;
  flex-wrap: wrap;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #fff;
  text-decoration: none;
  font-size: 1.05rem;
  font-weight: 500;
  transition: opacity 0.3s;
}

.contact-item:hover {
  opacity: 0.8;
}

.contact-icon {
  font-size: 1.25rem;
}

/* Аккредитация */
.accreditation-info {
  background: #f0f5f0;
  border-left: 4px solid #005700;
  border-radius: 6px;
  padding: 1rem 1.25rem;
  margin-bottom: 1.25rem;
  color: #333;
  line-height: 1.6;
  font-size: 0.95rem;
}

.accreditation-info p {
  margin: 0 0 0.5rem 0;
}

.accreditation-info p:last-child {
  margin-bottom: 0;
}

.accreditation-link {
  color: #005700;
  font-weight: 600;
  text-decoration: none;
  word-break: break-all;
}

.accreditation-link:hover {
  text-decoration: underline;
}

/* Подзаголовки */
.subsection-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #005700;
  margin: 1.5rem 0 0.75rem 0;
}

/* Таблицы */
.specs-table-wrapper {
  border: 2px solid #005700;
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 1rem;
}

.specs-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

.specs-table thead {
  background: #d9e8d9;
}

.specs-table th {
  padding: 10px 14px;
  font-weight: 700;
  color: #005700;
  text-align: left;
  border-bottom: 1px solid #005700;
  border-right: 1px solid #005700;
}

.specs-table th:last-child {
  border-right: none;
}

.specs-table td {
  padding: 10px 14px;
  vertical-align: top;
  color: #333;
  line-height: 1.5;
  border-bottom: 1px solid #c8e6c8;
  border-right: 1px solid #c8e6c8;
}

.specs-table td:last-child {
  border-right: none;
}

.specs-table tr:last-child td {
  border-bottom: none;
}

.specs-table tbody tr:nth-child(even) td {
  background: #f7faf7;
}

@media (max-width: 768px) {
  .specs-table {
    font-size: 0.85rem;
  }
  
  .specs-table th,
  .specs-table td {
    padding: 8px 10px;
  }
}

/* Адаптив */
@media (max-width: 768px) {
  .page-title {
    font-size: 1.75rem;
  }
  
  .page-subtitle {
    font-size: 1.05rem;
  }
  
  .service-block {
    padding: 1.25rem;
  }
  
  .service-title {
    font-size: 1.1rem;
  }
  
  .service-header {
    gap: 12px;
  }
  
  .service-number {
    width: 32px;
    height: 32px;
    font-size: 0.95rem;
  }
  
  .contacts-info {
    flex-direction: column;
    gap: 1rem;
  }
  
  .contacts-block {
    padding: 1.5rem;
  }
}
</style>