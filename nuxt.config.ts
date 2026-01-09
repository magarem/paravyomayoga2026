// nuxt.config.ts (Satélite Paravyoma)
export default defineNuxtConfig({
  runtimeConfig: {
    // 1. Chaves Privadas (Server-side)
    storagePath: process.env.STORAGE_PATH,
    jwtSecret: process.env.JWT_SECRET || 'chave-secreta-padrao',

    // 2. Chaves Públicas (Client-side)
    public: {
      siteName: 'paravyomayoga',
      uploadPath: process.env.NUXT_PUBLIC_UPLOAD_PATH || 'public/images'
    }
  },
  // ... resto das configurações
  vite: {
    server: {
      allowedHosts: true // Para evitar aquele erro de host que vimos
    }
  },
  css: ['primeicons/primeicons.css'],
  compatibilityDate: '2025-07-15',
  modules: ['@nuxtjs/tailwindcss', '@nuxt/content', '@nuxt/image', '@primevue/nuxt-module'],
  primevue: {
    options: {
      ripple: true,
      theme: {
        preset: 'Aura' 
      }
    }
  }
})