var sass = require("sass");
const autoprefixer = require("autoprefixer");
const postcss = require("postcss");
const util = require("../libs/util.js");
const fs = require("fs");
const sassDir = "src/assets/sass";
const distDir = "dist/assets/css";

console.log("makeSass:Start");

switch (process.argv[2]) {
  //第二引数がinitの場合
  case "init":
    var sassFiles = util.listFiles(sassDir);
    for (const item of sassFiles) {
      var fileName = item.split("\\").join("/");
      fileName = fileName.split("/");
      fileName = fileName[fileName.length - 1];
      if (fileName.substr(0, 1) == "_") {
        continue;
      }
      if (item.substr(-5) == ".scss") {
        var target = item.replace(sassDir, distDir).replace(".scss", ".css");
        makeDir(target);
        var output = sass.renderSync({
          file: item,
          outputStyle: "compressed",
        });
        var output2 = postcss([
          autoprefixer({
            grid: "autoplace",
            cascade: true,
          }),
        ]).process(output.css, { from: undefined }).css;
        fs.writeFileSync(target, output2);
        console.log("Success:" + target);
      }else{
        var target = item.replace(sassDir, distDir);
        makeDir(target);
        fs.copyFileSync(item,target);
        console.log("Success:" + target);
      }
    }
    break;
  case "watch":
    //ファイルパス
    var sassFileName    = process.argv[3];
    const event         = process.argv[4];
    //もし吐き出す引数がunlinkだったら
    if(event == 'unlink'){
      console.log("Deleted:" + sassFileName);
      return;
    }
    //パスにwindows用の処理
    sassFileName     = sassFileName.split("\\").join("/")
    //pagesディレクトリを削除したver
    var sassDistFileName = sassFileName.replace("pages/","")
    console.log(`pages削除?:${sassDistFileName}`)

    //ファイルの名前
    var fileName = sassFileName.split("/");
    fileName = fileName[fileName.length - 1];
    //fileNameの最初の文言が_だったらスルー
    if (fileName.substr(0, 1) == "_") {
      return;
    }
    //.scssだったら
    if (sassDistFileName.substr(-5) == ".scss") {
      var target = sassDistFileName.replace(sassDir,distDir).replace(".scss",".css");
      makeDir(target);
      //sassをレンダリング
      var output = sass.renderSync({
          file: sassFileName,
          outputStyle:"compressed"
      });
      var output2  = postcss([ autoprefixer({
          grid:'autoplace',
          cascade: true
          }) ]).process(output.css,{ from: undefined }).css;
      fs.writeFileSync(target, output2);
      console.log("Success:" + target);
    }else{
      var target = sassFileName.replace(sassDir, distDir);
      makeDir(target);
      fs.copyFileSync(sassFileName,target);
      console.log("Success:" + target);
    }
    break;
}
console.log("makeSass:End");

function makeDir(path) {
  path = path.split("/");
  path.pop();
  path = path.join("/");
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }
  return true;
}
