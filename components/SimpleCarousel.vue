<template>
  <div class="simple-carousel">
    <div class="carousel-container">
      <div class="carousel-slide">
        <div 
          v-for="(slide, index) in getCurrentSlides()" 
          :key="`${currentIndex}-${index}`"
          class="slide-item"
        >
          <img 
            :src="slide.image" 
            :alt="`Слайд ${currentIndex * slidesPerView + index + 1}`"
            class="carousel-image"
          />
        </div>
      </div>
    </div>
    
    <!-- Стрелки -->
    <button type="button" class="carousel-arrow left" @click="prevSlide" aria-label="Предыдущий слайд">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    <button type="button" class="carousel-arrow right" @click="nextSlide" aria-label="Следующий слайд">
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

const slidesPerView = computed(() => {
  if (windowWidth.value <= 480) {
    return 1
  } else if (windowWidth.value <= 768) {
    return 2
  } else {
    return 3
  }
})

const totalSlides = computed(() => {
  return Math.ceil(props.slides.length / slidesPerView.value)
})

function getCurrentSlides() {
  const start = currentIndex.value * slidesPerView.value
  const end = start + slidesPerView.value
  return props.slides.slice(start, end)
}

function nextSlide() {
  currentIndex.value = (currentIndex.value + 1) % totalSlides.value
}

function prevSlide() {
  currentIndex.value = (currentIndex.value - 1 + totalSlides.value) % totalSlides.value
}

function handleResize() {
  windowWidth.value = window.innerWidth
  currentIndex.value = 0
}

onMounted(() => {
  windowWidth.value = window.innerWidth
  window.addEventListener('resize', handleResize)
  timer = setInterval(nextSlide, props.interval)
})

onBeforeUnmount(() => {
  clearInterval(timer)
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.simple-carousel {
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  height: 400px;
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
  transition: opacity 0.5s ease;
}

.slide-item {
  flex: 1;
  height: 100%;
  min-width: 0;
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  background: #f8fafc;
  border-radius: 8px;
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

/* Планшеты */
@media (max-width: 768px) {
  .carousel-slide {
    gap: 10px;
    padding: 0 50px;
  }
  
  .simple-carousel {
    height: 300px;
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
    height: 250px;
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