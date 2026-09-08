<!-- components/ProductCard.vue -->
<template>
  <div class="product-card" :class="{ 'out-of-stock': !product.inStock }">
    <div class="product-card__badges">
      <span v-if="product.isNew" class="badge badge--new">Новинка</span>
      <span v-if="product.isPopular" class="badge badge--popular">Популярный</span>
      <span v-if="!product.inStock" class="badge badge--out">Нет в наличии</span>
    </div>

    <div class="product-card__image">
      <img :src="product.images[0]" :alt="product.name" />
    </div>

    <div class="product-card__content">
      <div class="product-card__category">{{ product.category }}</div>
      <h3 class="product-card__title">{{ product.name }}</h3>
      <p class="product-card__description">{{ product.shortDescription }}</p>
      
      <div class="product-card__prices">
        <span class="product-card__price">{{ formatPrice(product.price) }} ₽</span>
        <span v-if="product.oldPrice" class="product-card__old-price">
          {{ formatPrice(product.oldPrice) }} ₽
        </span>
      </div>

      <button 
        class="product-card__button"
        @click="goToProduct(product.id)"
        :disabled="!product.inStock"
      >
        {{ product.inStock ? 'Подробнее' : 'Нет в наличии' }}
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const formatPrice = (price) => {
  return new Intl.NumberFormat('ru-RU').format(price)
}

const goToProduct = (id) => {
  navigateTo(`/products/${id}`)
}
</script>

<style scoped>
.product-card {
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  background: white;
  position: relative;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
}

.product-card.out-of-stock {
  opacity: 0.7;
}

.product-card__badges {
  position: absolute;
  top: 12px;
  left: 12px;
  display: flex;
  gap: 8px;
  z-index: 1;
}

.badge {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  color: white;
}

.badge--new {
  background: #4CAF50;
}

.badge--popular {
  background: #FF9800;
}

.badge--out {
  background: #f44336;
}

.product-card__image {
  height: 200px;
  overflow: hidden;
}

.product-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.product-card:hover .product-card__image img {
  transform: scale(1.05);
}

.product-card__content {
  padding: 16px;
}

.product-card__category {
  font-size: 14px;
  color: #888;
  margin-bottom: 8px;
}

.product-card__title {
  font-size: 18px;
  margin: 0 0 8px 0;
  font-weight: 600;
}

.product-card__description {
  font-size: 14px;
  color: #666;
  margin: 0 0 16px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-card__prices {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.product-card__price {
  font-size: 24px;
  font-weight: 700;
  color: #2196F3;
}

.product-card__old-price {
  font-size: 16px;
  color: #999;
  text-decoration: line-through;
}

.product-card__button {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 8px;
  background: #2196F3;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
}

.product-card__button:hover:not(:disabled) {
  background: #1976D2;
}

.product-card__button:disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>