//url通信用
const fetch = require('node-fetch-with-proxy');

//node file操作
const fs = require('fs');
//envファイルからデータを取得
const path = require("path");
const imagemin = require("imagemin");
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require("imagemin-pngquant");

require('dotenv').config();


// FUNCTION_METHODS  ///////////////////////////////////////

//_1_パスファイルをurlと画像に分割する
function makePassToImg(dist) {
  let array = dist.split("/");
  var array_last = array.pop();
  return array_last;
}

//_2_apiを利用してmicrocmsのjson取得
async function getApi(url,link,key) {
  const res = await fetch(`https://${url}.microcms.io/api/v1/${link}`, {
    headers: {
      "X-MICROCMS-API-KEY": key
    }
  });
  const data = await res.json();
  return data;
}

// _3_画像をurlからダウンロード

async function downloadImage(url,downloadDir,fileName) {
  await fetch(`${url}`)
  .then(
    res =>
    new Promise((resolve, reject) => {      
      res.body.pipe(fs.createWriteStream(`${downloadDir}/${fileName}`))
      .on('error', reject)
      .once('close', function() {
        console.log(`conplete file... ${fileName}`);
        resolve(`${downloadDir}/${fileName}`)            
      });
    })
    )
  .then(
    res =>{
      compressor(downloadDir,fileName)
  })
}
      
// _画像を圧縮する


async function compressor(downloadDir,fileName){
  imagemin(
    [ downloadDir + '/' + fileName],
   {
    destination: downloadDir,
    plugins: [
      imageminMozjpeg({ quality: 80 }),
      imageminPngquant({ quality: [0.95, 1] }),
    ]
  }).then(() => {
    console.log( downloadDir + '/' + fileName)
    console.log('Images optimized');
  });
}

// 非同期通信開始  /////////////////////////////////


async function urlList() {
  
  //01_写真のダウンロードリストを格納する配列を設定
  var urlList = [];

  const data_A = await getApi(
    process.env.SERVICE_DOMAIN,
    "works",
    process.env.API_KEY
  );

  for( var el of data_A.contents){

    // 02_トップ部分の画像名を取得
    var fileRequestUrl = el.cover.url
    urlList.push(fileRequestUrl);
    
    //03_詳細部分の画像を取得
    for(var inner of el.detail){
      urlList.push(inner.detail_img.url);
    }
  }
  
  return urlList;
}

urlList()
  .then(function(data) {    

    //01_制作フォルダのファイル一覧を取得
    const fileList = fs.readdirSync('./assets/img/works')  
    

    //02_現在のmicrocms上のファイルリスト
    let presenseDataFiles = [];
    let presenseDataUrl = [];
    for( var el in data){
      let fileNameDetail =  makePassToImg(data[el])
      presenseDataFiles.push(fileNameDetail)
      presenseDataUrl.push(data[el])
    }
    
    //03_重複していない(書き出されていない)画像のリストを取得
    const duplicatedFileCheck = [...fileList, ...presenseDataFiles];
    const NeedWritingData = duplicatedFileCheck.filter(
      item => {
        if( fileList.includes(item) == false){
          return item
        }
    })

    //04_もし重複していない(書き出されていない)ファイルがあれば画像のダウンロードを実行する
    for(var writeFileUrl of presenseDataUrl ){
      var writeFileName = makePassToImg(writeFileUrl);
      if( NeedWritingData.length && NeedWritingData.includes(writeFileName)){
        downloadImage(
          writeFileUrl,
          './assets/img/works',
          writeFileName
          );
      }
    }
  })
  .catch(err => {
    console.log(err);
})

async function urlListB() {
  const data_B = await getApi(
    process.env.SERVICE_DOMAIN,
    "pagecv",
    process.env.API_KEY
  );

  var data = data_B.infoImage.url
  return data;
}

urlListB().then(function(data) {   

    const fileDir = './assets/img/info'
    //画像がフォルダになければダウンロードする。
    const fileList = fs.readdirSync(fileDir)  
    
    var fileName = makePassToImg(data)
    let indexOfFirst = fileList.indexOf(fileName);

    if(indexOfFirst == -1){
      downloadImage(data,fileDir,fileName)
    }
});

