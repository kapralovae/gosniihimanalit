<template>
  <div class="service-page">
    <div class="container">
      <!-- Хлебные крошки -->
      <nav class="breadcrumb">
        <NuxtLink to="/">Главная</NuxtLink>
        <span class="separator">/</span>
        <NuxtLink to="/uslugi">Услуги</NuxtLink>
        <span class="separator">/</span>
        <span class="current">Базовая испытательно-метрологическая лаборатория (БИМЛ)</span>
      </nav>
      
      <h1 class="page-title">Базовая испытательно-метрологическая лаборатория (БИМЛ)</h1>
      
      <div class="service-content">
        <!-- Описание -->
        <div class="info-card">
          <p class="service-intro">
            Базовая испытательно-метрологическая лаборатория (БИМЛ) является структурным подразделением Общества.
          </p>
          <p>
            Выполняет работы и (или) оказывает услуги в области обеспечения единства измерений согласно Федеральному закону от 26.06.2008 № 102-ФЗ «Об обеспечении единства измерений».
          </p>
          <div class="accreditation-info">
            <p><strong>Уникальный номер записи об аккредитации:</strong> RA.RU.314035</p>
            <p>
              <strong>Информация о БИМЛ в реестре аккредитованных лиц:</strong>
              <a href="https://pub.fsa.gov.ru/ral/view/34848/accredited-entity" target="_blank" class="external-link">
                pub.fsa.gov.ru/ral/view/34848
              </a>
            </p>
          </div>
        </div>
        
        <!-- Оценка соответствия -->
        <div class="info-card">
          <p>
            Выполняет работы по оценке (подтверждению) соответствия в отношении оборонной продукции (работ, услуг),
            поставляемой по государственному оборонному заказу, согласно постановлению Правительства Российской Федерации от 30 апреля 2019 г. № 546.
          </p>
          <p>
            БИМЛ соответствует требованиям ГОСТ ISO/IEC 17025-2019 и критериям аккредитации, применяемым к испытательным лабораториям (центрам),
            установленным постановлением Правительства Российской Федерации от 9 марта 2022 г. № 320, и аккредитована в качестве испытательной лаборатории
            для проведения работ по испытаниям в соответствии с установленной областью аккредитации (сведения об области аккредитации предоставляются по официальному обоснованному запросу).
          </p>
          <div class="accreditation-info">
            <p><strong>Аттестат аккредитации:</strong> АО ОПК.RU.150013</p>
            <p>
              <strong>Информация о БИМЛ в реестре аккредитованных лиц:</strong>
              <a href="https://ано-квалитет.рф/reestry/" target="_blank" class="external-link">
                ано-квалитет.рф/reestry
              </a>
            </p>
          </div>
        </div>
        
        <!-- Аттестаты -->
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

        <!-- Модальное окно для просмотра сертификата -->
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
        
        <!-- Разработка и аттестация методик -->
        <h2 class="section-subtitle">Разработка и аттестация методик (методов) измерений</h2>
        <div class="info-card">
          <p><strong>Вид измерений:</strong></p>
          <p>
            Измерения физико-химического состава и свойств веществ, в том числе измерения концентраций основного вещества
            в технических продуктах и стандартных образцах, включая технические продукты и стандартные образцы отравляющих веществ,
            наркотических и психотропных препаратов, компонентов порохов, взрывчатых веществ и ракетных топлив,
            отравляющих веществ в объектах окружающей и техногенной сред.
          </p>
          <p>
            Аттестация методик – одна из форм государственного регулирования обеспечения единства измерений.
            Необходимость метрологической аттестации методик измерения обусловлена тем, что точность косвенных измерений зависит
            не только от метрологических применяемых средств измерений, но и от метода, процедуры и условий измерения, а также действий оператора.
          </p>
          <p>
            Аттестация включает рассмотрение (экспертизу) представленных документов, проведение теоретических,
            в отдельных случаях и дополнительных экспериментальных исследований, оформление результатов аттестации.
          </p>
          <p>
            Положительные результаты аттестации оформляются <strong>Свидетельством об аттестации методики (метода) измерений</strong>.
          </p>
          <p>
            Сведения об аттестованных методиках (методах) измерений передаются в Федеральный информационный фонд по обеспечению единства измерений.
          </p>
        </div>
        
        <!-- Метрологическая экспертиза -->
        <h2 class="section-subtitle">Метрологическая экспертиза</h2>
        <div class="info-card">
          <p><strong>Область применения:</strong> документы по разработке и аттестации методик (методов) измерений.</p>
          <p>
            Метрологическая экспертиза методики измерений – анализ и оценка выбора методов и средств измерений,
            операций и правил проведения измерений и обработки их результатов с целью установления соответствия
            методики измерений предъявляемым метрологическим требованиям.
          </p>
        </div>
        
        <!-- Испытательная база -->
        <h2 class="section-subtitle">БИМЛ предоставляет испытательную базу для:</h2>
        <div class="info-card">
          <ul class="capabilities-list">
            <li><span class="list-icon">✓</span>Испытаний средств измерений в целях утверждения типа</li>
            <li><span class="list-icon">✓</span>Поверки средств измерений</li>
            <li><span class="list-icon">✓</span>Аттестации испытательного оборудования</li>
            <li><span class="list-icon">✓</span>Приемосдаточных испытаний с военной приемкой</li>
          </ul>
        </div>
        
        <!-- Виды испытаний -->
        <h2 class="section-subtitle">Виды испытаний, проводимые БИМЛ:</h2>
        <div class="info-card">
          <ul class="capabilities-list">
            <li><span class="list-icon">✓</span>Испытания на воздействие механических факторов по ГОСТ РВ 0020-57.305-2019</li>
            <li><span class="list-icon">✓</span>Испытание на воздействие климатических факторов по ГОСТ РВ 0020-57.306-2019</li>
            <li><span class="list-icon">✓</span>Испытания на воздействие специальных сред по ГОСТ РВ 0020-57.307-2019</li>
          </ul>
        </div>
        
        <!-- Параметры испытаний -->
        <h2 class="section-subtitle">Параметры испытаний:</h2>
        <div class="info-card">
          <ul class="parameters-list">
            <li>
              <strong>Проверка электрической прочности изоляции</strong> – испытательное напряжение до 1 кВ.
            </li>
            <li>
              <strong>Испытания на воздействие транспортирования</strong> – имитация транспортирования изделий массой до 500 кг.
            </li>
            <li>
              <strong>Ударные испытания</strong> – механические удары многократного и одиночного действия при массе испытываемых изделий до 500 кг,
              перегрузке от 1 до 300 g и габаритах до 400×400×600 мм. Длительность воздействия зависит от габаритов и массы испытываемого изделия.
            </li>
            <li>
              <strong>Вибрационные испытания</strong> – синусоидальная вибрация (до 10000Н) и широкополосная (случайная) вибрация (до 10000Н)
              в диапазонах от 5 до 5000 Гц при максимальных габаритах расширительного стола 600×600 мм и массе испытываемых изделий с оснасткой до 100 кг.
            </li>
            <li>
              <strong>Климатические испытания</strong> – воздействие положительных и отрицательных температур от минус 65 °С до плюс 100 °С;
              воздействие повышенной (до 98 %) и пониженной (до 10 %) влажности воздуха; объемы климатических камер до 1 м³.
            </li>
            <li>
              <strong>Специальные среды</strong> – компоненты ракетных топлив с возможностью создания концентраций в диапазоне от 0,01 до 5 000 мг/м³.
            </li>
          </ul>
        </div>
        
        <!-- Другие виды деятельности -->
        <h2 class="section-subtitle">К видам деятельности БИМЛ также относится:</h2>
        <div class="info-card">
          <ul class="capabilities-list">
            <li><span class="list-icon">✓</span>Разработка и изготовление эксклюзивных пигментов и сигнальных красок, предназначенных для выявления течей вредных химических веществ</li>
            <li><span class="list-icon">✓</span>Синтез органических и неорганических соединений (аналитических реагентов, буферных растворов, неорганических пигментов, комплексных соединений)</li>
            <li><span class="list-icon">✓</span>Разработка, изготовление эксклюзивных реактивов для обеспечения серийного производства штатных средств индикации, снаряжения лабораторий войск РХБЗ МО РФ</li>
            <li><span class="list-icon">✓</span>Разработка методик (методов) измерений</li>
          </ul>
        </div>
        
        <!-- Обеспечение -->
        <h2 class="section-subtitle">Базовая испытательно-метрологическая лаборатория (БИМЛ):</h2>
        <div class="info-card">
          <ul class="capabilities-list">
            <li><span class="list-icon">✓</span>Обеспечена необходимыми ресурсами</li>
            <li><span class="list-icon">✓</span>Содержит в исправном техническом состоянии оборудование лаборатории, испытательное оборудование аттестовано в соответствии с ГОСТ РВ 0008-002-2013, в том числе средств измерений, проведение их своевременной поверки и калибровки</li>
            <li><span class="list-icon">✓</span>Регулярно повышает квалификацию своих работников, проводит обучение современным методам анализа</li>
            <li><span class="list-icon">✓</span>Своевременно обновляет (актуализирует) государственные стандарты, нормативные документы</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedCertificate = ref(null)

const certificates = [
  {
    id: 1,
    title: 'Аттестат Квалитет',
    image: '/images/certificates/attestat_kvalitet.webp'
  },
  {
    id: 2,
    title: 'Аттестат RA.RU.314035 от 08.04.2025',
    image: '/images/certificates/attestat_raru.webp'
  }
]
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
  font-size: 2rem;
  font-weight: 700;
  color: #005700;
  margin-bottom: 2rem;
  text-align: center;
}

.service-intro {
  font-size: 1.125rem;
  color: #4b5563;
  line-height: 1.8;
  margin-bottom: 1rem;
}

.section-subtitle {
  font-size: 1.5rem;
  font-weight: 600;
  color: #005700;
  margin: 2rem 0 1rem;
}

.info-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-left: 4px solid #005700;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.info-card p {
  color: #4b5563;
  line-height: 1.8;
  margin-bottom: 0.75rem;
}

.accreditation-info {
  margin-top: 1rem;
  padding: 1rem;
  background: #f0f5f0;
  border-radius: 4px;
}

.accreditation-info p {
  margin-bottom: 0.5rem;
}

.external-link {
  color: #005700;
  text-decoration: underline;
}

.external-link:hover {
  color: #003d00;
}

.certificates-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 1.5rem;
}

.certificate-card {
  text-align: center;
  padding: 1rem;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

.certificate-thumbnail {
  cursor: pointer;
  overflow: hidden;
  border-radius: 4px;
  max-height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8fafc;
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

.capabilities-list {
  list-style: none;
  padding: 0;
}

.capabilities-list li {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f0f0f0;
  color: #4b5563;
  line-height: 1.6;
}

.capabilities-list li:last-child {
  border-bottom: none;
}

.list-icon {
  color: #005700;
  font-weight: 700;
  font-size: 1.25rem;
  flex-shrink: 0;
  margin-top: 2px;
}

.parameters-list {
  list-style: none;
  padding: 0;
}

.parameters-list li {
  padding: 0.75rem 0;
  border-bottom: 1px solid #f0f0f0;
  color: #4b5563;
  line-height: 1.6;
}

.parameters-list li:last-child {
  border-bottom: none;
}

.parameters-list strong {
  color: #333;
}

@media (max-width: 768px) {
  .certificates-grid {
    grid-template-columns: 1fr;
  }
  
  .certificate-thumbnail {
    max-height: 300px;
  }
}
</style>