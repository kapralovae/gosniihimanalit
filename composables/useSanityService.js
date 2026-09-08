// composables/useContentService.js

export const useContentService = () => {
  const loadAllData = async () => {
    try {
      console.log('🔍 Запрос к /api/content...')
      
      // ✅ Используем $fetch вместо useFetch
      const data = await $fetch('/api/content?password=admin')
      
      console.log('📦 Ответ API:', data)
      return data || {}
    } catch (error) {
      console.error('❌ Ошибка загрузки данных:', error.message)
      return {}
    }
  }

  const getAllProducts = async () => {
    console.log('🔄 getAllProducts вызван')
    const data = await loadAllData()
    return data.products?.products || []
  }

  const getCategories = async () => {
    console.log('🔄 getCategories вызван')
    const products = await getAllProducts()
    const categories = [...new Set(products.map(p => p.category).filter(Boolean))]
    return categories.map(name => ({
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      name: name
    }))
  }

  return {
    getAllProducts,
    getCategories
  }
}