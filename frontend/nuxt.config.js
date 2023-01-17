export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'frontend',
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
    ],
    script: [
      {
        src: 'https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js'
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'element-ui/lib/theme-chalk/index.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/element-ui',
    './static/style.css'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    'nuxt-windicss',
    '@nuxt/postcss8'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/auth-next',
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  auth: {
    redirect: {
      login: '/',
      logout: '/',
      callback: '/',
      home: 'dashboard'
    },
    strategies: {
      local: {
        autoLogout: true,
        token: {
          property: 'token',
          global: true,
          required: true,
          type: 'Bearer',
          maxAge: 60 * 60 * 2
        },
        user: {
          property: 'user',
          autoFetch: true
        },
        endpoints: {
          login: { url: `${process.env.BACKEND_URL}/api/auth/login`, method: 'post' },
          logout: false,
          user: { url: `${process.env.BACKEND_URL}/api/user/me`, method: 'get' }
        }
      }
    }
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true
  },

  proxy: {
    // '/api/ ': 'http://localhost:5001/api'
    '/api/': { target: `${process.env.BACKEND_URL}/api`, pathRewrite: { '^/api/': '' } }
  },

  publicRuntimeConfig: {
    userRoles: process.env.USER_ROLES
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {}
      }
    }
  }
}
