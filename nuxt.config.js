//dart sassの処理
const Fiber = require('fibers')
const Sass = require('sass')

// --microcms-sdk
import { createClient } from 'microcms-js-sdk'; //ES6

const client = createClient({
  serviceDomain: process.env.SERVICE_DOMAIN,
  apiKey: process.env.API_KEY,
});


export default {
  target: 'static',
  head: {
    title: 'makiMaeda',
    titleTemplate: '%s - makiMaeda',
    htmlAttrs: {
      prefix: 'og: http://ogp.me/ns#',
      lang: 'ja'
    },
    titleTemplate: 'makimaeda | %s',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { 
        hid: 'description',
        name: 'description',
        content: 'Portfoio By maki maeda.' 
      },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: [
    { src: '~/assets/scss/reset.scss', lang: 'scss' },
    { src: '~/assets/scss/common.scss', lang: 'scss' }
  ],
  components: true,
  buildModules: [
  ],
  modules: [
    "@nuxtjs/axios",
    '@nuxtjs/style-resources',
    'nuxt-svg-loader',
    ['nuxt-lazy-load', {
      defaultImage: '/img/default.png',
      loadingClass: 'ld',
      loadedClass: 'ld-cpt',
    }]
  ],
  plugins: [
    "~/plugins/masornywall",
  ],
  build: {
    loaders: {
      scss: {
        implementation: Sass,
        sassOptions: {
          fiber: Fiber
        }
      }
    },
    transpile: [
      'vue-magic-grid',
    ]
  },
  styleResources: {
    scss: ['~/assets/scss/global/_var.scss'],
    scss: ['~/assets/scss/global/_mixin.scss'],
  },
  buildModules: ['nuxt-microcms-module'],
  microcms: {
    options: {
      serviceDomain: process.env.SERVICE_DOMAIN,
      apiKey: process.env.API_KEY,
    },
    mode: process.env.NODE_ENV === 'production' ? 'server' : 'all',
  },
  generate:{
    routeCreated({ errors }) {
      if (errors.length > 0 && errors[0].error) {
        // console.log(errors)
        const error = errors[0].error
        throw new Error(`Failed generate ${error.path} -- ${error.message}`)
      }
    },
    interval: 100,
    async routes() {
      const workDetail = await client
        .get({
          endpoint: 'works',
        })
        .then((res) => 
          res.contents.map((work) => ({
            route: `/works/${work.id}`,
            payload: work
          }))
        );
      return workDetail;
    },
    dir: 'dist',
  }
}

