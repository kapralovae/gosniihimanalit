export default defineNuxtConfig({
  compatibilityDate: '2026-09-01',
  
  devtools: { enabled: true },
  
  modules: [
    '@nuxtjs/tailwindcss',
  ],
  
  css: [
    '~/assets/css/main.css'
  ],

  
  app: {
    head: {
      title: 'ГосНИИхиманалит - Научно-производственное предприятие',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { 
          name: 'description', 
          content: 'ГосНИИхиманалит - производство, испытания, метрология, аналитическая химия' 
        }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' }
      ]
    }
  },

  nitro: {
    preset: 'node-server'
  }

})