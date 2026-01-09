// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET || 'chave-secreta-padrao',
    // Chaves públicas ou configuráveis via .env
    runtimeConfig: {
      storagePath: process.env.STORAGE_PATH,

    public: {
      siteName: 'paravyomayoga',
      // O Nuxt mapeia automaticamente NUXT_PUBLIC_UPLOAD_PATH do .env para cá
      uploadPath: process.env.NUXT_PUBLIC_UPLOAD_PATH || 'public/images'
    }
  },
  
  css: [
    'primeicons/primeicons.css' // <--- ESTA LINHA É OBRIGATÓRIA
  ],
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/content', '@nuxt/image', '@primevue/nuxt-module'],
  primevue: {
    options: {
      ripple: true, // Ativa o efeito de clique (opcional)
      theme: {
        preset: 'Aura' // Opções: 'Aura', 'Lara' ou 'Nora'
      }
    }
  },
  pages: true
})