// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    databaseUrl: process.env.DATABASE_URL,
    public: {
      baseUrl: process.env.BASE_URL || 'http://localhost:3030',
    },

  },
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@nuxtjs/color-mode',
    '@pinia/nuxt',
    '@nuxt/ui',
    '@nuxtjs/mdc',
    '@nuxt/image',
    '@nuxtjs/supabase',
  ],
  mdc: {
    highlight: {
      theme: {
        default: 'vitesse-light',
        dark: 'material-theme-palenight',
      },
      preload: [
        'sql',
      ],
    },
    remarkPlugins: {
      'remark-mdc': {
        options: {
          experimental: {
            autoUnwrap: true,
          },
        },
      },
    },
  },
  colorMode: {
    classSuffix: '',
  },
  vite: {
    define: {
      global: 'window',
    },
  },
  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
    },

  },
})
