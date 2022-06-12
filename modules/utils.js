
const cheerio = require('cheerio');



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
      $('p').each(function(i, obj){
          var _this = $(obj);
          var check = deleteData.test(_this);
          if(check){
            $(obj).remove();
          }
      })
      

      $('img').each(function(index, obj){
  
          var _this = $(obj);
          var url = _this.prop('src');
          var alt = _this.prop('alt');
  
          // console.log("画像URL:" + url);
          var imageName = exports.parseFileUrl(url);

          // URLの置き換え
          var urlPass = `${imgS3Pass}${imageName[1]}`;
  
          // 自要素の隣に置き換え後のHTMLを挿入し、自身を削除
          _this.after(`<img src="${urlPass}${imageName[2]}" alt="${alt}">`).remove();
      });
      
      // HTML取得
      richEditorText = $.html();
  }
  return richEditorText
}

export function sample(){
  console.log('sampleです。')
}