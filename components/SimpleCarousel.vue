<template>
  <div class="simple-carousel">
    <div class="carousel-container"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
    >
      <TransitionGroup name="slide" tag="div" class="carousel-slide">
        <template v-for="(slide, index) in getCurrentSlides()" :key="slide.id || `${currentIndex}-${index}`">
          <NuxtLink 
            v-if="slide.link" 
            :to="slide.link" 
            class="slide-item"
          >
            <img :src="slide.image" :alt="slide.title || 'Слайд'" class="carousel-image" />
            <div v-if="slide.title" class="slide-title">{{ slide.title }}</div>
          </NuxtLink>
          <div v-else class="slide-item">
            <img :src="slide.image" :alt="slide.title || 'Слайд'" class="carousel-image" />
            <div v-if="slide.title" class="slide-title">{{ slide.title }}</div>
          </div>
        </template>
      </TransitionGroup>
    </div>
    
    <!-- Стрелки -->
    <button type="button" class="carousel-arrow left" @click="handlePrev"  @mouseenter="onMouseEnter" @mouseleave="onMouseLeave" aria-label="Предыдущий слайд">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    <button type="button" class="carousel-arrow right" @click="handleNext" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave" aria-label="Следующий слайд">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 6L15 12L9 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  slides: {
    type: Array,
    required: true
  },
  interval: {
    type: Number,
    default: 5000
  }
})

const currentIndex = ref(0)
let timer = null
const windowWidth = ref(1200)
const isPaused = ref(false)

const slidesPerView = computed(() => {
  if (windowWidth.value <= 480) return 1
  if (windowWidth.value <= 768) return 2
  return 3
})

const totalSlides = computed(() => {
  return Math.ceil(props.slides.length / slidesPerView.value)
})

function getCurrentSlides() {
  const start = currentIndex.value * slidesPerView.value
  const end = start + slidesPerView.value
  return props.slides.slice(start, end)
}

function startTimer() {
  stopTimer()
  if (props.interval > 0 && !isPaused.value) {
    timer = setInterval(nextSlide, props.interval)
  }
}

function stopTimer() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

function resetTimer() {
  startTimer()
}

function nextSlide() {
  currentIndex.value = (currentIndex.value + 1) % totalSlides.value
}

function prevSlide() {
  currentIndex.value = (currentIndex.value - 1 + totalSlides.value) % totalSlides.value
}

// Ручное переключение — сбрасываем таймер
function handleNext() {
  nextSlide()
  resetTimer()
}

function handlePrev() {
  prevSlide()
  resetTimer()
}

// Пауза при наведении
function onMouseEnter() {
  isPaused.value = true
  stopTimer()
}

function onMouseLeave() {
  isPaused.value = false
  startTimer()
}

function handleResize() {
  windowWidth.value = window.innerWidth
  currentIndex.value = 0
}

onMounted(() => {
  windowWidth.value = window.innerWidth
  window.addEventListener('resize', handleResize)
  startTimer()
})

onBeforeUnmount(() => {
  stopTimer()
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.simple-carousel {
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  height: 450px;
  overflow: hidden;
}

.carousel-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.carousel-slide {
  display: flex;
  gap: 20px;
  width: 100%;
  height: 100%;
  padding: 0 80px;
  position: relative;
  overflow: hidden;
}

.slide-item {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 100%;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 6px;
  border-radius: 12px;
}

.slide-item:hover {
  /* transform: translateY(-6px) scale(1.03); */
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 0 12px 28px rgba(0, 87, 0, 0.25);
}

.slide-item:active {
  transform: translateY(-2px) scale(1.01);
  transition: all 0.1s;
}

.carousel-image {
  width: 100%;
  flex: 1;
  min-height: 0;
  object-fit: contain;
  display: block;
  border-radius: 8px;
  
}

.carousel-image:hover {
  box-shadow: 0 12px 28px rgba(0, 87, 0, 0.25);
  outline: 3px solid #f3db02;
  outline-offset: 2px;
}

.slide-title {
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: #005700;
  padding: 8px 10px;
  background: #f0f5f0;
  border-radius: 4px;
  line-height: 1.3;
  flex-shrink: 0;
  height: 50px;                 /* ← фиксированная высота */
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;             /* ← если текст не влезает, обрезается */
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

.carousel-arrow:active {
  transform: translateY(-50%) scale(0.95);
}

.carousel-arrow.left {
  left: 15px;
}

.carousel-arrow.right {
  right: 15px;
}

/* Анимация сдвига */
.slide-enter-active,
.slide-leave-active {
  transition: all 1s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

/* Важно: leave-элементы должны быть absolute, чтобы не толкать других */
.slide-leave-active {
  position: absolute;
  width: calc(33% - 20px);   /* под slidesPerView */
}

/* Планшеты */
@media (max-width: 768px) {
  .carousel-slide {
    gap: 10px;
    padding: 0 50px;
  }
  
  .simple-carousel {
    height: 320px;
  }
  
  .slide-title {
    font-size: 12px;
    padding: 4px 8px;
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

/* Мобильные */
@media (max-width: 480px) {
  .carousel-slide {
    gap: 0;
    padding: 0 40px;
  }
  
  .simple-carousel {
    height: 260px;
  }
  
  .slide-title {
    font-size: 11px;
    padding: 3px 6px;
  }
  
  .carousel-arrow {
    width: 32px;
    height: 32px;
  }
  
  .carousel-arrow.left {
    left: 5px;
  }
  
  .carousel-arrow.right {
    right: 5px;
  }
}
</style>