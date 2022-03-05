
import axios from 'axios'

export default function generateModule (option) {
  this.nuxt.hook('build:before', async ({ app }) => {
    // 全データを取得

    //works_slug
    const articleUrl = await axios.get(
      `https://${process.env.SERVICE_DOMAIN}.microcms.io/api/v1/works`,
      {
        headers: { 'X-MICROCMS-API-KEY': process.env.API_KEY }
      }
    )
    const posts = articleUrl.data;


    //works_一覧
    let postsichiran = [];
    for(var para of posts.contents){
      postsichiran.push({
        id:para.id,
        midashi:para.midashi,
        cover:para.cover
      })
    }

    //works_前へ_次へ
    let postLinks = [];
    for(var postsLink of posts.contents){
      postLinks.push({
        id:postsLink.id,
      })
    }

   //pagecv
    const pagecvUrl = await axios.get(
      `https://${process.env.SERVICE_DOMAIN}.microcms.io/api/v1/pagecv`,
      {
        headers: { 'X-MICROCMS-API-KEY': process.env.API_KEY },
      }
    )
    const pagecv = pagecvUrl.data
    

    let pagecvInfo = [];  
    // お知らせ_下部
    if(pagecv.infoimage !== null && pagecv.infocaption !== null){
        //お知らせのみのjsonを取得しておく
        pagecvInfo.push({
          infoimage:pagecv.infoimage,
          infocaption:pagecv.infocaption,
        })
    }

    // ----------------------------------------
    // jsonを生成
    // ----------------------------------------

    this.options.build.plugins.push({
      apply(compiler) {
        compiler.hooks.emit.tap( 'slug', (compilation) => {
          posts.contents.forEach(post => {
            compilation.assets[`data/articles/${post.id}.json`] = {
              source: () => JSON.stringify(post),
              size: () => {}
            }
          })
        })

        compiler.hooks.emit.tap( 'ichiran', (compilation) => {
          compilation.assets["data/ichiran/index.json"] = {
            source: () => JSON.stringify(postsichiran),
            size: () => {}
          }
        })

        compiler.hooks.emit.tap( 'prev_next', (compilation) => {
            compilation.assets["data/articles/prev_next.json"] = {
              source: () => JSON.stringify(postLinks),
              size: () => {}
            }
        })

        compiler.hooks.emit.tap( 'pagecv', (compilation) => {
            compilation.assets["data/pagecv/index.json"] = {
              source: () => JSON.stringify(pagecv),
              size: () => {}
            }
        })

        if( pagecvInfo.length !== 0){
          compiler.hooks.emit.tap( 'news', (compilation) => {
            compilation.assets[`data/pagecv/infomation.json`] = {
              source: () => JSON.stringify(pagecvInfo),
              size: () => {}
            }
          })
        }

      }
    })

    // ----------------------------------------
    // prefetchにjsonを追加
    // ----------------------------------------
    process.env.GENERATOR_MODE === 'dev' ? 'server' : 'all';

    const url = process.env.GENERATOR_MODE === 'dev' ? '' : 'https://maedamaki.com';
    this.options.head.link = [
      ...this.options.head.link,
      ...posts.contents.map(post => (
        {
          rel: 'prefetch',
          href: `${url}/_nuxt/data/articles/${post.id}.json`
        })),
        {
          rel: 'prefetch',
          href: `${url}/_nuxt/data/ichiran/index.json`
        },
        {
          rel: 'prefetch',
          href: `${url}/_nuxt/data/pagecv/index.json`
        },
        {
          rel: 'prefetch',
          href: `${url}/_nuxt/data/pagecv/infomation.json`
        },
    ]
    console.log(this.options.head.link)
    if (this.options.dev) return
    // ルート生成（おそらく使わない？）
    this.options.generate.routes = posts.contents.map(post => `/${post.id}`)
  })
}