const fs = require("fs");
const pug = require("pug");
const util = require("../libs/util.js");

const pug_dir = "src/pug/";
const dist_dir = "dist/";
const router_dir = "router/";
const event = process.argv[4];
console.log("makePug:Start");
switch (process.argv[2]) {
  case "init":
    var router_jsons = util.listFiles("router");
    for (const item of router_jsons) {
      var array = item.split("/");
      var last_name = array[array.length - 1];
      if (last_name.substr(0, 1) == "_") {
        continue;
      }
      if (last_name.substr(-5) != ".json") {
        continue;
      }
      if (last_name.indexOf("copy") >= 0) {
        continue;
      }
      if (item.indexOf("assets/template") >= 0) {
        continue;
      }
      var key = item.replace("router/", "");
      pugFileName = pug_dir + key.replace(".json", ".pug");
      distFileName = dist_dir + key.replace(".json", ".html");
      keyName = key.replace(".json", "");
      if (!fs.existsSync(pugFileName)) {
        console.log("Not Pug file:" + pugFileName);
        continue;
      }
      makeDir(distFileName);
      var router_data = JSON.parse(fs.readFileSync(item));
      if (router_data.redirect) {
        var redirect_text = `<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="X-UA-Compatible" content="ie=edge"><title>FPナビ | ニッセンライフ</title><meta name="description" content="このページは転送されます。"><script>(function(b,m,h,a,g){b[a]=b[a]||[];b[a].push({"gtm.start":new Date().getTime(),event:"gtm.js"});var k=m.getElementsByTagName(h)[0],e=m.createElement(h),c=a!="dataLayer"?"&l="+a:"";e.async=true;e.src="https://www.googletagmanager.com/gtm.js?id="+g+c;k.parentNode.insertBefore(e,k)})(window,document,"script","dataLayer","GTM-PKP6V5G");</script></head><body><noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PKP6V5G" height="0" width="0" style="display: none; visibility: hidden"></iframe></noscript><noscript><p>このページは自動で転送されます。自動で転送されない場合は、<a href="${router_data.redirect}">こちらをクリック</a>してください。</p></noscript><script>setTimeout("link()", 0); function link(){location.href='${router_data.redirect}';}</script></body></html>`
        fs.writeFileSync(distFileName, redirect_text);
        continue;
      }
      var html = pug.renderFile(pugFileName, {
        meta: JSON.parse(fs.readFileSync(item)),
      });
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
    }
    break;
  case "watch":
    var pugFileName = process.argv[3];
    pugFileName = pugFileName.split("\\").join("/");
    if (event == "unlink") {
      console.log("Deleted:" + pugFileName);
      console.log("makePug:Return");
      return;
    }
    var fileArray = pugFileName.split("/");
    var key = pugFileName.replace("src/pug/", "");
    routerFileName = router_dir + key.replace(".pug", ".json");
    distFileName = dist_dir + key.replace(".pug", ".html");
    if (!fs.existsSync(routerFileName)) {
      console.log("Make:" + routerFileName);
      console.log("makePug:Return");
      return;
    }
    makeDir(distFileName);
    var html = pug.renderFile(pugFileName, {
      meta: JSON.parse(fs.readFileSync(routerFileName)),
    });
    fs.writeFileSync(distFileName, html);
    console.log("Success:" + distFileName);
    break;
  case "router":
    var routerFileName = process.argv[3];
    if (event == "unlink") {
      console.log("Deleted:" + file_pth);
      console.log("makePug:Return");
      return;
    }
    routerFileName = routerFileName.split("\\").join("/");
    if (routerFileName.indexOf("assets/template") >= 0) {
      console.log("makePug:Return");
      return;
    }
    var fileArray = routerFileName.split("/");
    var key = routerFileName.replace("router/", "");
    pugFileName = pug_dir + key.replace(".json", ".pug");
    distFileName = dist_dir + key.replace(".json", ".html");
    if (!fs.existsSync(pugFileName)) {
      console.log("Make:" + pugFileName);
      console.log("makePug:Return");
      return;
    }
    makeDir(distFileName);
    var html = pug.renderFile(pugFileName, {
      meta: JSON.parse(fs.readFileSync(routerFileName)),
    });
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
