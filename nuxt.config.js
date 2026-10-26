export default defineNuxtConfig({
  compatibilityDate: '2026-09-01',
  
  devtools: { enabled: true },
  
  modules: [
    '@nuxtjs/tailwindcss',
  ],
  
  css: [
    '~/assets/css/main.css'
  ],

  runtimeConfig: {
    // Приватные переменные (только для сервера)
    smtpHost: process.env.SMTP_HOST || 'smtp.yandex.ru',
    smtpPort: process.env.SMTP_PORT || '465',
    smtpUser: process.env.SMTP_USER,
    smtpPass: process.env.SMTP_PASS,
    mailTo: process.env.MAIL_TO,
    
    // Публичные (доступны на клиенте)
    public: {
      siteUrl: 'https://himanalit.ru',
      siteName: 'ГосНИИХиманалит',
      companyName: 'АО "ГосНИИХиманалит"'
    }
  },
  
  app: {
    head: {
      htmlAttrs: {
        lang: 'ru'
      },
      title: 'ГосНИИхиманалит - Научно-производственное предприятие',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { 
          name: 'description', 
          content: 'ГосНИИХиманалит - производство, испытания, метрология, аналитическая химия' 
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