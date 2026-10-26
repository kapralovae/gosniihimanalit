<template>
  <div class="services-carousel">
    <div class="carousel-container">
      <div class="carousel-slide" :key="currentIndex">
        <NuxtLink 
          v-for="(service, index) in getCurrentServices()" 
          :key="`${currentIndex}-${index}`"
          :to="service.path"
          class="service-card"
        >
          <h3 class="service-name">{{ service.title }}</h3>
          <p class="service-desc">{{ service.description }}</p>
          <span class="service-arrow">Подробнее →</span>
        </NuxtLink>
      </div>
    </div>
    
    <button type="button" class="carousel-arrow left" @click="prevSlide" aria-label="Предыдущий">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    <button type="button" class="carousel-arrow right" @click="nextSlide" aria-label="Следующий">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M9 6L15 12L9 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>

    <!-- Точки-индикаторы -->
    <div class="carousel-dots">
      <button 
        v-for="i in services.length" 
        :key="i"
        :class="['dot', { active: (i - 1) === currentIndex }]"
        @click="currentIndex = i - 1"
        :aria-label="`Слайд ${i}`"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  services: {
    type: Array,
    required: true
  },
  interval: {
    type: Number,
    default: 5000
  },
  visibleCount: {
    type: Number,
    default: 3
  }
})

const currentIndex = ref(0)
let timer = null
const windowWidth = ref(1200)

const slidesPerView = computed(() => {
  if (windowWidth.value <= 640) return 1
  if (windowWidth.value <= 1024) return 2
  return props.visibleCount
})

const totalSlides = computed(() => props.services.length)

function getCurrentServices() {
  const result = []
  const total = props.services.length
  for (let i = 0; i < slidesPerView.value; i++) {
    const index = (currentIndex.value + i) % total
    result.push(props.services[index])
  }
  return result
}

function nextSlide() {
  currentIndex.value = (currentIndex.value + 1) % totalSlides.value
}

function prevSlide() {
  currentIndex.value = (currentIndex.value - 1 + totalSlides.value) % totalSlides.value
}

function handleResize() {
  windowWidth.value = window.innerWidth
}

onMounted(() => {
  windowWidth.value = window.innerWidth
  window.addEventListener('resize', handleResize)
  if (props.interval > 0) {
    timer = setInterval(nextSlide, props.interval)
  }
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.services-carousel {
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding-bottom: 50px;
}

.carousel-container {
  overflow: hidden;
  padding: 0 60px;
}

.carousel-slide {
  display: flex;
  gap: 20px;
  animation: slideIn 0.6s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.service-card {
  flex: 0 0 calc((100% - 40px) / 3);
  min-width: 0;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1.75rem;
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  transition: all 0.3s;
  cursor: pointer;
  min-height: 220px;
}

.service-card:hover {
  border-color: #005700;
  box-shadow: 0 10px 25px rgba(0, 87, 0, 0.12);
  transform: translateY(-4px);
}

.service-name {
  font-size: 1.15rem;
  font-weight: 700;
  color: #005700;
  margin: 0;
  line-height: 1.3;
}

.service-desc {
  font-size: 0.9rem;
  color: #6b7280;
  line-height: 1.5;
  margin: 0;
  flex: 1;
}

.service-arrow {
  font-size: 0.9rem;
  font-weight: 600;
  color: #005700;
  align-self: flex-start;
  transition: transform 0.25s;
}

.service-card:hover .service-arrow {
  transform: translateX(4px);
  color: #4cc94a;
}

.carousel-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  background: #fff;
  color: #005700;
  border: 2px solid #005700;
  border-radius: 50%;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.carousel-arrow:hover {
  background: #005700;
  color: #fff;
  box-shadow: 0 4px 12px rgba(0, 87, 0, 0.3);
}

.carousel-arrow.left {
  left: 0;
}

.carousel-arrow.right {
  right: 0;
}

/* Точки-индикаторы */
.carousel-dots {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 20px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #d1d5db;
  border: none;
  cursor: pointer;
  transition: all 0.3s;
  padding: 0;
}

.dot:hover {
  background: #9ca3af;
}

.dot.active {
  background: #005700;
  width: 28px;
  border-radius: 5px;
}

/* Адаптив */
@media (max-width: 1024px) {
  .service-card {
    flex: 0 0 calc((100% - 20px) / 2);
  }
}

@media (max-width: 640px) {
  .carousel-container {
    padding: 0 45px;
  }
  
  .service-card {
    flex: 0 0 100%;
    min-height: 180px;
  }
  
  .carousel-arrow {
    width: 36px;
    height: 36px;
  }
  
  .carousel-arrow svg {
    width: 20px;
    height: 20px;
  }
}
</style>