<script setup>
import { ref, computed, onMounted } from 'vue'
import { useContentService } from '~/composables/useContentService'

const activeCategory = ref('all')
const dialogVisible = ref(false)
const selectedProduct = ref(null)
const products = ref([])
const categories = ref([])
const loading = ref(true)
const error = ref(null)

const contentService = useContentService()

const loadData = async () => {
  try {
    loading.value = true
    error.value = null
    
    console.log('🔄 Начинаем загрузку данных...')
    
    const [productsData, categoriesData] = await Promise.all([
      contentService.getAllProducts(),
      contentService.getCategories()
    ])
    
    console.log('📦 Получено товаров:', productsData?.length || 0)
    console.log('📦 Получено категорий:', categoriesData?.length || 0)
    
    products.value = productsData || []
    categories.value = categoriesData || []
    
  } catch (err) {
    console.error('❌ Ошибка загрузки:', err)
    error.value = err.message
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadData()
})

const filteredProducts = computed(() => {
  if (!products.value || products.value.length === 0) return []
  if (activeCategory.value === 'all') {
    return products.value
  }
  return products.value.filter(p => {
    const categorySlug = p.category?.toLowerCase().replace(/\s+/g, '-') || ''
    return categorySlug === activeCategory.value
  })
})

function showProductDetails(product) {
  selectedProduct.value = product
  dialogVisible.value = true
}

function requestQuote(product) {
  dialogVisible.value = false
  alert(`Запрос на "${product.name}" отправлен. Мы свяжемся с вами!`)
}

function formatPrice(price) {
  return new Intl.NumberFormat('ru-RU').format(price)
}

useHead({
  title: 'Продукция - ГосНИИхиманалит',
  meta: [
    { 
      name: 'description', 
      content: 'Каталог продукции ГосНИИхиманалит' 
    }
  ]
})
</script>

<!-- Всё остальное (template и style) остаётся без изменений -->


<template>
  <div class="products-page">
    <div class="container">
      <h1 class="page-title">Продукция</h1>
      
      <!-- Загрузка -->
      <div v-if="loading" class="loading">
        <p>Загрузка товаров...</p>
      </div>
      
      <!-- Ошибка -->
      <div v-else-if="error" class="error">
        <p>Ошибка загрузки: {{ error.message }}</p>
      </div>
      
      <!-- Контент -->
      <template v-else>
        <!-- Фильтры -->
        <div class="filters">
          <button 
            type="button"
            class="filter-btn"
            :class="{ 'active': activeCategory === 'all' }"
            @click="activeCategory = 'all'"
          >
            Все
          </button>
          <button 
            v-for="category in categories" 
            :key="category.slug"
            type="button"
            class="filter-btn"
            :class="{ 'active': activeCategory === category.slug }"
            @click="activeCategory = category.slug"
          >
            {{ category.name }}
          </button>
        </div>
        
        <!-- Список товаров -->
        <div class="products-grid">
          <div 
            v-for="product in filteredProducts" 
            :key="product.id"
            class="product-card"
          >
            <div class="product-image-wrapper">
              <img 
                :src="product.images?.[0] || '/images/products/placeholder.svg'" 
                :alt="product.name"
                class="product-image"
              />
            </div>
            
            <div class="product-info">
              <h3 class="product-title">{{ product.name }}</h3>
              <p class="product-description">{{ product.shortDescription }}</p>
              
              <div class="product-tags">
                <span class="product-tag">{{ product.category }}</span>
                <span v-if="product.isNew" class="product-tag product-tag--new">Новинка</span>
                <span v-if="product.isPopular" class="product-tag product-tag--popular">Популярный</span>
              </div>
              
              <div class="product-price">
                <span class="price-current">{{ formatPrice(product.price) }} ₽</span>
                <span v-if="product.oldPrice" class="price-old">{{ formatPrice(product.oldPrice) }} ₽</span>
              </div>
              
              <div class="product-actions">
                <button 
                  type="button"
                  class="details-btn"
                  @click="showProductDetails(product)"
                >
                  Подробнее
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Пусто -->
        <div v-if="filteredProducts.length === 0" class="empty">
          <p>Товаров в этой категории пока нет</p>
        </div>
      </template>
      
      <!-- Модальное окно -->
      <div v-if="dialogVisible" class="modal-overlay" @click="dialogVisible = false">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h2>{{ selectedProduct?.name }}</h2>
            <button class="close-btn" @click="dialogVisible = false">✕</button>
          </div>
          
          <div v-if="selectedProduct" class="modal-body">
            <div class="detail-row">
              <span class="detail-label">Категория:</span>
              <span>{{ selectedProduct.category }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Цена:</span>
              <span class="price-current">{{ formatPrice(selectedProduct.price) }} ₽</span>
              <span v-if="selectedProduct.oldPrice" class="price-old">
                {{ formatPrice(selectedProduct.oldPrice) }} ₽
              </span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Наличие:</span>
              <span class="in-stock">{{ selectedProduct.inStock ? 'В наличии' : 'Нет в наличии' }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Описание:</span>
              <p>{{ selectedProduct.fullDescription }}</p>
            </div>
            <div class="detail-row">
              <span class="detail-label">Технические характеристики:</span>
              <ul class="specs-list">
                <li v-for="spec in selectedProduct?.specs || []" :key="spec.name || $index">
                  <strong>{{ spec.name }}:</strong> {{ spec.value }} {{ spec.unit }}
                </li>
              </ul>
            </div>
          </div>
          
          <div class="modal-footer">
            <button class="btn-secondary" @click="dialogVisible = false">Закрыть</button>
            <button class="btn-primary" @click="requestQuote(selectedProduct)">
              Запросить цену
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

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
.empty,
.error {
  text-align: center;
  padding: 4rem 0;
  font-size: 1.2rem;
  color: #6b7280;
}

.error {
  color: #dc2626;
}

.filters {
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
}

.filter-btn {
  padding: 10px 20px;
  background: #fff;
  color: #333;
  border: 2px solid #e5e7eb;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.filter-btn:hover {
  border-color: #005700;
  color: #005700;
}

.filter-btn.active {
  background: #005700;
  color: #fff;
  border-color: #005700;
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
}

.product-card:hover {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transform: translateY(-5px);
  border-color: #005700;
}

.product-image-wrapper {
  width: 100%;
  height: 200px;
  background: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
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

.product-description {
  color: #6b7280;
  margin-bottom: 1rem;
  flex: 1;
  font-size: 14px;
}

.product-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.product-tag {
  padding: 4px 10px;
  background: #f0f9f0;
  color: #005700;
  border: 1px solid #005700;
  border-radius: 4px;
  font-size: 12px;
}

.product-tag--new {
  background: #e3f2fd;
  color: #0d47a1;
  border-color: #0d47a1;
}

.product-tag--popular {
  background: #fff3e0;
  color: #e65100;
  border-color: #e65100;
}

.product-price {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 1rem;
}

.price-current {
  font-size: 20px;
  font-weight: 700;
  color: #005700;
}

.price-old {
  font-size: 16px;
  color: #999;
  text-decoration: line-through;
}

.product-actions {
  display: flex;
  justify-content: flex-end;
}

.details-btn {
  padding: 10px 24px;
  background: #005700;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s;
}

.details-btn:hover {
  background: #003d00;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
}

.modal-content {
  background: #fff;
  border-radius: 8px;
  max-width: 600px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem;
  border-bottom: 1px solid #e5e7eb;
}

.modal-header h2 {
  font-size: 1.5rem;
  color: #333;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6b7280;
}

.close-btn:hover {
  color: #333;
}

.modal-body {
  padding: 1.25rem;
}

.detail-row {
  margin-bottom: 1rem;
}

.detail-label {
  display: block;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.25rem;
}

.in-stock {
  color: #005700;
  font-weight: 500;
}

.specs-list {
  list-style: none;
  padding-left: 0;
  margin-top: 0.5rem;
}

.specs-list li {
  padding: 4px 0;
  border-bottom: 1px solid #f0f0f0;
  color: #4b5563;
}

.specs-list li strong {
  color: #333;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 1.25rem;
  border-top: 1px solid #e5e7eb;
}

.btn-secondary {
  padding: 10px 24px;
  background: #fff;
  color: #333;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-secondary:hover {
  border-color: #333;
}

.btn-primary {
  padding: 10px 24px;
  background: #005700;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-primary:hover {
  background: #003d00;
}

@media (max-width: 1024px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .filters {
    flex-direction: column;
    align-items: stretch;
  }
  
  .filter-btn {
    text-align: center;
  }
  
  .product-image-wrapper {
    height: 150px;
  }
}

@media (max-width: 480px) {
  .products-grid {
    grid-template-columns: 1fr;
  }
}
</style>