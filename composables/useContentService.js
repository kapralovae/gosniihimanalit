// composables/useContentService.js

// 🔥 Адаптер для преобразования данных из JSON в нужный формат
const adaptProduct = (product) => {
  let specs = product.specs || []
  
  // Если specs — объект, преобразуем в массив
  if (!Array.isArray(specs) && typeof specs === 'object') {
    specs = Object.entries(specs).map(([key, value]) => ({
      name: key,
      value: String(value || ''),
      unit: ''
    }))
  }
  
  // Если specs — массив строк, преобразуем в объекты
  if (specs.length > 0 && typeof specs[0] === 'string') {
    specs = specs.map(s => {
      const match = s.match(/^([^:]+):\s*(.+)$/)
      if (match) {
        return { name: match[1].trim(), value: match[2].trim(), unit: '' }
      }
      return { name: s, value: '', unit: '' }
    })
  }
  
  return {
    id: product.id || product._id,
    name: product.name || 'Без названия',
    category: product.category || 'Без категории',
    shortDescription: product.shortDescription || '',
    fullDescription: product.fullDescription || '',
    price: product.price || 0,
    oldPrice: product.oldPrice || null,
    images: product.images || ['/images/products/placeholder.svg'],
    specs: specs,
    inStock: product.inStock ?? true,
    isNew: product.isNew ?? false,
    isPopular: product.isPopular ?? false,
    createdAt: product.createdAt || new Date().toISOString()
  }
}

export const useContentService = () => {
  const getAllProducts = async () => {
    try {
      const data = await $fetch('/api/content')
      const products = data.products?.products || []
      return products.map(adaptProduct)
    } catch (error) {
      console.error('❌ Ошибка загрузки товаров:', error.message)
      return []
    }
  }

  const getCategories = async () => {
    try {
      const data = await $fetch('/api/content')
      const products = data.products?.products || []
      const categories = [...new Set(products.map(p => p.category).filter(Boolean))]
      return categories.map(name => ({
        slug: name.toLowerCase().replace(/\s+/g, '-'),
        name: name
      }))
    } catch (error) {
      console.error('❌ Ошибка загрузки категорий:', error.message)
      return []
    }
  }

  const getProductById = async (id) => {
    const products = await getAllProducts()
    return products.find(p => p.id === id) || null
  }

  const getProductsByCategory = async (category) => {
    const products = await getAllProducts()
    return products.filter(p => p.category === category)
  }

  const getNewProducts = async (limit = 4) => {
    const products = await getAllProducts()
    return products.filter(p => p.isNew).slice(0, limit)
  }

  const getPopularProducts = async (limit = 4) => {
    const products = await getAllProducts()
    return products.filter(p => p.isPopular).slice(0, limit)
  }

  const searchProducts = async (query) => {
    const products = await getAllProducts()
    const lowerQuery = query.toLowerCase()
    return products.filter(p =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.shortDescription?.toLowerCase().includes(lowerQuery)
    )
  }

  return {
    getAllProducts,
    getCategories,
    getProductById,
    getProductsByCategory,
    getNewProducts,
    getPopularProducts,
    searchProducts
  }
}