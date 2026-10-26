<template>
  <div class="kb-page">
    <div class="container">
      <!-- Хлебные крошки -->
      <nav class="breadcrumb">
        <NuxtLink to="/">Главная</NuxtLink>
        <span class="separator">/</span>
        <NuxtLink to="/konstruktorskoe-byuro">Конструкторское бюро</NuxtLink>
        <span class="separator">/</span>
        <span class="current">Центр разработки технических средств химического контроля</span>
      </nav>
      
      <!-- Заголовок -->
      <div class="page-header">
        <h1 class="page-title">Центр разработки технических средств химического контроля (ЦРТСХК)</h1>
      </div>

      <!-- Промо-баннер -->
      <div class="promo-banner">
        <img 
          src="/images/crtshk.png" 
          alt="ЦРТСХК — Центр разработки технических средств химического контроля"
          class="promo-image"
        />
      </div>
      
      <!-- Вводный блок -->
      <!-- <div class="intro-card">
        
      </div> -->
      
      <!-- О центре -->
      <div class="info-card">
        <h2 class="section-subtitle">О центре</h2>
        <p>
          На базе предприятия создан специализированный центр разработки приборов и систем РХБЗ контроля и защиты,
          приборов и систем для самых различных отраслей промышленности и науки, оборонных задач.
        </p>
        <p>
          В ЦРТСХК трудятся высококвалифицированные ученые, инженеры-конструкторы, разработчики электроники,
          программисты систем высокого и низкого уровней, технические писатели, инженеры-технологи.
        </p>
        <p>
          В центре трудятся высококвалифицированные инженеры-разработчики электроники, программисты, инженеры-конструкторы,
          инженеры-технологи, способные реализовать широкий спектр задач и идей в разнообразных сферах.
        </p>
        <p>
          Дружелюбная атмосфера, молодой и сплоченный коллектив, современное оснащение, человеко-ориентированная культура,
          нацеленность на реальный результат, современные технологии управления проектами располагают к эффективной
          и качественной работе.
        </p>
      </div>
      
      <!-- Компетенции центра -->
      <h2 class="section-title text-left">Компетенции центра:</h2>
      
      <div class="competencies">
        <!-- Разработка  -->
        <div class="competency-card">
          <h3 class="competency-title">
            Разработка 
          </h3>
          <ul class="competency-list">
            <li>Носимых и стационарных приборов контроля уровня загазованности, уровня радиоактивного заражения, обитаемости</li>
            <li>Приборов и систем контроля утечки компонентов жидких ракетных топлив (гептил, амил, гидразин)</li>
            <li>Сложных распределенных стационарных систем газового контроля, контроля обитаемости, контроля по любым необходимым параметрам: освещенность, различные виды излучений, электрических и физических величин</li>
            <li>Систем с электрической или оптоволоконной связью между блоками, с пультами сбора и обработки данных</li>
            <li>АРМ Оператора</li>
            <li>Узлов электроники (схемотехника, трассировка печатных плат, код) и функционально законченных приборов самого разнообразного назначения</li>
            <li>Узлов оптико-электронных комплексов и платформ (контроллеров, сервоприводов, BLDC)</li>
            <li>Источников питания (напряжения и тока, в т.ч. прецизионных) мощностью от 1 Вт до 1 кВт</li>
            <li>Специализированного программного обеспечения под ОС Windows и Astra Linux</li>
          </ul>
        </div>
        
        <!-- Разработка ПО -->
        <div class="competency-card">
          <h3 class="competency-title">
            Разработка специализированного программного обеспечения
          </h3>
          <ul class="competency-list">
            <li>Автоматического метеорологического оборудования (стационарного и переносного)</li>
            <li>Приложений под мобильные ОС Android и веб-приложений (фронт и бэкенд)</li>
            <li>Прототипов (автоматических, с дистанционным управлением, носимых и стационарных)</li>
            <li>Анализаторов качества воды и технических жидкостей</li>
            <li>Систем цифровой связи и телеметрии (LORA, LTE, Nb-IoT, FSK)</li>
            <li>Систем лазерной подсветки</li>
            <li>Полезных нагрузок для БПЛА</li>
            <li>Наземных станций управления нагрузками БПЛА с цифровыми каналами связи</li>
            <li>Медицинских приборов и приборов контроля состояния оператора</li>
            <li>Кода для микроконтроллеров с ядром ARM (STM32, Gigadevice) на языках C, C++</li>
            <li>Схемотехники на ПЛИС и программ конфигурации ПЛИС на System Verilog</li>
            <li>Испытательного оборудования</li>
            <li>Механических конструкций, механизмов и комплектующих изделий</li>
            <li>Универсальных программируемых логических контроллеров и расширителей к ним, аналого-цифровых преобразователей, радиомодемов</li>
            <li>Иных систем и комплексов</li>
          </ul>
        </div>
      </div>
      
      <!-- Направления деятельности -->
      <!-- <h2 class="section-title translate-x-2">Разработка специализированного ПО</h2>
      <div class="activities-grid">
        <div class="activity-item">
          <p>Разработка специализированного программного обеспечения под ОС Windows и Astra Linux; приложений под мобильные ОС Android и веб-приложений (фронт и бэкенд)</p>
        </div>
        <div class="activity-item">
          <p>Разработка схемотехники узлов и приборов электронной техники</p>
        </div>
        <div class="activity-item">
          <p>Разработка конструкции приборов и систем, узлов и механизмов</p>
        </div>
      </div> -->
      
      <!-- Работы -->
      <!-- <h2 class="section-title -translate-y-px">Работы</h2>
      <div class="info-card">
        <ul class="works-list">
          <li>Переработка, доработка, доводка приборов и систем Заказчика</li>
          <li>Импортозамещение в области приборостроения</li>
          <li>Кооперации с любыми предприятиями РФ и СНГ, необходимых Заказчику</li>
          <li>Разработка конструкторских и технологических документов</li>
        </ul>
      </div> -->
      
      <!-- Стандарты -->
      <div class="standards-note">
        <p>
          <strong>Все разработки ведутся в соответствии с</strong> ГОСТ, ГОСТ Р,
          СМК ГОСТ Р ИСО 9001-2015.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Центр разработки технических средств химического контроля - ГосНИИХиманалит',
  meta: [
    { 
      name: 'description', 
      content: 'ЦРТСХК ГосНИИХиманалит: разработка приборов и систем РХБЗ контроля, электроники, ПО, конструкций' 
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
  margin-bottom: 2rem;
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  color: #005700;
  line-height: 1.3;
}

/* Вводный блок */
.intro-card {
  background: linear-gradient(135deg, #005700 0%, #003d00 100%);
  color: #fff;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  font-size: 1.1rem;
  line-height: 1.7;
}

/* Секции */
.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #005700;
  margin: 2.5rem 0 1.5rem;
  padding-bottom: 0.5rem;
  /*border-bottom: 3px solid #005700;*/
}

.section-subtitle {
  font-size: 1.25rem;
  font-weight: 600;
  color: #005700;
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
  margin-bottom: 1rem;
}

.info-card p:last-child {
  margin-bottom: 0;
}

/* Компетенции */
.competencies {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
  margin-bottom: 2rem;
}

.competency-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s;
}

.competency-card:hover {
  box-shadow: 0 10px 30px rgba(0, 87, 0, 0.1);
  border-color: #005700;
}

.competency-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.15rem;
  font-weight: 700;
  color: #005700;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid #f0f5f0;
}

.competency-list {
  list-style: none;
  padding: 0;
}

.competency-list li {
  position: relative;
  padding: 0.5rem 0 0.5rem 1.5rem;
  color: #4b5563;
  line-height: 1.6;
  font-size: 0.925rem;
  border-bottom: 1px solid #f5f5f5;
}

.competency-list li:last-child {
  border-bottom: none;
}

.competency-list li::before {
  content: '▸';
  position: absolute;
  left: 0;
  color: #005700;
  font-weight: bold;
  font-size: 1rem;
}

/* Направления деятельности */
.activities-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 2rem;
}

.activity-item {
  background: #f0f5f0;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s;
}

.activity-item:hover {
  background: #e0efe0;
  transform: translateY(-3px);
}

.activity-item p {
  color: #333;
  font-size: 0.925rem;
  line-height: 1.5;
  margin: 0;
}

/* Работы */
.works-list {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.works-list li {
  position: relative;
  padding: 0.5rem 0 0.5rem 1.5rem;
  color: #4b5563;
  line-height: 1.6;
}

.works-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #005700;
  font-weight: bold;
  font-size: 1.1rem;
}

/* Стандарты */
.standards-note {
  background: #f0f5f0;
  border-left: 4px solid #005700;
  border-radius: 8px;
  padding: 1.25rem 1.5rem;
  margin-top: 2rem;
}

.standards-note p {
  color: #333;
  margin: 0;
  line-height: 1.6;
}

.standards-note strong {
  color: #005700;
}

/* Промо-баннер */
.promo-banner {
  width: 100%;
  margin: 0 auto 2rem;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 87, 0, 0.15);
}

.promo-image {
  width: 100%;
  height: auto;
  display: block;
}

@media (max-width: 768px) {
  .promo-banner {
    border-radius: 8px;
    margin-bottom: 1.25rem;
  }
}

/* Адаптив */
@media (max-width: 1024px) {
  .activities-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 768px) {
  .page-title {
    font-size: 1.5rem;
  }
  
  .competencies {
    grid-template-columns: 1fr;
  }
  
  .activities-grid {
    grid-template-columns: 1fr;
  }
  
  .works-list {
    grid-template-columns: 1fr;
  }
  
  .section-title {
    font-size: 1.25rem;
  }
  
  .intro-card {
    padding: 1.5rem;
    font-size: 1rem;
  }
}
</style>