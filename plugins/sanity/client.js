// plugins/sanity.client.js

import { createClient } from '@sanity/client'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  
  const client = createClient({
    projectId: config.public.sanityProjectId || '7swl20he',
    dataset: config.public.sanityDataset || 'production',
    apiVersion: '2024-01-01',
    useCdn: true
  })

  return {
    provide: {
      sanity: client
    }
  }
})