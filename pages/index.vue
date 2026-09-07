<template>
  <div class="home-page">
    <!-- Карусель -->
    <div class="carousel-wrapper">
      <SimpleCarousel :slides="slides" :interval="5000" />
    </div>
    
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
const slides = [
  { image: '/images/22-1.webp' },
  { image: '/images/104main5.webp' },
  { image: '/images/ant-3m.webp' },
  { image: '/images/ant-zm1.webp' },
  { image: '/images/bezymyannyj.webp' },
  { image: '/images/foto_gsa-r.webp' },
  { image: '/images/foto2_gsi_1.webp' },
  { image: '/images/gdu-01f.webp' },
  { image: '/images/gsa-aig.webp' },
  { image: '/images/gsa-d.webp' },
  { image: '/images/img_20191217_162450.webp' }
]

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

useHead({
  title: 'ГосНИИХиманалит - Научно-производственное предприятие',
  meta: [
    { 
      name: 'description', 
      content: 'Разработка и производство технических средств химического контроля, испытания, метрология' 
    }
  ]
})
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  background: #fff;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.carousel-wrapper {
  width: 100%;
}

/* Блок партнеров */
.partners-section {
  padding: 40px 0;
  background: #f8fafc;
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

.partners-title::after {
  content: '';
  display: block;
  width: 60px;
  height: 3px;
  background: #005700;
  margin: 10px auto 0;
}

@media (max-width: 768px) {
  .partners-title {
    font-size: 1.5rem;
  }
}
</style>