// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET || 'chave-secreta-padrao'
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