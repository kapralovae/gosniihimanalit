// composables/useContacts.js

export const useContacts = () => {
  const loadData = async () => {
    try {
      const data = await $fetch('/api/content?password=admin')
      return data.contacts || {}  // ← теперь contacts
    } catch (error) {
      console.error('❌ Ошибка загрузки контактов:', error.message)
      return {}
    }
  }

  const parseAddress = (address) => {
    if (!address) {
      return { index: '190020', city: 'Санкт-Петербург', street: 'ул. Бумажная', house: '17' }
    }
    const parts = address.split(',').map(s => s.trim())
    if (parts.length >= 4) {
      return {
        index: parts[0] || '190020',
        city: parts[1] || 'Санкт-Петербург',
        street: parts[2] || 'ул. Бумажная',
        house: parts[3] || '17'
      }
    }
    return { index: '190020', city: 'Санкт-Петербург', street: 'ул. Бумажная', house: '17' }
  }

  const getContacts = async () => {
    const data = await loadData()
    const address = parseAddress(data.address)
    
    return {
      commercialLabel: data.commercialLabel || 'Коммерческий отдел',
      commercialPhone: data.commercialPhone || '+7 (812) 252-22-45',
      commercialEmail: data.commercialEmail || 'marketing@himanalit.ru',
      
      secretaryLabel: data.secretaryLabel || 'Секретарь',
      phone: data.phone || '+7 (812) 786-61-59',
      email: data.email || 'mail@himanalit.ru',
      
      addressLabel: data.addressLabel || 'Адрес',
      addressIndex: address.index,
      addressCity: address.city,
      addressStreet: address.street,
      addressHouse: address.house,
      
      siteTitle: data.siteTitle || 'АО «ГосНИИхиманалит»',
      heroTitle: data.heroTitle || 'Производство, испытания, метрология',
      aboutText: data.aboutText || 'АО «ГосНИИхиманалит» — научно-производственное предприятие.'
    }
  }

  return {
    loadData,
    getContacts
  }
}