<template>
  <div class="products-page">
    <div class="container">
      <h1 class="page-title">Продукция</h1>
      
      <!-- Загрузка -->
      <div v-if="loading" class="loading">
        Загрузка...
      </div>
      
      <!-- Пусто -->
      <div v-else-if="products.length === 0" class="empty">
        Товары не найдены
      </div>
      
      <!-- Список продуктов -->
      <div v-else class="products-grid">
        <NuxtLink 
          v-for="product in products" 
          :key="product.id"
          :to="getProductLink(product)"
          class="product-card"
        >
          <div class="product-image-wrapper">
            <img 
              :src="product.image_url || '/images/placeholder.svg'" 
              :alt="product.title || 'Товар'" 
              class="product-image"
            />
          </div>
          
          <div class="product-info">
            <h3 class="product-title">{{ product.title }}</h3>
            
            <p class="product-description">
              {{ product.description || product.purpose || '' }}
            </p>
            
            <!-- Особенности — первые 3 -->
            <div v-if="product.features && product.features.length" class="product-tags">
              <span 
                v-for="(feature, index) in product.features.slice(0, 3)" 
                :key="index"
                class="product-tag"
              >
                {{ feature.length > 40 ? feature.slice(0, 40) + '…' : feature }}
              </span>
              <span v-if="product.features.length > 3" class="product-tag product-tag-more">
                +{{ product.features.length - 3 }}
              </span>
            </div>
            
            <div class="product-actions">
              <span class="details-link">
                Подробнее →
              </span>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const products = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const data = await $fetch('/api/products')
    products.value = data || []
  } catch (error) {
    console.error('Ошибка:', error)
    products.value = []
  } finally {
    loading.value = false
  }
})

function getProductLink(product) {
  // Если есть slug — используем его, иначе ID
  return product.slug 
    ? `/produkciya/${product.slug}` 
    : `/produkciya/${product.id}`
}

useHead({
  title: 'Продукция - ГосНИИХиманалит',
  meta: [
    { 
      name: 'description', 
      content: 'Каталог продукции ГосНИИХиманалит' 
    }
  ]
})
</script>

<style scoped>
.products-page {
  min-height: 100vh;
  padding: 2rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #005700;
  margin-bottom: 2rem;
  text-align: center;
}

.loading,
.empty {
  text-align: center;
  padding: 3rem;
  font-size: 1.25rem;
  color: #6b7280;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.product-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
}

.product-card:hover {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transform: translateY(-5px);
  border-color: #005700;
}

.product-image-wrapper {
  width: 100%;
  height: 200px;
  background: var(--bg-section);
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 10px;
  background: var(--bg-section);
}

.product-info {
  padding: 1.25rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.product-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
}

/* Ограничение высоты описания */
.product-description {
  /* display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;   
  -webkit-box-orient: vertical;
  overflow: hidden; */
  font-size: 0.9rem;
  line-height: 1.5;
}

/* Карточка одинаковая высота */
.product-card {
  min-height: 480px;
}

/* Тег «+N» — серый */
.product-tag-more {
  background: #e5e7eb;
  color: #6b7280;
  border-color: #d1d5db;
}

.product-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.product-tag {
  padding: 4px 10px;
  background: #f0f5f0;
  color: #005700;
  border: 1px solid #005700;
  border-radius: 4px;
  font-size: 12px;
}

.product-actions {
  display: flex;
  justify-content: flex-end;
}

.details-link {
  color: #005700;
  font-weight: 600;
  font-size: 14px;
  transition: color 0.3s;
}

.product-card:hover .details-link {
  color: #4cc94a;
}

@media (max-width: 1024px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .products-grid {
    grid-template-columns: 1fr;
  }
}
</style>