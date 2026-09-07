<template>
  <div class="partners-carousel">
    <div class="carousel-container">
      <div class="carousel-slide">
        <div 
          v-for="(partner, index) in getCurrentPartners()" 
          :key="`${currentIndex}-${index}`"
          class="partner-item"
        >
          <img 
            :src="partner.logo" 
            :alt="partner.name"
            class="partner-logo"
          />
          <span class="partner-name">{{ partner.name }}</span>
        </div>
      </div>
    </div>
    
    <button type="button" class="carousel-arrow left" @click="prevSlide" aria-label="Предыдущий">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    <button type="button" class="carousel-arrow right" @click="nextSlide" aria-label="Следующий">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 6L15 12L9 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  partners: {
    type: Array,
    required: true
  },
  interval: {
    type: Number,
    default: 1000
  },
  visibleCount: {
    type: Number,
    default: 6
  }
})

const currentIndex = ref(0)
let timer = null
const windowWidth = ref(1200)

const slidesPerView = computed(() => {
  if (windowWidth.value <= 480) {
    return 2
  } else if (windowWidth.value <= 768) {
    return 3
  } else if (windowWidth.value <= 1024) {
    return 4
  } else {
    return props.visibleCount
  }
})

const totalSlides = computed(() => {
  return props.partners.length
})

function getCurrentPartners() {
  const result = []
  for (let i = 0; i < slidesPerView.value; i++) {
    const index = (currentIndex.value + i) % props.partners.length
    result.push(props.partners[index])
  }
  return result
}

function nextSlide() {
  // Сдвигаем на 1 позицию
  currentIndex.value = (currentIndex.value + 1) % props.partners.length
}

function prevSlide() {
  currentIndex.value = (currentIndex.value - 1 + props.partners.length) % props.partners.length
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
.partners-carousel {
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  overflow: hidden;
}

.carousel-container {
  width: 100%;
}

.carousel-slide {
  display: flex;
  gap: 30px;
  padding: 0 60px;
}

.partner-item {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  text-align: center;
}

.partner-logo {
  width: 100%;
  height: 80px;
  object-fit: contain;
  transition: transform 0.3s;
}

.partner-item:hover .partner-logo {
  transform: scale(1.05);
}

.partner-name {
  font-size: 14px;
  color: #4b5563;
  font-weight: 500;
}

.carousel-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 36px;
  height: 36px;
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
}

.carousel-arrow.left {
  left: 0;
}

.carousel-arrow.right {
  right: 0;
}

@media (max-width: 1024px) {
  .carousel-slide {
    gap: 20px;
  }
  
  .partner-logo {
    height: 60px;
  }
}

@media (max-width: 768px) {
  .carousel-slide {
    gap: 15px;
    padding: 0 40px;
  }
  
  .partner-logo {
    height: 50px;
  }
  
  .partner-name {
    font-size: 12px;
  }
  
  .carousel-arrow {
    width: 30px;
    height: 30px;
  }
}

@media (max-width: 480px) {
  .carousel-slide {
    gap: 10px;
    padding: 0 35px;
  }
  
  .partner-logo {
    height: 40px;
  }
  
  .partner-name {
    font-size: 11px;
  }
}
</style>