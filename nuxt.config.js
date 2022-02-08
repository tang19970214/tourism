export default {
  server: {
    port: 5000
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: '台灣觀光景點',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  css: [
  ],

  plugins: [
    { src: '~/plugins/vue-leaflet.js', ssr: false }
  ],

  components: true,

  buildModules: [
    '@nuxtjs/tailwindcss',
    ["@nuxtjs/dotenv", {filename: ".env." + process.env.NODE_ENV}]
  ],

  modules: [
    '@nuxtjs/axios',
  ],

  axios: {
    baseURL: '/',
  },

  build: {
    publicPath: 'https://tang19970214.github.io/tourism/dist/'
  }
}
