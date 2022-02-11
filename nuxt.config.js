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
  ssr: 'true',
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
      { hid: "robots", name: "robots", content: "noindex" },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/icon.ico' }
    ]
  },
  css: [
    { src: '~/assets/scss/reset.scss', lang: 'scss' },
    { src: '~/assets/scss/common.scss', lang: 'scss' }
  ],
  components: true,
  modules: [
    "@nuxtjs/axios",
    '@nuxtjs/style-resources',
    'nuxt-svg-loader',
    'nuxt-basic-auth-module',
    ['nuxt-lazy-load', {
      defaultImage: '/img/default.png',
      loadingClass: 'ld',
      loadedClass: 'ld-cpt',
      directiveOnly: true,
    }]
  ],
  basic: {
    name: process.env.BASIC_NAME ,
    pass: process.env.BASIC_PASSWORD ,
    enabled: process.env.DEV_LOCK_KEY == 'true'
  },
  plugins: [
    "~/plugins/masornywall",
  ],
  build: {
    extend (config, ctx) {
      config.performance.maxAssetSize = 700 * 1024
    },
    loaders: {
      scss: {
        implementation: Sass,
        sassOptions: {
          fiber: Fiber
        }
      }
    }
  },
  styleResources: {
    scss: ['~/assets/scss/global/_var.scss'],
    scss: ['~/assets/scss/global/_mixin.scss'],
  },
  serverMiddleware: [
    '~/api/sendemail.js'
  ],
  buildModules: ['nuxt-microcms-module'],
  microcms: {
    options: {
      serviceDomain: process.env.SERVICE_DOMAIN,
      apiKey: process.env.API_KEY,
    },
    mode: process.env.NODE_ENV === 'production' ? 'server' : 'all',
  },
  generate:{
    interval: 100,
    staticAssets: {
      version: 'payloads'
    },
    async routes() {

      //経歴一覧
      const popularArticles = (
        await client.get({
          endpoint: 'works',
        })
      );
      
      const prevNext = (
        await client.get({
          endpoint: 'works',
          queries: { 
            limit: 100,
            fields: 'id',
          },
        })
      );

      //経歴詳細ページ
      const workDetail = await client
        .get({
          endpoint: 'works',
        })
        .then((res) => 
          res.contents.map((work) => ({
            route: `/works/${work.id}`,
            payload: {work , prevNext}
          }))
        );
      

      // topページ
      const index = {
        route: '/',
        payload: popularArticles,
      }

      //work一覧ページ
      const works = {
        route: '/works',
        payload: popularArticles,
      }

      // pagecv
      const pagecv = {
        route: '/pagecv',
        payload: await client.get({
          endpoint: 'pagecv',
        }),
      }
      
      return [
        index,
        works,
        pagecv,
        ...workDetail,
      ];
    },
    dir: 'dist',
  }
}

