<template>
  <div class="products-page">
    <div class="container">
      <h1 class="page-title">Продукция</h1>
      
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
          type="button"
          class="filter-btn"
          :class="{ 'active': activeCategory === 'analytical' }"
          @click="activeCategory = 'analytical'"
        >
          Аналитическое оборудование
        </button>
        <button 
          type="button"
          class="filter-btn"
          :class="{ 'active': activeCategory === 'sensors' }"
          @click="activeCategory = 'sensors'"
        >
          Датчики и сенсоры
        </button>
        <button 
          type="button"
          class="filter-btn"
          :class="{ 'active': activeCategory === 'systems' }"
          @click="activeCategory = 'systems'"
        >
          Системы контроля
        </button>
      </div>
      
      <!-- Список продуктов -->
      <div class="products-grid">
        <div 
          v-for="product in filteredProducts" 
          :key="product.id"
          class="product-card"
        >
          <div class="product-image-wrapper">
            <img 
              :src="product.image" 
              :alt="product.title"
              class="product-image"
            />
          </div>
          
          <div class="product-info">
            <h3 class="product-title">{{ product.title }}</h3>
            <p class="product-description">{{ product.description }}</p>
            
            <div class="product-tags">
              <span 
                v-for="tag in product.tags" 
                :key="tag"
                class="product-tag"
              >
                {{ tag }}
              </span>
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
      
      <!-- Модальное окно -->
      <div v-if="dialogVisible" class="modal-overlay" @click="dialogVisible = false">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h2>{{ selectedProduct?.title }}</h2>
            <button class="close-btn" @click="dialogVisible = false">✕</button>
          </div>
          
          <div v-if="selectedProduct" class="modal-body">
            <div class="detail-row">
              <span class="detail-label">Категория:</span>
              <span>{{ selectedProduct.category }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Наличие:</span>
              <span class="in-stock">В наличии</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Описание:</span>
              <p>{{ selectedProduct.fullDescription }}</p>
            </div>
            <div class="detail-row">
              <span class="detail-label">Технические характеристики:</span>
              <ul class="specs-list">
                <li v-for="spec in selectedProduct.specs" :key="spec">
                  {{ spec }}
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

<script setup>
import { ref, computed } from 'vue'

const activeCategory = ref('all')
const dialogVisible = ref(false)
const selectedProduct = ref(null)

const products = ref([
  {
    id: 1,
    title: 'Газоанализатор ГАН-1',
    description: 'Промышленный газоанализатор для контроля воздуха рабочей зоны',
    fullDescription: 'Газоанализатор ГАН-1 предназначен для непрерывного контроля содержания вредных веществ в воздухе рабочей зоны промышленных предприятий.',
    category: 'Аналитическое оборудование',
    image: '/images/products/placeholder.svg',
    tags: ['Газоанализ', 'Промышленность'],
    specs: [
      'Диапазон измерения: 0-100 мг/м³',
      'Погрешность: ±5%',
      'Время отклика: не более 30 сек',
      'Температура эксплуатации: -40°C до +50°C'
    ]
  },
  {
    id: 2,
    title: 'Хроматограф ХРОМ-2',
    description: 'Лабораторный хроматограф для анализа сложных смесей',
    fullDescription: 'Хроматограф ХРОМ-2 предназначен для качественного и количественного анализа сложных смесей органических и неорганических соединений.',
    category: 'Аналитическое оборудование',
    image: '/images/products/placeholder.svg',
    tags: ['Хроматография', 'Лаборатория'],
    specs: [
      'Детектор: ПИД, ДТП',
      'Чувствительность: 10⁻¹² г/с',
      'Диапазон температур: 20-400°C',
      'Программирование температуры'
    ]
  },
  {
    id: 3,
    title: 'Датчик кислорода ДК-1',
    description: 'Электрохимический датчик для измерения концентрации кислорода',
    fullDescription: 'Датчик кислорода ДК-1 предназначен для измерения объемной доли кислорода в газовых смесях.',
    category: 'Датчики и сенсоры',
    image: '/images/products/placeholder.svg',
    tags: ['Датчик', 'Кислород'],
    specs: [
      'Диапазон: 0-25% об.',
      'Точность: ±0.1% об.',
      'Срок службы: 2 года',
      'Рабочая температура: -20°C до +50°C'
    ]
  },
  {
    id: 4,
    title: 'Система мониторинга СМ-1',
    description: 'Комплексная система экологического мониторинга',
    fullDescription: 'Система мониторинга СМ-1 предназначена для комплексного контроля параметров окружающей среды на промышленных объектах.',
    category: 'Системы контроля',
    image: '/images/products/placeholder.svg',
    tags: ['Мониторинг', 'Экология'],
    specs: [
      'Количество каналов: до 32',
      'Интерфейс: RS-485, Ethernet',
      'Протокол: Modbus RTU/TCP',
      'Встроенная память: 4 ГБ'
    ]
  },
  {
    id: 5,
    title: 'Газосигнализатор ГС-3',
    description: 'Портативный газосигнализатор для обнаружения утечек',
    fullDescription: 'Газосигнализатор ГС-3 предназначен для обнаружения утечек горючих газов и паров в промышленных и бытовых условиях.',
    category: 'Датчики и сенсоры',
    image: '/images/products/placeholder.svg',
    tags: ['Газосигнализатор', 'Безопасность'],
    specs: [
      'Тип сенсора: каталитический',
      'Порог срабатывания: 10% НКПР',
      'Время отклика: 10 сек',
      'Автономность: 24 часа'
    ]
  },
  {
    id: 6,
    title: 'Анализатор жидкости АЖ-1',
    description: 'Автоматический анализатор для контроля качества воды',
    fullDescription: 'Анализатор жидкости АЖ-1 предназначен для автоматического контроля показателей качества воды в системах водоподготовки.',
    category: 'Аналитическое оборудование',
    image: '/images/products/placeholder.svg',
    tags: ['Водоподготовка', 'Анализ воды'],
    specs: [
      'Параметры: pH, ОВП, проводимость',
      'Точность: ±0.01 pH',
      'Автокалибровка',
      'Выход: 4-20 мА'
    ]
  }
])

const filteredProducts = computed(() => {
  if (activeCategory.value === 'all') {
    return products.value
  }
  
  const categoryMap = {
    'analytical': 'Аналитическое оборудование',
    'sensors': 'Датчики и сенсоры',
    'systems': 'Системы контроля'
  }
  
  return products.value.filter(p => p.category === categoryMap[activeCategory.value])
})

function showProductDetails(product) {
  selectedProduct.value = product
  dialogVisible.value = true
}

function requestQuote(product) {
  dialogVisible.value = false
  alert(`Запрос на "${product.title}" отправлен. Мы свяжемся с вами!`)
}

useHead({
  title: 'Продукция - ГосНИИХиманалит',
  meta: [
    { 
      name: 'description', 
      content: 'Каталог продукции ГосНИИХиманалит: газоанализаторы, хроматографы, датчики, системы мониторинга' 
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
  color: #29b026;
  margin-bottom: 2rem;
  text-align: center;
}

/* Фильтры */
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
  border-color: #29b026;
  color: #29b026;
}

.filter-btn.active {
  background: #29b026;
  color: #fff;
  border-color: #29b026;
}

/* Сетка продуктов */
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
  border-color: #29b026;
}

.product-image-wrapper {
  width: 100%;
  height: 200px;
  background: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
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
  color: #29b026;
  border: 1px solid #29b026;
  border-radius: 4px;
  font-size: 12px;
}

.product-actions {
  display: flex;
  justify-content: flex-end;
}

.details-btn {
  padding: 10px 24px;
  background: #29b026;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s;
}

.details-btn:hover {
  background: #1a7a1a;
}

/* Модальное окно */
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
  color: #29b026;
  font-weight: 500;
}

.specs-list {
  list-style: disc;
  padding-left: 1.5rem;
  margin-top: 0.5rem;
}

.specs-list li {
  margin-bottom: 0.5rem;
  color: #4b5563;
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
  background: #29b026;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-primary:hover {
  background: #1a7a1a;
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