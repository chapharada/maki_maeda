
const cheerio = require('cheerio');


async function makeHtmlForRichEditor(html, targetText, richEditorText, imgS3Pass) {
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


      $('img').each(function(i, obj){
  
          var _this = $(obj);
          var url = _this.prop('src');
          var alt = _this.prop('alt');
  
        //   console.log("画像URL:" + url);

          var imageName = exports.parseFileUrl(url);
  
          // URLの置き換え
          var urlPass = `/${imgS3Pass}${imageName[1]}`;
  
          // HTMLの置き換え処理
          // 自要素の隣に置き換え後のHTMLを挿入し、自身を削除
          _this.after(`<img src="${urlPass}${imageName[2]}" alt="${alt}">`).remove();
      });
      // HTML取得
      richEditorText = $.html();
  }
  return richEditorText
}