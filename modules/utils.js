
const cheerio = require('cheerio');
//url通信用
const fetch = require('node-fetch-with-proxy');
//node file操作
const fs = require('fs');


//_1_パスファイルをurlと画像に分割する
export function makePassToImg(dist) {
  let array = dist.split("/");
  var array_last = array.pop();
  return array_last;
}

//_2_apiを利用してmicrocmsのjson取得
export async function getApi(url,link,key) {
  const res = await fetch(`https://${url}.microcms.io/api/v1/${link}`, {
    headers: {
      "X-MICROCMS-API-KEY": key
    }
  });
  const data = await res.json();
  return data;
}


//_3_画像をurlからダウンロード
export async function downloadImage(url,downloadDir,fileName) {
  await fetch(`${url}`)
  .then(
    res =>
    new Promise((resolve, reject) => {      
      res.body.pipe(fs.createWriteStream(`${downloadDir}/${fileName}`))
      .on('error', reject)
      .once('close', function() {
            resolve(`${downloadDir}/${fileName}`)            
            console.log(`conplete file... ${fileName}`);
          });
      })
    )
}

// ファイルURLをパースする
exports.parseFileUrl = function(url) {
  url = url.match(/.+\/(.+)(\..+)/);
  if (!url) return null;

  // 拡張子に含まれるクエリの検出
  var urlParam = url[2].match(/(.+)(\?.+)/);

  if (urlParam) {
      // 拡張子のみにする
      url[2] = urlParam[1];
      // クエリを追加しておく
      url.push(urlParam[2]);
  }
  return url;
};

export async function makeHtmlForRichEditor(richEditorText, imgS3Pass) {
  if (richEditorText != null) {
      // サニタイズ解除
      richEditorText = richEditorText
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&quot;/g, '"')
          .replace(/&#039;/g, "'")
          .replace(/&#x2F;/g, '/')
          .replace(/&amp;/g, '&')
      ;


      // 画像毎に処理
      var $ = cheerio.load(richEditorText, { decodeEntities: false }, false);

      // brタグは基本的に削除
      let deleteData = new RegExp('<p><br></p>')
      let deleteDataB = new RegExp('<p><img.*?></p>')
      $('p').each(function(i, obj){
          var _this = $(obj);
          var check = deleteData.test(_this);
          if(check){
            $(obj).remove();
          }
          $(obj).children('img').unwrap();
      })

      $('img').each(function(index, obj){
  
          var _this = $(obj);
          var url = _this.prop('src');
          var alt = _this.prop('alt');

          // console.log("画像URL:" + url);
          var imageName = exports.parseFileUrl(url);
                    
          // URLの置き換え
          let fileName = `${imageName[1]}${imageName[2]}`

          //画像がフォルダになければダウンロードする。
          const fileList = fs.readdirSync(`.${imgS3Pass}`)  
          let indexOfFirst = fileList.indexOf(fileName);
          
          if(indexOfFirst == -1){
            exports.downloadImage(url,imgS3Pass,fileName)
          }

          // 自要素の隣に置き換え後のHTMLを挿入し、自身を削除
          _this.after(`<img src="_nuxt${imgS3Pass}${fileName}" alt="${alt}">`).remove();
      });
      
      // HTML取得
      richEditorText = $.html();
  }
  return richEditorText
}

