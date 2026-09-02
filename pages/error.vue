<template>
  <div class="error-page">
    <div class="container">
      <div class="error-content">
        <h1 class="error-code">404</h1>
        <h2 class="error-title">Страница не найдена</h2>
        <p class="error-description">
          Извините, но запрашиваемая страница не существует или была перемещена.
        </p>
        <button type="button" class="back-button" @click="navigateTo('/')">
          <span class="home-icon">🏠</span>
          Вернуться на главную
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: '404 - Страница не найдена - ГосНИИХиманалит'
})
</script>

<style scoped>
.error-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8fafc;
}

.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 0 20px;
}

.error-content {
  text-align: center;
  padding: 3rem;
}

.error-code {
  font-size: 6rem;
  font-weight: 700;
  color: #29b026;
  margin-bottom: 1rem;
}

.error-title {
  font-size: 2rem;
  color: #333;
  margin-bottom: 1rem;
}

.error-description {
  color: #6b7280;
  margin-bottom: 2rem;
  font-size: 1.125rem;
}

.back-button {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 30px;
  background: #29b026;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s;
}

.back-button:hover {
  background: #1a7a1a;
}

.home-icon {
  font-size: 20px;
}

@media (max-width: 768px) {
  .error-code {
    font-size: 4rem;
  }
  
  .error-title {
    font-size: 1.5rem;
  }
  
  .error-description {
    font-size: 1rem;
  }
}
</style>