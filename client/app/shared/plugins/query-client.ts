import { VueQueryPlugin } from '@tanstack/vue-query'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueQueryPlugin, {
    queryClientConfig: {
      defaultOptions: {
        queries: {
          retry: 1,
          staleTime: 1000 * 60 * 5, 
        },
        mutations: {
          retry: 1,
        },
      },
    },
  })
})
