const fs = require("fs");
const pug = require("pug");
const util = require("../libs/util.js");
const pug_dir = "src/pug/";
const dist_dir = "dist/";
const router_dir = "router/";
//chokidarが吐き出すeventデータ(errorの場合unlink)
const event = process.argv[4]; 


console.log("makePug:Start");
// ------------------------------------------------
// 引数で処理の出し分け・  init or watches or router
// ------------------------------------------------

switch (process.argv[2]) {
  //initの場合
  case "init":
    //routerフォルダのjsonをすべて読み込み
    var router_jsons = util.listFiles("router");
    //個別に処理
    for (const item of router_jsons) {
      //パスをスラッシュで分割
      var array = item.split("/");
      //分割した最後のデータ
      var last_name = array[array.length - 1];
      //データの最初にアンダーバーのあるデータはスキップ
      if (last_name.substr(0, 1) == "_") {
        continue;
      }
      //拡張子が.jsonのデータはスキップ
      if (last_name.substr(-5) != ".json") {
        continue;
      }
      //最後の文言にcopyが入っているデータはスキップ
      if (last_name.indexOf("copy") >= 0) {
        continue;
      }
      //文言にassets/templateが入っているデータはスキップ
      if (item.indexOf("assets/template") >= 0) {
        continue;
      }
      //router/のパスを削除する
      var key = item.replace("router/", "");
      pugFileName = pug_dir + key.replace(".json", ".pug");
      distFileName = dist_dir + key.replace(".json", ".html");
      keyName = key.replace(".json", "");
      //もし同じ名前のデータが.pugになければスキップ
      if (!fs.existsSync(pugFileName)) {
        console.log("Not Pug file:" + pugFileName);
        continue;
      }
      //distファイルに制作するファイルのフォルダがなければ作成
      makeDir(distFileName);
      //個別処理している.jsonを文字列化
      var router_data = JSON.parse(fs.readFileSync(item));
      //router_data.redirectがあれば
      if (router_data.redirect) {
        var redirect_text = `<!DOCTYPE html><html lang="ja"><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http - equiv="X-UA-Compatible" content="ie=edge"><title>MAKI MAEDA</title><meta name="description" content="このページは転送されます。"><p>このページは自動で転送されます。自動で転送されない場合は、<a href="${router_data.redirect}">こちらをクリック</a>してください。</p><script>function link(){location.href="${router_data.redirect}"}setTimeout("link()",0)</script>`
        fs.writeFileSync(distFileName, redirect_text);
        continue;
      }
      //pugファイルをmeta.jsonデータ付きでhtml化
      var html = pug.renderFile(pugFileName, {
        meta: JSON.parse(fs.readFileSync(item)),
      });
      //もし同じデータがありなおかつ昔のデータと今回の書き出し内容が違っていれば
      if (fs.existsSync(distFileName)) {
        var old = fs.readFileSync(distFileName);
        if (old != html) {
          //新しいデータ分を書き出し
          fs.writeFileSync(distFileName, html);
          console.log("Success:" + distFileName);
        }
        //フォルダにないデータも書き出し
      } else {
        fs.writeFileSync(distFileName, html);
        console.log("Success:" + distFileName);
      }
    }
    break;
  case "watch":
    //ファイル変更時にchhoidarが書き出すパスデータ
    var pugFileName = process.argv[3];
    pugFileName = pugFileName.split("\\").join("/");

    //ファイル削除時に出るunlinkイベント時のerrorをスルー
    if (event == "unlink") {
      console.log("Deleted:" + pugFileName);
      console.log("makePug:Return");
      return;
    }
    //src/pugのパスを削除
    var key = pugFileName.replace("src/pug/", "");
    //各制御時のパス名を呼び出し
    routerFileName = router_dir + key.replace(".pug", ".json");
    distFileName = dist_dir + key.replace(".pug", ".html");
    
    //もし.pugと同じ名前の.jsonがなければスルー
    if (!fs.existsSync(routerFileName)) {
      console.log("Make:" + routerFileName);
      console.log("makePug:Return");
      return;
    }
    //作成するファイルのフォルダがなければ作成
    makeDir(distFileName);
     // pugファイルをmeta.jsonデータ付きでhtml化
    var html = pug.renderFile(pugFileName, {
      meta: JSON.parse(fs.readFileSync(routerFileName)),
    });
    // html化したデータを書き出し
    fs.writeFileSync(distFileName, html);
    console.log("Success:" + distFileName);
    break;
  case "router":
    //jsonファイル変更時にchokidarが書き出すパスデータ
    var routerFileName = process.argv[3];

    //ファイル削除時に出るunlinkイベント時のerrorをスルー
    if (event == "unlink") {
      console.log("Deleted:" + file_pth);
      console.log("makePug:Return");
      return;
    }
    //windowsとmacでerror_point?
    routerFileName = routerFileName.split("\\").join("/");
    //文言にassets/templateが入っているデータはスキップ
    if (routerFileName.indexOf("assets/template") >= 0) {
      console.log("makePug:Return");
      return;
    }
    var fileArray = routerFileName.split("/");
    var key = routerFileName.replace("router/", "");
    pugFileName = pug_dir + key.replace(".json", ".pug");
    distFileName = dist_dir + key.replace(".json", ".html");

    //もし.jsonと同じ名前の.pugがなければスルー
    if (!fs.existsSync(pugFileName)) {
      console.log("Make:" + pugFileName);
      console.log("makePug:Return");
      return;
    }
    //ファイルのディレクトリがなければ作成
    makeDir(distFileName);
    var html = pug.renderFile(pugFileName, {
      meta: JSON.parse(fs.readFileSync(routerFileName)),
    });
    //もし同じデータがありなおかつ昔のデータと今回の書き出し内容が違っていれば
    if (fs.existsSync(distFileName)) {
      var old = fs.readFileSync(distFileName);
      if (old != html) {
        fs.writeFileSync(distFileName, html);
        console.log("Success:" + distFileName);
      }
    } else {
      fs.writeFileSync(distFileName, html);
      console.log("Success:" + distFileName);
    }
    break;
}
//処理を終了
console.log("makePug:End");

function makeDir(path) {
  path = path.split("/");
  path.pop();
  path = path.join("/");
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }
  return true;
}

