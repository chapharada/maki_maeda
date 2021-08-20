const fs = require('fs');
const util = require('../libs/util.js');
var pugFiles = util.listFiles("src/pug");
for(const item of pugFiles){
  if(item.indexOf('.pug') >= 0){
    var file = item.replace('src/pug','router').replace('.pug','.json');
    makeDir(file);
    if(!fs.existsSync(file)){
      var code = {
        "title" : "",
        "description": "",
        "keyword":"",
        "bread":[
        ],
        "css":[
        ],
        "js":[
        ],
        "redirect":"",
        "date":"2021/08/01",
        "deleted":0
      };
      fs.writeFileSync(file, JSON.stringify(code));
    }
  }
}
/*
for(const item of jsons){
  var code = {
    "title" : "",
    "description": "",
    "keyword":"",
    "bread":[
    ],
    "css":[
    ],
    "js":[
    ],
    "redirect":"",
    "date":"2021/08/01",
    "deleted":0
};

  fs.writeFileSync('router' + item, JSON.stringify(code));
}
*/
function makeDir(path){
  path = path.split("/");
  path.pop();
  path = path.join('/');
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }
  return true;
}
