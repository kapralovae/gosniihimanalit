<template>
  <div class="product-page">
    <div class="container">
      <!-- Хлебные крошки -->
      <nav class="breadcrumb">
        <NuxtLink to="/">Главная</NuxtLink>
        <span class="separator">/</span>
        <NuxtLink to="/produkciya">Продукция</NuxtLink>
        <span class="separator">/</span>
        <span class="current">{{ product?.title || 'Товар' }}</span>
      </nav>

      <div v-if="pending" class="loading">Загрузка...</div>

      <div v-else-if="product" class="product-detail">
        <!-- Заголовок -->
        <h1 class="product-title">{{ product.title }}</h1>

        <div class="product-layout">
          <!-- Левая колонка: картинка -->
          <div class="product-image-column">
            <div class="product-image-wrapper">
              <img 
                v-if="product.image_url" 
                :src="product.image_url" 
                :alt="product.title"
                class="product-image"
              />
              <div v-else class="product-placeholder">
                <el-icon :size="80"><Picture /></el-icon>
              </div>
            </div>
          </div>

          <!-- Правая колонка: информация -->
          <div class="product-info-column">
            <!-- Назначение -->
            <section v-if="product.purpose" class="section-block">
              <h2 class="section-heading">Назначение</h2>
              <p class="section-text">{{ product.purpose }}</p>
            </section>

            <!-- Принцип действия -->
            <section v-if="product.principle" class="section-block">
              <h2 class="section-heading">Принцип действия</h2>
              <p class="section-text">{{ product.principle }}</p>
            </section>

            <!-- Особенности -->
            <section v-if="product.features && product.features.length" class="section-block">
              <h2 class="section-heading">Особенности</h2>
              <ul class="feature-list">
                <li v-for="(f, i) in product.features" :key="i">{{ f }}</li>
              </ul>
            </section>

            <!-- Комплект поставки -->
            <section v-if="product.delivery_set && product.delivery_set.length" class="section-block">
              <h2 class="section-heading">Комплект поставки</h2>
              <ul class="feature-list">
                <li v-for="(item, i) in product.delivery_set" :key="i">{{ item }}</li>
              </ul>
            </section>

            <!-- Гарантии -->
            <section v-if="product.warranty" class="section-block">
              <h2 class="section-heading">Гарантии изготовителя</h2>
              <p class="certificates-text">{{ product.warranty }}</p>
            </section>

            <!-- Интервал между поверками -->
            <section v-if="product.verification_interval && product.verification_interval !== 'Не указан'" class="section-block">
              <h2 class="section-heading">Интервал между поверками</h2>
              <p class="certificates-text">{{ product.verification_interval }}</p>
            </section>

            <!-- Технические характеристики (specs) -->
            <section v-if="product.specs && product.specs.length" class="section-block">
              <h2 class="section-heading">Технические характеристики</h2>
              <div class="specs-table-wrapper">
                <table class="specs-table">
                  <tbody>
                    <tr v-for="(spec, i) in product.specs" :key="i">
                      <td class="spec-name">{{ spec.name }}</td>
                      <td class="spec-value">{{ spec.value }} {{ spec.unit }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <!-- Сертификаты -->
            <section v-if="product.certificates" class="section-block">
              <p class="certificates-text">{{ product.certificates }}</p>
            </section>

            <!-- Дополнительные таблицы -->
            <section v-if="product.tables && product.tables.length" class="section-block">
              <h2 class="section-heading">Дополнительные таблицы</h2>
              <div v-for="(tbl, ti) in product.tables" :key="ti" class="table-block">
                <h3 v-if="tbl.title" class="table-subheading">{{ tbl.title }}</h3>
                <div class="specs-table-wrapper">
                  <table class="specs-table">
                    <tbody>
                      <template v-for="(item, ri) in renderRows(tbl.rows)" :key="ri">
                        <tr>
                          <!-- «Полная» без value — заголовок на всю ширину -->
                          <template v-if="item.row.type === 'full' && !item.row.value">
                            <td 
                              :colspan="(tbl.columns === 3 ? 3 : 2)" 
                              :rowspan="item.row.rowspan || 1"
                              class="spec-group-header"
                            >
                              {{ item.row.name }}
                            </td>
                          </template>
                          <!-- Обычная или full с value -->
                          <template v-else>
                            <!-- Если над нами rowspan — первая ячейка сдвигается вправо как subname -->
                            <td 
                              v-if="item.skipFirstCells >= 1" 
                              class="spec-subname"
                            >
                              {{ item.row.name }}
                            </td>
                            <!-- Иначе — обычная первая ячейка -->
                            <td 
                              v-else 
                              class="spec-name"
                              :rowspan="item.row.rowspan || 1"
                              :colspan="item.row.colspan || 1"
                            >
                              {{ item.row.name }}
                            </td>
                            <!-- Значение всегда справа -->
                            <td 
                              v-if="item.row.value" 
                              class="spec-value"
                              :colspan="tbl.columns === 3 && !item.row.value2 && (item.row.rowspan || 1) <= 1 && item.skipFirstCells < 1 ? 2 : 1"
                            >
                              {{ item.row.value }}
                            </td>
                            <td v-if="tbl.columns === 3 && item.row.value2" class="spec-value">{{ item.row.value2 }}</td>
                          </template>
                        </tr>
                      </template>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            <!-- Кнопки -->
            <div class="product-actions">
              <NuxtLink to="/about/kontakty" class="btn-primary">
                Запросить цену
              </NuxtLink>
              <NuxtLink to="/produkciya" class="btn-secondary">
                ← Вернуться к каталогу
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="not-found">
        <h2>Товар не найден</h2>
        <NuxtLink to="/produkciya" class="btn-primary">Вернуться в каталог</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const slug = route.params.slug

const { data: product, pending } = await useFetch(`/api/products/${slug}`)

if (!product.value) {
  throw createError({ statusCode: 404, message: 'Товар не найден', fatal: true })
}

useHead({
  title: product.value 
    ? `${product.value.title} - ГосНИИХиманалит` 
    : 'Товар - ГосНИИХиманалит',
  meta: [
    { 
      name: 'description', 
      content: product.value?.description || 'Каталог продукции ГосНИИХиманалит' 
    }
  ]
})

/**
 * Преобразует список строк таблицы в массив с учётом rowspan/colspan.
 * Возвращает массив объектов { row, skipFirstCell, isFull }
 * где skipFirstCell = true, если первая ячейка уже занята rowspan'ом сверху.
 */
function renderRows(rows) {
  if (!Array.isArray(rows)) return []
  const result = []
  const occupied = [] // массив "сколько строк ещё занято" по колонкам

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i]

    // Считаем, сколько первых ячеек пропустить
    let skip = 0
    while (occupied[skip] && occupied[skip] > 0) {
      skip++
    }

    // Добавляем в результат
    result.push({
      row,
      skipFirstCells: skip
    })

    // Уменьшаем занятость всех ячеек
    for (let c = 0; c < occupied.length; c++) {
      if (occupied[c] > 0) occupied[c]--
    }

    // Если у строки есть rowspan — занимаем ячейки
    const rs = Number(row.rowspan) || 1
    const cs = Number(row.colspan) || 1
    if (rs > 1) {
      for (let c = 0; c < cs; c++) {
        occupied[skip + c] = rs - 1
      }
    }
  }

  return result
}

</script>

<style scoped>
.product-page {
  min-height: 100vh;
  padding: 2rem 0;
  background: #fff;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Хлебные крошки */
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 2rem;
  font-size: 14px;
  flex-wrap: wrap;
}

.breadcrumb a {
  color: #005700;
  text-decoration: none;
}

.breadcrumb a:hover {
  text-decoration: underline;
}

.separator {
  color: #9ca3af;
}

.current {
  color: #6b7280;
}

.loading {
  text-align: center;
  padding: 3rem;
  font-size: 1.25rem;
  color: #6b7280;
}

/* Заголовок товара */
.product-title {
  font-size: 2rem;
  font-weight: 700;
  color: #005700;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 2.5rem;
  line-height: 1.3;
}

/* Раскладка */
.product-layout {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 40px;
  align-items: start;
}

.product-image-column {
  position: sticky;
  top: 100px;
}

.product-image-wrapper {
  background: var(--bg-section);
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
}

.product-image {
  width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: contain;
}

.product-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
}

/* Правая колонка */
.product-info-column {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.section-block {
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 1.5rem;
}

.section-block:last-of-type {
  border-bottom: none;
}

.section-heading {
  font-size: 1.25rem;
  font-weight: 700;
  color: #005700;
  text-align: center;
  margin-bottom: 1rem;
}

.section-text {
  color: #333;
  line-height: 1.7;
  font-size: 1rem;
  white-space: pre-line;
}

/* Список с галочками */
.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.feature-list li {
  color: #333;
  line-height: 1.7;
  padding-left: 1.75rem;
  position: relative;
  margin-bottom: 0.5rem;
}

.feature-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  top: 0;
  color: #22c55e;
  font-weight: 700;
  font-size: 1.1rem;
}

.certificates-text {
  text-align: center;
  font-size: 0.95rem;
  color: #333;
  line-height: 1.7;
}

.certificates-text strong {
  color: #005700;
}

/* Таблица характеристик (specs и tables) */
.specs-table-wrapper {
  border: 2px solid #005700;
  border-radius: 4px;
  overflow: hidden;
}

.specs-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

.specs-table td {
  padding: 8px 14px;
  font-size: 0.95rem;
  vertical-align: middle;
  border: 1px solid #005700 !important;
}

.specs-table tr:last-child td {
  border-bottom: none;
}

/* Убираем правую границу только у крайних правых ячеек */
.specs-table tr td:last-child {
  border-right: none;
}

/* Возвращаем границы для объединённых ячеек */
.specs-table td[colspan] {
  border-right: 1px solid #005700 !important;
}


.spec-name {
  color: #333;
  background: #d9e8d9;
  text-align: left;
  font-weight: 500;
}

.spec-subname {
  color: #333;
  background: #f0f5f0;
  text-align: center;
  font-weight: 500;
  padding: 8px 14px;
  border-right: 1px solid #005700;
}

.spec-value {
  color: #333;
  font-weight: 500;
  text-align: center;
  background: #fff;
}

.spec-group-header {
  background: #d9e8d9;
  color: #005700;
  font-weight: 700;
  text-align: center;
  padding: 10px 14px;
  font-size: 0.95rem;
}

/* Дополнительные таблицы */
.table-block {
  margin-bottom: 1.5rem;
}

.table-subheading {
  font-size: 1.05rem;
  font-weight: 600;
  color: #333;
  text-align: center;
  margin: 0 0 0.75rem 0;
}

/* Кнопки */
.product-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 1rem;
}

.btn-primary {
  padding: 14px 28px;
  background: #005700;
  color: #fff;
  text-decoration: none;
  border-radius: 6px;
  font-size: 15px;
  font-weight: 500;
  transition: background 0.3s;
  display: inline-block;
}

.btn-primary:hover {
  background: #003d00;
}

.btn-secondary {
  padding: 14px 28px;
  background: #fff;
  color: #333;
  text-decoration: none;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 15px;
  transition: all 0.3s;
  display: inline-block;
}

.btn-secondary:hover {
  border-color: #005700;
  color: #005700;
}

.not-found {
  text-align: center;
  padding: 4rem 0;
}

.not-found h2 {
  color: #333;
  margin-bottom: 1.5rem;
}

@media (max-width: 1024px) {
  .product-layout {
    grid-template-columns: 250px 1fr;
    gap: 25px;
  }
}

@media (max-width: 768px) {
  .product-layout {
    grid-template-columns: 1fr;
  }
  
  .product-image-column {
    position: static;
  }
  
  .product-title {
    font-size: 1.35rem;
  }
  
  .section-heading {
    font-size: 1.1rem;
  }
  
  .spec-name,
  .spec-value,
  .spec-subname {
    font-size: 0.85rem;
  }
  
  .specs-table td {
    padding: 8px 10px;
  }
}
</style>