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
              <strong>Информация о БИМЛ в реестре аккредитованных лиц: </strong>
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
              <strong>Информация о БИМЛ в реестре аккредитованных лиц: </strong>
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
            <li><span class="list-icon">✓</span>Испытания на воздействие механических факторов по ГОСТ</li>
            <li><span class="list-icon">✓</span>Испытание на воздействие климатических факторов по ГОСТ</li>
            <li><span class="list-icon">✓</span>Испытания на воздействие специальных сред по ГОСТ</li>
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
              <strong>Испытания на воздействие транспортирования</strong> – имитация транспортирования изделий массой до 400 кг.
            </li>
            <li>
              <strong>Ударные испытания</strong> – механические удары многократного и одиночного действия при массе
                испытываемых изделий до 400 кг, перегрузке от 10 до 300 g и габаритах до 400×400×600 мм.
                Длительность воздействия зависит от габаритов и массы испытываемого изделия.
            </li>
            <li>
              <strong>Вибрационные испытания</strong> – синусоидальная вибрация (до 10000Н) и широкополосная (случайная)
                вибрация (до 10000Н) в диапазонах от 5 до 5000 Гц при максимальных габаритах
                расширительного стола 600×600 мм и массе испытываемых изделий с оснасткой до 300 кг.
            </li>
            <li>
              <strong>Климатические испытания</strong> – воздействие положительных и отрицательных температур от минус
                70 °С до плюс 155 °С; воздействие повышенной (до 98 %) и пониженной (до 10 %) влажности
                воздуха; объемы климатических камер до 1 м³.
            </li>
            <li>
              <strong>Специальные среды</strong> – компоненты ракетных топлив с возможностью создания концентраций в диапазоне от 0,01 до 5 000 мг/м³.
            </li>
          </ul>
        </div>

        <h2 class="section-subtitle">Оборудование и виды испытаний</h2>
        <div class="equipment-table">
          <table>
            <thead>
              <tr>
                <th>Оборудование, вид испытаний</th>
                <th>Основные характеристики</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>Камера климатическая TXB-1000</strong> — 2 шт.<br>
                  <small>(испытания на воздействие климатических факторов по ГОСТ, ГОСТ)</small>
                </td>
                <td>
                  температурный диапазон, °C: от −60 до +100;<br>
                  диапазон поддержания относительной влажности: от 30 до 98 %;<br>
                  размер рабочей камеры (ш×в×г): 900×1000×1100 мм
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Камера климатическая СМ-70/155-1000 ТВХ</strong><br>
                  <small>(испытания на воздействие климатических факторов по ГОСТ, ГОСТ)</small>
                </td>
                <td>
                  температурный диапазон, °C: от −70 до +155;<br>
                  диапазон поддержания относительной влажности: от 20 до 98 %;<br>
                  размер рабочей камеры (ш×в×г): 1000×1000×1000 мм
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Камера испытательная тепла-холода ТХ-90</strong><br>
                  <small>(испытания на воздействие климатических факторов по ГОСТ, ГОСТ)</small>
                </td>
                <td>
                  температурный диапазон, °C: от −70 до +100;<br>
                  размер рабочей камеры (ш×в×г): 350×500×510 мм
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Ударный стенд STT-500</strong><br>
                  <small>(испытания на воздействие механических факторов по ГОСТ, ГОСТ)</small>
                </td>
                <td>
                  ударное ускорение, g: от 10 до 300;<br>
                  грузоподъёмность, кг: до 400;<br>
                  частота ударов в минуту: от 17 до 180
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Система вибрационных испытаний ES-10D-240</strong><br>
                  <small>(испытания на воздействие механических факторов по ГОСТ, ГОСТ)</small>
                </td>
                <td>
                  максимальное выталкивающее усилие Синус: 10 000 Н;<br>
                  максимальное выталкивающее усилие ШСВ (СКЗ): 10 000 Н;<br>
                  максимальное выталкивающее усилие Удар: 20 000 Н;<br>
                  диапазон рабочих частот: 5…5000 Гц;<br>
                  максимальное ускорение без нагрузки: 1000 м/с²;<br>
                  максимальная скорость без нагрузки: 1,8 м/с;<br>
                  максимальное перемещение (пик-пик): 51 мм;<br>
                  диаметр арматуры стола: 240 мм;<br>
                  диаметр расширительного стола: 600 мм;<br>
                  максимальная допустимая нагрузка: 300 кг
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Газодинамические установки</strong>
                </td>
                <td>
                  создание концентраций токсичных химикатов в соответствии с требованиями Заказчика
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Камера агрессивных сред КАС-45</strong><br>
                  <small>(испытания на воздействие специальных сред по ГОСТ, ГОСТ)</small>
                </td>
                <td>
                  <strong>Параметры агрессивных сред:</strong><br>
                  сернистый газ: 2,0–75 мг/м³ при T = 25 °С и φ = 75 %;<br>
                  сероводород: 1,0 мг/м³ при T = 25 °С и φ = 75 %;<br>
                  аммиак: 1,0–1000 мг/м³ при T = 25 °С и φ = 90 %;<br>
                  двуокись азота: 2,0–100 мг/м³ при T = 50 °С и φ = 95 %;<br>
                  озон: 0,1–250 мг/м³ при T = 15–35 °С и φ = 40–80 %;<br>
                  амил: 2,0–5000 мг/м³ при T = 50 °С и φ = 65–95 %;<br>
                  гептил: 0,01–5000 мг/м³ при T = 50 °С и φ = 65–95 %;<br>
                  объём камеры: 0,45 м³
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Камера агрессивных сред КАС-350</strong> — 2 шт.<br>
                  <small>(испытания на воздействие специальных сред по ГОСТ, ГОСТ)</small>
                </td>
                <td>
                  <strong>Параметры агрессивных сред:</strong><br>
                  сернистый газ: 2,0–75 мг/м³ при T = 25 °С и φ = 75 %;<br>
                  сероводород: 1,0 мг/м³ при T = 25 °С и φ = 75 %;<br>
                  аммиак: 1,0–1000 мг/м³ при T = 25 °С и φ = 90 %;<br>
                  двуокись азота: 2,0–100 мг/м³ при T = 50 °С и φ = 95 %;<br>
                  озон: 0,1–250 мг/м³ при T = 15–35 °С и φ = 40–80 %;<br>
                  амил: 2,0–5000 мг/м³ при T = 50 °С и φ = 65–95 %;<br>
                  гептил: 0,01–5000 мг/м³ при T = 50 °С и φ = 65–95 %;<br>
                  объём камеры: 0,3 м³
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Стенд испытательный барометрический СИБ-1</strong><br>
                  <small>(испытания на воздействие специальных сред (сред заполнения и испытательных сред) по ГОСТ, ГОСТ)</small>
                </td>
                <td>
                  размер рабочей камеры (ш×в×г): 580×580×580 мм;<br>
                  размер загрузочного окна (диаметр) барокамеры: 290 мм;<br>
                  минимальное создаваемое пониженное давление: 0,001 МПа (7,5 мм рт. ст.);<br>
                  максимальное создаваемое повышенное давление: 0,45 МПа (3,375·10³ мм рт. ст.)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- Другие виды деятельности -->
        <h2 class="section-subtitle">К видам деятельности БИМЛ также относится:</h2>
        <div class="info-card">
          <ul class="capabilities-list">
            <!-- <li><span class="list-icon">✓</span>Разработка и изготовление эксклюзивных пигментов и сигнальных красок, предназначенных для выявления течей вредных химических веществ</li> -->
            <!-- <li><span class="list-icon">✓</span>Синтез органических и неорганических соединений (аналитических реагентов, буферных растворов, неорганических пигментов, комплексных соединений)</li> -->
            <li><span class="list-icon">✓</span>Разработка, изготовление эксклюзивных реактивов для обеспечения серийного производства штатных средств индикации, снаряжения лабораторий</li>
            <li><span class="list-icon">✓</span>Разработка методик (методов) измерений</li>
          </ul>
        </div>
        
        <!-- Обеспечение -->
        <h2 class="section-subtitle">Базовая испытательно-метрологическая лаборатория (БИМЛ):</h2>
        <div class="info-card">
          <ul class="capabilities-list">
            <li><span class="list-icon">✓</span>Обеспечена необходимыми ресурсами</li>
            <li><span class="list-icon">✓</span>Содержит в исправном техническом состоянии оборудование лаборатории, испытательное оборудование аттестовано в соответствии с ГОСТ, в том числе средств измерений, проведение их своевременной поверки и калибровки</li>
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
/* ============================================
   1. ОБЩИЕ СТИЛИ СТРАНИЦЫ
   ============================================ */
.service-page {
  min-height: 100vh;
  padding: 2rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* ============================================
   2. ХЛЕБНЫЕ КРОШКИ
   ============================================ */
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

/* ============================================
   3. ЗАГОЛОВКИ
   ============================================ */
.page-title {
  font-size: 2rem;
  font-weight: 700;
  color: #005700;
  margin-bottom: 2rem;
  text-align: center;
}

.section-subtitle {
  font-size: 1.5rem;
  font-weight: 600;
  color: #005700;
  margin: 2rem 0 1rem;
}

/* ============================================
   4. КАРТОЧКИ И БЛОКИ
   ============================================ */
.service-intro {
  font-size: 1.125rem;
  color: #4b5563;
  line-height: 1.8;
  margin-bottom: 1rem;
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

/* ============================================
   5. СПИСКИ
   ============================================ */
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

/* ============================================
   6. СЕРТИФИКАТЫ
   ============================================ */
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

/* ============================================
   7. МОДАЛЬНОЕ ОКНО
   ============================================ */
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

/* ============================================
   8. ТАБЛИЦА ОБОРУДОВАНИЯ
   ============================================ */
.equipment-table {
  overflow-x: auto;
  margin-bottom: 2rem;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.equipment-table table {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
}

.equipment-table th {
  background: #005700;
  color: #fff;
  padding: 14px 18px;
  text-align: left;
  font-weight: 600;
  font-size: 0.95rem;
  border-right: 1px solid rgba(255, 255, 255, 0.2);
}

.equipment-table th:last-child {
  border-right: none;
}

.equipment-table td {
  padding: 14px 18px;
  border-bottom: 1px solid #e5e7eb;
  border-right: 1px solid #f0f0f0;
  color: #4b5563;
  line-height: 1.6;
  font-size: 0.925rem;
  vertical-align: top;
}

.equipment-table td:last-child {
  border-right: none;
}

.equipment-table tr:last-child td {
  border-bottom: none;
}

.equipment-table tr:nth-child(even) td {
  background: #fafbfc;
}

.equipment-table tr:hover td {
  background: #f0f5f0;
}

.equipment-table td strong {
  color: #333;
  font-weight: 600;
}

.equipment-table td small {
  color: #6b7280;
  font-size: 0.85rem;
  font-style: italic;
}

/* ============================================
   9. АДАПТИВ (все медиа-запросы в конце)
   ============================================ */
@media (max-width: 768px) {
  .certificates-grid {
    grid-template-columns: 1fr;
  }
  
  .certificate-thumbnail {
    max-height: 300px;
  }
  
  .equipment-table th,
  .equipment-table td {
    padding: 10px 12px;
    font-size: 0.85rem;
  }
  
  .page-title {
    font-size: 1.5rem;
  }
  
  .section-subtitle {
    font-size: 1.25rem;
  }
}
</style>