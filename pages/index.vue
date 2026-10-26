<template>
  <div class="home-page">
    <h1 class="visually-hidden">
      АО «ГосНИИхиманалит» — научно-производственное предприятие
    </h1>
    <section class="hero-block">
      <!-- Карусель -->
      <div class="carousel-section">
        <div class="container">
          <h2 class="carousel-title">Продукция</h2>
        </div>
        <div class="carousel-wrapper">
          <SimpleCarousel :slides="slides" :interval="5000" />
        </div>
      </div>

      <!-- Услуги -->
      <div class="services-section">
        <div class="container">
          <h2 class="services-title">Услуги</h2>
          <ServicesCarousel :services="services" :interval="5000" :visible-count="3" />
        </div>
      </div>
    </section>
    

    <!-- Об организации -->
    <section class="about-section block">
      <div class="container">
        <h2 class="section-title">Об организации</h2>
        <div class="about-content">
          <p>
            <strong>АО «ГосНИИхиманалит»</strong> — научно-производственное предприятие,
            специализирующееся на разработке и производстве технических средств
            химического контроля, проведении испытаний и метрологических работ.
          </p>
          <p>
            Предприятие основано в 1936 году и с тех пор является одним из ведущих
            центров в области аналитического приборостроения и химического анализа
            в России.
          </p>
          <p>
            Мы выполняем полный цикл работ: от научных исследований и проектирования
            до серийного производства и сервисного обслуживания.
          </p>
          <NuxtLink to="/about/kontakty"  class="about-link">
            Подробнее о нас →
          </NuxtLink>
        </div>
      </div>
    </section>
    
    <!-- Наши партнеры -->
    <div class="partners-section">
      <div class="container">
        <h2 class="partners-title">Наши партнеры</h2>
        
        <PartnersCarousel :partners="partners" :interval="5000" :visible-count="6" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import ServicesCarousel from '~/components/ServicesCarousel.vue'


const partners = [
  { name: 'Газпром', logo: '/images/partners/gazprom.webp' },
  { name: 'Роснефть', logo: '/images/partners/rosneft.webp' },
  { name: 'Транснефть', logo: '/images/partners/transneft.webp' },
  { name: 'Роспотребнадзор', logo: '/images/partners/rospotreb.webp' },
  { name: 'Росаккредитация', logo: '/images/partners/fsa_spb.webp' },
  { name: 'Лукойл', logo: '/images/partners/lukoil.webp' },
  { name: 'МОРФ', logo: '/images/partners/morf.webp' },
  { name: 'Минпромторг', logo: '/images/partners/minpromtorg_logo.webp' },
  { name: 'Росгвардия', logo: '/images/partners/rosgvardiya.webp' },
  { name: 'РЖД', logo: '/images/partners/rzd.webp' },
  { name: 'Росатом', logo: '/images/partners/rosatom.webp' },
  { name: 'МЧС', logo: '/images/partners/mchs.webp' }
]

const services = [
  {
    title: 'Испытательная лаборатория',
    description: 'Испытания, поверка, аттестация оборудования',
    path: '/uslugi/ispytatelnaya-laboratory'
  },
  {
    title: 'Метрология и поверка средств измерений',
    description: 'Поверка СИ, метрологические услуги',
    path: '/uslugi/metrologiya-i-poverka'
  },
  {
    title: 'Аналитическая химия',
    description: 'Химический анализ, экологический мониторинг',
    path: '/uslugi/analiticheskaya-himiya'
  },
  {
    title: 'Разработка приборов и систем',
    description: 'Разработка приборов и систем',
    path: '/konstruktorskoe-byuro'
  },
  {
    title: 'Разработка стандартов',
    description: 'Разработка стандартов и документации',
    path: '/uslugi/standartizaciya'
  },
  {
    title: 'Производство',
    description: 'Производство приборов и узлов химического контроля',
    path: '/uslugi/proizvodstvo'
  },
  {
    title: 'Аренда',
    description: 'Аренда производственных и офисных помещений',
    path: '/uslugi/arenda'
  }
]

const { data: carouselProducts } = await useFetch('/api/products/carousel')

const slides = computed(() => {
  if (!carouselProducts.value?.length) return []
  return carouselProducts.value.map(p => ({
    id: p.id,
    image: p.image_url,
    title: p.title,
    link: `/produkciya/${p.slug || p.id}`
  }))
})


useHead({
  title: 'ГосНИИхиманалит - Научно-производственное предприятие',
  meta: [
    { 
      name: 'description', 
      content: 'Разработка и производство технических средств химического контроля, испытания, метрология' 
    }
  ]
})

</script>

<style scoped>
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.home-page {
  min-height: 100vh;
  background: #fff;
}


.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.hero-block {
  position: relative;
  padding: 3rem 0;
  background-image: url('/images/fon1.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.hero-block::before {
  content: '';
  position: absolute;
  inset: 0;
  /* background: rgba(255, 255, 255, 0); */
  z-index: 0;
  pointer-events: none;
}

.hero-block > * {
  position: relative;
  z-index: 1;
}

.carousel-section {
  padding: 0 0 3rem 0;
  /* border-bottom: 1px solid #e5e7eb; */
  background: transparent;
}

/* Белый оверлей — приглушает картинку */
.carousel-section::before {
  content: '';
  position: absolute;
  inset: 0;
  /* background: rgba(255, 255, 255, 0.2); */
  z-index: 0;
  pointer-events: none;
}

/* Контент поверх фона */
.carousel-section > * {
  position: relative;
  z-index: 1;
}

.carousel-title {
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
  /* color: #005700; */
  margin-bottom: 2rem;
  position: relative;
  text-decoration: dashed;
  /* border: 1px solid #000 */
}

.carousel-wrapper {
  width: 100%;
}

@media (max-width: 768px) {
  .carousel-section {
    padding: 2rem 0 1.5rem;
  }
  
  .carousel-title {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
}

.services-section {
  padding: 3rem 0 0 0;
  background: transparent;
  border-bottom: none;
}

.services-title {
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  /* color: #005700; */
  color: #fff;
  margin-bottom: 2rem;
}

.service-item:hover .service-arrow {
  transform: translateX(4px);
  color: #4cc94a;
}

@media (max-width: 768px) {
  .services-section {
    padding: 2rem 0;
  }
  
  .services-title {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
  
  .services-list {
    grid-template-columns: 1fr;
    gap: 8px;
  }
  
  .service-item {
    padding: 0.875rem 1.25rem;
  }
}

@media (max-width: 1024px) {
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .services-section {
    padding: 2rem 0;
  }
  
  .services-title {
    font-size: 1.5rem;
  }
  
  .services-grid {
    grid-template-columns: 1fr;
  }
}

.about-section {
  padding: 4rem 0;
  position: relative;
  background-image: url('/images/gosnii.webp');
  background-size: cover;
  background-position: center;
  color: #fff;
}

.about-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* background: rgba(0, 87, 0, 0.75); */
  /* background: rgba(123, 171, 90, 0.8); */
  background: rgba(122, 185, 79, 0.8);
  z-index: 0;
}

.about-section .container {
  position: relative;
  z-index: 1;
}

.about-section .section-title {
  color: #fff;
}

.about-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.about-content p {
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.8;
  margin-bottom: 1rem;
  font-size: 1.05rem;
}

.about-link {
  display: inline-block;
  margin-top: 1rem;
  color: #4cc94a;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s;
}

.about-link:hover {
  color: #fff;
  text-decoration: underline;
}

/* Блок партнеров */
.partners-section {
  padding: 40px 0;
  background: var(--bg-section);
  border-top: 1px solid #e5e7eb;
  border-bottom: 1px solid #e5e7eb;
}

.partners-title {
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  color: #005700;
  margin-bottom: 2rem;
  position: relative;
}

@media (max-width: 768px) {
  .partners-title {
    font-size: 1.5rem;
  }
}
</style>