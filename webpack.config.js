const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname, './dist/assets/js'), //絶対パスで書く設定
    filename: 'main.js',
  },
};
//outputのパスはgulp経由だとgulpfile.jsに準拠する
