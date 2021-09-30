const path = require("path");
const glob = require("glob");
const TerserPlugin = require("terser-webpack-plugin");
const writeFilePlugin = require('write-file-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

const srcDir = "./src/assets/js";
const entries = glob
  .sync("**/*.js", {
    ignore: ["**/_*.js", "common/**.js", "include/**.js"],
    cwd: srcDir,
  })
  .map(function(key) {
    // [ '**/*.js' , './src/**/*.js' ]という形式の配列になる
    return [key, path.resolve(srcDir, key)];
  });

// 配列→{key:value}の連想配列へ変換
const entryObj = Object.fromEntries(entries);
var mode = process.env.NODE_ENV;
console.log(`mode:${mode}`);

module.exports = {
  mode: "development",
  cache: (mode == 'initmode') ? false : true,
  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: entryObj,
  // ファイルの出力設定
  output: {
    //  出力ファイルのディレクトリ名
    path: path.join(__dirname, "dist/assets/js"),
    // 出力ファイル名
    filename: "[name]",
  },
  devtool: (mode == 'initmode') ? false : "eval",
  module: {
    rules: [
      {
        // 拡張子 .js の場合
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            // Babel を利用する
            loader: "babel-loader",
            // Babel のオプションを指定する
            options: {
              presets: [
                // プリセットを指定することで、ES2020 を ES5 に変換
                "@babel/preset-env"
              ],
              compact:false
            },
          },
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new writeFilePlugin()
  ],
  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm.js",
      util: require.resolve("util/"),
    },
    fallback: {},
  },
  // ES5(IE11等)向けの指定
  target: ["web", "es5"],
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  },
  performance: {
    maxEntrypointSize: 500000,
    maxAssetSize: 500000,
  },
  stats: {
    children: true,
  }
};