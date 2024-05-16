// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    vipToken: process.env.VIP_TOKEN,

    tencent: {
      secretId: process.env.TENCENT_SECRET_ID,
      secretKey: process.env.TENCENT_SECRET_KEY,
    },
    public: {
      baseUrl: process.env.BASE_URL,
      adminId: process.env.ADMIN_ID,
      bucketName: process.env.BUCKET_NAME,
    },
    databaseName: process.env.DATABASE_NAME,

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
