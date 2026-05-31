import tailwindcss from "@tailwindcss/vite";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  modules: ['@nuxt/image'],
  css: [
      '~/assets/styles/main.css'
  ],
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true }
})
