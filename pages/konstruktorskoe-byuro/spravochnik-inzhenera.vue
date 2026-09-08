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
      
      <!-- Вкладки -->
      <div class="tabs">
        <div class="tab-buttons">
          <button 
            type="button"
            class="tab-btn"
            :class="{ 'active': activeTab === 'calculators' }"
            @click="setTab('calculators')"
          >
            Калькуляторы
          </button>
          <button 
            type="button"
            class="tab-btn"
            :class="{ 'active': activeTab === 'tables' }"
            @click="setTab('tables')"
          >
            Справочные таблицы
          </button>
          <button 
            type="button"
            class="tab-btn"
            :class="{ 'active': activeTab === 'formulas' }"
            @click="setTab('formulas')"
          >
            Формулы
          </button>
        </div>
        
        <div class="tab-content">
          <!-- Калькуляторы -->
          <div v-if="activeTab === 'calculators'">
            <div class="calculators-grid">
              
              <!-- Калькулятор: Концентрация растворов -->
              <div class="calculator-card">
                <h3>⚗️ Концентрация растворов</h3>
                <div class="calc-form">
                  <div class="form-group">
                    <label>Масса вещества (г):</label>
                    <input v-model.number="concMass" type="number" class="form-input" />
                  </div>
                  <div class="form-group">
                    <label>Объём раствора (л):</label>
                    <input v-model.number="concVolume" type="number" class="form-input" />
                  </div>
                  <div class="calc-result" v-if="concMass && concVolume">
                    <p><strong>Массовая концентрация:</strong> {{ (concMass / concVolume).toFixed(3) }} г/л</p>
                    <p><strong>Молярная концентрация:</strong> {{ (concMass / concVolume / 100).toFixed(4) }} моль/л (для M=100 г/моль)</p>
                  </div>
                </div>
              </div>
              
              <!-- Калькулятор: Пересчёт ppm → мг/м³ -->
              <div class="calculator-card">
                <h3>📊 Пересчёт ppm → мг/м³</h3>
                <div class="calc-form">
                  <div class="form-group">
                    <label>Концентрация (ppm):</label>
                    <input v-model.number="ppmValue" type="number" class="form-input" />
                  </div>
                  <div class="form-group">
                    <label>Молярная масса (г/моль):</label>
                    <input v-model.number="molarMass" type="number" class="form-input" />
                  </div>
                  <div class="form-group">
                    <label>Температура (°C):</label>
                    <input v-model.number="temperature" type="number" class="form-input" />
                  </div>
                  <div class="calc-result" v-if="ppmValue && molarMass">
                    <p><strong>Концентрация:</strong> {{ calculatePpmToMg(ppmValue, molarMass, temperature) }} мг/м³</p>
                  </div>
                </div>
              </div>
              
              <!-- Калькулятор: Газовые законы -->
              <div class="calculator-card">
                <h3>🌡️ Газовые законы (нормальные условия)</h3>
                <div class="calc-form">
                  <div class="form-group">
                    <label>Объём газа (л):</label>
                    <input v-model.number="gasVolume" type="number" class="form-input" />
                  </div>
                  <div class="form-group">
                    <label>Температура (°C):</label>
                    <input v-model.number="gasTemperature" type="number" class="form-input" />
                  </div>
                  <div class="form-group">
                    <label>Давление (кПа):</label>
                    <input v-model.number="gasPressure" type="number" class="form-input" />
                  </div>
                  <div class="calc-result" v-if="gasVolume">
                    <p><strong>Объём при н.у.:</strong> {{ calculateNormalVolume(gasVolume, gasTemperature, gasPressure) }} л</p>
                  </div>
                </div>
              </div>
              
              <!-- Калькулятор: Погрешности -->
              <div class="calculator-card">
                <h3>📏 Погрешности измерений</h3>
                <div class="calc-form">
                  <div class="form-group">
                    <label>Измеренное значение:</label>
                    <input v-model.number="measuredValue" type="number" class="form-input" />
                  </div>
                  <div class="form-group">
                    <label>Истинное значение:</label>
                    <input v-model.number="trueValue" type="number" class="form-input" />
                  </div>
                  <div class="calc-result" v-if="measuredValue && trueValue">
                    <p><strong>Абсолютная погрешность:</strong> {{ Math.abs(measuredValue - trueValue).toFixed(4) }}</p>
                    <p><strong>Относительная погрешность:</strong> {{ ((Math.abs(measuredValue - trueValue) / trueValue) * 100).toFixed(3) }}%</p>
                  </div>
                </div>
              </div>
              
              <!-- Калькулятор: Влажность -->
              <div class="calculator-card">
                <h3>💧 Влажность воздуха</h3>
                <div class="calc-form">
                  <div class="form-group">
                    <label>Температура (°C):</label>
                    <input v-model.number="humidityTemp" type="number" class="form-input" />
                  </div>
                  <div class="form-group">
                    <label>Относительная влажность (%):</label>
                    <input v-model.number="humidityRH" type="number" class="form-input" />
                  </div>
                  <div class="calc-result" v-if="humidityTemp && humidityRH">
                    <p><strong>Точка росы:</strong> {{ calculateDewPoint(humidityTemp, humidityRH) }} °C</p>
                    <p><strong>Абсолютная влажность:</strong> {{ calculateAbsoluteHumidity(humidityTemp, humidityRH) }} г/м³</p>
                  </div>
                </div>
              </div>
              
              <!-- Калькулятор: Пересчёт единиц давления -->
              <div class="calculator-card">
                <h3>🔧 Пересчёт единиц давления</h3>
                <div class="calc-form">
                  <div class="form-group">
                    <label>Значение:</label>
                    <input v-model.number="pressureValue" type="number" class="form-input" />
                  </div>
                  <div class="form-group">
                    <label>Из:</label>
                    <select v-model="pressureFrom" class="form-select">
                      <option value="atm">атмосфера</option>
                      <option value="mmHg">мм рт. ст.</option>
                      <option value="bar">бар</option>
                      <option value="kPa">кПа</option>
                    </select>
                  </div>
                  <div class="calc-result" v-if="pressureValue">
                    <p><strong>атмосфера:</strong> {{ convertPressure(pressureValue, pressureFrom, 'atm') }}</p>
                    <p><strong>мм рт. ст.:</strong> {{ convertPressure(pressureValue, pressureFrom, 'mmHg') }}</p>
                    <p><strong>бар:</strong> {{ convertPressure(pressureValue, pressureFrom, 'bar') }}</p>
                    <p><strong>кПа:</strong> {{ convertPressure(pressureValue, pressureFrom, 'kPa') }}</p>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
          
          <!-- Справочные таблицы -->
          <div v-if="activeTab === 'tables'">
            <div class="tables-wrapper">
              <h3>Физические константы</h3>
              <div class="table-responsive">
                <table class="data-table">
                  <thead>
                    <tr>
                      <th>Константа</th>
                      <th>Обозначение</th>
                      <th>Значение</th>
                      <th>Единица</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in constants" :key="item.name">
                      <td>{{ item.name }}</td>
                      <td>{{ item.symbol }}</td>
                      <td>{{ item.value }}</td>
                      <td>{{ item.unit }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <h3>Единицы измерения</h3>
              <div class="table-responsive">
                <table class="data-table">
                  <thead>
                    <tr>
                      <th>Из</th>
                      <th>В</th>
                      <th>Коэффициент</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in units" :key="item.from">
                      <td>{{ item.from }}</td>
                      <td>{{ item.to }}</td>
                      <td>{{ item.factor }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <h3>Свойства газов</h3>
              <div class="table-responsive">
                <table class="data-table">
                  <thead>
                    <tr>
                      <th>Газ</th>
                      <th>Формула</th>
                      <th>Плотность (г/л)</th>
                      <th>Темп. кипения</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="gas in gases" :key="gas.name">
                      <td>{{ gas.name }}</td>
                      <td>{{ gas.formula }}</td>
                      <td>{{ gas.density }}</td>
                      <td>{{ gas.boilingPoint }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          <!-- Формулы -->
          <div v-if="activeTab === 'formulas'">
            <div class="formulas-list">
              <div 
                v-for="formula in formulas" 
                :key="formula.title"
                class="formula-item"
              >
                <h3>{{ formula.title }}</h3>
                <div class="formula">{{ formula.formula }}</div>
                <p>{{ formula.description }}</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const activeTab = ref('calculators')

// Устанавливаем вкладку из query параметра
function syncTabWithQuery() {
  const tab = route.query.tab
  if (tab === 'tables' || tab === 'formulas' || tab === 'calculators') {
    activeTab.value = tab
  }
}

// Вызываем при загрузке страницы
syncTabWithQuery()

// Следим за изменением query параметра
watch(() => route.query.tab, () => {
  syncTabWithQuery()
})

// При клике на вкладку обновляем URL
function setTab(tab) {
  activeTab.value = tab
  router.push({ query: { tab: tab } })
}

// Калькуляторы
const concMass = ref(null)
const concVolume = ref(null)
const ppmValue = ref(null)
const molarMass = ref(null)
const temperature = ref(20)
const gasVolume = ref(null)
const gasTemperature = ref(20)
const gasPressure = ref(101.325)
const measuredValue = ref(null)
const trueValue = ref(null)
const humidityTemp = ref(20)
const humidityRH = ref(50)
const pressureValue = ref(1)
const pressureFrom = ref('atm')

// Таблицы
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
    description: 'C - концентрация (г/л), m - масса вещества (г), V - объём раствора (л)'
  },
  {
    title: 'Закон Бойля-Мариотта',
    formula: 'P₁V₁ = P₂V₂',
    description: 'Для изотермического процесса (T = const)'
  },
  {
    title: 'Закон Гей-Люссака',
    formula: 'V₁/T₁ = V₂/T₂',
    description: 'Для изобарного процесса (P = const)'
  },
  {
    title: 'Уравнение Менделеева-Клапейрона',
    formula: 'PV = nRT',
    description: 'Уравнение состояния идеального газа'
  },
  {
    title: 'Относительная погрешность',
    formula: 'δ = |Δ| / X × 100%',
    description: 'Δ - абсолютная погрешность, X - истинное значение'
  }
]

// Функции калькуляторов
function calculatePpmToMg(ppm, mass, temp) {
  const R = 8.314
  const T = temp + 273.15
  const P = 101325
  return ((ppm * mass * P) / (R * T)).toFixed(3)
}

function calculateNormalVolume(volume, temp, pressure) {
  const Tn = 273.15
  const T = temp + 273.15
  const Pn = 101.325
  return ((volume * pressure * Tn) / (Pn * T)).toFixed(3)
}

function calculateDewPoint(temp, rh) {
  const a = 17.27
  const b = 237.7
  const gamma = (a * temp) / (b + temp) + Math.log(rh / 100)
  return ((b * gamma) / (a - gamma)).toFixed(1)
}

function calculateAbsoluteHumidity(temp, rh) {
  const es = 6.112 * Math.exp((17.67 * temp) / (temp + 243.5))
  const e = (rh / 100) * es
  return ((217 * e) / (temp + 273.15)).toFixed(2)
}

function convertPressure(value, from, to) {
  const factors = {
    atm: 101325,
    mmHg: 133.322,
    bar: 100000,
    kPa: 1000
  }
  const inPascal = value * factors[from]
  const result = inPascal / factors[to]
  return result.toFixed(4)
}

useHead({
  title: 'Полезное для инженера - ГосНИИхиманалит',
  meta: [
    { 
      name: 'description', 
      content: 'Полезное для инженера: калькуляторы, справочные таблицы, формулы' 
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

.page-title {
  font-size: 2rem;
  font-weight: 700;
  color: #005700;
  margin-bottom: 2rem;
  text-align: center;
}

/* Вкладки */
.tabs {
  margin-bottom: 2rem;
}

.tab-buttons {
  display: flex;
  gap: 10px;
  border-bottom: 2px solid #e5e7eb;
  flex-wrap: wrap;
}

.tab-btn {
  padding: 12px 24px;
  background: transparent;
  color: #6b7280;
  border: none;
  border-bottom: 3px solid transparent;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  white-space: nowrap;
}

.tab-btn:hover {
  color: #005700;
}

.tab-btn.active {
  color: #005700;
  border-bottom-color: #005700;
}

.tab-content {
  padding: 1.5rem 0;
}

/* Калькуляторы */
.calculators-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.calculator-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.5rem;
  transition: all 0.3s;
}

.calculator-card:hover {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border-color: #005700;
}

.calculator-card h3 {
  color: #333;
  margin-bottom: 1rem;
  font-size: 16px;
}

.calc-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.form-group label {
  font-size: 13px;
  color: #6b7280;
  font-weight: 500;
}

.form-input,
.form-select {
  padding: 8px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  font-size: 14px;
}

.form-input:focus,
.form-select:focus {
  outline: none;
  border-color: #005700;
}

.calc-result {
  padding: 10px;
  background: #f0f5f0;
  border-radius: 4px;
  font-size: 14px;
}

.calc-result p {
  margin-bottom: 4px;
  color: #333;
}

/* Таблицы */
.tables-wrapper h3 {
  color: #005700;
  margin: 1.5rem 0 0.75rem;
}

.table-responsive {
  overflow-x: auto;
  margin-bottom: 1.5rem;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th,
.data-table td {
  padding: 10px 14px;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
  font-size: 14px;
}

.data-table th {
  background: #f8fafc;
  font-weight: 600;
  color: #333;
}

.data-table tr:hover {
  background: #f0f5f0;
}

/* Формулы */
.formulas-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.formula-item {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.5rem;
}

.formula-item h3 {
  color: #333;
  margin-bottom: 0.75rem;
}

.formula {
  font-size: 1.25rem;
  font-weight: 600;
  color: #005700;
  margin-bottom: 0.5rem;
  padding: 0.75rem;
  background: #f0f5f0;
  border-radius: 4px;
  text-align: center;
}

.formula-item p {
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
    font-size: 1.5rem;
  }
}
</style>