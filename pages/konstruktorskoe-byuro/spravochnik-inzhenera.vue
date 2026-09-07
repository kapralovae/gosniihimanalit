<template>
  <div class="kb-page">
    <div class="container">
      <!-- Хлебные крошки -->
      <nav class="breadcrumb">
        <NuxtLink to="/">Главная</NuxtLink>
        <span class="separator">/</span>
        <NuxtLink to="/konstruktorskoe-byuro">Конструкторское бюро</NuxtLink>
        <span class="separator">/</span>
        <span class="current">Полезное для инженера</span>
      </nav>
      
      <h1 class="page-title">Полезное для инженера</h1>
      
      <div class="kb-content">
        <p class="kb-intro">
          Справочные материалы и калькуляторы для инженеров.
        </p>
        
        <!-- Калькуляторы -->
        <h2 class="section-subtitle">Инженерные калькуляторы</h2>
        <div class="calculators-grid">
          <div 
            v-for="calculator in calculators" 
            :key="calculator.title"
            class="calculator-card"
          >
            <span class="calculator-icon">{{ calculator.icon }}</span>
            <h3>{{ calculator.title }}</h3>
            <p>{{ calculator.description }}</p>
            <button 
              type="button"
              class="open-btn"
              @click="openCalculator(calculator)"
            >
              Открыть
            </button>
          </div>
        </div>
        
        <!-- Справочные таблицы -->
        <h2 class="section-subtitle">Справочные таблицы</h2>
        <div class="tabs">
          <div class="tab-buttons">
            <button 
              type="button"
              class="tab-btn"
              :class="{ 'active': activeTab === 'constants' }"
              @click="activeTab = 'constants'"
            >
              Физические константы
            </button>
            <button 
              type="button"
              class="tab-btn"
              :class="{ 'active': activeTab === 'units' }"
              @click="activeTab = 'units'"
            >
              Единицы измерения
            </button>
            <button 
              type="button"
              class="tab-btn"
              :class="{ 'active': activeTab === 'gases' }"
              @click="activeTab = 'gases'"
            >
              Свойства газов
            </button>
          </div>
          
          <div class="tab-content">
            <!-- Физические константы -->
            <div v-if="activeTab === 'constants'" class="table-wrapper">
              <div class="table-header">
                <span class="col-name">Константа</span>
                <span class="col-symbol">Обозначение</span>
                <span class="col-value">Значение</span>
                <span class="col-unit">Единица</span>
              </div>
              <div v-for="item in constants" :key="item.name" class="table-row">
                <span class="col-name">{{ item.name }}</span>
                <span class="col-symbol">{{ item.symbol }}</span>
                <span class="col-value">{{ item.value }}</span>
                <span class="col-unit">{{ item.unit }}</span>
              </div>
            </div>
            
            <!-- Единицы измерения -->
            <div v-if="activeTab === 'units'" class="table-wrapper">
              <div class="table-header">
                <span class="col-from">Из</span>
                <span class="col-to">В</span>
                <span class="col-factor">Коэффициент</span>
              </div>
              <div v-for="item in units" :key="item.from" class="table-row">
                <span class="col-from">{{ item.from }}</span>
                <span class="col-to">{{ item.to }}</span>
                <span class="col-factor">{{ item.factor }}</span>
              </div>
            </div>
            
            <!-- Свойства газов -->
            <div v-if="activeTab === 'gases'" class="table-wrapper">
              <div class="table-header">
                <span class="col-name">Газ</span>
                <span class="col-formula">Формула</span>
                <span class="col-density">Плотность</span>
                <span class="col-boiling">Темп. кипения</span>
              </div>
              <div v-for="gas in gases" :key="gas.name" class="table-row">
                <span class="col-name">{{ gas.name }}</span>
                <span class="col-formula">{{ gas.formula }}</span>
                <span class="col-density">{{ gas.density }}</span>
                <span class="col-boiling">{{ gas.boilingPoint }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Формулы -->
        <h2 class="section-subtitle">Основные формулы</h2>
        <div class="formulas-list">
          <div 
            v-for="formula in formulas" 
            :key="formula.title"
            class="formula-item"
          >
            <div class="formula-header" @click="toggleFormula(formula.title)">
              <h3>{{ formula.title }}</h3>
              <span class="formula-toggle">{{ openFormulas.includes(formula.title) ? '−' : '+' }}</span>
            </div>
            <div v-if="openFormulas.includes(formula.title)" class="formula-content">
              <div class="formula">{{ formula.formula }}</div>
              <p>{{ formula.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('constants')
const openFormulas = ref([])

const calculators = [
  {
    icon: '⚗️',
    title: 'Концентрация растворов',
    description: 'Расчет концентрации растворов',
    type: 'concentration'
  },
  {
    icon: '📊',
    title: 'Погрешность измерений',
    description: 'Расчет погрешностей',
    type: 'error'
  },
  {
    icon: '🌡️',
    title: 'Температурные коэффициенты',
    description: 'Расчет температурных коэффициентов',
    type: 'temperature'
  },
  {
    icon: '📏',
    title: 'Пересчет единиц',
    description: 'Конвертер единиц измерения',
    type: 'units'
  }
]

const constants = [
  { name: 'Число Авогадро', symbol: 'NA', value: '6.022 × 10²³', unit: 'моль⁻¹' },
  { name: 'Газовая постоянная', symbol: 'R', value: '8.314', unit: 'Дж/(моль·К)' },
  { name: 'Постоянная Больцмана', symbol: 'k', value: '1.381 × 10⁻²³', unit: 'Дж/К' },
  { name: 'Постоянная Планка', symbol: 'h', value: '6.626 × 10⁻³⁴', unit: 'Дж·с' },
  { name: 'Скорость света', symbol: 'c', value: '2.998 × 10⁸', unit: 'м/с' }
]

const units = [
  { from: 'атмосфера', to: 'Паскаль', factor: '101325' },
  { from: 'мм рт. ст.', to: 'Паскаль', factor: '133.322' },
  { from: 'бар', to: 'Паскаль', factor: '100000' },
  { from: '°C', to: 'K', factor: '+273.15' },
  { from: 'литр', to: 'м³', factor: '0.001' }
]

const gases = [
  { name: 'Кислород', formula: 'O₂', density: '1.429', boilingPoint: '-183°C' },
  { name: 'Азот', formula: 'N₂', density: '1.251', boilingPoint: '-196°C' },
  { name: 'Водород', formula: 'H₂', density: '0.090', boilingPoint: '-253°C' },
  { name: 'Углекислый газ', formula: 'CO₂', density: '1.977', boilingPoint: '-78°C' },
  { name: 'Метан', formula: 'CH₄', density: '0.717', boilingPoint: '-162°C' }
]

const formulas = [
  {
    title: 'Концентрация вещества',
    formula: 'C = m / V',
    description: 'C - концентрация, m - масса вещества, V - объем раствора'
  },
  {
    title: 'Закон Бойля-Мариотта',
    formula: 'P₁V₁ = P₂V₂',
    description: 'Для изотермического процесса'
  },
  {
    title: 'Закон Гей-Люссака',
    formula: 'V₁/T₁ = V₂/T₂',
    description: 'Для изобарного процесса'
  },
  {
    title: 'Уравнение Менделеева-Клапейрона',
    formula: 'PV = nRT',
    description: 'Уравнение состояния идеального газа'
  }
]

function toggleFormula(title) {
  if (openFormulas.value.includes(title)) {
    openFormulas.value = openFormulas.value.filter(f => f !== title)
  } else {
    openFormulas.value.push(title)
  }
}

function openCalculator(calculator) {
  alert(`Калькулятор "${calculator.title}" в разработке`)
}

useHead({
  title: 'Полезное для инженера - ГосНИИХиманалит',
  meta: [
    { 
      name: 'description', 
      content: 'Полезное для инженера ГосНИИХиманалит: калькуляторы, таблицы, формулы' 
    }
  ]
})
</script>

<style scoped>
.kb-page {
  min-height: 100vh;
  padding: 2rem 0;
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

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #005700;
  margin-bottom: 2rem;
  text-align: center;
}

.kb-intro {
  font-size: 1.125rem;
  color: #4b5563;
  line-height: 1.8;
  margin-bottom: 2rem;
}

.section-subtitle {
  font-size: 1.5rem;
  font-weight: 600;
  color: #005700;
  margin: 2rem 0 1rem;
}

/* Калькуляторы */
.calculators-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 2rem;
}

.calculator-card {
  text-align: center;
  padding: 1.5rem;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  transition: all 0.3s;
}

.calculator-card:hover {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transform: translateY(-5px);
  border-color: #005700;
}

.calculator-icon {
  font-size: 40px;
  display: block;
  margin-bottom: 1rem;
}

.calculator-card h3 {
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 16px;
}

.calculator-card p {
  color: #6b7280;
  font-size: 14px;
  margin-bottom: 1rem;
}

.open-btn {
  padding: 8px 20px;
  background: transparent;
  color: #005700;
  border: 2px solid #005700;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.open-btn:hover {
  background: #005700;
  color: #fff;
}

/* Табы */
.tabs {
  margin-bottom: 2rem;
}

.tab-buttons {
  display: flex;
  gap: 10px;
  border-bottom: 2px solid #e5e7eb;
}

.tab-btn {
  padding: 10px 20px;
  background: transparent;
  color: #6b7280;
  border: none;
  border-bottom: 3px solid transparent;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.tab-btn:hover {
  color: #005700;
}

.tab-btn.active {
  color: #005700;
  border-bottom-color: #005700;
}

.tab-content {
  padding: 1rem 0;
}

.table-wrapper {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
}

.table-header {
  display: grid;
  gap: 10px;
  padding: 12px 16px;
  background: #f8fafc;
  font-weight: 600;
  color: #333;
  border-bottom: 2px solid #e5e7eb;
}

.table-row {
  display: grid;
  gap: 10px;
  padding: 12px 16px;
  border-bottom: 1px solid #f0f0f0;
  align-items: center;
}

.table-row:last-child {
  border-bottom: none;
}

.table-row:nth-child(even) {
  background: #fafafa;
}

/* Сетки для разных таблиц */
.tab-content .table-header,
.tab-content .table-row {
  grid-template-columns: 2fr 1fr 1.5fr 1fr;
}

/* Формулы */
.formulas-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.formula-item {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
}

.formula-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  cursor: pointer;
  transition: background 0.3s;
}

.formula-header:hover {
  background: #f0f9f0;
}

.formula-header h3 {
  color: #333;
  font-size: 16px;
}

.formula-toggle {
  font-size: 24px;
  color: #005700;
  font-weight: 700;
}

.formula-content {
  padding: 1rem 1.5rem;
  border-top: 1px solid #e5e7eb;
}

.formula {
  font-size: 1.25rem;
  font-weight: 600;
  color: #005700;
  margin-bottom: 0.5rem;
  padding: 0.75rem;
  background: #f0f9f0;
  border-radius: 4px;
  text-align: center;
}

.formula-content p {
  color: #6b7280;
}

@media (max-width: 1024px) {
  .calculators-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .calculators-grid {
    grid-template-columns: 1fr;
  }
  
  .tab-buttons {
    flex-direction: column;
    gap: 0;
  }
  
  .tab-btn {
    text-align: left;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .tab-btn.active {
    border-left: 3px solid #005700;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .page-title {
    font-size: 2rem;
  }
}
</style>