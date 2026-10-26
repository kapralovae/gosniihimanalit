<template>
  <div class="admin-page">
    <div class="container">
      <h1>Админ-панель</h1>
      
      <!-- Вход -->
      <div v-if="!authenticated" class="login-form">
        <h2>Вход в админку</h2>
        <input 
          v-model="password" 
          type="password" 
          placeholder="Введите пароль"
          @keydown.enter="login"
        />
        <button @click="login">Войти</button>
        <p v-if="loginError" class="error">Неверный пароль</p>
      </div>
      
      <!-- Админка -->
      <div v-else>
        <!-- Вкладки -->
        <div class="admin-nav">
          <button 
            v-for="tab in tabs" 
            :key="tab.key"
            :class="{ active: activeTab === tab.key }"
            @click="activeTab = tab.key"
          >
            {{ tab.label }}
          </button>
        </div>

        <!-- КАРУСЕЛЬ -->
        <div v-if="activeTab === 'carousel'" class="editor">
          <h2>Карусель на главной</h2>
          <p class="section-hint">
            Отметьте продукцию, которая должна показываться в карусели на главной странице.
            Порядок меняется стрелками ↑↓.
          </p>

          <!-- Отмеченные -->
          <h3 class="carousel-section-title">
            Показываются в карусели ({{ carouselProducts.length }})
          </h3>

          <div v-if="carouselProducts.length === 0" class="carousel-empty">
            Пока ничего не отмечено
          </div>

          <div 
            v-for="(product, index) in carouselProducts" 
            :key="'c-' + product.id" 
            class="carousel-row"
          >
            <img 
              v-if="product.image_url" 
              :src="product.image_url" 
              class="carousel-thumb" 
              alt=""
            />
            <div v-else class="carousel-thumb carousel-thumb-empty">—</div>

            <div class="carousel-info">
              <strong>{{ product.title }}</strong>
              <span v-if="product.slug" class="carousel-slug">/{{ product.slug }}</span>
            </div>

            <div class="carousel-actions">
              <button 
                @click="moveProductInCarousel(index, 'up')" 
                :disabled="index === 0" 
                class="btn-move"
              >↑</button>
              <button 
                @click="moveProductInCarousel(index, 'down')" 
                :disabled="index === carouselProducts.length - 1" 
                class="btn-move"
              >↓</button>
              <button 
                @click="toggleCarousel(product, false)" 
                class="btn-remove"
              >Убрать</button>
            </div>
          </div>

          <!-- Не отмеченные -->
          <h3 class="carousel-section-title" style="margin-top: 2rem;">
            Не показываются ({{ nonCarouselProducts.length }})
          </h3>

          <div 
            v-for="product in nonCarouselProducts" 
            :key="'n-' + product.id" 
            class="carousel-row carousel-row-inactive"
          >
            <img 
              v-if="product.image_url" 
              :src="product.image_url" 
              class="carousel-thumb" 
              alt=""
            />
            <div v-else class="carousel-thumb carousel-thumb-empty">—</div>

            <div class="carousel-info">
              <strong>{{ product.title }}</strong>
              <span v-if="product.slug" class="carousel-slug">/{{ product.slug }}</span>
            </div>

            <div class="carousel-actions">
              <button 
                @click="toggleCarousel(product, true)" 
                class="btn-add-to-carousel"
              >+ Добавить в карусель</button>
            </div>
          </div>
        </div>

        <!-- ТОВАРЫ -->
        <div v-if="activeTab === 'products'" class="editor">
          <h2>Товары ({{ products.length }})</h2>
          <button @click="addProduct" class="btn-add">+ Добавить товар</button>

          <!-- Компактный список -->
          <div class="products-compact-list">
            <div 
              v-for="(product, index) in products" 
              :key="product.id || 'new-' + index" 
              class="product-compact-item"
            >
              <span class="product-compact-num">#{{ index + 1 }}</span>
              <span class="product-compact-title">{{ product.title || '(без названия)' }}</span>
              <span class="product-compact-category">{{ product.category || '—' }}</span>
              <div class="product-compact-actions">
                <button 
                  @click="moveProduct(index, 'up')" 
                  :disabled="index === 0" 
                  class="btn-move"
                  title="Выше"
                >↑</button>
                <button 
                  @click="moveProduct(index, 'down')" 
                  :disabled="index === products.length - 1" 
                  class="btn-move"
                  title="Ниже"
                >↓</button>
                <button @click="editProduct(product)" class="btn-edit" title="Редактировать">✏️</button>
                <button 
                  v-if="product.id" 
                  @click="removeProduct(product)" 
                  class="btn-remove" 
                  title="Удалить"
                >🗑</button>
              </div>
            </div>
            
            <div v-if="products.length === 0" class="product-compact-empty">
              Товаров пока нет
            </div>
          </div>
        </div>

        <!-- МОДАЛКА РЕДАКТИРОВАНИЯ ТОВАРА -->
        <div v-if="editingProduct" class="modal-overlay" @click="closeProductModal">
          <div class="modal-product" @click.stop>
            <div class="modal-product-header">
              <h2>{{ editingProduct.id ? 'Редактировать товар' : 'Новый товар' }}</h2>
              <button @click="closeProductModal" class="close-btn">✕</button>
            </div>

            <div class="modal-product-body">
              <div class="product-fields">
                <div class="field-group">
                  <label>Название товара *</label>
                  <input v-model="editingProduct.title" placeholder="Например: Газоанализатор ГАНК-4" />
                </div>
                
                <div class="field-group">
                  <label>Категория *</label>
                  <input v-model="editingProduct.category" placeholder="Например: Газоанализаторы" />
                </div>
                
                <div class="field-group">
                  <label>Описание *</label>
                  <textarea v-model="editingProduct.description" placeholder="Описание товара" rows="4"></textarea>
                </div>

                <div class="field-group">
                  <label>Назначение</label>
                  <textarea v-model="editingProduct.purpose" placeholder="Например: Измерение концентрации паров вредных веществ..." rows="3"></textarea>
                </div>

                <div class="field-group">
                  <label>Принцип действия</label>
                  <textarea v-model="editingProduct.principle" placeholder="Например:&#10;- датчик на ОВ — ионизационный;&#10;- датчик на АХОВ — электрохимический." rows="3"></textarea>
                  <p class="section-hint">Каждый пункт с новой строки</p>
                </div>

                <!-- Особенности -->
                <div class="spec-section">
                  <label class="section-label">✓ Особенности</label>
                  <p class="section-hint">Каждая особенность — отдельная строка</p>
                  
                  <div 
                    v-for="(feature, fIndex) in (editingProduct.features || [])" 
                    :key="fIndex" 
                    class="spec-row"
                  >
                    <input 
                      v-model="editingProduct.features[fIndex]" 
                      placeholder="Например: Прибор соответствует требованиям ГОСТ..." 
                      class="spec-input-name"
                    />
                    <button @click="removeProductFeature(editingProduct, fIndex)" class="btn-remove-spec">✕</button>
                  </div>
                  <button @click="addProductFeature(editingProduct)" class="btn-add-spec">+ Добавить особенность</button>
                </div>

                <!-- Комплект поставки -->
                <div class="spec-section">
                  <label class="section-label">📦 Комплект поставки</label>
                  <p class="section-hint">Каждая позиция — отдельная строка</p>
                  
                  <div 
                    v-for="(item, iIndex) in (editingProduct.delivery_set || [])" 
                    :key="iIndex" 
                    class="spec-row"
                  >
                    <input 
                      v-model="editingProduct.delivery_set[iIndex]" 
                      placeholder="Например: блок обработки информации" 
                      class="spec-input-name"
                    />
                    <button @click="removeDeliveryItem(editingProduct, iIndex)" class="btn-remove-spec">✕</button>
                  </div>
                  <button @click="addDeliveryItem(editingProduct)" class="btn-add-spec">+ Добавить позицию</button>
                </div>

                <div class="field-group">
                  <label>Гарантии изготовителя</label>
                  <textarea v-model="editingProduct.warranty" placeholder="Например: Гарантийный срок эксплуатации изделия — 24 месяца со дня продажи." rows="2"></textarea>
                </div>
                
                <div class="field-group">
                  <label>Интервал между поверками</label>
                  <input v-model="editingProduct.verification_interval" placeholder="Например: 1 год, 12 мес." />
                </div>

                <div class="field-group">
                  <label>Сертификаты</label>
                  <textarea v-model="editingProduct.certificates" placeholder="Например: На прибор получено: свидетельство об утверждении типа..." rows="3"></textarea>
                </div>

                <div class="field-group">
                  <label>Slug (URL страницы)</label>
                  <input v-model="editingProduct.slug" placeholder="gsa-aig" />
                  <p class="section-hint">Если указан — ссылка будет /produkciya/gsa-aig. Оставьте пустым, если не нужно.</p>
                </div>

                <div class="field-group checkbox-group">
                  <label class="checkbox-label">
                    <input 
                      type="checkbox" 
                      :checked="editingProduct.show_in_carousel === 1" 
                      @change="editingProduct.show_in_carousel = $event.target.checked ? 1 : 0" 
                    />
                    <span>Показывать в карусели на главной</span>
                  </label>
                </div>

                <div v-if="editingProduct.show_in_carousel === 1" class="field-group">
                  <label>Порядок в карусели</label>
                  <input v-model.number="editingProduct.carousel_position" type="number" placeholder="0" min="0" />
                  <p class="section-hint">Меньше число — раньше в карусели</p>
                </div>
                
                <div class="field-group">
                  <label>Изображение товара</label>
                  <div class="image-upload-row">
                    <input v-model="editingProduct.image_url" placeholder="/uploads/имя-файла.webp или URL" />
                    <button type="button" @click="uploadImage(editingProduct)" class="btn-upload">📤 Загрузить</button>
                  </div>
                  <img v-if="editingProduct.image_url" :src="editingProduct.image_url" class="image-preview" alt="Превью" />
                </div>

                <div class="spec-section">
                  <label class="section-label">📋 Технические характеристики</label>
                  <p class="section-hint">Заполните название, значение и единицу измерения</p>
                  
                  <div v-for="(spec, specIndex) in (editingProduct.specs || [])" :key="specIndex" class="spec-row">
                    <input v-model="spec.name" placeholder="Название" class="spec-input-name" />
                    <input v-model="spec.value" placeholder="Значение" class="spec-input-value" />
                    <input v-model="spec.unit" placeholder="Ед. изм." class="spec-input-unit" />
                    <button @click="removeSpec(editingProduct, specIndex)" class="btn-remove-spec">✕</button>
                  </div>
                  <button @click="addSpec(editingProduct)" class="btn-add-spec">+ Добавить характеристику</button>
                </div>

                <!-- ТАБЛИЦЫ -->
                <div class="tables-section">
                  <div class="section-header">
                    <label class="section-label">📋 Таблицы</label>
                    <button @click="addTable(editingProduct)" class="btn-add-table">+ Добавить таблицу</button>
                  </div>
                  <p class="section-hint">
                    У каждой таблицы — название и кол-во колонок (2 или 3).<br>
                    Строка типа «Полная» — на всю ширину (заголовок).<br>
                    Обычная строка — 2 колонки (название / значение).<br>
                    Для 3-колоночных — заполняется и третье поле.
                  </p>

                  <div v-for="(table, tIndex) in (editingProduct.tables || [])" :key="tIndex" class="table-editor">
                    <div class="table-header">
                      <input v-model="table.title" placeholder="Название таблицы" class="table-title-input" />
                      <select v-model.number="table.columns" class="table-cols-select" title="Кол-во колонок">
                        <option :value="2">2 колонки</option>
                        <option :value="3">3 колонки</option>
                      </select>
                      <button @click="removeTable(editingProduct, tIndex)" class="btn-remove-table">🗑 Удалить</button>
                    </div>

                    <div class="table-rows">
                      <div v-for="(row, rIndex) in table.rows" :key="rIndex" class="table-row">
                        <select v-model="row.type" class="row-type-select" title="Тип строки">
                          <option value="item">Строка</option>
                          <option value="full">Полная</option>
                        </select>
                        <input v-model="row.name" :placeholder="row.type === 'full' ? 'Текст заголовка' : 'Название'" class="row-input-name" />
                        <input v-if="row.type === 'item'" v-model="row.value" placeholder="Значение" class="row-input-value" />
                        <input v-if="row.type === 'item' && table.columns === 3" v-model="row.value2" placeholder="3-я колонка" class="row-input-value" />
                        <input v-model.number="row.rowspan" type="number" min="1" placeholder="rspan" class="row-input-span" title="Объединить N строк вниз" />
                        <input v-model.number="row.colspan" type="number" min="1" placeholder="cspan" class="row-input-span" title="Объединить N колонок вправо" />
                        <button @click="removeRow(editingProduct, tIndex, rIndex)" class="btn-remove-row">✕</button>
                      </div>

                      <button @click="addRow(editingProduct, tIndex)" class="btn-add-row">+ Добавить строку</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="modal-product-footer">
              <button @click="closeProductModal" class="btn-secondary">Отмена</button>
              <button @click="saveProductFromModal" class="btn-primary">💾 Сохранить</button>
            </div>
          </div>
        </div>

        <!-- АРЕНДА -->
        <div v-if="activeTab === 'arenda'" class="editor">
          <h2>Помещения в аренду ({{ arenda.length }})</h2>
          <button @click="addArenda" class="btn-add">+ Добавить помещение</button>
          
          <div v-for="(item, index) in arenda" :key="item.id || 'new-arenda-' + index" class="product-item">
            <div class="product-header">
              <h3>Помещение #{{ index + 1 }}</h3>
              <button v-if="item.id" @click="removeArenda(item)" class="btn-remove">🗑 Удалить</button>
            </div>
            
            <div class="product-fields">
              <div class="field-group">
                <label>Название</label>
                <input v-model="item.name" placeholder="Производственное помещение №1" />
              </div>
              
              <div class="field-group">
                <label>Описание</label>
                <textarea v-model="item.description" rows="2"></textarea>
              </div>
              
              <div class="field-row">
                <div class="field-group">
                  <label>Площадь</label>
                  <input v-model="item.area" placeholder="245 м²" />
                </div>
                <div class="field-group">
                  <label>Этаж</label>
                  <input v-model="item.floor" placeholder="1-й этаж" />
                </div>
              </div>
              
              <div class="field-row">
                <div class="field-group">
                  <label>Высота потолков</label>
                  <input v-model="item.ceiling_height" placeholder="6 м" />
                </div>
                <div class="field-group">
                  <label>Электроснабжение</label>
                  <input v-model="item.power_supply" placeholder="380 В" />
                </div>
              </div>
              
              <div class="field-group">
                <label>Цена</label>
                <input v-model="item.price" placeholder="25 000 ₽/м² в год" />
              </div>

              <div class="field-group">
                <label>Статус</label>
                <select v-model="item.status">
                  <option value="available">Свободно</option>
                  <option value="rented">Сдано</option>
                </select>
              </div>
              
              <div class="spec-section">
                <label class="section-label">🔧 Особенности</label>
                <div v-for="(feature, fIndex) in (item.features || [])" :key="fIndex" class="spec-row">
                  <input v-model="item.features[fIndex]" placeholder="Грузовой лифт" class="spec-input-name" />
                  <button @click="removeFeature(item, fIndex)" class="btn-remove-spec">✕</button>
                </div>
                <button @click="addFeature(item)" class="btn-add-spec">+ Добавить особенность</button>
              </div>

              <div class="field-group">
                <label>Изображение</label>
                <div class="image-upload-row">
                  <input v-model="item.image" placeholder="/uploads/имя-файла.webp или URL" />
                  <button type="button" @click="uploadArendaImage(item)" class="btn-upload">📤 Загрузить</button>
                </div>
                <img v-if="item.image" :src="item.image" class="image-preview" alt="Превью" />
              </div>
            </div>
            
            <button @click="saveArenda(item)" class="btn-save-product">💾 Сохранить помещение</button>
          </div>
        </div>

        <!-- ВАКАНСИИ -->
        <div v-if="activeTab === 'vacancies'" class="editor">
          <h2>Вакансии ({{ vacancies.length }})</h2>
          <button @click="addVacancy" class="btn-add">+ Добавить вакансию</button>
          
          <div v-for="(item, index) in vacancies" :key="item.id || 'new-vac-' + index" class="product-item">
            <div class="product-header">
              <h3>Вакансия #{{ index + 1 }}</h3>
              <button v-if="item.id" @click="removeVacancy(item)" class="btn-remove">🗑 Удалить</button>
            </div>
            
            <div class="product-fields">
              <div class="field-group">
                <label>Название должности</label>
                <input v-model="item.title" placeholder="Инженер-конструктор" />
              </div>
              
              <div class="field-row">
                <div class="field-group">
                  <label>Отдел</label>
                  <input v-model="item.department" placeholder="Конструкторское бюро" />
                </div>
                <div class="field-group">
                  <label>Тип занятости</label>
                  <select v-model="item.type">
                    <option value="Полная занятость">Полная занятость</option>
                    <option value="Частичная занятость">Частичная занятость</option>
                    <option value="Удаленная работа">Удаленная работа</option>
                  </select>
                </div>
              </div>
              
              <div class="field-row">
                <div class="field-group">
                  <label>Зарплата</label>
                  <input v-model="item.salary" placeholder="80 000 - 120 000 ₽" />
                </div>
                <div class="field-group">
                  <label>Опыт работы</label>
                  <input v-model="item.experience" placeholder="От 3 лет" />
                </div>
              </div>
              
              <div class="spec-section">
                <label class="section-label">📋 Требования</label>
                <div v-for="(req, rIndex) in (item.requirements || [])" :key="rIndex" class="spec-row">
                  <input v-model="item.requirements[rIndex]" placeholder="Высшее образование" class="spec-input-name" />
                  <button @click="removeRequirement(item, rIndex)" class="btn-remove-spec">✕</button>
                </div>
                <button @click="addRequirement(item)" class="btn-add-spec">+ Добавить требование</button>
              </div>

              <div class="field-group checkbox-group">
                <label class="checkbox-label">
                  <input type="checkbox" v-model="item.active" />
                  <span>Вакансия активна (отображается на сайте)</span>
                </label>
              </div>
            </div>
            
            <button @click="saveVacancy(item)" class="btn-save-product">💾 Сохранить вакансию</button>
          </div>
        </div>

        <!-- БИБЛИОТЕКА -->
        <div v-if="activeTab === 'books'" class="editor">
          <h2>Электронная библиотека ({{ books.length }})</h2>
          <button @click="addBook" class="btn-add">+ Добавить книгу</button>

          <div v-for="(book, index) in books" :key="book.id || 'new-book-' + index" class="product-item">
            <div class="product-header">
              <h3>Книга #{{ index + 1 }}</h3>
              <button v-if="book.id" @click="removeBook(book)" class="btn-remove">🗑 Удалить</button>
            </div>

            <div class="product-fields">
              <div class="field-group">
                <label>Название *</label>
                <input v-model="book.title" placeholder="Например: Основы газового анализа" />
              </div>

              <div class="field-group">
                <label>Автор</label>
                <input v-model="book.author" placeholder="Иванов И.И." />
              </div>

              <div class="field-row">
                <div class="field-group">
                  <label>Год</label>
                  <input v-model.number="book.year" type="number" placeholder="2020" />
                </div>
                <div class="field-group">
                  <label>Тип</label>
                  <select v-model="book.type">
                    <option value="book">Книга</option>
                    <option value="article">Статья</option>
                    <option value="standard">Стандарт</option>
                    <option value="method">Методика</option>
                  </select>
                </div>
              </div>

              <div class="field-group">
                <label>Категория</label>
                <input v-model="book.category" placeholder="Например: Газовый анализ" />
              </div>

              <div class="field-group">
                <label>Аннотация</label>
                <textarea v-model="book.annotation" placeholder="Краткое описание книги" rows="3"></textarea>
              </div>

              <div class="field-group">
                <label>Файл книги</label>
                <div class="image-upload-row">
                  <input v-model="book.file_url" placeholder="/books/имя.pdf" />
                  <button type="button" @click="uploadBookFile(book)" class="btn-upload">📤 Загрузить файл</button>
                </div>
                <p v-if="book.file_url" class="section-hint">
                  Файл: <a :href="book.file_url" target="_blank">{{ book.file_url }}</a>
                </p>
              </div>

              <div class="field-group">
                <label>Доступ</label>
                <select v-model="book.availability">
                  <option value="Свободен">Свободен</option>
                  <option value="Занят">Занят</option>
                </select>
              </div>
            </div>

            <button @click="saveBook(book)" class="btn-save-product">💾 Сохранить книгу</button>
          </div>
        </div>

        <!-- 3D-МОДЕЛИ -->
        <div v-if="activeTab === 'models3d'" class="editor">
          <h2>3D-модели ({{ models3d.length }})</h2>
          <button @click="addModel3d" class="btn-add">+ Добавить модель</button>

          <div v-for="(model, index) in models3d" :key="model.id || 'new-m-' + index" class="product-item">
            <div class="product-header">
              <h3>Модель #{{ index + 1 }}</h3>
              <button v-if="model.id" @click="removeModel3d(model)" class="btn-remove">🗑 Удалить</button>
            </div>

            <div class="product-fields">
              <div class="field-group">
                <label>Название *</label>
                <input v-model="model.name" placeholder="Например: Корпус газоанализатора" />
              </div>

              <div class="field-group">
                <label>Описание</label>
                <textarea v-model="model.description" placeholder="Краткое описание модели" rows="3"></textarea>
              </div>

              <div class="field-row">
                <div class="field-group">
                  <label>Формат</label>
                  <select v-model="model.format">
                    <option value="STEP">STEP</option>
                    <option value="IGES">IGES</option>
                    <option value="STL">STL</option>
                    <option value="DWG">DWG</option>
                  </select>
                </div>
                <div class="field-group">
                  <label>Категория (необязательно)</label>
                  <input v-model="model.category" placeholder="Корпуса, Датчики..." />
                </div>
              </div>

              <div class="field-group">
                <label>Файл модели</label>
                <div class="image-upload-row">
                  <input v-model="model.file_url" placeholder="/models/имя.step" />
                  <button type="button" @click="uploadModelFile(model)" class="btn-upload">📤 Загрузить</button>
                </div>
                <p v-if="model.file_url" class="section-hint">
                  Файл: <a :href="model.file_url" target="_blank">{{ model.file_url }}</a>
                  <span v-if="model.size"> — {{ model.size }}</span>
                </p>
              </div>

              <div class="field-row">
                <div class="field-group">
                  <label>Скачиваний</label>
                  <input v-model.number="model.downloads" type="number" min="0" />
                </div>
                <div class="field-group">
                  <label>Рейтинг</label>
                  <input v-model.number="model.rating" type="number" min="0" max="5" step="0.1" />
                </div>
              </div>
            </div>

            <button @click="saveModel3d(model)" class="btn-save-product">💾 Сохранить модель</button>
          </div>
        </div>

        <!-- КОНТАКТЫ -->
        <div v-if="activeTab === 'contacts'" class="editor">
          <h2>Контакты и тексты</h2>
          
          <div class="settings-form">
            <h3>📞 Коммерческий отдел</h3>
            <label>Название</label>
            <input v-model="contacts.commercial_label" placeholder="Коммерческий отдел" />
            <label>Телефон</label>
            <input v-model="contacts.commercial_phone" placeholder="+7 (812) 252-22-45" />
            <label>Email</label>
            <input v-model="contacts.commercial_email" placeholder="marketing@himanalit.ru" />
            
            <h3>📞 Секретарь</h3>
            <label>Название</label>
            <input v-model="contacts.secretary_label" placeholder="Секретарь" />
            <label>Телефон</label>
            <input v-model="contacts.secretary_phone" placeholder="+7 (812) 786-61-59" />
            <label>Email</label>
            <input v-model="contacts.secretary_email" placeholder="mail@himanalit.ru" />
            
            <h3>📍 Адрес</h3>
            <label>Название</label>
            <input v-model="contacts.address_label" placeholder="Адрес" />
            <label>Адрес</label>
            <input v-model="contacts.address" placeholder="190020, Санкт-Петербург, ул. Бумажная, 17" />

            <div class="checkbox-group">
              <label class="checkbox-label">
                <input 
                  type="checkbox" 
                  :checked="contacts.show_address != 0" 
                  @change="contacts.show_address = $event.target.checked ? 1 : 0" 
                />
                <span>Показывать адрес на сайте</span>
              </label>
            </div>
            
            <h3>📄 Тексты</h3>
            <label>Название сайта</label>
            <input v-model="contacts.site_title" placeholder="АО «ГосНИИхиманалит»" />
            <label>Заголовок на главной</label>
            <input v-model="contacts.hero_title" placeholder="Производство, испытания, метрология" />
            <label>Текст о компании</label>
            <textarea v-model="contacts.about_text" rows="4"></textarea>
          </div>
          
          <button @click="saveContacts" class="btn-save-product">💾 Сохранить контакты</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const password = ref('')
const authenticated = ref(false)
const loginError = ref(false)
const activeTab = ref('products')

const tabs = [
  { key: 'products', label: 'Товары' },
  { key: 'carousel', label: 'Карусель' },
  { key: 'arenda', label: 'Аренда' },
  { key: 'vacancies', label: 'Вакансии' },
  { key: 'books', label: 'Библиотека' },
  { key: 'models3d', label: '3D-модели' },
  { key: 'contacts', label: 'Контакты' }
]

const ADMIN_PASSWORD = 'admin'

const products = ref([])
const arenda = ref([])
const vacancies = ref([])
const contacts = ref({})
const carousel = ref([])
const books = ref([])
const models3d = ref([])
const editingProduct = ref(null)

function editProduct(product) {
  editingProduct.value = JSON.parse(JSON.stringify(product))
}

function closeProductModal() {
  editingProduct.value = null
}

async function saveProductFromModal() {
  if (!editingProduct.value.title?.trim()) { alert('Введите название!'); return }
  
  ;(editingProduct.value.tables || []).forEach(tbl => {
    ;(tbl.rows || []).forEach(row => {
      if (!row.type) row.type = 'item'
      if (!row.rowspan) row.rowspan = 1
      if (!row.colspan) row.colspan = 1
    })
  })
  
  try {
    if (editingProduct.value.id) {
      await $fetch(`/api/products/${editingProduct.value.id}`, { method: 'PUT', body: editingProduct.value })
    } else {
      await $fetch('/api/products', { method: 'POST', body: editingProduct.value })
    }
    alert('✅ Сохранено!')
    closeProductModal()
    loadAll()
  } catch (e) { alert('❌ ' + e.message) }
}

function login() {
  if (password.value === ADMIN_PASSWORD) {
    authenticated.value = true
    loginError.value = false
    loadAll()
  } else {
    loginError.value = true
  }
}

async function loadAll() {
  try { products.value = await $fetch('/api/products') || [] } catch(e) { products.value = [] }
  try { carousel.value = await $fetch('/api/carousel') || [] } catch(e) { carousel.value = [] }
  try { arenda.value = await $fetch('/api/arenda') || [] } catch(e) { arenda.value = [] }
  try { vacancies.value = await $fetch('/api/vacancies') || [] } catch(e) { vacancies.value = [] }
  try { contacts.value = await $fetch('/api/contacts') || {} } catch(e) { contacts.value = {} }
  try { books.value = await $fetch('/api/books') || [] } catch(e) { books.value = [] }
  try { models3d.value = await $fetch('/api/models-3d') || [] } catch(e) { models3d.value = [] }
}

// ТОВАРЫ
function addProduct() {
  editingProduct.value = {
    id: null,
    title: '',
    description: '',
    category: '',
    image_url: '',
    slug: '',
    purpose: '',
    principle: '',
    features: [],
    delivery_set: [],
    warranty: '',
    verification_interval: '',
    certificates: '',
    tables: [],
    specs: [],
    show_in_carousel: 0,
    carousel_position: 0
  }
}


async function removeProduct(product) {
  if (!confirm(`Удалить "${product.title}"?`)) return
  try {
    await $fetch(`/api/products/${product.id}`, { method: 'DELETE' })
    loadAll()
  } catch (e) { alert('❌ ' + e.message) }
}

function addSpec(product) {
  if (!product.specs) product.specs = []
  product.specs.push({ name: '', value: '', unit: '' })
}

function removeSpec(product, i) {
  product.specs.splice(i, 1)
}

async function uploadImage(product) {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/*'
  input.onchange = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    const fd = new FormData()
    fd.append('image', file)
    try {
      const r = await $fetch('/api/upload', { method: 'POST', body: fd })
      if (r.success) { product.image_url = r.url; alert('✅ Загружено!') }
      else alert('❌ ' + r.error)
    } catch (err) { alert('❌ ' + err.message) }
  }
  input.click()
}

async function moveProduct(index, direction) {
  const target = direction === 'up' ? index - 1 : index + 1
  if (target < 0 || target >= products.value.length) return
  
  const list = [...products.value]
  ;[list[index], list[target]] = [list[target], list[index]]
  products.value = list
  
  try {
    for (let i = 0; i < list.length; i++) {
      await $fetch(`/api/products/${list[i].id}`, {
        method: 'PUT',
        body: { ...list[i], position: i + 1 }
      })
    }
    loadAll()
  } catch (e) {
    alert('❌ ' + e.message)
  }
}

// АРЕНДА
function addArenda() {
  arenda.value.unshift({ id: null, name: '', description: '', area: '', floor: '', ceiling_height: '', power_supply: '', price: '', features: [], image: '', status: 'available' })
}

async function saveArenda(item) {
  if (!item.name?.trim()) { alert('Введите название!'); return }
  try {
    if (item.id) await $fetch(`/api/arenda/${item.id}`, { method: 'PUT', body: item })
    else await $fetch('/api/arenda', { method: 'POST', body: item })
    alert('✅ Сохранено!')
    loadAll()
  } catch (e) { alert('❌ ' + e.message) }
}

async function removeArenda(item) {
  if (!confirm(`Удалить "${item.name}"?`)) return
  await $fetch(`/api/arenda/${item.id}`, { method: 'DELETE' })
  loadAll()
}

function addFeature(item) {
  if (!item.features) item.features = []
  item.features.push('')
}

function removeFeature(item, i) { item.features.splice(i, 1) }

async function uploadArendaImage(item) {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/*'
  input.onchange = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    const fd = new FormData()
    fd.append('image', file)
    try {
      const r = await $fetch('/api/upload', { method: 'POST', body: fd })
      if (r.success) {
        item.image = r.url
        alert('✅ Изображение загружено!')
      } else {
        alert('❌ ' + r.error)
      }
    } catch (err) {
      alert('❌ ' + err.message)
    }
  }
  input.click()
}

// ВАКАНСИИ
function addVacancy() {
  vacancies.value.unshift({ id: null, title: '', department: '', type: 'Полная занятость', salary: '', requirements: [], active: true })
}

async function saveVacancy(item) {
  if (!item.title?.trim()) { alert('Введите название!'); return }
  try {
    if (item.id) await $fetch(`/api/vacancies/${item.id}`, { method: 'PUT', body: item })
    else await $fetch('/api/vacancies', { method: 'POST', body: item })
    alert('✅ Сохранено!')
    loadAll()
  } catch (e) { alert('❌ ' + e.message) }
}

async function removeVacancy(item) {
  if (!confirm(`Удалить "${item.title}"?`)) return
  await $fetch(`/api/vacancies/${item.id}`, { method: 'DELETE' })
  loadAll()
}

function addRequirement(item) {
  if (!item.requirements) item.requirements = []
  item.requirements.push('')
}

function removeRequirement(item, i) { item.requirements.splice(i, 1) }

// КОНТАКТЫ
async function saveContacts() {
  try {
    await $fetch('/api/contacts', { method: 'PUT', body: contacts.value })
    alert('✅ Сохранено!')
  } catch (e) { alert('❌ ' + e.message) }
}

// БИБЛИОТЕКА
function addBook() {
  books.value.unshift({
    id: null,
    title: '',
    author: '',
    year: new Date().getFullYear(),
    type: 'book',
    category: '',
    annotation: '',
    file_url: '',
    availability: 'Свободен'
  })
}

async function saveBook(book) {
  if (!book.title?.trim()) { alert('Введите название!'); return }
  try {
    if (book.id) {
      await $fetch(`/api/books/${book.id}`, { method: 'PUT', body: book })
    } else {
      await $fetch('/api/books', { method: 'POST', body: book })
    }
    alert('✅ Сохранено!')
    loadAll()
  } catch (e) { alert('❌ ' + e.message) }
}

async function removeBook(book) {
  if (!confirm(`Удалить "${book.title}"?`)) return
  try {
    await $fetch(`/api/books/${book.id}`, { method: 'DELETE' })
    loadAll()
  } catch (e) { alert('❌ ' + e.message) }
}

async function uploadBookFile(book) {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.pdf,.djvu,.epub,.fb2,.doc,.docx,.txt'
  input.onchange = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    const fd = new FormData()
    fd.append('file', file)
    try {
      const r = await $fetch('/api/upload-book', { method: 'POST', body: fd })
      if (r.success) {
        book.file_url = r.url
        alert('✅ Файл загружен!')
      } else {
        alert('❌ ' + r.error)
      }
    } catch (err) { alert('❌ ' + err.message) }
  }
  input.click()
}

// 3D-МОДЕЛИ
function addModel3d() {
  models3d.value.unshift({
    id: null,
    name: '',
    description: '',
    format: 'STEP',
    category: '',
    size: '',
    file_url: '',
    downloads: 0,
    rating: 0
  })
}

async function saveModel3d(model) {
  if (!model.name?.trim()) { alert('Введите название!'); return }
  try {
    if (model.id) {
      await $fetch(`/api/models-3d/${model.id}`, { method: 'PUT', body: model })
    } else {
      await $fetch('/api/models-3d', { method: 'POST', body: model })
    }
    alert('✅ Сохранено!')
    loadAll()
  } catch (e) { alert('❌ ' + e.message) }
}

async function removeModel3d(model) {
  if (!confirm(`Удалить "${model.name}"?`)) return
  try {
    await $fetch(`/api/models-3d/${model.id}`, { method: 'DELETE' })
    loadAll()
  } catch (e) { alert('❌ ' + e.message) }
}

async function uploadModelFile(model) {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.step,.stp,.iges,.igs,.stl,.dwg'
  input.onchange = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    const fd = new FormData()
    fd.append('file', file)
    try {
      const r = await $fetch('/api/upload-model', { method: 'POST', body: fd })
      if (r.success) {
        model.file_url = r.url
        model.size = r.size
        model.format = r.format
        alert('✅ Файл загружен!')
      } else {
        alert('❌ ' + r.error)
      }
    } catch (err) { alert('❌ ' + err.message) }
  }
  input.click()
}

// ОСОБЕННОСТИ ТОВАРА
function addProductFeature(product) {
  if (!product.features) product.features = []
  product.features.push('')
}

function removeProductFeature(product, index) {
  if (!product.features) return
  product.features.splice(index, 1)
}

// КОМПЛЕКТ ПОСТАВКИ
function addDeliveryItem(product) {
  if (!product.delivery_set) product.delivery_set = []
  product.delivery_set.push('')
}

function removeDeliveryItem(product, index) {
  if (!product.delivery_set) return
  product.delivery_set.splice(index, 1)
}

// ТАБЛИЦЫ
function addTable(product) {
  if (!product.tables) product.tables = []
  product.tables.push({
    title: '',
    columns: 2,
    rows: [{ type: 'item', name: '', value: '', value2: '', rowspan: 1, colspan: 1 }]
  })
}

function removeTable(product, index) {
  if (!confirm('Удалить таблицу?')) return
  product.tables.splice(index, 1)
}

function addRow(product, tableIndex) {
  product.tables[tableIndex].rows.push({
    type: 'item',
    name: '',
    value: '',
    value2: '',
    rowspan: 1,
    colspan: 1
  })
}

function removeRow(product, tableIndex, rowIndex) {
  product.tables[tableIndex].rows.splice(rowIndex, 1)
}

// КАРУСЕЛЬ ПРОДУКЦИИ


const carouselProducts = computed(() => {
  return products.value
    .filter(p => p.show_in_carousel === 1)
    .sort((a, b) => (a.carousel_position || 0) - (b.carousel_position || 0))
})

const nonCarouselProducts = computed(() => {
  return products.value.filter(p => p.show_in_carousel !== 1)
})

async function toggleCarousel(product, add) {
  if (!product.id) {
    alert('Сначала сохраните товар!')
    return
  }
  
  product.show_in_carousel = add ? 1 : 0
  
  if (add) {
    // Ставим в конец карусели
    const maxPos = Math.max(0, ...carouselProducts.value.map(p => p.carousel_position || 0))
    product.carousel_position = maxPos + 1
  }
  
  try {
    await $fetch(`/api/products/${product.id}`, { method: 'PUT', body: product })
    loadAll()
  } catch (e) {
    alert('❌ ' + e.message)
  }
}

async function moveProductInCarousel(index, direction) {
  const list = [...carouselProducts.value]
  const target = direction === 'up' ? index - 1 : index + 1
  if (target < 0 || target >= list.length) return
  
  // Меняем местами
  ;[list[index], list[target]] = [list[target], list[index]]
  
  // Пересчитываем позиции
  try {
    for (let i = 0; i < list.length; i++) {
      await $fetch(`/api/products/${list[i].id}`, {
        method: 'PUT',
        body: { ...list[i], carousel_position: i + 1 }
      })
    }
    loadAll()
  } catch (e) {
    alert('❌ ' + e.message)
  }
}
</script>

<style scoped>
.admin-page {
  padding: 2rem 0;
  background: #f5f7fa;
  min-height: 100vh;
}

.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 20px;
}

h1 {
  font-size: 2rem;
  color: #005700;
  margin-bottom: 2rem;
}

.login-form {
  max-width: 400px;
  margin: 100px auto;
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}

.login-form h2 {
  margin-bottom: 1.5rem;
  text-align: center;
}

.login-form input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  margin-bottom: 1rem;
}

.login-form button {
  width: 100%;
  padding: 12px;
  background: #005700;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
}

.login-form .error {
  color: #dc2626;
  margin-top: 0.5rem;
  text-align: center;
}

.admin-nav {
  display: flex;
  gap: 10px;
  margin-bottom: 1.5rem;
  background: white;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  flex-wrap: wrap;
}

.admin-nav button {
  padding: 10px 24px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  background: transparent;
  transition: all 0.3s;
}

.admin-nav button:hover {
  background: #f0f9f0;
}

.admin-nav button.active {
  background: #005700;
  color: white;
}

.editor {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.editor h2 {
  margin-bottom: 1.5rem;
}

.product-item {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  background: #fafbfc;
}

.product-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e5e7eb;
}

.product-header h3 {
  color: #005700;
  font-size: 1.1rem;
}

.product-fields {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.field-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.field-group label {
  font-weight: 600;
  font-size: 14px;
  color: #333;
}

.field-group input,
.field-group textarea,
.field-group select {
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  width: 100%;
}

.field-group input:focus,
.field-group textarea:focus,
.field-group select:focus {
  outline: none;
  border-color: #005700;
}

.row-input-span {
  width: 65px;
  flex-shrink: 0;
  padding: 8px 6px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 13px;
  text-align: center;
}

.row-input-span:focus {
  outline: none;
  border-color: #005700;
}

.btn-add {
  padding: 8px 16px;
  background: #2196F3;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-bottom: 1rem;
}

.btn-add:hover {
  background: #1976D2;
}

.btn-remove {
  padding: 6px 14px;
  background: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
}

.btn-remove:hover {
  background: #d32f2f;
}

.btn-save-product {
  margin-top: 1rem;
  padding: 10px 24px;
  background: #005700;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}

.btn-save-product:hover {
  background: #003d00;
}

.image-upload-row {
  display: flex;
  gap: 10px;
  align-items: center;
}

.image-upload-row input {
  flex: 1;
}

.btn-upload {
  padding: 10px 16px;
  background: #005700;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  white-space: nowrap;
  transition: background 0.3s;
}

.btn-upload:hover {
  background: #003d00;
}

.image-preview {
  margin-top: 10px;
  max-width: 200px;
  max-height: 150px;
  object-fit: contain;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.spec-section {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
}

.section-label {
  font-weight: 700;
  color: #005700;
  font-size: 15px;
  display: block;
  margin-bottom: 4px;
}

.section-hint {
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 8px;
}

.spec-row {
  display: flex;
  gap: 8px;
  margin-bottom: 6px;
  align-items: center;
  flex-wrap: wrap;
}

.spec-input-name {
  flex: 2;
  min-width: 120px;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.spec-input-value {
  flex: 1;
  min-width: 80px;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.spec-input-unit {
  flex: 1;
  min-width: 70px;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.btn-add-spec {
  padding: 4px 14px;
  background: #e8f5e9;
  color: #2e7d32;
  border: 1px solid #2e7d32;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  margin-top: 4px;
}

.btn-add-spec:hover {
  background: #2e7d32;
  color: #fff;
}

.btn-remove-spec {
  padding: 4px 10px;
  background: #ffebee;
  color: #c62828;
  border: 1px solid #c62828;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
}

.btn-remove-spec:hover {
  background: #c62828;
  color: #fff;
}

/* ТАБЛИЦЫ */
.tables-section {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.btn-add-table {
  padding: 8px 16px;
  background: #2196F3;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}

.btn-add-table:hover {
  background: #1976D2;
}

.table-editor {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  background: #fff;
}

.table-header {
  display: flex;
  gap: 10px;
  margin-bottom: 1rem;
}

.table-title-input {
  flex: 1;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
}

.table-cols-select {
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  background: #fff;
  cursor: pointer;
  min-width: 110px;
}

.table-cols-select:focus {
  outline: none;
  border-color: #005700;
}

.btn-remove-table {
  padding: 8px 14px;
  background: #f44336;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  white-space: nowrap;
}

.btn-remove-table:hover {
  background: #d32f2f;
}

.table-rows {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.table-row {
  display: flex;
  gap: 6px;
  align-items: center;
  flex-wrap: wrap;
  padding: 6px;
  border-radius: 6px;
}

.table-row:hover {
  background: var(--bg-section);
}

.row-input-name,
.row-input-value {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.row-input-name:focus,
.row-input-value:focus {
  outline: none;
  border-color: #005700;
}

/* Строки таблицы */
.row-type-select {
  flex-shrink: 0;
  padding: 8px 6px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 13px;
  background: #fff;
  cursor: pointer;
  min-width: 90px;
}

.row-type-select:focus {
  outline: none;
  border-color: #005700;
}

.btn-remove-row {
  padding: 8px 12px;
  background: #ffebee;
  color: #c62828;
  border: 1px solid #c62828;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  flex-shrink: 0;
}

.btn-remove-row:hover {
  background: #c62828;
  color: #fff;
}

.btn-add-row {
  align-self: flex-start;
  padding: 6px 14px;
  background: #e8f5e9;
  color: #2e7d32;
  border: 1px solid #2e7d32;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  margin-top: 4px;
}

.btn-add-row:hover {
  background: #2e7d32;
  color: #fff;
}

.settings-form label {
  display: block;
  font-weight: 600;
  margin-top: 1rem;
  margin-bottom: 0.25rem;
  font-size: 14px;
}

.settings-form input,
.settings-form textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
}

.settings-form h3 {
  font-size: 1.1rem;
  color: #005700;
  margin-top: 1.5rem;
  border-top: 2px solid #e5e7eb;
  padding-top: 1rem;
}

.checkbox-group {
  margin-top: 8px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  color: #333;
}

.checkbox-label input[type="checkbox"] {
  width: 18px;
  height: 18px;
  accent-color: #005700;
  cursor: pointer;
  flex-shrink: 0;
}

.carousel-actions {
  display: flex;
  gap: 6px;
  align-items: center;
}

.btn-move {
  width: 32px;
  height: 32px;
  background: #fff;
  color: #005700;
  border: 2px solid #005700;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-move:hover:not(:disabled) {
  background: #005700;
  color: #fff;
}

.btn-move:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

/* Компактный список товаров */
.products-compact-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.product-compact-item {
  display: grid;
  grid-template-columns: 40px 1fr 200px 180px;
  gap: 12px;
  align-items: center;
  padding: 10px 14px;
  background: #fafbfc;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  transition: all 0.2s;
}

.product-compact-item:hover {
  background: #f0f9f0;
  border-color: #005700;
}

.product-compact-num {
  color: #9ca3af;
  font-size: 13px;
  font-weight: 600;
}

.product-compact-title {
  font-weight: 500;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.product-compact-category {
  color: #6b7280;
  font-size: 13px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.product-compact-actions {
  display: flex;
  gap: 6px;
  justify-content: flex-end;
}

.btn-edit {
  padding: 6px 12px;
  background: #e8f5e9;
  color: #2e7d32;
  border: 1px solid #2e7d32;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
}

.btn-edit:hover {
  background: #2e7d32;
  color: #fff;
}

.product-compact-empty {
  padding: 2rem;
  text-align: center;
  color: #9ca3af;
  font-size: 14px;
}

/* Модалка товара */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3000;
  padding: 20px;
}

.modal-product {
  background: #fff;
  border-radius: 12px;
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.modal-product-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.modal-product-header h2 {
  margin: 0;
  font-size: 1.25rem;
  color: #005700;
}

.modal-product-body {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
}

.modal-product-footer {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  padding: 1rem 1.5rem;
  border-top: 1px solid #e5e7eb;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6b7280;
}

.btn-move {
  width: 28px;
  height: 28px;
  background: #fff;
  color: #005700;
  border: 1px solid #005700;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.btn-move:hover:not(:disabled) {
  background: #005700;
  color: #fff;
}

.btn-move:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

/* Карусель */
.carousel-section-title {
  font-size: 1.1rem;
  color: #005700;
  margin: 1.5rem 0 1rem 0;
  padding-bottom: 6px;
  border-bottom: 2px solid #e5e7eb;
}

.carousel-empty {
  padding: 1.5rem;
  text-align: center;
  color: #6b7280;
  background: var(--bg-section);
  border-radius: 6px;
  font-size: 14px;
}

.carousel-row {
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 10px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  margin-bottom: 8px;
  background: #fff;
  transition: all 0.2s;
}

.carousel-row:hover {
  border-color: #005700;
  box-shadow: 0 2px 8px rgba(0, 87, 0, 0.08);
}

.carousel-row-inactive {
  opacity: 0.7;
}

.carousel-row-inactive:hover {
  opacity: 1;
}

.carousel-thumb {
  width: 60px;
  height: 60px;
  object-fit: contain;
  border-radius: 4px;
  background: var(--bg-section);
  border: 1px solid #e5e7eb;
  flex-shrink: 0;
}

.carousel-thumb-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
  font-size: 20px;
}

.carousel-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.carousel-info strong {
  color: #333;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.carousel-slug {
  color: #6b7280;
  font-size: 12px;
}

.carousel-actions {
  display: flex;
  gap: 6px;
  align-items: center;
  flex-shrink: 0;
}

.btn-add-to-carousel {
  padding: 6px 14px;
  background: #e8f5e9;
  color: #2e7d32;
  border: 1px solid #2e7d32;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  white-space: nowrap;
}

.btn-add-to-carousel:hover {
  background: #2e7d32;
  color: #fff;
}

@media (max-width: 600px) {
  .field-row {
    grid-template-columns: 1fr;
  }
  
  .product-header {
    flex-direction: column;
    gap: 8px;
    align-items: flex-start;
  }
}
</style>