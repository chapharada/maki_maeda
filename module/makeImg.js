const fs = require('fs'); //nodeでのファイル操作
const path = require('path'); //nodeのパース読み込み

const imagemin         = require('imagemin-keep-folder'); //フォルダを再帰的に作成
const imageminMozjpeg  = require('imagemin-mozjpeg');　//jpg
const imageminPngquant = require('imagemin-pngquant'); //png
const imageminGifsicle = require('imagemin-gifsicle');  //gif
const imageminSvgo     = require('imagemin-svgo'); // svg

const chokidar = require("chokidar");//監視アプリ
const sharp = require('sharp');　//webp変換に使用する
const util = require('../lib/util.js') //ファイル操作

const fs = require('fs'); //nodeでのファイル操作
const path = require('path'); //nodeのパース読み込み


//同期フォルダ
var dir = 'src/assets/img';
var dist = 'dist/assets/img';

//ディレクトリの作成
function makeDir(dist) {
  let array = dist.split('/');
  array.pop();
  file = array.join('/');
  if (!fs.existsSync(file)) {
      fs.mkdirSync(file, { recursive: true });
  }
}

//webpをsharpを使用して変換
const imgWebp = function(file, dist) {
  sharp(file)
      .webp({
          lossless: true
      })
      .toFile(dist, (err) => {
          if (err) { throw err }
          console.log('追加:' + dist)
      })
}

//imagemin
const minProcess = (dir,message) =>
imagemin([dir], {
    plugins: [
        imageminMozjpeg({ quality: 80 }),
        imageminPngquant({ quality: [.7, .85], }),
        imageminGifsicle(),
        imageminSvgo()
    ],
    replaceOutputDir: output => {
        console.log(output)
        return output.replace(/img\//,'../../dist/assets/img/');
    }
}).then(() => {
    console.log(message);
});

//監視先
const watcher = chokidar.watch('./src/assets/img',{
    //dotfiles(ホームディレクトリに置いてあるドット(.)から始まる設定ファイルの変更は感知しない)
    ignored:/[\/\\]\./,
    //一度起動したら永続的に監視を続けるかどうか
    persistent:true
});


// -------------------------------------------------------------
// init
// -------------------------------------------------------------

switch (process.argv[2]) {
  case "init":
    //同期するファイルを読み込み
    var list = util.listFiles(dir);

    for (const item of list) {
      //ファイルの拡張子を取得
      var fileType = path.extname(item);
      //同期するフォルダにパスを変更
      var dist_file = item.replace(dir, dist);
      switch (fileType) {
          case '.jpg':
              var dist_webp = dist_file.replace('.jpg', '.webp');
              makeDir(dist_file);
              imgWebp(item, dist_webp);
              console.log(dist_webp)
              break;
          default:
              break;
      }
    }

    minProcess('src/assets/img/**/*.{jpg,png,gif,svg}','image_all_replaced.')
  break;

// -------------------------------------------------------------
// watch
// -------------------------------------------------------------

case "watch":
  watcher.on('ready',function(){

    //準備完了。
    console.log("ready");

    // ------------------------------
    // 追加時のアクション
    // ------------------------------

    watcher.on('add',function(wather){
      var fileType = path.extname(wather); //拡張子のチェック
      var distfile = wather.replace(dir,dist);// s3ディレクトリをdistフォルダに変更
    
      //jpg.pngの場合はwebpに変換_imageminで基本圧縮
      if(fileType == ".jpg"){
        var distWebp = distfile.replace('.jpg', '.webp');
        makeDir(distfile);
        imgWebp(wather,distWebp);
        minProcess(wather,distfile);
      }else if(fileType == ".png"){
        var distWebp = distfile.replace('.png', '.webp');
        makeDir(distfile);
        imgWebp(wather,distWebp);
        minProcess(wather,distfile);
      }else{
        minProcess(wather,distfile);
      }

    // -----------------------------------
    // 削除時のアクション
    // -----------------------------------

    }).on('unlink',function(wather){ 
      var fileType = path.extname(wather);
      var distfile = wather.replace(dir,dist);
      var distDir = util.getDirname(distfile);
      
      try {
        if(fileType == '.jpg'){
          var removeWebp = distfile.replace('.jpg','.webp')
          for( file  of [distfile,removeWebp]){
            fs.unlinkSync(file);
          }
          console.log(`delete:${removeWebp}`);
        }else if(fileType == '.png'){
          var removeWebp = distfile.replace('.png','.webp')
          for( file  of [distfile,removeWebp]){
            fs.unlinkSync(file);
          }
          console.log(`delete:${removeWebp}`);
        }else{
          fs.unlinkSync(distfile);
        }
        fs.readdir(distDir, function(err,files) {
          if (!files.length) {
            fs.rmdirSync(distDir)
            console.log(`delete:${distDir}`);
          }else if(err){
            console.log('program_problem.')
          }
        });
        console.log(`delete:${distfile}`);
      }catch (error) {
        console.log('no exise dist file')
      }
    // -----------------------------------
    // 変更時のアクション
    // -----------------------------------
    }).on('change',function(wather){
      
      //変更した内容を圧縮、変換し直します。
      if(fileType == ".jpg"){
        var distWebp = distfile.replace('.jpg', '.webp');
        imgWebp(wather,distWebp);
        minProcess(wather,distfile);
      }else if(fileType == ".png"){
        var distWebp = distfile.replace('.png', '.webp');
        imgWebp(wather,distWebp);
        minProcess(wather,distfile);
      }else{
        minProcess(wather,distfile);
      }
    }).on('error',function(wather){
      //エラー
      console.log(wather + " error");
    });
  });

  break;
}
