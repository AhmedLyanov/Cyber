import tailwindcss from "@tailwindcss/vite";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  modules: ['@nuxt/image', '@pinia/nuxt'],
  css: [
      '~/shared/assets/styles/main.css'
  ],
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:5001',
    },
  },

  plugins: ['~/shared/plugins/query-client.ts'],
})
