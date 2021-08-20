const fs = require('fs');
const db_path = './db/db.json';

exports.makeDb = function (list) {
    fs.writeFileSync(db_path, JSON.stringify(list));
    console.log('DBデータへの書き込みが完了しました。');
    return true;
}
exports.getDb = function () {
    var db = JSON.parse(fs.readFileSync(db_path));
    return db;
}

exports.listFiles = (dir) =>
    fs.readdirSync(dir, {
        withFileTypes: true
    }).flatMap(dirent =>
        dirent.isFile() ? [`${dir}/${dirent.name}`] : getLists(`${dir}/${dirent.name}`)
    );
var getLists = (dir) =>
    fs.readdirSync(dir, {
        withFileTypes: true
    }).flatMap(dirent =>
        dirent.isFile() ? [`${dir}/${dirent.name}`] : getLists(`${dir}/${dirent.name}`)
    );