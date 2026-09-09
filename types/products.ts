// types/product.ts

export interface Product {
  id: string                    // Уникальный идентификатор
  name: string                  // Название прибора
  category: string              // Категория (например, "Анализаторы", "Датчики")
  shortDescription: string      // Краткое описание для карточки
  fullDescription: string       // Полное описание на странице товара
  price: number                 // Цена
  oldPrice?: number             // Старая цена (для акций)
  images: string[]              // Массив ссылок на изображения
  specifications: Record<string, string> // Характеристики (вес, размеры и т.д.)
  inStock: boolean              // В наличии или нет
  isNew?: boolean               // Новинка или нет
  isPopular?: boolean           // Популярный товар
  createdAt: string             // Дата добавления
}