const path = require('path');

module.exports = {
  // mode: 'development',
  mode: 'production',

  // メインで読み込むjsファイル
  entry: './src/js/index.js',
  // 出力設定
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  // {
                  //   useBuiltIns: 'usage', //必要なもののみ利用
                  //   corejs: 3,
                  //   // debug: true, //取り込まれたポリフィルを確認できる（なくてもOK
                  // },
                ],
              ],
            },
          },
        ],
      },
    ],
  },
  // ES5(IE11等)向けの指定
  target: ['web', 'es5'],
};
